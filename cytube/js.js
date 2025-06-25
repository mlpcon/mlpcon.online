"use strict";
const userCountText = self.document.getElementById("usercount").innerText;
self.document.getElementById("usercount").innerText = userCountText.replace("user", "anon");

/*!
**|   Wolvan's /mlp/ con schedule loader
**|   Pulls the schedule from the /mlp/ con website
**|   and displays the current as well as next panel
**|   in the MOTD. The current panel of the alternate
**|   channel is also displayed.
**|
**@preserve
*/ 
(() => {
	console.log("Hello from /mlp/con\nSchedule script made by Wolvan");

	const DEBUG_NOW = null; //new Date("2022-06-27T02:00:00.000+02:00");
	const mlpconScheduleURL = "https://mlpcon.online/schedule";

	function stringifyDuration(duration = 0) {
		if (typeof duration !== "number") throw new Error("Invalid duration");
		const days = Math.floor(duration / (24 * 60 * 60 * 1000));
		const years = Math.floor(days / 365);
		const remainingDays = days % 365;
		const hours = Math.floor((duration % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
		const minutes = Math.floor((duration % (60 * 60 * 1000)) / (60 * 1000));
		const seconds = Math.floor((duration % (60 * 1000)) / 1000);
		return (years > 0 ? years + " year" + (years > 1 ? "s" : "") : "") +
			(remainingDays ? remainingDays + " day" + (remainingDays > 1 ? "s" : "") + " " : "") +
			(hours ? hours + " hour" + (hours > 1 ? "s" : "") + " " : "") +
			(minutes ? minutes + " minute" + (minutes > 1 ? "s" : "") + " " : "") +
			(seconds ? seconds + " second" + (seconds > 1 ? "s" : "") : "");
	}
	function parseISODuration(duration = "") {
		if (typeof duration !== "string" || !duration.match(/P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/))
			throw new Error("Invalid duration");
		const [, years, months, days, hours, minutes, seconds] = duration.match(/P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
		return (
			(years ? parseInt(years) * 365 * 24 * 60 * 60 : 0) +
			(months ? parseInt(months) * 30 * 24 * 60 * 60 : 0) +
			(days ? parseInt(days) * 24 * 60 * 60 : 0) +
			(hours ? parseInt(hours) * 60 * 60 : 0) +
			(minutes ? parseInt(minutes) * 60 : 0) +
			(seconds ? parseInt(seconds) : 0)
		) * 1000;
	}
	function randomString(length = 16, charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") {
		return Array(length).fill("").map(() => charset[Math.floor(Math.random() * charset.length)]).join("");
	}

	const currentChannelName = this && this.CHANNEL && this.CHANNEL.name ? this.CHANNEL.name : "";
	const currentChannel =
		currentChannelName === "mlp-con" ? "cytube1" :
		currentChannelName === "mlp-con2" ? "cytube2" :
		"";
	const altChannel =
		currentChannelName === "mlp-con" ? "cytube2" :
		currentChannelName === "mlp-con2" ? "cytube1" :
		""

	function runFunctionAtDate(date, func = () => {}) {
		const now = new Date();
		const diff = date.getTime() - now.getTime();
		if (diff <= 0) {
			func();
		} else {
			setTimeout(func, diff);
		}
	}

	async function getSchedule() {
		const response = await fetch(mlpconScheduleURL + "?cache-buster=" + randomString(), { cache: "no-store" });
		const scheduleHTML = await response.text();
		const events = $(scheduleHTML).find(".h-event").map(function() {
			const event = $(this);
			try {
				const durationMs = parseISODuration(event.find(".dt-duration").attr("datetime"));
				const start = new Date(event.find(".dt-start").attr("datetime"));
				return {
					title: event.find(".p-name").text(),
					start,
					duration: durationMs,
					durationString: event.find(".dt-duration").attr("datetime"),
					end: new Date(start.getTime() + durationMs),
					description: event.find(".e-content").text().trim(),
					cytube1: event.find(".u-url[href*='cytu.be']").attr("href") === "//cytu.be/r/mlp-con",
					cytube2: event.find(".u-url[href*='cytu.be']").attr("href") === "//cytu.be/r/mlp-con2",
					rewatchCytube: event.find(".u-url[href*='cytu.be']").attr("href") === "//cytu.be/r/MLPrewatchstream",
				}
			} catch (error) {
				return null;
			}
		}).get().filter(i => i);
		return events;
	}

	function updateEventElement(element, event) {
		if (!event) event = {
			title: "SEE YOU SPACE PONY",
			duration: 365 * 24 * 60 * 60 * 1000,
			startText: "??:00 UTC",
			description: "See you next year, space pony."
		};
		const el = $("#" + element);
		const title = el.find(".p-name .event-name");
		const startTime = el.find(".dt-start");
		const duration = el.find(".dt-duration");
		const summary = el.find(".e-content");

		title.text(event.title);
		startTime.text(event.startText || event.start.toLocaleString());
		duration.text(stringifyDuration(event.duration));
		summary.text(event.description);
	}
	function findNextEvent(events) {
		const now = DEBUG_NOW || new Date();
		const nextEvent = events.find(event => event.start.getTime() > now.getTime());
		return nextEvent;
	}
	function getEvents(eventsArray) {
		const events = {
			current: null,
			next: null
		};
		const nextEvent = findNextEvent(eventsArray);
		const nextEventIndex = eventsArray.indexOf(nextEvent);
		const currentEvent = eventsArray[(nextEventIndex === -1 ? eventsArray.length : nextEventIndex) - 1];
		if (currentEvent) {
			if (currentEvent.end < (DEBUG_NOW || new Date()) && nextEvent) {
				const durationMs = nextEvent.start - currentEvent.end;
				events.current = {
					title: "Intermission",
					start: currentEvent.end,
					duration: durationMs,
					end: new Date(currentEvent.end.getTime() + durationMs),
					description: "Currently nothing is going on here, but check the alternate channel or wait for the next panel!",
					cytube1: currentEvent.cytube1,
					cytube2: currentEvent.cytube2,
					rewatchCytube: currentEvent.rewatchCytube,
				};
			}
			else if (currentEvent.end < (DEBUG_NOW || new Date())) events.current = null;
			else events.current = currentEvent;
		}
		events.next = nextEvent;
		return events;
	}
	async function updateSchedule() {
		try {
			const events = await getSchedule();
			const eventsOnThisChannel = events.filter(event => event[currentChannel]);
			const eventsOnAltChannel = events.filter(event => event[altChannel]);
			
			const {
				current: currentEvent,
				next: nextEvent
			} = getEvents(eventsOnThisChannel);
			if (currentEvent) runFunctionAtDate(currentEvent.end, updateSchedule);
			if (nextEvent) runFunctionAtDate(nextEvent.start, updateSchedule);
			updateEventElement("event-current", currentEvent);
			updateEventElement("event-next", nextEvent);

			const {
				current: altChannelEvent
			} = getEvents(eventsOnAltChannel);
			updateEventElement("event-alt-channel", altChannelEvent);
			if (altChannelEvent) runFunctionAtDate(altChannelEvent.end, updateSchedule);

			console.log({
				currentEvent,
				nextEvent,
				altChannelEvent
			});
		} catch (error) {
			console.log(error);
		}
		// setTimeout(updateSchedule, 15 * 60 * 1000);
	}
	setInterval(updateSchedule, 15 * 60 * 1000);
	updateSchedule();
})();
/*!
**|  CyTube Channel: MLPA External Script
**|
**|  All code written by Xaekai except where otherwise noted.
**|  Modified for /mlp/con
**|  Copyright 2014-2019 All Rights Reserved
**|
**@preserve
*/
if (!this[CHANNEL.name]) {
    this[CHANNEL.name] = {}
}
if (!this[CHANNEL.name].branding) {
    this[CHANNEL.name].branding = $(".navbar-brand").html("").css({"background-image": 'url("https://mlpcon.online/favicon.png")', "background-size": "100%", height: "50px", "min-width": "50px"})
}
if (!this[CHANNEL.name].favicon) {
    this[CHANNEL.name].favicon = $("<link/>").prop("id", "favicon").attr("rel", "shortcut icon").attr("type", "image/png").attr("sizes", "64x64").attr("href", "https://mlpcon.online/favicon.png").appendTo("head")
}
/*!
**|   Xaekai's Sequenced Module Loader
**|
**@preserve
*/ /*!
**|   Xaekai's Sequenced Module Loader
**|
**@preserve
*/ 
({
	options:{
		designator:{prefix:"Pony-",delay:9e4},
		playlist:{collapse:!0,inlineBlame:!0,moveReporting:!0,quickQuality:!0,recentMedia:!0,simpleLeader:!0,syncCheck:!0,thumbnails:!0,timeEstimates:!0,volumeControl:!0},
		chatext:{persistIgnore:!0,smartScroll:!0,maxMessages:120},
		userlist:{autoHider:!0},
		various:{notepad:!0,emoteToggle:!0},
		whispers:{joins:!0,parts:!1}
	},
	modules:{
		settings:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_settings.min.js",done:!0},
		audio:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_audiolib.js",done:!0},
		privmsg:{active:1,rank:1,url:"https://resources.pink.horse/js/module_privmsg.min.js",done:!0},
		whispers:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_whispers.min.js",done:!0,cache:!1},
		userlist:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_userlist.min.js",done:!0},
		md5hash:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_md5.min.js",done:!0},
		designator:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_designator.min.js",done:!0},
		playlist:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_playlist.min.js",done:!0},
		notifier:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_alerts.min.js",done:!0},
		chatline:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_chatline.min.js",done:!0},
		chatext:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_chatext.min.js",done:!0},
		chatcolor:{active:0,rank:-1,url:"https://resources.pink.horse/js/module_chatcolor.min.js",done:!0},
		colormap:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_colormap.min.js",done:!0},
		unimoji:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_unimoji.min.js",done:!0},
		dectalk:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_tts.min.js",done:!0},
		hotkeys:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_hotkeys.min.js",done:!0},
		layout:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_layout.min.js",done:!0},
		various:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_various.min.js",done:!0},
		embedmedia:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_embedmedia.min.js",done:!0},
		AvtrClient:{active:1,rank:-1,url:"https://resources.pink.horse/js/AvatarClient.min.js",done:!0},
		fancysheet:{active:1,rank:-1,url:"https://resources.pink.horse/js/custom_fancysheet.min.js",done:!0},
		customcode:{active:1,rank:-1,url:"https://mlpcon.online/cytube/custom_mlpcon.js",done:!0,cache:!1},
		time:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_time.min.js",done:!0},
		search:{active:0,rank:-1,url:"https://resources.pink.horse/js/module_search.min.js",done:!0},
		snow:{active:0,rank:1,url:"https://resources.pink.horse/js/module_snow.js",done:!0},
		spider:{active:0,rank:1,url:"https://resources.pink.horse/js/module_spider.js",done:!0}
	},
	getScript:function(e,t,s=!0){return jQuery.ajax({url:e,cache:s,success:t,type:"GET",dataType:"script"})},
	initialize:function(){!CLIENT.modules&&(CLIENT.modules=this,window[CHANNEL.name].modulesOptions=this.options,console.info("[XaeModule]","Begin Loading."),this.index=Object.keys(this.modules),this.sequencerLoader(),this.cache=!1)},
	sequencerLoader:function(){if(this.state.prev&&(setTimeout(this.modules[this.state.prev].done,0),this.state.prev=""),this.state.pos>=this.index.length)return console.info("[XaeModule]","Loading Complete.");var e=this.index[this.state.pos];if(this.state.pos<this.index.length){if(this.modules[e].active){if(this.modules[e].rank<=CLIENT.rank){console.info("[XaeModule]","Loading:",e),this.state.prev=e,this.state.pos++;let t=void 0===this.modules[e].cache?this.cache:this.modules[e].cache;this.getScript(this.modules[e].url,this.sequencerLoader.bind(this),t)}else 0===this.modules[e].rank&&-1===CLIENT.rank&&function(e){socket.once("login",t=>{t.success&&this.getScript(e.url,!1,this.cache)})}(this.modules[e]),this.state.pos++,this.sequencerLoader()}else this.state.pos++,this.sequencerLoader()}},
	state:{prev:"",pos:0}
}).initialize();
/*customcode:{active:1,rank:-1,url:"https://resources.pink.horse/js/custom_mlpa.min.js",done:!0,cache:!1},*/

// the4cdnMutationObserver written by fusedforms
(() => {
	class the4cdnMutationObserver {
		connect() {
			if (window.the4cdnMutationObserver) {
				window.the4cdnMutationObserver.disconnect();
			}
			window.the4cdnMutationObserver = this;
			if (window.MutationObserver) {
				this.observer = new MutationObserver((mutations) =>
					mutations.forEach(mutation => mutation.addedNodes.forEach((domNode) => this.mutateMsg(domNode))));
				const chat = document.getElementById('messagebuffer');
				$(chat).children().each((_, domNode) => this.mutateMsg(domNode));
				this.observer.observe(chat, {childList: true});
			}
		}
		disconnect() {
			this.observer.disconnect();
		}
		mutateMsg(domNode) {
			$(domNode).find('img').attr('referrerpolicy', 'no-referrer');
		}
	}

	new the4cdnMutationObserver().connect();
})();
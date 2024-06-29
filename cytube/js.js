"use strict";
const userCountText = self.document.getElementById("usercount").innerText;
self.document.getElementById("usercount").innerText = userCountText.replace("user", "anon");

/*!
**|   Wolvan's /mlp/con schedule loader
**|   Pulls the schedule from the /mlp/con website
**|   and displays the current as well as next panel
**|   in the MOTD. The current panel of the alternate
**|   channel is also displayed.
**|
**@preserve
*/ (()=>{console.log("Hello from /mlp/con\nSchedule script made by Wolvan");function e(e=0){if("number"!=typeof e)throw Error("Invalid duration");let t=Math.floor(e/864e5),s=Math.floor(t/365),n=t%365,r=Math.floor(e%864e5/36e5),i=Math.floor(e%36e5/6e4),o=Math.floor(e%6e4/1e3);return(s>0?s+" year"+(s>1?"s":""):"")+(n?n+" day"+(n>1?"s":"")+" ":"")+(r?r+" hour"+(r>1?"s":"")+" ":"")+(i?i+" minute"+(i>1?"s":"")+" ":"")+(o?o+" second"+(o>1?"s":""):"")}function t(e=""){if("string"!=typeof e||!e.match(/P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/))throw Error("Invalid duration");let[,t,s,n,r,i,o]=e.match(/P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);return((t?31536e3*parseInt(t):0)+(s?2592e3*parseInt(s):0)+(n?86400*parseInt(n):0)+(r?3600*parseInt(r):0)+(i?60*parseInt(i):0)+(o?parseInt(o):0))*1e3}function s(e=16,t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"){return Array(e).fill("").map(()=>t[Math.floor(Math.random()*t.length)]).join("")}let n=this&&this.CHANNEL&&this.CHANNEL.name?this.CHANNEL.name:"",r="mlp-con"===n?"cytube1":"mlp-con2"===n?"cytube2":"",i="mlp-con"===n?"cytube2":"mlp-con2"===n?"cytube1":"";function o(e,t=()=>{}){let s=new Date,n=e.getTime()-s.getTime();n<=0?t():setTimeout(t,n)}async function a(){let e=await fetch("https://mlpcon.online/schedule.html?cache-buster="+s(),{cache:"no-store"}),n=await e.text(),r=$(n).find(".h-event").map(function(){let e=$(this);try{let s=t(e.find(".dt-duration").attr("datetime")),n=new Date(e.find(".dt-start").attr("datetime"));return{title:e.find(".p-name").text(),start:n,duration:s,durationString:e.find(".dt-duration").attr("datetime"),end:new Date(n.getTime()+s),description:e.find(".e-content").text().trim(),cytube1:"//cytu.be/r/mlp-con"===e.find(".u-url[href*='cytu.be']").attr("href"),cytube2:"//cytu.be/r/mlp-con2"===e.find(".u-url[href*='cytu.be']").attr("href"),rewatchCytube:"//cytu.be/r/MLPrewatchstream"===e.find(".u-url[href*='cytu.be']").attr("href")}}catch(r){return null}}).get().filter(e=>e);return r}function c(t,s){s||(s={title:"SEE YOU SPACE PONY",duration:31536e6,startText:"??:00 UTC",description:"See you next year, space pony."});let n=$("#"+t),r=n.find(".p-name .event-name"),i=n.find(".dt-start"),o=n.find(".dt-duration"),a=n.find(".e-content");r.text(s.title),i.text(s.startText||s.start.toLocaleString()),o.text(e(s.duration)),a.text(s.description)}function u(e){let t=new Date,s=e.find(e=>e.start.getTime()>t.getTime());return s}function l(e){let t={current:null,next:null},s=u(e),n=e.indexOf(s),r=e[(-1===n?e.length:n)-1];if(r){if(r.end<new Date&&s){let i=s.start-r.end;t.current={title:"Intermission",start:r.end,duration:i,end:new Date(r.end.getTime()+i),description:"Currently nothing is going on here, but check the alternate channel or wait for the next panel!",cytube1:r.cytube1,cytube2:r.cytube2,rewatchCytube:r.rewatchCytube}}else r.end<new Date?t.current=null:t.current=r}return t.next=s,t}async function d(){try{let e=await a(),t=e.filter(e=>e[r]),s=e.filter(e=>e[i]),{current:n,next:u}=l(t);n&&o(n.end,d),u&&o(u.start,d),c("event-current",n),c("event-next",u);let{current:h}=l(s);c("event-alt-channel",h),h&&o(h.end,d),console.log({currentEvent:n,nextEvent:u,altChannelEvent:h})}catch(m){console.log(m)}}setInterval(d,9e5),d()})(),this[CHANNEL.name]||(this[CHANNEL.name]={}),this[CHANNEL.name].branding||(this[CHANNEL.name].branding=$(".navbar-brand").html("").css({"background-image":'url("https://mlpcon.online/favicon.png")',"background-size":"100%",height:"50px","min-width":"50px"})),this[CHANNEL.name].favicon||(this[CHANNEL.name].favicon=$("<link/>").prop("id","favicon").attr("rel","shortcut icon").attr("type","image/png").attr("sizes","64x64").attr("href","https://mlpcon.online/favicon.png").appendTo("head")),/*!
**|   Xaekai's Sequenced Module Loader
**|
**@preserve
*/ /*!
**|   Xaekai's Sequenced Module Loader
**|
**@preserve
*/ ({options:{designator:{prefix:"Pony-",delay:9e4},playlist:{collapse:!0,inlineBlame:!0,moveReporting:!0,quickQuality:!0,recentMedia:!0,simpleLeader:!0,syncCheck:!0,thumbnails:!0,timeEstimates:!0,volumeControl:!0},chatext:{persistIgnore:!0,smartScroll:!0,maxMessages:120},userlist:{autoHider:!0},various:{notepad:!0,emoteToggle:!0},whispers:{joins:!0,parts:!1}},modules:{settings:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_settings.min.js",done:!0},audio:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_audiolib.js",done:!0},privmsg:{active:1,rank:1,url:"https://resources.pink.horse/js/module_privmsg.min.js",done:!0},whispers:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_whispers.min.js",done:!0,cache:!1},userlist:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_userlist.min.js",done:!0},md5hash:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_md5.min.js",done:!0},designator:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_designator.min.js",done:!0},playlist:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_playlist.min.js",done:!0},notifier:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_alerts.min.js",done:!0},chatline:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_chatline.min.js",done:!0},chatext:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_chatext.min.js",done:!0},chatcolor:{active:0,rank:-1,url:"https://resources.pink.horse/js/module_chatcolor.min.js",done:!0},colormap:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_colormap.min.js",done:!0},unimoji:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_unimoji.min.js",done:!0},dectalk:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_tts.min.js",done:!0},hotkeys:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_hotkeys.min.js",done:!0},layout:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_layout.min.js",done:!0},various:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_various.min.js",done:!0},embedmedia:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_embedmedia.min.js",done:!0},AvtrClient:{active:1,rank:-1,url:"https://resources.pink.horse/js/AvatarClient.min.js",done:!0},fancysheet:{active:1,rank:-1,url:"https://resources.pink.horse/js/custom_fancysheet.min.js",done:!0},customcode:{active:1,rank:-1,url:"https://mlpcon.online/cytube/custom_mlpcon.js",done:!0,cache:!1},time:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_time.min.js",done:!0},search:{active:0,rank:-1,url:"https://resources.pink.horse/js/module_search.min.js",done:!0},snow:{active:0,rank:1,url:"https://resources.pink.horse/js/module_snow.js",done:!0},spider:{active:0,rank:1,url:"https://resources.pink.horse/js/module_spider.js",done:!0}},getScript:function(e,t,s=!0){return jQuery.ajax({url:e,cache:s,success:t,type:"GET",dataType:"script"})},initialize:function(){!CLIENT.modules&&(CLIENT.modules=this,window[CHANNEL.name].modulesOptions=this.options,console.info("[XaeModule]","Begin Loading."),this.index=Object.keys(this.modules),this.sequencerLoader(),this.cache=!1)},sequencerLoader:function(){if(this.state.prev&&(setTimeout(this.modules[this.state.prev].done,0),this.state.prev=""),this.state.pos>=this.index.length)return console.info("[XaeModule]","Loading Complete.");var e=this.index[this.state.pos];if(this.state.pos<this.index.length){if(this.modules[e].active){if(this.modules[e].rank<=CLIENT.rank){console.info("[XaeModule]","Loading:",e),this.state.prev=e,this.state.pos++;let t=void 0===this.modules[e].cache?this.cache:this.modules[e].cache;this.getScript(this.modules[e].url,this.sequencerLoader.bind(this),t)}else 0===this.modules[e].rank&&-1===CLIENT.rank&&function(e){socket.once("login",t=>{t.success&&this.getScript(e.url,!1,this.cache)})}(this.modules[e]),this.state.pos++,this.sequencerLoader()}else this.state.pos++,this.sequencerLoader()}},state:{prev:"",pos:0}}).initialize();
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
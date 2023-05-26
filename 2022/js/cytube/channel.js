"use strict";

// global polyfills
// self.CSS
if (!self.CSS)
	self.CSS = {};

if (!self.CSS.number)
	self.CSS.number = function(number) { return self.Object.freeze({ unit: "number", value: number, toString() { return self.String(number); } }); };

if (!self.CSS.percent)
	self.CSS.percent = function(percent) { return self.Object.freeze({ unit: "percent", value: percent, toString() { return `${self.String(percent)}%`; } }); }

if (!self.CSS.px)
	self.CSS.px = function(px) { return self.Object.freeze({ unit: "px", value: px, toString() { return `${self.String(px)}px`; } }); }

// self.Element
[self.Element.prototype, self.Document.prototype, self.DocumentFragment.prototype].forEach((prototype) => {
	// self.Element.prototype.append
	if (!prototype.append)
		prototype.append = function(...nodes) { this.appendChild(nodes.reduce((doc, node) => doc.appendChild((node instanceof self.Node) ? node : self.document.createTextNode(self.String(node))), self.document.createDocumentFragment())); };

	// self.Element.prototype.prepend
	if (!prototype.prepend)
		prototype.prepend = function(...nodes) { this.insertBefore(nodes.reduce((doc, node) => doc.appendChild((node instanceof self.Node) ? node : self.document.createTextNode(self.String(node))), self.document.createDocumentFragment()), this.firstChild); };
});
[self.Element.prototype, self.CharacterData.prototype, self.DocumentType.prototype].forEach((prototype) => {
	// self.Element.prototype.remove
	if (!prototype.remove)
		prototype.remove = function() {
			if (this.parentNode !== null)
				this.parentNode.removeChild(this);
		};

	// self.Element.prototype.replaceWith
	if (!prototype.replaceWith)
		prototype.replaceWith = function(...nodes) {
			if (!this.parentNode)
				return;
			else if (nodes.length === 0)
				this.parentNode.removeChild(this);

			for (let i = nodes.length - 1; i >= 0; i--) {
				const currentNode = (nodes[i] instanceof self.Node) ? nodes[i] : this.ownerDocument.createTextNode(self.String(nodes[i]));

				if (i === 0)
					this.parentNode.replaceChild(currentNode, this);
				else
					this.parentNode.insertBefore(this.previousSibling, currentNode);
			}
		};
});
if (!"attributes" in self.Element.prototype)
	self.Element.prototype.attributes = self.Element.prototype.mozNamedAttrMap;
if (!self.Element.prototype.getAttributeNames)
	self.Element.prototype.getAttributeNames = function() { return self.Array.prototype.map.call(this.attributes, (attribute) => attribute.name); };

(function() {
	// constants
	const BANNER_ICON = "//mlpcon.online/image/conpone-icon.png";
	const FAV_ICON = "//mlpcon.online/image/contard-icon.png";

	// utility functions
	function createElement(name, attributes = {}, parent = undefined, text = undefined) {
		const element = self.document.createElement(name);
		setAttributes(element, attributes);

		if (text !== undefined)
			element.textContent = self.String(text);

		if (parent instanceof self.Node)
			parent.appendChild(element);
		return element;
	}
	function setAttributes(element, attributes = {}) {
		for (const key in attributes)
			element.setAttribute(key, attributes[key]);
	}
	function setCssProperties(element, properties = {}) {
		for (const key in properties)
			setCssProperty(element, key, properties[key]);
	}
	function setCssProperty(element, property, value) {
		if ("attributeStyleMap" in element)
			return element.attributeStyleMap.set(property, value);
		element.style.setProperty(property, self.String(value));
	}

	// functions
	function setBranding() {
		const branding = createElement("a", { class: "navbar-brand"});
		branding.innerText = "";
		branding.setAttribute("href", "//mlpcon.online/");
		setCssProperties(branding, {
			"background-size": CSS.percent(100), "background-image": `url("${BANNER_ICON}")`, height: CSS.px(50), "min-width": CSS.px(50)
		});
		document.getElementsByClassName("navbar-brand")[0].replaceWith(branding);
	}

	setBranding();
	createElement("link", { href: FAV_ICON, rel: "icon shortcut", type: "image/png", sizes: "256x256" }, self.document.head);
})();

"use strict";

function createModal(data) {
	var title = data.title || "Empty Modal";
	var title_m = !!data.titleIsMarkup;
	var wrap = $("<div/>").addClass("modal fade").attr("tabindex", "-1");
	var dialog = $("<div/>").addClass("modal-dialog").appendTo(wrap);
	var content = $("<div/>").addClass("modal-content").appendTo(dialog);
	var head = $("<div/>").addClass("modal-header").appendTo(content);
	var body = $("<div/>").addClass("modal-body").appendTo(content);
	var foot = $("<div/>").addClass("modal-footer");
	$("<button/>").addClass("close").attr("data-dismiss", "modal").attr("data-hidden", "true").html("&times;").appendTo(head);
	$("<button/>").addClass("btn btn-default").attr("data-dismiss", "modal").prop("type", "button").html("Close").appendTo(foot);
	if (title_m) {
		$("<h4/>").addClass("modal-title").html(title).appendTo(head)
	} else {
		$("<h4/>").addClass("modal-title").text(title).appendTo(head)
	}
	if (data.wrap_id) {
		wrap.prop("id", data.wrap_id)
	}
	if (data.body_id) {
		body.prop("id", data.body_id)
	}
	if (data.footer) {
		foot.appendTo(content)
	}
	if (data.destroy) {
		wrap.on("hidden.bs.modal", function() {
			wrap.remove()
		})
	}
	if (data.attach) {
		wrap.appendTo(data.attach)
	}
	return wrap
}(function(CyTube_Settings) {
	return CyTube_Settings(window, document, window.jQuery)
})(function(window, document, $, undefined) {
	if (!$("#customSettingsStaging").length) {
		$("<div/>").prop("id", "customSettingsStaging").hide().insertAfter("#useroptions")
	}
	if ($("#customSettingsModal").length) {
		$("#customSettingsWrap .customSettings").detach().appendTo($("#customSettingsStaging"));
		$("#customSettingsModal").remove()
	}
	if ($("#customSettingsModalTrigger").length) {
		$("#customSettingsModalTrigger").unbind().remove()
	}
	$("<button/>").prop("id", "customSettingsModalTrigger").attr("title", "Custom Settings").addClass("btn btn-sm btn-default").html('<span class="glyphicon glyphicon-tasks"></span> Channel Control').button().appendTo("#customSettingsStaging").attr("data-toggle", "modal").click(function(event) {
		createModal({
			title: "Custom Channel Settings: " + CHANNEL.name,
			wrap_id: "customSettingsModal",
			body_id: "customSettingsWrap",
			footer: true
		}).on("show.bs.modal", function(event) {
			var row = $("<div/>").addClass("row").appendTo("#customSettingsWrap");
			$("#customSettingsStaging .customSettings").each(function() {
				var panel = $("<div/>").addClass("panel panel-primary");
				var heading = $("<div/>").addClass("panel-heading").appendTo(panel).text($(this).data().title);
				var body = $("<div/>").addClass("panel-body").appendTo(panel);
				if ($(this).data("column-class")) {
					$("<div/>").addClass($(this).data("column-class")).appendTo(row).append(panel)
				} else {
					$("<div/>").addClass("col-sm-6").appendTo(row).append(panel)
				}
				$(this).detach().appendTo(body)
			})
		}).on("hidden.bs.modal", function(event) {
			$("#customSettingsWrap .customSettings").detach().appendTo($("#customSettingsStaging"));
			$("#customSettingsModal").remove()
		}).insertAfter("#useroptions").modal()
	});
	if (USEROPTS.layout.match(/synchtube/)) {
		$("#customSettingsModalTrigger").detach().appendTo("#leftcontrols")
	} else {
		$("#customSettingsModalTrigger").detach().prependTo("#leftcontrols")
	}
});

/*!
**|   Xaekai's Sequenced Module Loader
**|
**@preserve
*/

({
	options: {
		designator: {
			prefix: 'Pony-',
			delay:  90 * 1000
		},
		playlist: {
			collapse      : true,
			inlineBlame   : true,
			moveReporting : true,
			quickQuality  : true,
			recentMedia   : true,
			simpleLeader  : true,
			syncCheck     : true,
			thumbnails    : true,
			timeEstimates : true,
			volumeControl : true,
		},
		chatext: {
			persistIgnore : true,
			smartScroll   : true,
			maxMessages   : 120
		},
		userlist: {
			autoHider: true
		},
		various: {
			notepad     : true,
			emoteToggle : true,
		},
		whispers: {
			joins : true,
			parts : false,
		},
	},
	modules: {
		'settings':   { active: 1, rank: -1, url: "https://resources.pink.horse/js/module_settings.min.js",   done: true },
		'audio':      { active: 1, rank: -1, url: "https://resources.pink.horse/oldjs/external_audiolib.js",        done: true },

		'privmsg':    { active: 1, rank:  1, url: "https://resources.pink.horse/js/module_privmsg.min.js",    done: true },
		'whispers':   { active: 1, rank: -1, url: "https://resources.pink.horse/js/module_whispers.min.js",   done: true, cache: false },
		'userlist':   { active: 1, rank: -1, url: "https://resources.pink.horse/js/module_userlist.min.js",   done: true },
		'md5hash':    { active: 1, rank: -1, url: "https://resources.pink.horse/js/module_md5.min.js",        done: true },
		'designator': { active: 1, rank: -1, url: "https://resources.pink.horse/js/module_designator.min.js", done: true },
		'playlist':   { active: 1, rank: -1, url: "https://resources.pink.horse/js/module_playlist.min.js",   done: true },
		'notifier':   { active: 1, rank: -1, url: "https://resources.pink.horse/js/module_alerts.min.js",     done: true },
		'chatline':   { active: 1, rank: -1, url: "https://resources.pink.horse/js/module_chatline.min.js",   done: true },
		'chatext':    { active: 1, rank: -1, url: "https://resources.pink.horse/js/module_chatext.min.js",    done: true },
		'chatcolor':  { active: 1, rank: -1, url: "https://resources.pink.horse/js/module_chatcolor.min.js",  done: true },
		'colormap':   { active: 1, rank: -1, url: "https://resources.pink.horse/js/module_colormap.min.js",   done: true },
		'unimoji':    { active: 1, rank: -1, url: "https://resources.pink.horse/js/module_unimoji.min.js",    done: true },
		'dectalk':    { active: 1, rank: -1, url: "https://resources.pink.horse/js/module_tts.min.js",        done: true },
		'hotkeys':    { active: 1, rank: -1, url: "https://resources.pink.horse/js/module_hotkeys.min.js",    done: true },
		'layout':     { active: 1, rank: -1, url: "https://resources.pink.horse/js/module_layout.min.js",     done: true },
		'various':    { active: 1, rank: -1, url: "https://resources.pink.horse/js/module_various.min.js",    done: true },
		'embedmedia': { active: 1, rank: -1, url: "https://resources.pink.horse/js/module_embedmedia.min.js", done: true },
		'chaticons':  { active: 0, rank: -1, url: "https://resources.pink.horse/js/module_chaticons.min.js",  done: true },
		'ci_library': { active: 0, rank: -1, url: "https://resources.pink.horse/js/library_chaticons.min.js", done: true, cache: false },

		'AvtrClient': { active: 1, rank: -1, url: "https://resources.pink.horse/js/AvatarClient.min.js",      done: true },

		'fancysheet': { active: 1, rank: -1, url: "https://resources.pink.horse/js/custom_fancysheet.min.js", done: true },
		'customcode': { active: 1, rank: -1, url: "https://resources.pink.horse/js/custom_mlpa.min.js",       done: true, cache: false },

		'time':       { active: 1, rank: -1, url: "https://resources.pink.horse/js/module_time.min.js",       done: true },
		'search':     { active: 0, rank: -1, url: "https://resources.pink.horse/js/module_search.min.js",     done: true },

		'snow':       { active: 0, rank:  1, url: "https://resources.pink.horse/oldjs/snowstorm_loader.js",         done: true },

	},
	/*
	** You generally don't need to touch anything below
	*/
	getScript: function(url, success, cache = true){
		return jQuery.ajax({ url, cache, success, type: 'GET', dataType: 'script' });
	},
	initialize: function(){
		if(CLIENT.modules){ return }else{ CLIENT.modules = this }

		// Backwards compat
		window[CHANNEL.name].modulesOptions = this.options;

		console.info('[XaeModule]', 'Begin Loading.');

		this.index = Object.keys(this.modules);
		this.sequencerLoader();

		this.cache = false;
	},
	sequencerLoader : function (){
		// After first run we curry the previous modules postload hook (the "done")
		// This is mainly used to invoke a cleanup/settings function to 
		//   reassign variables in modules/scripts that don't use module options
		if(this.state.prev){
			setTimeout(this.modules[this.state.prev].done, 0)
			this.state.prev = "";
		}

		if(this.state.pos >= this.index.length){
			return console.info('[XaeModule]', 'Loading Complete.');
		}

		var currKey = this.index[this.state.pos];
		if(this.state.pos < this.index.length){
			if(this.modules[currKey].active){
				if(this.modules[currKey].rank <= CLIENT.rank){
					console.info('[XaeModule]', 'Loading:', currKey);
					this.state.prev = currKey;
					this.state.pos++;
					let cache = typeof this.modules[currKey].cache == 'undefined' ? this.cache : this.modules[currKey].cache;
					this.getScript(this.modules[currKey].url, this.sequencerLoader.bind(this), cache)
				} else {
					if(this.modules[currKey].rank === 0 && CLIENT.rank === -1){
						(function(module){
							socket.once('login', (data)=>{
								if(data.success){
									this.getScript(module.url, false, this.cache);
								}
							});
						})(this.modules[currKey])
					}
					this.state.pos++;
					this.sequencerLoader()
				}
			} else {
				this.state.pos++;
				this.sequencerLoader()
			}
		}
	},
	state: { prev: '', pos: 0 },
}).initialize();

// End of External Script
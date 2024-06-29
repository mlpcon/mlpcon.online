/* copied from https://github.com/mlpcon/mlpcon.online/blob/master/js/cytube/resources.pink.horse/custom_mlpa.js */

function playSound(url, vol){
	console.log('Transmutor playing sound')

	const sound = new Audio(url);
	sound.volume = vol;
	sound.play();
}

// Transmutor!
void function(transmutors){
	$("#messagebuffer").unbind("click.transmote");
	$("#messagebuffer").on("click.transmote","img.channel-emote",function(ev){
		function transmote(target, emote){
			var result = CHANNEL.emotes.filter((cv)=>{ return cv.name === emote });
			if(!result.length){ return console.error('Transmutor target not found') }
			$(target).attr('title', emote).attr('src', result.pop().image);
		}

		function morph(target, data){
			$(target)
				.attr('src', data.url)
				.attr('title', data.title)
				;
		}

		var subject = transmutors[$(this).attr("title")]; if(!subject){ return }
		Object.keys(subject).forEach((cv)=>{
			if(subject[cv]){
				switch(cv){
					case 'sound':
						return playSound(subject.sound.url, subject.sound.vol);
					case 'transmote':
						return transmote(this, subject.transmote);
					case 'morph':
						return morph(this, subject.morph);
					case 'custom':
						return subject.custom(this);
				}
			}
		})
	})
}({
	//':emote:' : { sound: { url: 'link', vol: 1.00 }, transmote: ':some.other.emote:', custom: function(target){ code; } },
	":numget:": { sound: { url: "https://mlpcon.online/audio/boowomp.mp3", vol: 1.00 } },
	":zigger:": { sound: { url: "https://mlpcon.online/audio/zigger.ogg", vol: 0.33 } },

	// ':feel:'      : { transmote: ':feelsgood:' },
	// ':feelsgood:' : { transmote: ':feel:'      },
	// ':what:'      : { transmote: ':good.show:' },
	// ':good.show:' : { transmote: ':what:'      },

	// ':hahahahahahahahaha:' : { sound: { url: 'https://resources.pink.horse/sounds/fenneko.ogg',             vol: 0.33 } },
	// ':twss:'               : { sound: { url: 'https://resources.pink.horse/sounds/thats.what.she.said.ogg', vol: 0.75 } },
	':laughingponywhores:' : { sound: { url: 'https://resources.pink.horse/sounds/pp.giggle.ogg',           vol: 0.33 } },
	':sadpinkie:'          : { sound: { url: 'https://resources.pink.horse/sounds/pp.oh.no.ogg',            vol: 0.33 } },
	':suspicious:'         : { sound: { url: 'https://resources.pink.horse/sounds/pp.suspicious.ogg',       vol: 0.33 } },
	':forever:'            : { sound: { url: 'https://resources.pink.horse/sounds/forever.ogg',             vol: 0.33 } },
	':books:'              : { sound: { url: 'https://resources.pink.horse/sounds/by.the.book.ogg',         vol: 0.33 } },
	':cry:'                : { sound: { url: 'https://resources.pink.horse/sounds/howcouldthishappen.ogg',  vol: 0.33 } },
	':wahaha:'             : { sound: { url: 'https://resources.pink.horse/sounds/wahahaha.ogg',            vol: 0.33 } },
	':ew.scoot:'           : { sound: { url: 'https://resources.pink.horse/sounds/ewwww.ogg',               vol: 0.33 } },
	':it.aint.me:'         : { sound: { url: 'https://resources.pink.horse/sounds/it.aint.me.ogg',          vol: 0.33 } },
	':feelsnoon:'          : { sound: { url: 'https://resources.pink.horse/sounds/high.noon.ogg',           vol: 0.33 } },
	':airhorn:'            : { sound: { url: 'https://resources.pink.horse/sounds/airhorn.mp3',             vol: 0.33 } },
	':squee:'              : { sound: { url: 'https://resources.pink.horse/sounds/squee.ogg',               vol: 0.33 } },
	':yay:'                : { sound: { url: 'https://resources.pink.horse/sounds/yay.ogg',                 vol: 0.33 } },
	':hoo:'                : { sound: { url: 'https://resources.pink.horse/sounds/hoo.ogg',                 vol: 0.33 } },
	':fun:'                : { sound: { url: 'https://resources.pink.horse/sounds/pp.fun.ogg',              vol: 0.42 } },
	':fakkyu:'             : { sound: { url: 'https://resources.pink.horse/sounds/fuckyou.opus',            vol: 0.42 } },
	':darling:'            : { sound: { url: 'https://resources.pink.horse/sounds/thankyoudarling.ogg',     vol: 0.42 } },

	':tree:'               : { sound: { url: 'https://xaekai.net/niggers.tree.ogg',                         vol: 0.88 } },


	// ':uguu:'               : { custom: ()=>{ window[CHANNEL.altName].uguu.play() } },

	// ':gmew:'               : { custom: (target)=>{
	// 	if($(target).attr('src').includes('wew')){
	// 		$(target).attr('src','https://resources.pink.horse/images/emotes/toriel.pie.png')
	// 	}else{
	// 		$(target).attr('src','https://resources.pink.horse/images/emotes/toriel.wew.png')
	// 	}
	// } },

	// ':awoo.shuffle:'       : { custom: (target)=>{
	// 	if($(target).attr('src').includes('back')){
	// 		$(target).attr('src','https://resources.pink.horse/images/emotes/momijidance.trans.gif')
	// 	}else{
	// 		$(target).attr('src','https://resources.pink.horse/images/emotes/momijidance.back.trans.gif')
	// 	}
	// } },


	':marestare:'          : { morph: { url: 'https://resources.pink.horse/images/emotes/maregaze.png', title: ':marestare:' } },
	// ':succ:'               : { morph: { url: 'https://resources.pink.horse/images/emotes/succ.super.png', title: 'ssucc?' } },
	// 'ssucc?'               : { transmote: ':succ:',  sound: { url: 'https://resources.pink.horse/sounds/succ.mp3', vol: 0.33 } },

	// ':chen:'     : { 
	// 	morph: { title: 'alpha chen', url: 'https://resources.pink.horse/images/emotes/chen2.gif' },
	// 	sound: { url: 'https://resources.pink.horse/sounds/chen.ogg', vol: 0.33 }
	// },
	// 'alpha chen' : {
	// 	morph: { title: 'omega chen', url:'https://resources.pink.horse/images/emotes/chen3.gif'},
	// 	sound: { url: 'https://resources.pink.horse/sounds/trainhorn-k5la.ogg', vol: 0.33 }
	// },
	// 'omega chen' : { 
	// 	transmote: ':chen:',
	// 	sound: { url: 'https://resources.pink.horse/sounds/ship.fog.horn.air.chime.ogg', vol: 0.33 }
	// },
});

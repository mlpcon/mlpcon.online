
$('#modflair').html(`M<span class="toggle-label">od </span>F<span class="toggle-label">lair</span>`)

setTimeout(function(){ $("#chatwrap").hide() }, 100)
setTimeout(function(){ $("#chatwrap").show() }, 600)

$("#chanexternalcss").insertBefore("#chancss");

window[CHANNEL.altName].clearChat = function(data) {
    var msgData = {
        time: Date.now(),
        username: 'MLP Anniversary Chat',
        msg: '<img class="image-embed-small" src="http://i.imgur.com/quajcnG.png">',
        meta: { shadow: false }
    };
    addChatMessage(msgData);
}
socket.on('clearchat', function(data){ window[CHANNEL.altName].clearChat(data) });





// Zizzy request
$("#chatline").trigger('registerCommand', ['boop', function(message){
    var parameters =  message.substring(1).replace(/boop\s/,'');
    socket.emit('chatMsg', { meta: {}, msg: `/me boops ${parameters} :mylove: ` });
}])




// -- Uguu is special --
this[CHANNEL.altName].uguu = {}
this[CHANNEL.altName].uguu.generate = function (){
    var base_url = "https://resources.pink.horse/sounds/uguu/"
    var choice = Math.floor(Math.random() * 85)+1;
    this.current = new Audio(base_url + 'uguu.' + (()=>{ if(choice < 10){ return ("0" + choice) } else return choice })() + '.ogg')
}
this[CHANNEL.altName].uguu.play = function(){ this.generate(); this.current.play() }


function playSound(url, vol){
    console.log('Transmutor playing sound')

    const sound = new Audio(url);
    sound.volume = vol;
    sound.play();

    //function setVol(snd, vol){ snd.volume = vol; return snd }
    //function genSound(url) { return  }
    //setVol(genSound(url), vol).play()
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
    ':feel:'      : { transmote: ':feelsgood:' },
    ':feelsgood:' : { transmote: ':feel:'      },
    ':what:'      : { transmote: ':good.show:' },
    ':good.show:' : { transmote: ':what:'      },

    ':hahahahahahahahaha:' : { sound: { url: 'https://resources.pink.horse/sounds/fenneko.ogg',             vol: 0.33 } },
    ':twss:'               : { sound: { url: 'https://resources.pink.horse/sounds/thats.what.she.said.ogg', vol: 0.75 } },
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


    ':uguu:'               : { custom: ()=>{ window[CHANNEL.altName].uguu.play() } },

    ':gmew:'               : { custom: (target)=>{
        if($(target).attr('src').includes('wew')){
            $(target).attr('src','https://resources.pink.horse/images/emotes/toriel.pie.png')
        }else{
            $(target).attr('src','https://resources.pink.horse/images/emotes/toriel.wew.png')
        }
    } },

    ':awoo.shuffle:'       : { custom: (target)=>{
        if($(target).attr('src').includes('back')){
            $(target).attr('src','https://resources.pink.horse/images/emotes/momijidance.trans.gif')
        }else{
            $(target).attr('src','https://resources.pink.horse/images/emotes/momijidance.back.trans.gif')
        }
    } },


    ':marestare:'          : { morph: { url: 'https://resources.pink.horse/images/emotes/maregaze.png', title: ':marestare:' } },
    ':succ:'               : { morph: { url: 'https://resources.pink.horse/images/emotes/succ.super.png', title: 'ssucc?' } },
    'ssucc?'               : { transmote: ':succ:',  sound: { url: 'https://resources.pink.horse/sounds/succ.mp3', vol: 0.33 } },

    ':chen:'     : { 
        morph: { title: 'alpha chen', url: 'https://resources.pink.horse/images/emotes/chen2.gif' },
        sound: { url: 'https://resources.pink.horse/sounds/chen.ogg', vol: 0.33 }
    },
    'alpha chen' : {
        morph: { title: 'omega chen', url:'https://resources.pink.horse/images/emotes/chen3.gif'},
        sound: { url: 'https://resources.pink.horse/sounds/trainhorn-k5la.ogg', vol: 0.33 }
    },
    'omega chen' : { 
        transmote: ':chen:',
        sound: { url: 'https://resources.pink.horse/sounds/ship.fog.horn.air.chime.ogg', vol: 0.33 }
    },
});


/*

$("#messagebuffer").unbind("click.transmote");
$("#messagebuffer").on("click.transmote","img.channel-emote",function(ev){
    switch($(this).attr("title")){

//        case '' : $(this).attr('title',"").attr('src',""); break;
//        case '' : $(this).attr('title',"").attr('src',""); break;

        case '/feel'     : $(this).attr('title',"/feelsgud").attr('src',"https://i.imgur.com/miFcyXz.png"); break;
        case '/feelsgud' : $(this).attr('title',"/feel").attr('src',"https://i.imgur.com/1MJdYMA.png"); break;

        case '/wakemeup'   : $(this).attr('title',"/cantwakeup").attr('src',"https://i.imgur.com/gAqA8PP.png"); break;
        case '/cantwakeup' : $(this).attr('title',"/wakemeup").attr('src',"https://i.imgur.com/rpFA4eT.png"); break;

        case '/go'     : $(this).attr('title',"/gigago").attr('src',"https://i.imgur.com/nA1oTnX.gif"); break;
        case '/gigago' : $(this).attr('title',"/go").attr('src',"https://i.imgur.com/aqhrV.gif"); break;

        case '/homo'  : $(this).attr('title',"/homo2").attr('src',"https://i.imgur.com/Ns8g8lB.gif"); break;
        case '/homo2' : $(this).attr('title',"/homo").attr('src',"https://i.imgur.com/vaQn3RC.gif"); break;

        case '/neverever'        : $(this).attr('title',"/neverfuckingever").attr('src',"https://i.imgur.com/X8wgq2k.png"); break;
        case '/neverfuckingever' : $(this).attr('title',"/neverever").attr('src',"https://i.imgur.com/MJnWGHV.png"); break;

        case '/burd' : $(this).attr('title',"/burd2").attr('src',"https://i.imgur.com/Hp3ypPj.gif"); break;
        case '/burd2' : $(this).attr('title',"/burd3").attr('src',"https://i.imgur.com/jSlcr.gif"); break;
        case '/burd3' : $(this).attr('title',"/burd").attr('src',"https://i.imgur.com/kQcjC.gif"); break;

        case '/aniki' : $(this).attr('title',"/aniki").attr('src',"http://i.imgur.com/VRE07P7.png"); break;

    }

})


*/



//if(typeof getGoogleDriveMetadata !== 'function'){
//    $('#messagebuffer').trigger('whisper', `[System] <span style="font-size: 1.4em" class='text-danger'> Please install the Google Drive userscript </span>`);
//    $('#messagebuffer').trigger('whisper', `[System] <a style="font-size: 1.4em" target='_blank' href='https://cytu.be/google_drive_userscript'>You may install it from here.</a>`);
//} else {
//
//}

//    if(2 > CLIENT.rank){
//        $('#messagebuffer').trigger('whisper', `[System] <span class='text-info'> Hey ${CLIENT.name || 'anon'}, try out Cinema Mode. </span><label>`);
//        $('#messagebuffer').trigger('whisper', `[System] <span id="cinemaPrompt" class="pointer label label-default">Engage Cinema Mode</span>`);
//        $('#cinemaPrompt').click(function(){
//            $("#cinematoggle").click();
//            $(this).parents('[class*=chat-msg]').remove();
//        })
//    }




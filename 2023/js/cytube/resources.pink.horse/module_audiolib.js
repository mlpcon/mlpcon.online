/*!
**|  Audio File Library for CyTube Scripts
**|  Written by Xaekai
**|
**@preserve
*/
if (!this[CHANNEL.altName].audioLibrary) {
    this[CHANNEL.altName].audioLibrary = {};
}
this[CHANNEL.altName].audioLibrary.sounds = {
    surprise:           { url: 'https://resources.pink.horse/sounds/surprise.ogg',                                emote: false, squee: true  },
    dayum:              { url: 'https://resources.pink.horse/sounds/dayum.ogg',                                   emote: false, squee: true  },
    airhorn:            { url: 'https://resources.pink.horse/sounds/airhorn.mp3',                                 emote: true,  squee: true  },
    blop:               { url: 'https://resources.pink.horse/sounds/blop.ogg',                                    emote: false, squee: true  },
    damnson:            { url: 'https://resources.pink.horse/sounds/damnson.ogg',                                 emote: true,  squee: true  },
    dog1:               { url: 'https://resources.pink.horse/sounds/dog1.ogg',                                    emote: true,  squee: true  },
    fairywand:          { url: 'https://resources.pink.horse/sounds/fairy_wand.ogg',                              emote: false, squee: true  },
    hankhill:           { url: 'https://resources.pink.horse/sounds/hankhill.ogg',                                emote: true,  squee: true  },
    hitmarker:          { url: 'https://resources.pink.horse/sounds/hitmarker.mp3',                               emote: true,  squee: false },
    howcould:           { url: 'https://resources.pink.horse/sounds/howcouldthishappen.ogg',                      emote: true,  squee: false },
    mcguirk:            { url: 'https://resources.pink.horse/sounds/mcguirk.ogg',                                 emote: true,  squee: true  },
    meatball:           { url: 'https://resources.pink.horse/sounds/hobo_meatball.ogg',                           emote: true,  squee: true  },
    nigga:              { url: 'https://resources.pink.horse/sounds/coming_for_you.ogg',                          emote: true,  squee: true  },
    present:            { url: 'https://resources.pink.horse/sounds/present4ya.ogg',                              emote: true,  squee: true  },
    raininside:         { url: 'https://resources.pink.horse/sounds/rain_inside.ogg',                             emote: false, squee: false },
    smokeweed:          { url: 'https://resources.pink.horse/sounds/smokeweed.ogg',                               emote: true,  squee: true  },
    icq2003_incomingim: { url: 'https://resources.pink.horse/sounds/ICQ2003_Message.wav',                         emote: false, squee: true  },
    icq2003_typing:     { url: 'https://resources.pink.horse/sounds/ICQ2003_MsgType.wav',                         emote: false, squee: true  },
    icq2008_incomingim: { url: 'https://resources.pink.horse/sounds/ICQ2008_IncomingIM.mp3',                      emote: false, squee: true  },
    icq2008_outgoingim: { url: 'https://resources.pink.horse/sounds/ICQ2008_OutgoingIM.mp3',                      emote: false, squee: true  },
    icq2008_typing:     { url: 'https://resources.pink.horse/sounds/ICQ2008_TypingIM.wav',                        emote: false, squee: true  },
    noscope:            { url: 'https://resources.pink.horse/sounds/get_noscoped.mp3',                            emote: true,  squee: true  },
    wahaha:             { url: 'https://resources.pink.horse/sounds/wahahaha.ogg',                                emote: true,  squee: true  },
    sandstorm:          { url: 'https://resources.pink.horse/sounds/Darude_-_Sandstorm.ogg',                      emote: true,  squee: false },
    ut_mousehole:       { url: 'https://resources.pink.horse/sounds/undertale_mousehole.ogg',                     emote: true,  squee: true  },
    votingpoll:         { url: 'https://resources.pink.horse/sounds/votingpoll.ogg',                              emote: true,  squee: true  },
    uhoh:               { url: 'https://resources.pink.horse/sounds/uhoh.ogg',                                    emote: true,  squee: true  },
    squish:             { url: 'https://resources.pink.horse/sounds/squish.ogg',                                  emote: true,  squee: true  },
    squee:              { url: 'https://resources.pink.horse/sounds/squee.ogg',                                   emote: true,  squee: true  }
};
this[CHANNEL.altName].audioLibrary.squees = function () {
    var keys = Object.keys(this[CHANNEL.altName].audioLibrary.sounds);
    var squees = {};
    for (var i = keys.length - 1; i >= 0; i--) {
        var soundObj = this[CHANNEL.altName].audioLibrary.sounds[keys[i]];
        if (soundObj.squee) {
            squees[keys[i]] = soundObj.url;
        }
    }
    return squees;
}();
this[CHANNEL.altName].audioLibrary.emotes = function () {
    var keys = Object.keys(this[CHANNEL.altName].audioLibrary.sounds);
    var emotes = {};
    for (var i = keys.length - 1; i >= 0; i--) {
        var soundObj = this[CHANNEL.altName].audioLibrary.sounds[keys[i]];
        if (soundObj.emote) {
            emotes[keys[i]] = new Audio(soundObj.url);
        }
    }
    return emotes;
}();

var targets = [
// phone numbers
    /[+-\/\.\)\(\d\s]{7,22}/,
// emails
    /([-\w\d\.]+?)(\s+\(?at\)?\s+|\s*@\s*|\s*([\[\]@]){3}\s*)([-\w\d\.]*?)\s*(dot|\.|\[dot\]|\[.\])\s*(\w+)/,
// skype usernames
    /skype([\s-]?username)?\s?(:|at|with)?\s?\"?\S{3,16}\"?/i
];

replacement_text = '[contact information hidden]'

var tid = setInterval( function () {

    var paragraphs = document.getElementsByTagName('p')

    for (var i = 0; i < paragraphs.length; i++) {

        for (var j = 0; j < targets.length; j++) {
            paragraphs[i].innerHTML = paragraphs[i].innerHTML.replace(targets[j], replacement_text);
        }
    }
    var paragraphs1 = document.getElementsByClassName("conversation-title-link");

    for (var i = 0; i < paragraphs1.length; i++) {
        for (var j = 0; j < targets.length; j++) {
            paragraphs1[i].innerHTML = paragraphs1[i].innerHTML.replace(targets[j], replacement_text);
        }
    }
    
    var unreadMessageTitles = document.getElementsByClassName("conversation-title-link-unread");

    for (var i = 0; i < unreadMessageTitles.length; i++) {
        for (var j = 0; j < targets.length; j++) {
            unreadMessageTitles[i].innerHTML = unreadMessageTitles[i].innerHTML.replace(targets[j], replacement_text);
        }
    }
    if ( document.readyState !== 'complete' && (paragraphs.length < 1 || paragraphs1.length < 1 || unreadMessageTitles.length)) return;
    clearInterval( tid );
}, 1 );

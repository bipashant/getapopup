$(document).ready(function(){
    changeZenDeskIcon();

    function changeZenDeskIcon(){
        var interval = setInterval(checkAndChangeIcon, 500);

        function checkAndChangeIcon() {
            if($("#launcher").length){
                if($("#launcher").contents().find("#Embed .Icon").length){
                    $("#launcher").contents().find("#Embed .Icon").html("<img class='chat-icon' src='https://raw.githubusercontent.com/bipashant/getapopup/master/logo-hd-25x25.png'/> ")
                }
                if($("#launcher").contents().find("#Embed .Icon--chat").length){
                    $("#launcher").contents().find("#Embed .Icon--chat").html("<img class='chat-icon' src='https://raw.githubusercontent.com/bipashant/getapopup/master/logo-hd-25x25.png'/> ")
                }
                $("#Embed span.label-3kk12").textContent = "Chat";
                $("#launcher").contents().find("body").append("<style>.wrapperMobile-1Ets2 {padding: 0.75rem !important;}.wrapper-AtBcr{padding: 0.80857rem 1.57143rem;}.u-textInheritColor, .label-3kk12{color: #fff !important;}</style>");
            }

        }
    }
});

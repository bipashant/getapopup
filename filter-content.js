$(document).ready(function(){

    var targets = [
        // phone numbers
        /[+-\/\.\)\(\d\s]{7,22}/,
        // emails
        /([-\w\d\.]+?)(\s+\(?at\)?\s+|\s*@\s*|\s*([\[\]@]){3}\s*)([-\w\d\.]*?)\s*(dot|\.|\[dot\]|\[.\])\s*(\w+)/,
        // skype usernames
        /skype([\s-]?username)?\s?(:|at|with)?\s?\"?\S{3,16}\"?/i
    ];

    replacement_text = '[contact information hidden]';


    if($("#new_message").length){
        $("#message_content").attr("name", "message_temp").attr("id", "message_temp");

        $('<textarea name="message[content]" id="message_content" class="text_area hide" style="overflow: hidden; overflow-wrap: break-word; resize: horizontal; height: 120px;"></textarea>').insertAfter("#message_temp");

        $("#message_temp").on('change keyup paste', function () {
            var userContent = $("#message_temp").val();
            for (var i = 0; i < targets.length; i++) {
                userContent = userContent.replace(targets[i], replacement_text);
            }
            $("#message_content").val(userContent);
        });
    }

    if($("#transaction-form").length){
        
        $("#message").attr("name", "message_temp").attr("id", "message_temp");

        $('<textarea name="message" id="message" class="text_area hide" style="overflow: hidden; overflow-wrap: break-word; resize: horizontal; height: 120px;"></textarea>').insertAfter("#message_temp");

        $("#message_temp").on('change keyup paste', function () {
            var userContent = $("#message_temp").val();
            for (var i = 0; i < targets.length; i++) {
                userContent = userContent.replace(targets[i], replacement_text);
            }
            $("#message").val(userContent);
        });
    }
    setTimeout(function(){ 
      $("a[href$='/infos/about']").remove();
      $("a[href$='/infos/how_to_use']").remove();
    }, 1000);
    
});

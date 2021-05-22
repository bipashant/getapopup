$(document).ready(function(){
    if($(".listing-details-container").length){
        $(".wrapper").css("background", "#eee");
        $(".listing-details-container .row").first().prependTo($(".listing-details-container").parent())
        $("<div class='row'><div id='shareBlock'></div></div>").appendTo($(".listing-details-container"))
       
        setInterval(function(){
            $(".listing-image-arrow-icon-container.right").click();
        }, 5000)

    }
});

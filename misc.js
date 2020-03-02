$(document).ready(function(){
   if($("#hero__hero__0").length == 0){
        // loading landing page css only in the marketplace. it is used to show the instagram thumbnail on the grid page view.
        $("head").append('<link href="https://rawcdn.githack.com/bipashant/getapopup/3682e83/landing-page.css" rel="stylesheet"/>');
    }
});

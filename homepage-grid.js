$(document).ready(function(){

    function customizeGrid() {
        $(".home-fluid-thumbnail-grid").css("visibility", "visible");
        $(".home-fluid-thumbnail-grid-item").each(function (index) {
            if (!$(this).hasClass("customized")) {
                $(".home-fluid-thumbnail-grid-author-avatar").remove();
                var title = $(this).find(".fluid-thumbnail-grid-image-title");
                var authorContainer = $(this).find(".home-fluid-thumbnail-grid-author");
                var authorLink = $(this).find(".home-fluid-thumbnail-grid-author-name");
                authorContainer.prepend(title);
                authorContainer.find(".info-container").prepend(authorLink);
                $(this).addClass("customized");
            }
        });
    }

    function addCityAndImages(){
        $(".home-fluid-thumbnail-grid-item").each(function (index) {
            if (!$(this).hasClass("details-customized")) {
                url = $(this).children().find("a").attr("href");
                listingContent = httpGet(url);
                city = fetchCity(listingContent).split(", ").reverse()[2];
                var priceTag = $(this).find(".fluid-thumbnail-grid-image-price-container");

                if($(this).find(".fluid-thumbnail-grid-image-price-container .city-label").length == 0){
                    priceTag.children().wrapAll("<div class='price-text'></div>")
                    priceTag.append("<div class='city-label icon-with-text-container'><i class='fas fa-map-marker-alt icon-part'></i> <div class='text-part'>"+ city +"</div></div>");
                }
                $(this).addClass("details-customized");
            }
        });
    }


    function fetchCity(content){
        return($(content).find("#origin_loc_google_address").val().trim());
    }

    function fetchThumbnails(content){
        thumbnails = [];
        console.log($(content).find(".page-content").html());
        // debugger;
        if($(content).find(".listing-image-thumbnail").length > 1){
            console.log("Has Images");
        }else{
            console.log("No Images");
        }
    }

    function fetchListingDetail(url){
        var content = httpGet(url);
        return content;
    }

    function httpGet(theUrl)
    {
        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false );
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    function ajaxText(url){

    }

    setInterval(customizeGrid, 1000);
    setInterval(addCityAndImages, 2000);

    if ($("#profile-listings-list").length) {
        // setInterval(customizePeopleGrid, 1000);
        setInterval(addCityAndImages, 1000);
    }
});

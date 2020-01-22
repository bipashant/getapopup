
$(document).ready(function(){
    if( $(".home-fluid-thumbnail-grid-narrow").length || $(".home-listings").length){
        listingData = {};
        $.get("https://api.myjson.com/bins/ihyt6", function(data, textStatus, jqXHR) {
            console.log(data);
            listingData = data;
        });

        if($(".home-fluid-thumbnail-grid-narrow").length){
            function customizeGrid() {
                if(JSON.stringify(listingData) != "{}"){
                    $(".home-fluid-thumbnail-grid").css("visibility", "visible");
                    $(".home-fluid-thumbnail-grid-item").each(function (index) {
                        if (!$(this).hasClass("customized")) {

                            $(".home-fluid-thumbnail-grid-author-avatar").remove();
                            $(".home-fluid-thumbnail-grid-author-name").remove();

                            var title = $(this).find(".fluid-thumbnail-grid-image-title");
                            var authorContainer = $(this).find(".home-fluid-thumbnail-grid-author");
                            var authorLink = $(this).find(".home-fluid-thumbnail-grid-author-name");
                            var priceTag = $(this).find(".fluid-thumbnail-grid-image-price-container");
                            var listingId = fetchListingId($(this).find(".fluid-thumbnail-grid-image-item-link").attr("href"));
                            var listingInfo = listingData[listingId];
                            priceTag.children().wrapAll("<div class='price-text'></div>");
                            locationDetails = listingInfo.location;
                            if(parseInt(listingInfo.squareFoot) > 0){
                                locationDetails += " | " +  listingInfo.squareFoot + " sf"
                            }

                            priceTag.prepend("<div class='city-label icon-with-text-container'><i class='fa fa-map-marker icon-part'></i> <div class='text-part'>"+ locationDetails +"</div></div>");

                            authorContainer.prepend(title);
                            authorContainer.append(priceTag);

                            authorContainer.find(".info-container").prepend(authorLink);
                            addImageSlider($(this), listingInfo.listingImages, listingId);
                            $(this).addClass("customized");
                        }
                    });
                }
            }

            function addImageSlider(elm, images, listingId){
                imageContainer = elm.find(".fluid-thumbnail-grid-image-image-container");
                imageContainer.empty();
                slideShowId = 'slideshow-' + listingId;
                $(images).each(function(){
                    imageContainer.append('<img class="'+ slideShowId +' fluid-thumbnail-grid-image-image" src="'+this+'">')
                });
                $('.' + slideShowId).not(":first").addClass('hide');
                $('.' + slideShowId).first().addClass('visible');

                if($(images).length > 1){
                    imageContainer.append('<a class="prev">&#10094;</a>');
                    imageContainer.append('<a class="next">&#10095;</a>');
                }
                imageContainer.attr("data-slideShowId", slideShowId);
            }


            setInterval(customizeGrid, 1000);


            $("body").on('click', '.next', function(e){
                e.preventDefault();
                showSlides($(this).parent(), 1);
            })

            $("body").on('click', '.prev', function(e){
                e.preventDefault();
                showSlides($(this).parent(), -1);
            })

            function showSlides(container, threshold) {
                var allImages = container.find("img");
                var visibleImage= container.find("img.visible");
                var visibleImageIndex = $('.'+ container.attr("data-slideshowid")).index(visibleImage);

                firstImageIndex = 0;
                lastImageIndex = allImages.length - 1;
                nextPosition = visibleImageIndex + threshold;

                if(nextPosition < firstImageIndex){
                    nextPosition = lastImageIndex; // selecting last image
                }

                if(nextPosition > lastImageIndex){
                    nextPosition = firstImageIndex; // selecting last image
                }
                $(visibleImage).removeClass("visible").addClass("hide");
                $(allImages[nextPosition]).removeClass("hide").addClass("visible");
            }
        }

        if($(".home-listings").length) {
            function customizeListView() {
                if(JSON.stringify(listingData) != "{}"){
                    $(".home-list-item").each(function (index) {
                        if (!$(this).hasClass("customized")) {
                            $(".home-fluid-thumbnail-grid-author-avatar").remove();
                            var url = $(this).children().find(".home-list-title a").attr("href");
                            var listingId = fetchListingId(url);
                            var listingInfo = listingData[listingId];
                            locationDetails = listingInfo.location;
                            if(parseInt(listingInfo.squareFoot) > 0){
                                locationDetails += " | " +  listingInfo.squareFoot + " sf"
                            }

                            cityLabel = "<div class='city-label icon-with-text-container'><i class='fa fa-map-marker icon-part'></i> <div class='text-part'>" + locationDetails + "</div></div>";
                            $(this).children().find(".home-list-price-mobile").append(cityLabel);
                            $(this).children().find(".home-list-avatar").append(cityLabel)
                            $(this).addClass("customized");
                        }
                    });
                }
            }

            setInterval(customizeListView, 1000);
        }

        function fetchListingId(url){
            var listingId = url.substring(
                url.lastIndexOf("/listings/") + 1,
                url.indexOf("-")
            ).replace("listings/", '').trim();

            return listingId;
        }
    }
});

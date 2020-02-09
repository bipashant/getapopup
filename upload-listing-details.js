
$(document).ready(function(){
    // Adding listing details to the https://api.myjson.com/bins/ihyt6


    // Deleting Listing author from listing details page
    if($(".listing-details-container").length){

        $(".col-4 .listing-author").parents(".row-with-divider").remove()

        existingData = {};
        $.get("https://api.myjson.com/bins/ihyt6", function(data, textStatus, jqXHR) {
            existingData = data;
            uploadListingDetails();
        });

        function uploadListingDetails(){
            if(JSON.stringify(existingData) != "{}"){
                $.ajax({
                    url:"https://api.myjson.com/bins/ihyt6",
                    type:"PUT",
                    data:JSON.stringify(currentListingData()),
                    contentType:"application/json; charset=utf-8",
                    dataType:"json",
                    success: function(data, textStatus, jqXHR){
                        console.log("Data Uploaded")
                    }
                });
            }

        }


        function currentListingData(){
            existingData[listingId()] = {
                listingImages: listingImages(),
                location: location(),
                squareFoot: squareFoot()
            }
            return existingData;
        }

        function listingId() {
            lId = $("#listing_id").val();
            if(lId == undefined){
                lId = fetchListingId();
            }
                return($("#listing_id").val());
        }

        function listingImages(){
            var listingImages = [];
            $(document).find(".listing-image-thumbnail").each(function(){
                listingImages.push($(this).attr("src").replace('/thumb/', '/medium/'));
            });
            return listingImages;
        }

        function location(){
            return($(document).find("#origin_loc_google_address").val().trim().split(", ").reverse()[2]);
        }

        function squareFoot(){
            var sqFootLabel = "What is the space size? (in sq. ft.):";
            var sqFootValue = '';
            $("b").each(function () {
                if($(this).text() == sqFootLabel){
                    sqFootValue = $(this).parent().html().replace('<b>'+ sqFootLabel + '</b>', '').trim()
                }
            });

            return sqFootValue;
        }

        function fetchListingId(){
            debugger;
            url = location.href;
            var listingId = url.substring(
                url.lastIndexOf("/listings/") + 1,
                url.indexOf("-")
            ).replace("listings/", '').trim();

            return listingId;
        }
    }
});

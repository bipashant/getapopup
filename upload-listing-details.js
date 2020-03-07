
$(document).ready(function(){
    // Adding listing details to the https://extendsclass.com/api/json-storage/bin/eebdfad
    var JSONBLOB_URL = 'https://extendsclass.com/api/json-storage/bin/eebdfad'

    // Deleting Listing author from listing details page
    if($(".listing-details-container").length){

        $(".col-4 .listing-author").parents(".row-with-divider").remove();
        uploadListingDetails();

        function uploadListingDetails(){
            listingData = {};
            listingData[listingId()] = currentListingData();
            const request = new XMLHttpRequest();
            request.open("PATCH", JSONBLOB_URL, true);
            request.setRequestHeader("Content-Type", 'application/json');
            request.setRequestHeader("Accept", 'application/json');
            request.send(JSON.stringify(listingData));
            request.onreadystatechange = function(){
                if(request.readyState==4 && request.status==200){
                    console.log("Data Uploaded");
                }
            };
        }

        function currentListingData(){
            return({
                listingImages: listingImages(),
                location: location(),
                squareFoot: squareFoot()
            })
        }

        function listingId() {
            var lId = fetchListingId();
            return(lId);
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
            url = window.location.href;
            var listingId = url.substring(
                url.lastIndexOf("/listings/") + 1,
                url.indexOf("-")
            ).replace("listings/", '').trim();

            return listingId;
        }
    }
});

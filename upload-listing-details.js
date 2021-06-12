
$(document).ready(function(){
    // Adding listing details to the https://json.extendsclass.com/bin/b237a7059dea
  
    // Deleting Listing author from listing details page
    if($(".listing-details-container").length){
  
        $(".col-4 .listing-author").parents(".row-with-divider").remove();
        uploadListingDetails();
  
        function uploadListingDetails(){
            listingData = {};
            listingData[listingId()] = currentListingData();
            debugger;
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
            var address = location();
            return({
                listingImages: listingImages(),
                squareFoot: squareFoot(),
                state:  address.state,
                city: address.city
            })
        }
  
        function listingId() {
            var lId = fetchListingId();
            return(lId);
        }
  
        function listingImages(){
            var listingImages = [];
            $(document).find(".listing-image-thumbnail").each(function(){
                listingImages.push($(this).attr("src").replace('https://user-assets.sharetribe.com/images/listing_images/images/', '').replace('/thumb/', '/medium/'));
            });
            return listingImages;
        }
  
        function location(){
            var address = $(document).find("#origin_loc_google_address").val() || $("#googlemap .map-link a").attr('href').split("?q=")[1].replaceAll("%2C", ",").replaceAll("+", " ");
            return getLocationDetail(address)         
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

        function getLocationDetail(address){
            let city , state;
            $.ajaxSetup({async: false});
            var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + GOOGLE_MAP_API;
            $.get(url, function(data, status){
                result = data.results[0]
                city = result.address_components.filter(function(addr){
                    return (addr.types[0]=='locality')?1:(addr.types[0]=='administrative_area_level_1')?1:0;
                });
                
                if(city){
                    city = city[0]["long_name"]
                }

                state =  result.address_components.filter(function(addr){
                    return (addr.types[0]=='administrative_area_level_1') ? 1 : (addr.types[0]=='administrative_area_level_1') ? 1 : 0;
                });
                if(state){
                    state = state[0]["long_name"]
                }
            })

            return({state: state, city: city})
            
        }
    }
  });

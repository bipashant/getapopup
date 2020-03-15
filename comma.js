$(document).ready(function() {
    if ($("#new_listing_form").length) {
        setTimeout(addCommaInPriceField, 1000);
        setTimeout(addCommaInSquareFootField, 1000);

        function addCommaInPriceField() {
            $("#listing_price").attr("name", "listing_price_temp").attr("id", "listing_price_temp");
            $('<input class="price-field" maxlength="10" placeholder="0" value="0" size="10" type="hidden" name="listing[price]" id="listing_price">').insertAfter("#listing_price_temp");
            $("#listing_price").val($("#listing_price_temp").val());
            $("#listing_price_temp").val(formatNumber($("#listing_price").val()));

            $("#listing_price_temp").on('keyup change paste', function(){
                var input = $(this).val().split(",").join("");
                var converted = formatNumber(input);
                $(this).val(converted);
                $("#listing_price").val(input);
            })
        }

        function addCommaInSquareFootField() {
            $("#custom_fields_118893").attr("name", "custom_fields_118893_temp").attr("id", "custom_fields_118893_temp");
            $('<input type="hidden" name="custom_fields[118893]" id="custom_fields_118893" value="" data-min="0" data-max="100000" class="required number-no-decimals">').insertAfter("#custom_fields_118893_temp");

            $("#custom_fields_118893").val($("#custom_fields_118893_temp").val());
            $("#custom_fields_118893_temp").val(formatNumber($("#custom_fields_118893_temp").val()));
            $("#custom_fields_118893_temp").removeClass("number-no-decimals");

            $("#custom_fields_118893_temp").on('keyup change paste', function(){
                var input = $(this).val().split(",").join("");
                var converted = formatNumber(input);
                $(this).val(converted);
                $("#custom_fields_118893").val(input);
            })
        }

        function formatNumber(x) {
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        }

        if($(".listing-details-container").length){
            var sqFootLabel = "What is the space size? (in sq. ft.):";
            var sqFootValue = '';
            $(".listing-details-container b").each(function () {
                if($(this).text() == sqFootLabel){
                    sqFootValue = $(this).parent().html().replace('<b>'+ sqFootLabel + '</b>', '').trim();
                    formattedSqFoot = formatNumber(sqFootValue);
                    $(this).parent().html('<b>'+ sqFootLabel + '</b> ' + formattedSqFoot);
                }
            });

        }
    }


});

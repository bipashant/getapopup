$(document).ready(function(){
    if($("#new_person").length){
        moveUserTypeToTop();

        hideWebsiteField();
        wrapWebsiteInDiv();

        initializeEmailRule();

        function moveUserTypeToTop(){
            var startElem = $(".signup-password").last();
            var endElem   = $("label[for='person_custom_fields_1']").parent().last();
            startElem.nextUntil(endElem).wrapAll("<div class='user-type-fields'></div>");
            $('.user-type-fields').insertBefore("label[for='person_email']");

            $("#person_custom_fields_0").change(function(){
                $("#person_email").focus();
                $("#person_custom_fields_0").focus();
                changeLabel();
            });
        }

        function wrapWebsiteInDiv(){
            $("#person_custom_fields_1").attr("placeholder", "yourcompany.com");

            var startElem = $(".signup-password").last();
            var endElem   = $(".inline-label-container").last();
            startElem.nextUntil(endElem).wrapAll("<div class='website-fields'></div>");
            $(".website-fields").insertBefore("label[for='person_email']");
        }

        function hideWebsiteField(){
            $("#person_custom_fields_1").hide();
            $("label[for='person_custom_fields_1']").parent().hide();
            removeRequiredValidationOnWebsite();
            removeValidationOnEmail()
        }

        function showWebsiteField(){
            $("#person_custom_fields_1").show();
            $("label[for='person_custom_fields_1']").parent().show();
            addRequiredValidationOnWebsite();
            addValidationOnEmail();
        }

        function changeLabel(){
            if($("#person_custom_fields_0 option:selected").text() == "Brand"){
                $("label[for='person_given_name']").text("Brand Name");
                $("#person_given_name").attr("placeholder", "ABC Group");
                showWebsiteField();
            }else{
                $("label[for='person_given_name']").text("Full Name");
                $("#person_given_name").attr("placeholder", "Alan E. Scott");
                hideWebsiteField();
            }
        }

        function addValidationOnEmail(){
            $("#person_email").rules("add", { companyEmail: true });
        }
        function removeValidationOnEmail(){
            $("#person_email").rules("remove", 'companyEmail');
        }
        function removeRequiredValidationOnWebsite(){
            $('#person_custom_fields_1').rules('add',  { required: false });
            $('#person_custom_fields_1').val("N/A");
        }
        function addRequiredValidationOnWebsite(){
            $('#person_custom_fields_1').rules('add',  { required: true });
            $('#person_custom_fields_1').val("");
        }

        function getDomain(website){
            if(website.indexOf("https://") >= 0 ){
                website = website.replace("https://", '');
            }

            if(website.indexOf("http://") >= 0){
                website = website.replace("http://", '');
            }

            if(website.indexOf("www.") >= 0){
                website = website.replace("www.", '');
            }


            domain = new URL('http://' + website).hostname;
            return domain;
        }
        function initializeEmailRule(){
            jQuery.validator.addMethod("companyEmail", function(value, element, params) {
                var valid = true;
                if($("#person_custom_fields_0 option:selected").text() == "Brand"){
                    var userEmail = $("#person_email").val();

                    var website   = $("#person_custom_fields_1").val();

                    if(website.length){
                        var hostname = getDomain(website);
                        hostname = hostname.replace('www.','');
                        if(userEmail.indexOf('@' + hostname) > 0){
                            valid = true;
                        }else{
                            valid = false;
                        }
                    }

                }
                return valid;
            }, jQuery.validator.format("As a brand, you're required to use your company email."));
        }
    }
});

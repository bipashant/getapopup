var commonEmailServices = ['@gmail', '@hotmail', '@yahoo', '@aol', '@me', '@icloud'];

$(document).ready(function(){
  if($("#new_person").length){
      moveUserTypeToTop();
      addValidation();

      function moveUserTypeToTop(){
        $("#person_custom_fields_0").prependTo("#new_person");
        $("label[for='person_custom_fields_0']").parent().prependTo("#new_person");

          $("#person_custom_fields_0").change(function(){
              $( "#person_email" ).focus();
              $( "#person_custom_fields_0" ).focus();
              changeLabel();
          });
      }


      function changeLabel(){
          if($("#person_custom_fields_0 option:selected").text() == "Brand"){
              $("label[for='person_given_name']").text("Brand Name")
              $("#person_given_name").attr("placeholder", "ABC Group")
          }else{
              $("label[for='person_given_name']").text("Full Name")
              $("#person_given_name").attr("placeholder", "Alan E. Scott")
          }
      }

      function addValidation(){

          jQuery.validator.addMethod("companyEmail", function(value, element, params) {
              var valid = true;
              if($("#person_custom_fields_0 option:selected").text() == "Brand"){
                  var userEmail = $("#person_email").val();
                  $(params).each(function(){
                      if(userEmail.indexOf(this.toString()) > 0){
                          valid = false;
                      }
                  })
              }
              return valid;
          }, jQuery.validator.format("As a brand you should use the company email."));

          $("#person_email").rules("add", { companyEmail: commonEmailServices });
      }
  }
});

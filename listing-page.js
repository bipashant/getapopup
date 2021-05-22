$(document).ready(function(){
  if($(".listing-details-container").length){
      $('body').addClass('listing-details-page')
      $(".wrapper").css("background", "#eee");
      $(".listing-details-container").parent();
      $(".listing-details-container .row").first().prependTo($(".listing-details-container").parent())
      var title = $('title').text();
      var url = window.location.href;
      $(".listing-details-container").append('<div id="shareBlock"></div>');
      $('#shareBlock').append('<button class="button" data-sharer="twitter" data-title="'+ title +'" data-hashtags="getapopup" data-url="'+ url +'">Share on Twitter</button>');
      $('#shareBlock').append('<button class="button" data-sharer="facebook" data-title="'+ title +'" data-hashtags="getapopup" data-url="'+ url +'">Share on Facebook</button>');
      $('#shareBlock').append('<button class="button" data-sharer="linkedin" data-url="'+ url+'">Share on Linkedin</button>');
      $('#shareBlock').append('<button class="button" data-sharer="email" data-title="'+ title +'" data-url="'+ url +'" data-subject="Hey! Check out that URL" data-to="">Share via Email</button>');
      $('#shareBlock').append('<button class="button" data-sharer="whatsapp" data-title="'+ title +'" data-url="'+ url +'">Share on Whatsapp</button>');

      window.Sharer.init();
      setInterval(function(){
          $(".listing-image-arrow-icon-container.right").click();
      }, 5000)
  }
});

$(document).ready(function(){
    if($("#hero__hero__0").length) {
        var instaImages = [
            {
                image: 'https://raw.githubusercontent.com/bipashant/getapopup/master/1.jpg',
                url: 'https://www.instagram.com/getapopup/'
            },
            {
                image: 'https://raw.githubusercontent.com/bipashant/getapopup/master/2.jpg',
                url: 'https://www.instagram.com/getapopup/'
            },
            {
                image: 'https://raw.githubusercontent.com/bipashant/getapopup/master/3.jpg',
                url: 'https://www.instagram.com/getapopup/'
            },
            {
                image: 'https://raw.githubusercontent.com/bipashant/getapopup/master/4.jpg',
                url: 'https://www.instagram.com/getapopup/'
            }
        ];

        instagramContent = "<section class='instagram-feeds listings__section listings__section--zebra' style=' '> <div class='listings__content'> <h1 class='listings__title'>Follow us on Instagram</h1> <div class='listings__listings'>";
        $(instaImages).each(function () {
            instagramContent += "<div class='instagram-feeds-images listings__listing'> <a href='" + this.url + "' target='_blank'> <div class='listings__listing-image'style='background-image: url(" + this.image + ")'></div><div style='width:100%;height:100%;' class='instafeed-overlay '></div></a></div>"
        });

        $(instagramContent).insertBefore($("footer"));

        $(document).on("mouseenter", ".instagram-feeds-images", function (e) {
            $(this).find(".instafeed-overlay").css('opacity', 1)
        });

        $(document).on("mouseleave", ".instagram-feeds-images", function (e) {
            $(this).find(".instafeed-overlay").css('opacity', 0)
        });
    };

});

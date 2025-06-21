jQuery(document).on(
  "ready",
  (function ($) {
    $(document).ready(function () {
      if ($("#bnr-slider-amma").length > 0) {
        $("#bnr-slider-amma").owlCarousel({
          screenLeft: true,
          loop: true,
          autoplay: true,
          //    slideSpeed : 3000,
          autoplaySpeed: 1500,
          autoplayTimeout: 5000,
          margin: 10,
          //center:true,
          nav: false,
          navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>',
          ],
          pagination: true,
          paginationSpeed: 400,
          responsive: {
            0: {
              items: 1,
            },
            600: {
              items: 1,
            },
            1000: {
              items: 1,
            },
          },
        });

        var dots = $("#bnr-slider-amma .owl-dots")
          .css("position", "absolute")
          .css("bottom", "5px");
        dots.css("left", "calc(50% - " + dots.width() / 2 + "px)");
      }
    });
  })(jQuery)
);

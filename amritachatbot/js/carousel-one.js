jQuery(document).on(
  "ready",
  (function ($) {
    $(document).ready(function () {
      if ($("#owl-demo-1").length > 0) {
        $("#owl-demo-1").owlCarousel({
          screenLeft: true,
          // loop: true,
          // autoplay:true,
          autoplayTimeout: 1000,
          margin: 10,
          // center:true,
          nav: false,
          dots: true,
          responsive: {
            0: {
              items: 1,
            },
            600: {
              items: 2,
            },
            1000: {
              items: 3,
            },
          },
        });
      }
    });
  })(jQuery)
);

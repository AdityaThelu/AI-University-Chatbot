jQuery(document).ready(function ($) {
  // what people sa slider
  if ($(".people-slider").length) {
    $(".people-slider").slick({
      centerMode: true,
      slidesToShow: 1,
      centerPadding: "22.5%",
      rows: 0,
      arrows: false,
      speed: 1200,
      autoplaySpeed: 1500,
      autoplay: true,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            centerPadding: 0,
            centerMode: false,
          },
        },
        {
          breakpoint: 540,
          settings: {
            centerPadding: 0,
            centerMode: false,
          },
        },
      ],
    });
  }

  // school programs tab
  if ($(".school-program .prm-tab-item").length) {
    function psinnerSameHeight() {
      $(".school-program .ps-inner").css("height", "auto");
      var elementHeights2 = $(".school-program .ps-inner")
        .map(function () {
          return $(this).height();
        })
        .get();
      var maxHeight2 = Math.max.apply(null, elementHeights2);
      $(".school-program .ps-inner").height(maxHeight2);
    }
    psinnerSameHeight();
    $(window).on("resize load", function () {
      psinnerSameHeight();
    });
    $(".school-program .prm-tab-item").not(".active-tab").hide();
    $(".school-program .prm-tab-links a").click(function (e) {
      e.preventDefault();
      if (!$(this).hasClass("active")) {
        $(".school-program .prm-tab-links a").removeClass("active");
        $(this).addClass("active");
        var tabID = $(this).attr("data-tab");
        $(".school-program .prm-tab-item")
          .not("#" + tabID)
          .hide();
        $("#" + tabID).fadeIn("slow");
        //  $('#'+tabID).find('.product-tab-slider').slick('setPosition');
        psinnerSameHeight();
      }
    });
    $(document).on("click", ".school-program .ps-mobile-toggler", function () {
      var tabItems = $(this).closest(".school-program");
      var getInner = $(this).siblings(".ps-inner");
      $(tabItems).find(".ps-inner").not(getInner).slideUp();
      $(tabItems)
        .find(".ps-inner")
        .not(getInner)
        .parent(".ps-item")
        .removeClass("visible");
      if ($(getInner).is(":visible")) {
        $(getInner).slideUp("fast");
        $(getInner).parent(".ps-item").removeClass("visible");
      } else {
        $(getInner).slideDown("fast");
        $(getInner).parent(".ps-item").addClass("visible");
        if ($("#ai1ec-calendar-view .ai1ec-posterboard-view").length) {
          $("#ai1ec-calendar-view .ai1ec-posterboard-view").slick(
            "setPosition"
          );
        }
      }
    });
  }

  //vertical tabs
  if ($(".verti-tab-block").length) {
    $(".verti-tab-item").not(".active-tab").hide();
    $(".verti-tab-item-link a").click(function (e) {
      e.preventDefault();
      var tabBlock = $(this).closest(".verti-tab-block");
      if (!$(this).hasClass("active")) {
        $(tabBlock).find(".verti-tab-item-link a").removeClass("active");
        $(this).addClass("active");
        var tabID = $(this).attr("data-tab");
        $(tabBlock)
          .find(".verti-tab-item")
          .not("#" + tabID)
          .hide();
        $("#" + tabID).fadeIn("slow");
      }
    });
    $(document).on("click", ".verti-tab-block .ps-mobile-toggler", function () {
      var getItem = $(this).closest(".verti-tab-item");
      $(getItem).toggleClass("active-tab");
    });
  }

  //tab block
  if ($(".tab-block:not(.curriculum-sec)").length) {
    //  alert('tab found not curriculum');
    function psinnerSameHeight() {
      $(".tab-block:not(.curriculum-sec)").each(function () {
        getPSInner = $(this).find(".ps-inner");
        $(getPSInner).css("height", "auto");
        let elementHeights2 = $(getPSInner)
          .map(function () {
            return $(this).height();
          })
          .get();
        let maxHeight2 = Math.max.apply(null, elementHeights2);
        $(getPSInner).height(maxHeight2);
      });
    }

    // psinnerSameHeight();
    $(window).on("resize load", function () {
      psinnerSameHeight();
    });
    // $(".tab-block:not(.curriculum-sec) .prm-tab-item")
    //   .not(".active-tab")
    //   .hide();
    $(".tab-block:not(.curriculum-sec) .prm-tab-links a").click(function (e) {
      e.preventDefault();
      var tabBlock = $(this).closest(".tab-block");
      if (!$(this).hasClass("active")) {
        $(tabBlock).find(".prm-tab-links a").removeClass("active");
        $(this).addClass("active");
        var tabID = $(this).attr("data-tab");
        $(tabBlock)
          .find(".prm-tab-item")
          .not("#" + tabID)
          .hide().removeClass("active-tab");
        $("#" + tabID).fadeIn("slow").addClass("active-tab");
        //  $('#'+tabID).find('.product-tab-slider').slick('setPosition');
        psinnerSameHeight();
      }
    });

    $(document).on(
      "click",
      ".tab-block.faculty-bio-tab .ps-mobile-toggler",
      function () {
        var tabItems = $(this).closest(".tab-block");
        var getInner = $(this).siblings(".ps-inner");
        $(tabItems).find(".ps-inner").not(getInner).slideUp();
        $(tabItems)
          .find(".ps-inner")
          .not(getInner)
          .parent(".ps-item")
          .removeClass("visible");
        if ($(getInner).is(":visible")) {
          $(getInner).slideUp("fast");
          $(getInner).parent(".ps-item").removeClass("visible");
        } else {
          $(getInner).slideDown("fast");
          $(getInner).parent(".ps-item").addClass("visible");
          if ($("#ai1ec-calendar-view .ai1ec-posterboard-view").length) {
            $("#ai1ec-calendar-view .ai1ec-posterboard-view").slick(
              "setPosition"
            );
          }
        }
      }
    );

    $(document).on(
      "click",
      ".tab-block.adminblock .ps-mobile-toggler",
      function () {
        var tabItems = $(this).closest(".tab-block");
        var getInner = $(this).siblings(".ps-inner");
        $(tabItems).find(".ps-inner").not(getInner).slideUp();
        $(tabItems)
          .find(".ps-inner")
          .not(getInner)
          .parent(".ps-item")
          .removeClass("visible");
        if ($(getInner).is(":visible")) {
          $(getInner).slideUp("fast");
          $(getInner).parent(".ps-item").removeClass("visible");
        } else {
          $(getInner).slideDown("fast");
          $(getInner).parent(".ps-item").addClass("visible");
          if ($("#ai1ec-calendar-view .ai1ec-posterboard-view").length) {
            $("#ai1ec-calendar-view .ai1ec-posterboard-view").slick(
              "setPosition"
            );
          }
        }
      }
    );

    $(document).on(
      "click",
      ".tab-block.programs-landing-sec .ps-mobile-toggler",
      function () {
        var tabItems = $(this).closest(".tab-block");
        var getInner = $(this).siblings(".ps-inner");
        $(tabItems).find(".ps-inner").not(getInner).slideUp();
        $(tabItems)
          .find(".ps-inner")
          .not(getInner)
          .parent(".ps-item")
          .removeClass("visible");
        if ($(getInner).is(":visible")) {
          $(getInner).slideUp("fast");
          $(getInner).parent(".ps-item").removeClass("visible");
        } else {
          $(getInner).slideDown("fast");
          $(getInner).parent(".ps-item").addClass("visible");
          if ($("#ai1ec-calendar-view .ai1ec-posterboard-view").length) {
            $("#ai1ec-calendar-view .ai1ec-posterboard-view").slick(
              "setPosition"
            );
          }
        }
      }
    );
  }

  // curriculum scripts
  if ($(".curriculum-sec").length) {
    // alert('curriculum found');
    function psinnerSameHeight() {
      $(".curriculum-sec").each(function () {
        getPSInner = $(this).find(".ps-inner");
        $(getPSInner).css("height", "auto");
        let elementHeights2 = $(getPSInner)
          .map(function () {
            return $(this).height();
          })
          .get();
        // let maxHeight2 = Math.max.apply(null, elementHeights2);
        // if($(window).width()>991){
        //   $(getPSInner).height(maxHeight2);
        // }
      });
      if($(window).width()>991){
        $(".curriculum-sec .prm-tab-item").not(".active-tab").hide();
      }
    }
    // psinnerSameHeight();
    $(window).on("resize load", function () {
      psinnerSameHeight();
    });
    
    $(".curriculum-sec .prm-tab-links a").click(function (e) {
      e.preventDefault();
      var tabBlock = $(this).closest(".tab-block");
      if (!$(this).hasClass("active")) {
        $(tabBlock).find(".prm-tab-links a").removeClass("active");
        $(this).addClass("active");
        var tabID = $(this).attr("data-tab");
        $(tabBlock)
          .find(".prm-tab-item")
          .not("#" + tabID)
          .hide().removeClass("active-tab");
        $("#" + tabID).fadeIn("slow").addClass("active-tab");
        //  $('#'+tabID).find('.product-tab-slider').slick('setPosition');
        psinnerSameHeight();
      }
    });

    $(document).on("click", ".curriculum-sec .ps-inner-toggler", function () {
      var getInner = $(this).siblings(".ps-inner");
      $(".curriculum-sec .prm-tab-item").removeClass("active-tab");
      $(this).parent().parent().addClass("active-tab");
      $(".curriculum-sec .ps-inner").not(getInner).slideUp();
      $(".curriculum-sec .ps-inner")
        .not(getInner)
        .parent(".ps-item")
        .removeClass("visible");
      if ($(getInner).is(":visible")) {
        $(getInner).stop().slideUp("fast");
        $(getInner).parent(".ps-item").removeClass("visible");
      } else {
        $(getInner).stop().slideDown("fast");
        $(getInner).parent(".ps-item").addClass("visible");
      }
    });
  }

  if ($("#ptab-links").length) {
    $("#ptab-links").on("change", function () {
      var selectTabID = $(this).val();
      $(".prm-tab-item")
        .not("#" + selectTabID)
        .hide();
      $("#" + selectTabID).fadeIn("slow");
      $("#" + selectTabID)
        .find(".product-tab-slider")
        .slick("setPosition");
    });
  }

  // stream slider
  if ($(".stream-slider").length) {
    $(".stream-slider").each(function () {
      $(this).slick({
        dots: false,
        arrows: false,
        slidesPerRow: 4,
        rows: 2,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesPerRow: 3,
              rows: 2,
              dots: true,
            },
          },
          {
            breakpoint: 800,
            settings: {
              slidesPerRow: 3,
              rows: 1,
              dots: true,
            },
          },
          {
            breakpoint: 720,
            settings: {
              slidesPerRow: 2,
              rows: 1,
              dots: true,
            },
          },
          {
            breakpoint: 400,
            settings: {
              slidesPerRow: 1,
              rows: 1,
              dots: true,
            },
          },
        ],
      });
    });
  }

  /*-------- Logo slider ---------------*/
  if ($(".placement-logo-slider").length) {
    $(".placement-logo-slider").slick({
      dots: true,
      arrows: false,
      slidesToShow: 4,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }
  /*-------- Galery popup ---------------*/
  $(".image-gallery-block .res-gallery-item").magnificPopup({
    delegate: "a",
    type: "image",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
    },
    callbacks: {
      elementParse: function (item) {
        if (item.el[0].className == "yt-video") {
          (item.type = "iframe"),
            (item.iframe = {
              patterns: {
                youtube: {
                  index: "youtube.com/", // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                  id: "v=", // String that splits URL in a two parts, second part should be %id%
                  // Or null - full URL will be returned
                  // Or a function that should return %id%, for example:
                  // id: function(url) { return 'parsed id'; }

                  src: "//www.youtube.com/embed/%id%?autoplay=1", // URL that will be set as a source for iframe.
                },
              },
            });
        } else {
          (item.type = "image"),
            (item.tLoading = "Loading image #%curr%..."),
            (item.mainClass = "mfp-img-mobile"),
            (item.image = {
              tError:
                '<a href="%url%">The image #%curr%</a> could not be loaded.',
            });
        }
      },
    },
  });
  /*-------- Upcoming Events slider-------------*/
  $(".amr-event-slider").each(function () {
    $(this).slick({
      autoplay: true,
      infinite: true,
      dots: true,
      arrows: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      speed: 1000,
      appendDots: $(this).parents(".amr_events_block").find(".amr-event-dots"),
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  });
  /*-------- Testimonial slider -------------*/
  $(".testimonial-slider").slick({
    autoplay: true,
    infinite: true,
    dots: true,
    arrows: false,
    slidesToShow: 1,
    speed: 1000,
    slidesToScroll: 1,
    fade: true,
  });
});
/*-------- Iframe Popup - pdf openn curriculam -------------*/
$(document).ready(function () {
  $(".wp-block-ub-content-toggle-accordion-content-wrap a").magnificPopup({
    type: "iframe",
    disableOn: 720,
    callbacks: {
      open: function () {
        $("body, .mfp-iframe-holder").css("overflow", "hidden");
      },
      close: function () {
        $("body, .mfp-iframe-holder").css("overflow", "auto");
      },
    },
  });
});
/*  --------------Accordion block ------------------------ */
$(document).ready(function () {
  $(".doc-acco-toggler").on("click", function () {
    var getParent = $(this).parent(".doc-accordion-item"); // console.log(($(getParent).hasClass('active')));
    if ($(getParent).hasClass("active")) {
      $(this).parent().find(".doc-acco-content").slideUp();
      $(getParent).removeClass("active");
    } else {
      $(this).parent().find(".doc-acco-content").slideDown();
      $(getParent).addClass("active");
    }
  });
});
/*------------- Admission Blocks ----------------- */
// table responsive titles
$(
  ".single-program .product-row table tr:first-child td, .fee-rht-wrap table tr:nth-child(2) td"
).each(function () {
  var tdTitle = $(this).text();
  var index = $(this).index() + 1;
  $(this)
    .parent("tr")
    .nextAll()
    .find("td:not([colspan]):nth-child(" + index + ")")
    .attr("data-title", tdTitle);
});

if ($(".floating-nav").length) {
  $(".floating-nav").stickyNavbar();
}
$(".qeb-form-item input").focus(function () {
  $(this).parent(".qeb-form-item").addClass("focused");
});

$(".qeb-form-item input").blur(function () {
  var inputValue = $(this).val();
  if (inputValue == "") {
    $(this).parent(".qeb-form-item").removeClass("focused");
  }
});
//   $(document).on('click', '.ps-inner-toggler', function(){
//       var getInner = $(this).siblings('.ps-inner');
//       $('.ps-inner').not(getInner).slideUp();
//       $('.ps-inner').not(getInner).parent('.ps-item').removeClass('visible');
//       if($(getInner).is(':visible')){
//           $(getInner).slideUp('fast');
//           $(getInner).parent('.ps-item').removeClass('visible');
//       } else {
//           $(getInner).slideDown('fast');
//           $(getInner).parent('.ps-item').addClass('visible');
//       }
//   });
jQuery(document).ready(function ($) {
  //dual degree slider
  if ($(".dd-slider").length) {
    $(".dd-slider").slick({
      dots: false,
      arrows: false,
      autoplay: true,
      infinite: true,
      fade: true,
    });
  }
});

/*---------- Infrastructure facility block --------------*/
$(document).ready(function () {
  $(".facilities-slider").slick({
    dots: true,
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  var mfpOpen = true;
  // Set the flag using slick events
  $(".facilities-slider").on("beforeChange", function () {
    mfpOpen = false;
  });

  $(".facilities-slider").on("afterChange", function () {
    mfpOpen = true;
  });

  $(".infra-popup").on("click", function () {
    var getModal = $(this).attr("data-modal");
    if (mfpOpen) {
      $.magnificPopup.open({
        items: {
          src: "#" + getModal,
          type: "inline",
        },
      });
    }
  });
});
/* --------------------School home 2 --------------------- */
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[1];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
AOS.init({
  once: true,
});

jQuery(document).ready(function ($) {
  $(".newsfour").slick({
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    rows: 0,
    speed: 800,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $(".ayur-tab-item").not(".active-tab").hide();
  $(".ayur-tab-nav a").click(function (e) {
    e.preventDefault();
    if (!$(this).hasClass("active")) {
      var ayurParent = $(this).parents(".ayur-tab-sec");
      $(ayurParent).find(".ayur-tab-nav a").removeClass("active");
      $(this).addClass("active");
      var tabID = $(this).attr("href");
      $(ayurParent).find(".ayur-tab-item").not(tabID).hide();
      $(tabID).fadeIn("slow");
      //  $('#'+tabID).find('.product-tab-slider').slick('setPosition');
      //psinnerSameHeight();
    }
  });

  $(document).on("click", ".ayur-mobile-toggler a", function (e) {
    e.preventDefault();
    $(this).parents(".ayur-tab-item").find("ul").slideToggle();
    $(this).toggleClass("active-mobile-item");
  });

  $(".calendar-slider").slick({
    vertical: true,
    arrows: false,
    rows: 0,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 800,
    autoplay: true,
    infinite: false,
  });

  //added on july 9, 2020
  if ($("#wpadminbar").length) {
    var topPadding = 130;
  } else {
    var topPadding = 70;
  }
  if ($(".publications-outer.adminblock  .course-side-links").length) {
    var sidebar = new StickySidebar(".course-side-links", {
      topSpacing: topPadding,
      containerSelector: ".publications-outer .container",
      innerWrapperSelector: ".course-side-links",
      resizeSensor: true,
    });
    $(".course-side-links a").on("click", function (e) {
      e.preventDefault();
      var getBlock = $(this).attr("href");
      $("html, body").animate(
        { scrollTop: $(getBlock).offset().top - topPadding },
        800
      );
      $(".course-side-links").find("a").not($(this)).removeClass("active");
      $(this).addClass("active");
    });
  }
  if ($(".fc-image-slider").length) {
    $(".fc-image-slider").slick({
      dots: false,
      arrows: false,
      asNavFor: ".fc-text-slider",
      fade: true,
    });
    $(".fc-text-slider").slick({
      dots: false,
      arrows: true,
      appendArrows: ".slick-arrows",
      asNavFor: ".fc-image-slider",
      fade: true,
    });
  }
  if ($(".mnews-slider").length) {
    $(".mnews-slider").slick({
      arrows: false,
      dots: true,
      fade: true,
      autoplay: true,
    });
  }
});
$(".faculty-tab-blk .prm-tab-item").not(".active-tab").hide();
$(".faculty-tab-blk .prm-tab-links a").click(function (e) {
  e.preventDefault();
  if (!$(this).hasClass("active")) {
    $(".faculty-tab-blk .prm-tab-links a").removeClass("active");
    $(this).addClass("active");
    var tabID = $(this).attr("data-tab");
    $(".faculty-tab-blk .prm-tab-item")
      .not("#" + tabID)
      .hide();
    $("#" + tabID).fadeIn("slow");
    //  $('#'+tabID).find('.product-tab-slider').slick('setPosition');
    psinnerSameHeight();
  }
});

jQuery(document).ready(function ($) {
  $(".fac-items").slick({
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    rows: 0,
    speed: 800,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $(".testimonials-items").slick({
    arrows: true,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    fade: true,
  });
});

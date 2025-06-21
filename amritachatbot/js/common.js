// moved from footer.php -- 22 Aug 19
function CheckSlugValidity(slug) {
  return slug.indexOf(window.location.pathname) == 0;
}
//if(!CheckSlugValidity("/leadsquare-test")){ }
$(document).ready(function () {
  $(".preloader").fadeOut();
  var timeoutID = null;
  function findMember(str) {
    $.ajax({
      type: "POST",
      url: ajax_url,
      data: { action: "my_action", str: str },
      async: false,
      beforeSend: function () {
        $("#loading").css("display", "block");
        $(".srch-box .prm-sec").hide();
      },
      success: function (result) {
        if (result) {
          resdata = JSON.parse(result);
          //   $("section.thanks").slideDown();

          if (resdata.program == "") {
            $(".prm-sec").hide();
          } else {
            $(".prm-sec").show();
          }
          if (resdata.news == "") {
            $(".nws-sec.nwslist-outer").hide();
          } else {
            $(".nws-sec.nwslist-outer").show();
          }
          if (resdata.search == "") {
            $(".nws-sec.search-sec").hide();
          } else {
            $(".nws-sec.search-sec").show();
          }
          $(".prm-list").html(resdata.program).show();
          $(".nws-sec.nwslist-outer .nws-list").html(resdata.news).show();
          $(".nws-sec.search-sec .nws-list").html(resdata.search).show();
          $("#loading").css("display", "none");
        } else {
          // $(".srch-box #loading").hide();
          //   $("div.status", form).html(result).show();
          $("#loading").css("display", "none");
        }
        var srchurl = site_url + "/?s=" + str;
        $("a.prm-link").prop("href", srchurl);
      },
    });
  }
  $("#srch_input").keyup(function (e) {
    clearTimeout(timeoutID);
    $(".srch-box .prm-sec").hide();
    $(".srch-box .nws-sec").hide();
    $("#loading").css("display", "block");

    //timeoutID = setTimeout(findMember.bind(undefined, e.target.value), 1000);
    timeoutID = setTimeout(() => findMember(e.target.value), 1000);
  });
});

// campus header slider
if ($(".main-slider").length) {
  var slideWrapper = $(".main-slider"),
    iframes = slideWrapper.find(".embed-player"),
    lazyImages = slideWrapper.find(".slide-image"),
    lazyCounter = 0;

  // POST commands to YouTube or Vimeo API
  function postMessageToPlayer(player, command) {
    if (player == null || command == null) return;
    player.contentWindow.postMessage(JSON.stringify(command), "*");
  }

  // When the slide is changing
  function playPauseVideo(slick, control) {
    var currentSlide, slideType, startTime, player, video;

    currentSlide = slick.find(".slick-current");
    slideType = currentSlide.attr("class").split(" ")[1];
    player = currentSlide.find("iframe").get(0);
    startTime = currentSlide.data("video-start");

    if (slideType === "vimeo") {
      switch (control) {
        case "play":
          if (
            startTime != null &&
            startTime > 0 &&
            !currentSlide.hasClass("started")
          ) {
            currentSlide.addClass("started");
            postMessageToPlayer(player, {
              method: "setCurrentTime",
              value: startTime,
            });
          }
          postMessageToPlayer(player, {
            method: "play",
            value: 1,
          });
          break;
        case "pause":
          postMessageToPlayer(player, {
            method: "pause",
            value: 1,
          });
          break;
      }
    } else if (slideType === "youtube") {
      switch (control) {
        case "play":
          postMessageToPlayer(player, {
            event: "command",
            func: "mute",
          });
          postMessageToPlayer(player, {
            event: "command",
            func: "playVideo",
          });
          break;
        case "pause":
          postMessageToPlayer(player, {
            event: "command",
            func: "pauseVideo",
          });
          break;
      }
    } else if (slideType === "video") {
      video = currentSlide.children("video").get(0);
      if (video != null) {
        if (control === "play") {
          video.play();
        } else {
          video.pause();
        }
      }
    }
  }

  // Resize player
  function resizePlayer(iframes, ratio) {
    if (!iframes[0]) return;
    var win = $(".main-slider"),
      width = win.width(),
      playerWidth,
      height = win.height(),
      playerHeight,
      ratio = ratio || 16 / 9;

    iframes.each(function () {
      var current = $(this);
      if (width / ratio < height) {
        playerWidth = Math.ceil(height * ratio);
        current
          .width(playerWidth)
          .height(height)
          .css({
            left: (width - playerWidth) / 2,
            top: 0,
          });
      } else {
        playerHeight = Math.ceil(width / ratio);
        current
          .width(width)
          .height(playerHeight)
          .css({
            left: 0,
            top: (height - playerHeight) / 2,
          });
      }
    });
  }

  // DOM Ready
  $(function () {
    // Initialize
    slideWrapper.on("init", function (slick) {
      slick = $(slick.currentTarget);
      setTimeout(function () {
        playPauseVideo(slick, "play");
      }, 1000);
      resizePlayer(iframes, 16 / 9);
    });
    slideWrapper.on("beforeChange", function (event, slick) {
      slick = $(slick.$slider);
      playPauseVideo(slick, "pause");
    });
    slideWrapper.on("afterChange", function (event, slick) {
      slick = $(slick.$slider);
      playPauseVideo(slick, "play");
    });
    slideWrapper.on("lazyLoaded", function (event, slick, image, imageSource) {
      lazyCounter++;
      if (lazyCounter === lazyImages.length) {
        lazyImages.addClass("show");
        // slideWrapper.slick("slickPlay");
      }
    });

    //start the slider
    slideWrapper.slick({
      // fade:true,
      autoplaySpeed: 4000,
      lazyLoad: "progressive",
      speed: 1000,
      arrows: false,
      dots: true,
      //autoplay: true,
      cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)",
    });
  });

  // Resize event
  $(window).on("resize.slickVideoPlayer", function () {
    resizePlayer(iframes, 16 / 9);
  });
}
$(document).ready(function () {
  var ua = window.navigator.userAgent;
  var isIE = /MSIE|Trident/.test(ua);

  if (isIE) {
    //IE specific code goes here
    $("body").addClass("ie-browser");
  }

  // $('.search-toggler a').on('click', function(e){
  // 	e.preventDefault();
  // 	$(this).parents('.search-form-wrap').addClass('search-visible');
  // });
  // $(document).mouseup(function(e){
  //     var container = $(".search-form-wrap");

  //     // if the target of the click isn't the container nor a descendant of the container
  //     if (!container.is(e.target) && container.has(e.target).length === 0)
  //     {
  //         container.removeClass('search-visible');
  //     }
  // });

  $(document).on("click", ".menu-toggler", function (e) {
    e.preventDefault();
    $(".mobile-menu-wrap").fadeIn();
    $("body").addClass("overhide");
  });

  /* $(document).on('click', '.menu-dropdown>a', function (e) {
		e.preventDefault();
		var getLinkText = $(this).text();
		$(this).parent().find('.sub-menu').first().addClass('show-submenu');
		$('.mobile-menu-wrap').addClass('submenu-showing');
		$('.submenu-title').html(getLinkText);
	}); */

  $(document).on("click", ".drop-arrw", function (e) {
    e.preventDefault();
    var getLinkText = $(this).parent().text();
    $(this)
      .closest(".menu-dropdown")
      .find(".sub-menu")
      .first()
      .addClass("show-submenu");
    $(".mobile-menu-wrap").addClass("submenu-showing");
    $(".submenu-title").html(getLinkText);
    e.preventDefault();
  });

  $(document).on("click", ".close-mob-menu", function (e) {
    e.preventDefault();
    $("ul.show-submenu").removeClass("show-submenu");
    $(".mobile-menu-wrap").removeClass("submenu-showing");
    $(".mobile-menu-wrap").fadeOut();
    $("body").removeClass("overhide");
  });

  $(document).on("click", ".menu-mob-back", function (e) {
    e.preventDefault();
    $("ul.show-submenu:visible:last").removeClass("show-submenu");
    // console.log($('ul.show-submenu:visible:last'));
    // alert(($('ul.sub-menu.show-submenu').length));
    // alert((!$('ul.sub-menu.show-submenu').length));
    if (!$("ul.sub-menu.show-submenu").length) {
      $(".mobile-menu-wrap").removeClass("submenu-showing");
    } else {
      if ($("ul.sub-menu.show-submenu").length == 3) {
        var newTitle = $("ul.show-submenu")
          .closest(".menu-dropdown")
          .find("a")
          .first()
          .text();
        $(".submenu-title").html(newTitle);
      } else if ($("ul.sub-menu.show-submenu").length == 2) {
        var newTitle = $("ul.show-submenu:visible:last")
          .closest(".menu-dropdown")
          .find("a")
          .first()
          .text();
        $(".submenu-title").html(newTitle);
      } else {
        var newTitle = $("ul.show-submenu")
          .closest(".menu-dropdown")
          .find("a")
          .first()
          .text();
        $(".submenu-title").html(newTitle);
      }
    }
  });

  $(document).on("click", ".prog-list-toggler", function () {
    $(this).parent().find(".prog-list-content").fadeIn();
    $("body").addClass("overhide");
  });
  $(document).on("click", ".prog-close", function () {
    $(".prog-list-content").fadeOut();
    $("body").removeClass("overhide");
  });

  // explore video slider
  $(".sm-video-slider").slick({
    autoplay: true,
    infinite: false,
    dots: false,
    arrows: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      },
    ],
  });

  // ranking slider
  $(".ranking-slider").slick({
    autoplay: true,
    infinite: true,
    dots: true,
    arrows: false,
    slidesToShow: 1,
    speed: 1000,
    slidesToScroll: 1,
    appendDots: ".ranking-dots",
  });

  $(".video-pop").magnificPopup({
    disableOn: 0,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: true,
    fixedBgPos: true,
    callbacks: {
      open: function () {
        new YT.Player("player", {
          events: {
            onStateChange: onPlayerStateChange,
          },
        });
      },
    },
  });
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      $.magnificPopup.close();
    }
  }

  //sumoselect sample
  $(".top-select select").SumoSelect();
});

// Check distance to top and display back-to-top.
$(window).scroll(function () {
  if ($(this).scrollTop() > 800) {
    $(".back-to-top").addClass("show-back-to-top");
  } else {
    $(".back-to-top").removeClass("show-back-to-top");
  }
});

// Click event to scroll to top.
$(".back-to-top").click(function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, 800);
  return false;
});

$(window).load(function () {
  var s = skrollr.init({
    forceHeight: false,
  });

  if (s.isMobile()) {
    s.destroy();
  }
});

jQuery(function ($) {
  // Function which adds the 'animated' class to any '.animatable' in view
  var doAnimations = function () {
    // Calc current offset and get all animatables
    var offset = $(window).scrollTop() + $(window).height(),
      $animatables = $(".animatable");

    // Unbind scroll handler if we have no animatables
    if ($animatables.size() == 0) {
      $(window).off("scroll", doAnimations);
    }

    // Check all animatables and animate them if necessary
    $animatables.each(function (i) {
      var $animatable = $(this);
      if ($animatable.offset().top + $animatable.height() - 100 < offset) {
        $animatable.removeClass("animatable").addClass("animated");
      }
    });
  };

  // Hook doAnimations on scroll, and trigger a scroll
  $(window).on("scroll", doAnimations);
  $(window).trigger("scroll");

  $("#srch-btn").click(function (e) {
    e.preventDefault();
    $(".srch-box").toggleClass("show-searchbox");
    $("body").toggleClass("searching");
    $("header .srch-box input").focus();
  });
  $("html").click(function (event) {
    if ($(event.target).closest(".search-form-wrap").length === 0) {
      $(".srch-box").removeClass("show-searchbox");
      $("body").removeClass("searching");
    }
  });

  // campus scripts
  $(".header-slider").slick({
    arrows: false,
    dots: true,
    autoplay: true,
    speed: 1000,
  });
  $(".wp-block-uagb-section .int-desc").slick({
    arrows: false,
    dots: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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

  // department slider - better to load on respective pages only
  $(".facility-slider").slick({
    dots: false,
    arrows: true,
    speed: 1000,
    appendArrows: ".slick-arrows",
    nextArrow: '<span class="arrow-next">Next</span>',
    prevArrow: '<span class="arrow-prev">Prev</span>',
  });

  if ($(".top-select ul").length) {
    $(".top-select").each(function () {
      var getList = $(this).find("ul");
      new SimpleBar($(getList)[0]);
    });
  }

  if ($(".med-toggler").length) {
    $(document).on("click", ".med-toggler", function () {
      if ($(this).hasClass("active")) {
        $(".med-links").slideUp(function () {
          $(".med-toggler").removeClass("active");
        });
      } else {
        $(".med-links").slideDown();
        $(this).addClass("active");
      }
    });
  }
});

equalheight = (function (container) {
  var currentTallest = 0,
    currentRowStart = 0,
    rowDivs = new Array(),
    $el,
    topPosition = 0;
  $(container).each(function () {
    $el = $(this);
    $($el).height("auto");
    topPostion = $el.position().top;

    if (currentRowStart != topPostion) {
      for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
        rowDivs[currentDiv].height(currentTallest);
      }
      rowDivs.length = 0; // empty the array
      currentRowStart = topPostion;
      currentTallest = $el.height();
      rowDivs.push($el);
    } else {
      rowDivs.push($el);
      currentTallest =
        currentTallest < $el.height() ? $el.height() : currentTallest;
    }
    for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
      rowDivs[currentDiv].height(currentTallest);
    }
  });
})(
  // jQuery('#prg-srch-form').keydown(function(e) {
  //   var key = e.which;
  //   if (key == 13) {
  //      if((jQuery("#prg-srch").val()) == '' || ((jQuery("#prg-srch").val()) == undefined)){
  //       event.preventDefault();
  //         return false;
  //     }
  //   }
  // });
  //jQuery('#prg-srch').validate();

  (function ($) {
    // the sameHeight functions makes all the selected elements of the same height
    $.fn.sameHeight = function () {
      var selector = this;
      var heights = [];

      // Save the heights of every element into an array
      selector.each(function () {
        var height = $(this).height();
        heights.push(height);
      });

      // Get the biggest height
      var maxHeight = Math.max.apply(null, heights);
      // Show in the console to verify
      // console.log(heights,maxHeight);

      // Set the maxHeight to every selected element
      selector.each(function () {
        $(this).height(maxHeight);
      });
    };
  })(jQuery)
);

/*-------- Instagram slider -------------*/
//if ($(".insta-feed")[0]){
$(document).ready(function () {
  if ($(".insta-outer").length) {
    $(".insta-slider1").slick({
      dots: false,
      infinite: true,
      speed: 800,
      slidesToShow: 6,
      autoplay: true,
      swipeToSlide: true,
      arrows: false,
      // variableWidth: true,
      responsive: [
        {
          breakpoint: 2750,
          settings: {
            slidesToShow: 10,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 2400,
          settings: {
            slidesToShow: 9,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 2100,
          settings: {
            slidesToShow: 8,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1800,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          },
        },

        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 415,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }
});

function appendUTMParameters(url) {
  var urlParams = window.location.search;
  var separator = "";
  if (urlParams && urlParams.charAt(0) === "?") {
    // Remove the leading "?"
    urlParams = urlParams.slice(1);
    // Check if the URL already contains a query string
    var separator = url.includes("?") ? "&" : "?";
  }

  // Append UTM parameters to the URL
  var updatedUrl = url + separator + urlParams;
  updatedUrl = updatedUrl.replaceAll(/\s/g, "");
  return updatedUrl;
}

// UTM capture on Demo urls, only when added class "utmlink" to a tag.
function updateUtmLinkHref() {
  var utmLinks = document.querySelectorAll(".utmlink");

  // Loop through each element and update the href value
  utmLinks.forEach(function (link) {
    // Get the current href value
    var currentHref = link.getAttribute("href");

    // Append UTM parameters to the href value
    var updatedHref = appendUTMParameters(currentHref);

    // Update the href value of the link
    link.setAttribute("href", updatedHref);
  });
}

//   window.onload = function () {
// 	updateUtmLinkHref();
//   }

import jQuery from "jquery";
import "jquery.easing";
import Barba from "barba.js";
import mixitup from "mixitup";
import Waypoint from "waypoints/lib/noframework.waypoints.min";
import anime from 'animejs';

//Preloader
$(window).on("load", function() {
  var preloaderFadeOutTime = 1000;
  function hidePreloader() {
    var preloader = $(".spinner");
    preloader.fadeOut(preloaderFadeOutTime);
  }
  function fadeInTag() {
    var tagLine = $(".tagline");
    tagLine.fadeIn(3000);
  }
  hidePreloader();
  fadeInTag();
});


anime.timeline({ loop: true })
      .add({
        targets: ".ml8 .circle-white",
        scale: [0, 3],
        opacity: [1, 0],
        easing: "easeInOutExpo",
        rotateZ: 360,
        duration: 1100
      })
      .add({
        targets: ".ml8 .circle-container",
        scale: [0, 1],
        duration: 1100,
        easing: "easeInOutExpo",
        offset: "-=1000"
      })
      .add({
        targets: ".ml8 .circle-dark",
        scale: [0, 1],
        duration: 1100,
        easing: "easeOutExpo",
        offset: "-=600"
      })
      .add({
        targets: ".ml8 .letters-left",
        scale: [0, 1],
        duration: 1200,
        offset: "-=550"
      })
      .add({
        targets: ".ml8 .bang",
        scale: [0, 1],
        rotateZ: [45, 15],
        duration: 1200,
        offset: "-=1000"
      })
      .add({
        targets: ".ml8",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1400
      });

    anime({
      targets: ".ml8 .circle-dark-dashed",
      rotateZ: 360,
      duration: 8000,
      easing: "linear",
      loop: true
    });



$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
  if (
    location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
    location.hostname == this.hostname
  ) {
    var target = $(this.hash);
    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 60
        },
        1000,
        "easeInOutExpo"
      );
      return false;
    }
  }
});

/**
 * footer-reveal.js
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014 Iain Andrew
 * https://github.com/IainAndrew
 */

(function($) {
  $.fn.footerReveal = function(options) {
    var $this = $(this),
      $prev = $this.prev(),
      $win = $(window),
      defaults = $.extend(
        {
          shadow: true,
          shadowOpacity: 0.8,
          zIndex: -100
        },
        options
      ),
      settings = $.extend(true, {}, defaults, options);

    if (
      $this.outerHeight() <= $win.outerHeight() &&
      $this.offset().top >= $win.outerHeight()
    ) {
      $this.css({
        "z-index": defaults.zIndex,
        position: "fixed",
        bottom: 0
      });

      if (defaults.shadow) {
        $prev.css({
          "-moz-box-shadow":
            "0 20px 30px -20px rgba(0,0,0," + defaults.shadowOpacity + ")",
          "-webkit-box-shadow":
            "0 20px 30px -20px rgba(0,0,0," + defaults.shadowOpacity + ")",
          "box-shadow":
            "0 20px 30px -20px rgba(0,0,0," + defaults.shadowOpacity + ")"
        });
      }

      $win.on("load resize footerRevealResize", function() {
        $this.css({
          width: $prev.outerWidth()
        });
        $prev.css({
          "margin-bottom": $this.outerHeight()
        });
      });
    }

    return this;
  };
})(jQuery);

// $(".email-button").click(function() {
//   $(".envelope").toggleClass("active");
// });

$(function() {
  $("footer").footerReveal();
});

function createWaypoint(element, classToToggle, offset, cb) {
  return jQuery(element).waypoint(
    function(direction) {
      jQuery(element).toggleClass(classToToggle);
      if (typeof cb !== "undefined") {
        cb(element, classToToggle, offset, direction);
      }
    },
    {
      offset: offset
    }
  );
}

function waypointer(elementArray, classToToggle, offset, cb) {
  for (var i = 0; i < elementArray.length; i++) {
    createWaypoint(elementArray[i], classToToggle, offset, cb);
  }
  return true;
}

function createProjectGrid() {
  var viewport = window.innerHeight;
  var resizeTimer;
  var projects = $(".box").slice(1, -1);
  var numFitInViewport = Math.round(viewport / $(projects[0]).height());
  var currItemCount = 1;

  function updateCounter() {
    if (currItemCount >= 3) {
      currItemCount = 1;
    } else {
      currItemCount++;
    }
  }

  function gridInit() {
    var numVisible = 0;
    var rowCount = 0;
    var itemCount = 0;
    var i, x, oneFlag;
    if (isFinite(numFitInViewport)) {
      if (numFitInViewport == 1) {
        rowCount++;
        itemCount++;
      } else if (numFitInViewport == 2) {
        rowCount++;
        itemCount++;
      } else if (numFitInViewport > 2) {
        rowCount += 2;
        itemCount += 2;
        numVisible = (numFitInViewport - rowCount) * 3 + itemCount;
        for (x = 0; x < numVisible; x++) {
          $(projects[x]).addClass("visible-grid-item");
        }
        oneFlag = false;
        for (i = numVisible; i < projects.length; i++) {
          $(projects[i]).addClass("empty");
          if (currItemCount == 1) {
            createWaypoint(projects[i], null, "75%", displayProjects);
          }
          updateCounter();
        }
      }
    }
  }

  function displayProjects(element, classToToggle, offset, cb, direction) {
    element = $(element);
    $(element).removeClass("empty");
    setTimeout(function() {
      $(element)
        .next()
        .removeClass("empty");
    }, 250);
    setTimeout(function() {
      $(element)
        .next()
        .next()
        .removeClass("empty");
    }, 400);
    updateCounter();
  }
  gridInit();
  createProjectGrid();
}

$("document").ready(function() {
  "use strict";

  // cache DOM
  var navigation = document.querySelector(".barba-container .navigation");
  var navCheckbox = navigation.querySelector(".navigation__checkbox");
  var navItems = navigation.querySelectorAll(".navigation__item");
  navItems.forEach(item =>
    item.addEventListener("click", _ => (navCheckbox.checked = false))
  );
  // navItems.forEach(function (item) {
  //   return item.addEventListener("click", function (_) {
  //     return navCheckbox.checked = false;
  //   });

  Barba.Pjax.start();
  var transEffect = Barba.BaseTransition.extend({
    start: function() {
      this.newContainerLoading.then(val =>
        this.fadeInNewcontent($(this.newContainer))
      );
    },
    fadeInNewcontent: function(nc) {
      nc.hide();
      var _this = this;
      $(this.oldContainer)
        .fadeOut(1000)
        .promise()
        .done(() => {
          nc.css("visibility", "visible");
          nc.fadeIn(1000, function() {
            _this.done();
          });
        });
    }
  });
  Barba.Pjax.getTransition = function() {
    return transEffect;
  };

  mixitup(".container", {
    load: {
      filter: "all"
    },
    controls: {
      toggleLogic: "and"
    },
    classNames: {
      block: "button-bar",
      elementToggle: "toggle-btn",
      elementFilter: "filter-btn",
      elementSort: "sort-btn"
    },
    selectors: {
      target: ".mix-target"
    }
  });

  Barba.Pjax.cacheEnabled = true;
  Barba.Dispatcher.on("newPageReady", function() {
    (function() {
      if (window.localStorage) {
        if (!localStorage.getItem("firstLoad")) {
          localStorage["firstLoad"] = true;
          window.location.reload();
        } else localStorage.removeItem("firstLoad");
      }
    })();
  });
});

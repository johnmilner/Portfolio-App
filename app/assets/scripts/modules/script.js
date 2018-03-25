import jQuery from "jquery";
import "jquery.easing";
import Barba from "barba.js";
import mixitup from "mixitup";
import Waypoint from "waypoints/lib/noframework.waypoints.min";
//import anime from 'animejs';

//Preloader
$(window).on("load", function() {
  var preloaderFadeOutTime = 2500;
  function hidePreloader() {
    var preloader = $(".spinner");
    preloader.show(); //show preloader - see spinner css
    preloader.delay(2300).fadeOut(preloaderFadeOutTime);
  }
  // function fadeInNav() {
  //   var tagLine = $(".navigation");
  //   tagLine.delay(400).fadeIn(500);
  // }
  hidePreloader();
  //fadeInNav();
});


anime.timeline({ loop: false })
      .add({
        targets: ".ml8 .circle-white",
        scale: [0, 3],
        opacity: [1, 0],
        easing: "easeInOutExpo",
        rotateZ: 360,
        duration: 1100,
        delay: 1000
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
        duration: 2000,
        easing: "easeOutExpo",
        delay: 300
      }).add({
        targets: ".hamburger",
        opacity: 1,
        duration: 1000,
        easing: "easeInExpo"
        //delay: 500
      }).add({
        targets: ".box1",
        opacity: 1,
        duration: 1000,
        easing: "easeOutExpo"
        //delay: 500
      }).add({
        targets: ".footer",
        opacity: 1,
        duration: 1000,
        easing: "easeInExpo"
        //delay: 500
      });

    anime({
      targets: ".ml8 .circle-dark-dashed",
      rotateZ: 360,
      duration: 8000,
      easing: "linear",
      loop: true
    });

/**
 * demo3.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
{
	class MorphingBG {
		constructor(el) {
			this.DOM = {};
			this.DOM.el = el;
			this.DOM.paths = Array.from(this.DOM.el.querySelectorAll('path'));
			this.animate();
		}
		animate() {
			this.DOM.paths.forEach((path) => {
				setTimeout(() => {
					anime({
						targets: path,
						duration: anime.random(3000,5000),
						easing: [0.5,0,0.5,1],
						d: path.getAttribute('pathdata:id'),
						loop: true,
						direction: 'alternate'
					});
				}, anime.random(0,1000));
			});
		}
	};

	new MorphingBG(document.querySelector('svg.scene'));
};

/* Menu Overlay */
class ShapeOverlays {
  constructor(elm) {
    this.elm = elm;
    this.path = elm.querySelectorAll('path');
    this.numPoints = 4;
    this.duration = 1000;
    this.delayPointsArray = [];
    this.delayPointsMax = 0;
    this.delayPerPath = 60;
    this.timeStart = Date.now();
    this.isOpened = false;
    this.isAnimating = false;
  }
  toggle() {
    this.isAnimating = true;
    for (var i = 0; i < this.numPoints; i++) {
      this.delayPointsArray[i] = 0;
    }
    if (this.isOpened === false) {
      this.open();
    } else {
      this.close();
    }
  }
  open() {
    this.isOpened = true;
    this.elm.classList.add('is-opened');
    this.timeStart = Date.now();
    this.renderLoop();
  }
  close() {
    this.isOpened = false;
    this.elm.classList.remove('is-opened');
    this.timeStart = Date.now();
    this.renderLoop();
  }
  updatePath(time) {
    const points = [];
    for (var i = 0; i < this.numPoints; i++) {
      const thisEase = (i % 2 === 1) ? ease.sineOut : ease.exponentialInOut;
      points[i] = (1 - thisEase(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1))) * 100
    }

    let str = '';
    str += (this.isOpened) ? `M 0 0 H ${points[0]}` : `M ${points[0]} 0`;
    for (var i = 0; i < this.numPoints - 1; i++) {
      const p = (i + 1) / (this.numPoints - 1) * 100;
      const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
      str += `C ${points[i]} ${cp} ${points[i + 1]} ${cp} ${points[i + 1]} ${p} `;
    }
    str += (this.isOpened) ? `H 100 V 0` : `H 0 V 0`;
    return str;
  }
  render() {
    if (this.isOpened) {
      for (var i = 0; i < this.path.length; i++) {
        this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
      }
    } else {
      for (var i = 0; i < this.path.length; i++) {
        this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
      }
    }
  }
  renderLoop() {
    this.render();
    if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
      requestAnimationFrame(() => {
        this.renderLoop();
      });
    }
    else {
      this.isAnimating = false;
    }
  }
}
// these easing functions are based on the code of glsl-easing module.
// https://github.com/glslify/glsl-easings
//

const ease = {
  exponentialIn: (t) => {
    return t == 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
  },
  exponentialOut: (t) => {
    return t == 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
  },
  exponentialInOut: (t) => {
    return t == 0.0 || t == 1.0
      ? t
      : t < 0.5
        ? +0.5 * Math.pow(2.0, (20.0 * t) - 10.0)
        : -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0;
  },
  sineOut: (t) => {
    const HALF_PI = 1.5707963267948966;
    return Math.sin(t * HALF_PI);
  },
  circularInOut: (t) => {
    return t < 0.5
        ? 0.5 * (1.0 - Math.sqrt(1.0 - 4.0 * t * t))
        : 0.5 * (Math.sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
  },
  cubicIn: (t) => {
    return t * t * t;
  },
  cubicOut: (t) => {
    const f = t - 1.0;
    return f * f * f + 1.0;
  },
  cubicInOut: (t) => {
    return t < 0.5
      ? 4.0 * t * t * t
      : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
  },
  quadraticOut: (t) => {
    return -t * (t - 2.0);
  },
  quarticOut: (t) => {
    return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
  },
}

/* TA Begin */


var app = {};
app.menuVisible = false;
app.keyCodeESC = 27;
const elmOverlay = document.querySelector('.shape-overlays');
const overlay = new ShapeOverlays(elmOverlay);

$(function() {
  if ($("body").hasClass("portfolio") || $("body").hasClass("single-page")) app.loadAndFadeInCaseImages();

  // Top menu
  $('.menu').click(function(e) {
    e.preventDefault();
    !app.menuVisible ? app.revealMenu() : app.hideMenu();
  });

  // Hide nav if clicked outside of a menu alternative
  $('.nav').click(function(e) {
    app.hideMenu();
  });
  // Make sure that links don't close the menu
  $('.nav a').click(function(e) {
    e.stopPropagation();
  });

  // Listen to ESC, close menu if visible
  $(document).keyup(function(e) {
    if (e.keyCode == app.keyCodeESC) app.handleESCKey();
  });
});

app.loadAndFadeInCaseImages = function() {
  // Load background images
  $("[data-image]").each(function(i, elem) {
    var $elem = $(elem),
    url = "/images/portfolio/" + $elem.attr('data-image');
    if (url == null || url.length <= 0 ) { return; }

    $elem.addClass('image-loading');
    $('<img/>').attr('src', url).load(function() {
      $(this).remove();
      $bg = $('<div class="case-item-bg"/>');
      $bg.css( 'background-image', 'url(' + url + ')');

      $elem.prepend($bg);
      $elem
        .removeClass('image-loading')
        .addClass('image-ready');
    });
  });
}

app.handleESCKey = function() {
  $(document).trigger("pressed:ESC");
  if (app.menuVisible) app.hideMenu();
}

app.toggleMenuStates = function() {
  $('body').toggleClass('no-scroll');
  $('.menu').toggleClass('menu-active');
  $('.nav').toggleClass('nav-active');
}

app.revealMenu = function() {
  app.menuVisible = true;
  overlay.toggle();
  app.toggleMenuStates();
  
  anime({
    targets:'',
    scale: [0.2, 3],
    opacity: [0.2,1],
    easing: "easeInCubic",
    duration: 300
  });

  var containerDelay = 200;
  anime({
    targets:'.js-nav',
    opacity: [0, 1],
    delay: containerDelay,
    easing: "easeInOutExpo",
    duration: 200
  });

  var menuItemDelay = 90;
  containerDelay += 75;
  $(".js-nav-header").css("opacity", "0");
  anime({
    targets: ".js-nav-header",
    opacity: [0,1],
    delay: containerDelay,
    easing: "easeInOutExpo",
    duration: 200
  });

  $(".js-nav-header-line").css("transform", "scale(0.2)");
  anime({
    targets:'.js-nav-header-line',
    scaleX: [0.28, 1],
    delay: containerDelay,
    easing: "easeInOutExpo",
    duration: 600
  });
  containerDelay += 350;

  $(".js-nav-animate").each(function(i) {
    $(this).css({
      "opacity": "0",
      "transform" : "scale(0.9)"
    });
  });

  anime({
    targets: '.js-nav-animate',
    translateY: ["-7px", 0],
    scale: [0.9, 1],
    opacity: [0, 1],
    delay: function(el, i) {
      return containerDelay + menuItemDelay * (i+1)
    },
    duration: 1100,
    easing: "easeOutExpo",
    complete: function() {
      $(document).trigger("app:menuDidReveal");
    }
  });
}

app.hideMenu = function() {
  app.menuVisible = false;
  app.toggleMenuStates();
  overlay.toggle();
  $(document).trigger("app:menuWillHide");

  var containerDelay = 200;
  anime({
    targets: '.menu-animated-background',
    scale: [3,0],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 300
  });

  anime({
    targets:'.js-nav',
    opacity: [1, 0],
    easing: "easeInOutExpo",
    duration: 200
  });

  anime({
    targets:'.js-nav-header-line',
    scale: [1, 0.5],
    easing: "easeInExpo",
    duration: 300
  });

  anime({
    targets: '.js-nav-animate',
    translateY: "10px",
    scale: [1, 0.9],
    opacity: [1, 0],
    easing: "easeInExpo",
    duration: 200
  });
}

// Typically called by views that want to display something in the same 
// position of the menu icon
app.hideMenuIcon = function() {
  $(".menu").hide();
}

app.showMenuIcon = function() {
  $(".menu").show();  
}

/* TA End */

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
  // var navigation = document.querySelector(".barba-container .navigation");
  // var navCheckbox = navigation.querySelector(".navigation__checkbox");
  // var navItems = navigation.querySelectorAll(".navigation__item");
  // navItems.forEach(item =>
  //   item.addEventListener("click", _ => (navCheckbox.checked = false))
  // );
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

  mixitup("#mix-wrapper", {
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

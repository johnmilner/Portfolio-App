import jQuery from "jquery";
import "jquery.easing";
//import Barba from "barba.js";
import mixitup from "mixitup";
import Waypoint from "waypoints/lib/noframework.waypoints.min";

/*
 Preloader
*/
$(window).on("load", function() {
  var preloaderFadeOutTime = 2500;
  function hidePreloader() {
    var preloader = $(".spinner");
    preloader.show(); //show preloader - see spinner css
    preloader.delay(2300).fadeOut(preloaderFadeOutTime);
  }
  hidePreloader();  
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
        targets: ".menu",
        opacity: 1,
        duration: 500,
        easing: "easeInExpo"
        //delay: 500
      }).add({
        targets: ".header",
        opacity: 1,
        duration: 500,
        easing: "easeInExpo",
        delay: 250
      }).add({
        targets: ".btn-liquid",
        opacity: 1,
        duration: 500,
        easing: "easeInExpo",
        delay: 250
      }).add({
        targets: "footer",
        opacity: 1,
        duration: 500,
        easing: "easeInExpo",
        delay: 250
      });

    anime({
      targets: ".ml8 .circle-dark-dashed",
      rotateZ: 360,
      duration: 8000,
      easing: "linear",
      loop: true
    });

/*
 Preloader End
*/

/* 
Menu Overlay 
*/
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


/* 
Menu Overlay
*/
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
  //$('body').toggleClass('no-scroll');
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
      "transform" : "scale(0.9)",
      "padding-left" : "1px"
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

  $(".header").css({
    "overflow": "hidden"
  });
  $("#body-content-wrapper").css({
    "overflow": "hidden"
  });

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


const elmHamburger = document.querySelector('.menu');
const navItems = document.querySelectorAll('.nav-link');
const subNavItems = document.querySelectorAll('.nav-sublink');

  // //remove global menu items
  // function removeGlobalMenu() {
  //   for (var i = 0; i < navItems.length; i++) {
  //     navItems[i].classList.remove('js-nav-animate');
  //   }
  // }

//loop thru nav_sublinks listening for click, onclick close overlay, close hamburger menu
for (var i = 0; i < navItems.length; i++) {
  navItems[i].addEventListener('click', function(){
    //console.log('clicked!!');
    if (overlay.isAnimating) {
      return false;
    }
    app.hideMenu();   
  });
  
};

for (var i = 0; i < subNavItems.length; i++) {
  subNavItems[i].addEventListener('click', function(){
    //console.log('clicked!!');
    if (overlay.isAnimating) {
      return false;
    }
    app.hideMenu();   
  });
  
};

/* 
Menu Overlay End 
*/

$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
  if (
    location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
    location.hostname == this.hostname
  ) {
    var target = $(this.hash);
    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
    if (target.length) {
      $("html, body, .btn-liquid").animate(
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

  // Barba.Pjax.start();
  // var transEffect = Barba.BaseTransition.extend({
  //   start: function() {
  //     this.newContainerLoading.then(val =>
  //       this.fadeInNewcontent($(this.newContainer))
  //     );
  //   },
  //   fadeInNewcontent: function(nc) {
  //     nc.hide();
  //     var _this = this;
  //     $(this.oldContainer)
  //       .fadeOut(1000)
  //       .promise()
  //       .done(() => {
  //         nc.css("visibility", "visible");
  //         nc.fadeIn(1000, function() {
  //           _this.done();
  //         });
  //       });
  //   }
  // });
  // Barba.Pjax.getTransition = function() {
  //   return transEffect;
  // };

  mixitup("#mix-wrapper", {
    load: {
      filter: "all"
    },
    controls: {
      toggleLogic: "and"
    },
    animation: {
      effects: 'rotateY(-25deg)',
      perspectiveDistance: '2000px'
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

  // Barba.Pjax.cacheEnabled = true;
  // Barba.Dispatcher.on("newPageReady", function() {
  //   (function() {
  //     if (window.localStorage) {
  //       if (!localStorage.getItem("firstLoad")) {
  //         localStorage["firstLoad"] = true;
  //         window.location.reload();
  //       } else localStorage.removeItem("firstLoad");
  //     }
  //   })();
  //});

});

/* particle.js */

function createBg() {

var $weCreate = $('.create-particles');

        if ($weCreate.length > 0) {

            if ($('#we-create-particles').length == 0) {
                $weCreate.append('<div id="we-create-particles" class="we-create-particles"></div>');
            }
         
            var particleSize = 70;
            var particleAmount = 18;
            if ($(window).width() > 768) {
                particleSize = 100;
                particleAmount = 12;
            }

particlesJS("we-create-particles", {
  "particles": {
    "number": {
        "value": particleAmount,
        "density": {
            "enable": true,
            "value_area": 900
        }
    },
    "color": {
        "value": "#f99797"
    },
    "opacity": {
        "value": 1,
        "random": false,
        "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 1,
            "sync": false
        }
    },
    "size": {
        "value": particleSize,
        "random": true,
        "anim": {
            "enable": false,
            "speed": 4,
            "size_min": 50,
            "sync": false
        }
    },
    "line_linked": {
        "enable": false,
        "distance": 100,
        "color": "#ddf0f3",
        "opacity": 0.4,
        "width": 1
    },
    "move": {
        "enable": true,
        "speed": 0.8,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "bounce",
        "bounce": false,
        "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 600
        }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
        "onhover": {
            "enable": false,
            "mode": "bubble"
        },
        "onclick": {
            "enable": false,
            "mode": "repulse"
        },
        "resize": true
    },
    "modes": {
        "grab": {
            "distance": 400,
            "line_linked": {
                "opacity": 0
            }
        },
        "bubble": {
            "distance": 120,
            "size": 10,
            "duration": 7,
            "opacity": 1,
            "speed": 3
        },
        "repulse": {
            "distance": 40,
            "duration": 1.4
        },
        "push": {
            "particles_nb": 4
        },
        "remove": {
            "particles_nb": 2
        }
    }
  },
  "retina_detect": true
  });

  }
}

createBg();

/* particle.js end */

/* elastic button begin */

$(function() {
	// Vars
	let pointsA = [];
		let pointsB = [];
		let $canvas = null;
		let canvas = null;
		let context = null;
		let vars = null;
		let points = 8;
		let viscosity = 20;
		let mouseDist = 70;
		let damping = 0.05;
		let showIndicators = false;
    
    let mouseX = 0;
		let mouseY = 0;
		let relMouseX = 0;
		let relMouseY = 0;
		let mouseLastX = 0;
		let mouseLastY = 0;
		let mouseDirectionX = 0;
		let mouseDirectionY = 0;
		let mouseSpeedX = 0;
		let mouseSpeedY = 0;

	/**
	 * Get mouse direction
	 */
	function mouseDirection(e) {
		if (mouseX < e.pageX)
			mouseDirectionX = 1;
		else if (mouseX > e.pageX)
			mouseDirectionX = -1;
		else
			mouseDirectionX = 0;

		if (mouseY < e.pageY)
			mouseDirectionY = 1;
		else if (mouseY > e.pageY)
			mouseDirectionY = -1;
		else
			mouseDirectionY = 0;

		mouseX = e.pageX;
		mouseY = e.pageY;

		relMouseX = (mouseX - $canvas.offset().left);
		relMouseY = (mouseY - $canvas.offset().top);
	}
	$(document).on('mousemove', mouseDirection);

	/**
	 * Get mouse speed
	 */
	function mouseSpeed() {
		mouseSpeedX = mouseX - mouseLastX;
		mouseSpeedY = mouseY - mouseLastY;

		mouseLastX = mouseX;
		mouseLastY = mouseY;

		setTimeout(mouseSpeed, 50);
	}
	mouseSpeed();

	/**
	 * Init button
	 */
	function initButton() {
		// Get button
		var button = $('.btn-liquid');
		var buttonWidth = button.width();
		var buttonHeight = button.height();

		// Create canvas
		$canvas = $('<canvas></canvas>');
		button.append($canvas);

		canvas = $canvas.get(0);
		canvas.width = buttonWidth+100;
		canvas.height = buttonHeight+150;
		context = canvas.getContext('2d');

		// Add points

		var x = buttonHeight/2;
		for(var j = 1; j < points; j++) {
			addPoints((x+((buttonWidth-buttonHeight)/points)*j), 0);
		}
		addPoints(buttonWidth-buttonHeight/5, 0);
		addPoints(buttonWidth+buttonHeight/10, buttonHeight/2);
		addPoints(buttonWidth-buttonHeight/5, buttonHeight);
		for(var j = points-1; j > 0; j--) {
			addPoints((x+((buttonWidth-buttonHeight)/points)*j), buttonHeight);
		}
		addPoints(buttonHeight/5, buttonHeight);

		addPoints(-buttonHeight/10, buttonHeight/2);
		addPoints(buttonHeight/5, 0);
		// addPoints(x, 0);
		// addPoints(0, buttonHeight/2);

		// addPoints(0, buttonHeight/2);
		// addPoints(buttonHeight/4, 0);

		// Start render
		renderCanvas();
	}

	/**
	 * Add points
	 */
	function addPoints(x, y) {
		pointsA.push(new Point(x, y, 1));
		pointsB.push(new Point(x, y, 2));
	}

	/**
	 * Point
	 */
	function Point(x, y, level) {
	  this.x = this.ix = 50+x;
	  this.y = this.iy = 50+y;
	  this.vx = 0;
	  this.vy = 0;
	  this.cx1 = 0;
	  this.cy1 = 0;
	  this.cx2 = 0;
	  this.cy2 = 0;
	  this.level = level;
	}

	Point.prototype.move = function() {
		this.vx += (this.ix - this.x) / (viscosity*this.level);
		this.vy += (this.iy - this.y) / (viscosity*this.level);

		var dx = this.ix - relMouseX,
			dy = this.iy - relMouseY;
		var relDist = (1-Math.sqrt((dx * dx) + (dy * dy))/mouseDist);

		// Move x
		if ((mouseDirectionX > 0 && relMouseX > this.x) || (mouseDirectionX < 0 && relMouseX < this.x)) {
			if (relDist > 0 && relDist < 1) {
				this.vx = (mouseSpeedX / 4) * relDist;
			}
		}
		this.vx *= (1 - damping);
		this.x += this.vx;

		// Move y
		if ((mouseDirectionY > 0 && relMouseY > this.y) || (mouseDirectionY < 0 && relMouseY < this.y)) {
			if (relDist > 0 && relDist < 1) {
				this.vy = (mouseSpeedY / 4) * relDist;
			}
		}
		this.vy *= (1 - damping);
		this.y += this.vy;
	};


	/**
	 * Render canvas
	 */
	function renderCanvas() {
		// rAF
		let rafID = requestAnimationFrame(renderCanvas);

		// Clear scene
		context.clearRect(0, 0, $canvas.width(), $canvas.height());
		context.fillStyle = '#f7f7f7';
		context.fillRect(0, 0, $canvas.width(), $canvas.height());

		// Move points
		for (var i = 0; i <= pointsA.length - 1; i++) {
			pointsA[i].move();
			pointsB[i].move();
		}

		// Create dynamic gradient
		var gradientX = Math.min(Math.max(mouseX - $canvas.offset().left, 0), $canvas.width());
		var gradientY = Math.min(Math.max(mouseY - $canvas.offset().top, 0), $canvas.height());
		var distance = Math.sqrt(Math.pow(gradientX - $canvas.width()/2, 2) + Math.pow(gradientY - $canvas.height()/2, 2)) / Math.sqrt(Math.pow($canvas.width()/2, 2) + Math.pow($canvas.height()/2, 2));

		var gradient = context.createRadialGradient(gradientX, gradientY, 300+(300*distance), gradientX, gradientY, 0);
		gradient.addColorStop(0, '#102ce5');
		gradient.addColorStop(1, '#7bbefd');

		// Draw shapes
		var groups = [pointsA, pointsB]

		for (var j = 0; j <= 1; j++) {
			var points = groups[j];

			if (j == 0) {
				// Background style
				context.fillStyle = '#1CE2D8';
			} else {
				// Foreground style
				context.fillStyle = gradient;
			}

			context.beginPath();
			context.moveTo(points[0].x, points[0].y);

			for (var i = 0; i < points.length; i++) {
				var p = points[i];
				var nextP = points[i + 1];
				var val = 30*0.552284749831;

				if (nextP != undefined) {
					// if (nextP.ix > p.ix && nextP.iy < p.iy) {
					// 	p.cx1 = p.x;
					// 	p.cy1 = p.y-val;
					// 	p.cx2 = nextP.x-val;
					// 	p.cy2 = nextP.y;
					// } else if (nextP.ix > p.ix && nextP.iy > p.iy) {
					// 	p.cx1 = p.x+val;
					// 	p.cy1 = p.y;
					// 	p.cx2 = nextP.x;
					// 	p.cy2 = nextP.y-val;
					// }  else if (nextP.ix < p.ix && nextP.iy > p.iy) {
					// 	p.cx1 = p.x;
					// 	p.cy1 = p.y+val;
					// 	p.cx2 = nextP.x+val;
					// 	p.cy2 = nextP.y;
					// } else if (nextP.ix < p.ix && nextP.iy < p.iy) {
					// 	p.cx1 = p.x-val;
					// 	p.cy1 = p.y;
					// 	p.cx2 = nextP.x;
					// 	p.cy2 = nextP.y+val;
					// } else {

						p.cx1 = (p.x+nextP.x)/2;
						p.cy1 = (p.y+nextP.y)/2;
						p.cx2 = (p.x+nextP.x)/2;
						p.cy2 = (p.y+nextP.y)/2;

						context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
					// 	continue;
					// }

					// context.bezierCurveTo(p.cx1, p.cy1, p.cx2, p.cy2, nextP.x, nextP.y);
				} else {
nextP = points[0];
						p.cx1 = (p.x+nextP.x)/2;
						p.cy1 = (p.y+nextP.y)/2;

						context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
				}
			}

			// context.closePath();
			context.fill();
		}

		if (showIndicators) {
			// Draw points
			context.fillStyle = '#000';
			context.beginPath();
			for (var i = 0; i < pointsA.length; i++) {
				var p = pointsA[i];

				context.rect(p.x - 1, p.y - 1, 2, 2);
			}
			context.fill();

			// Draw controls
			context.fillStyle = '#f00';
			context.beginPath();
			for (var i = 0; i < pointsA.length; i++) {
				var p = pointsA[i];

				context.rect(p.cx1 - 1, p.cy1 - 1, 2, 2);
				context.rect(p.cx2 - 1, p.cy2 - 1, 2, 2);
			}
			context.fill();
		}
	}

	// Init
	initButton();
});

/* elastic button end */












  

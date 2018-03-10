import jQuery from 'jquery';
import 'jquery.easing';
import Waypoint from 'waypoints/lib/noframework.waypoints.min';
import Barba from 'barba.js';
import mixitup from 'mixitup';


function createWaypoint(element, classToToggle, offset, cb) {
  return jQuery(element).waypoint(function(direction) {
      jQuery(element).toggleClass(classToToggle);
      if (typeof cb !== "undefined") {
          cb(element, classToToggle, offset, direction);
      }
  }, {
      offset: offset
  });
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
  var projects = $('.box').slice(1, -1);
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
              numVisible = ((numFitInViewport - rowCount) * 3) + itemCount;
              for (x = 0; x < numVisible; x++) {
                  $(projects[x]).addClass('visible-grid-item');
              }
              oneFlag = false;
              for (i = numVisible; i < projects.length; i++) {
                  $(projects[i]).addClass('empty');
                  if (currItemCount == 1) {
                      createWaypoint(projects[i], null, '75%', displayProjects);
                  }
                  updateCounter();
              }
          }
      }
  }

  function displayProjects(element, classToToggle, offset, cb, direction) {
      element = $(element);
      $(element).removeClass('empty');
      setTimeout(function() {
          $(element).next().removeClass('empty');
      }, 250);
      setTimeout(function() {
          $(element).next().next().removeClass('empty');
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
      start: function(){
        this.newContainerLoading.then(val => this.fadeInNewcontent($(this.newContainer)));
      },
      fadeInNewcontent: function(nc) {
        nc.hide();
        var _this = this;
        $(this.oldContainer).fadeOut(1000).promise().done(() => {
          nc.css('visibility','visible');
          nc.fadeIn(1000, function(){
            _this.done();
          })
        });
      }
  });
  Barba.Pjax.getTransition = function() {
    return transEffect;
  }

  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
  if (
    location.pathname.replace(/^\//, "") ==
      this.pathname.replace(/^\//, "") &&
    location.hostname == this.hostname
  ) {
    var target = $(this.hash);
    target = target.length
      ? target
      : $("[name=" + this.hash.slice(1) + "]");
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

mixitup('.container', {
  load: {
  	filter: "all"
  },
  classNames: {
    block: 'button-bar',
    elementToggle: 'toggle-btn',
    elementFilter: 'filter-btn',
    elementSort: 'sort-btn'
  },
  selectors: {
    target: '.mix-target'
  }
});

  


  Barba.Pjax.cacheEnabled = true;
  Barba.Dispatcher.on("newPageReady", function() {
    (function()
    {
      if( window.localStorage )
      {
        if( !localStorage.getItem('firstLoad') )
        {
          localStorage['firstLoad'] = true;
          window.location.reload();
        }  
        else
          localStorage.removeItem('firstLoad');
      }
    })();
    
  });


  $(".email-button").click(function(){
    $(".envelope").toggleClass("active");
  });

  $(window).load(function() {
  $("body").removeClass("preload");
});

  
});
import jQuery from 'jquery';
import 'jquery.easing';
import '../../temp/scripts/modernizr';
import Waypoint from 'waypoints/lib/noframework.waypoints.min';

$(document).ready(function() {
    //Preloader
    $(window).on("load", function() {
    preloaderFadeOutTime = 10000;
    function hidePreloader() {
    var preloader = $('.spinner');
    preloader.fadeOut(preloaderFadeOutTime);
    }
    hidePreloader();
    });
});

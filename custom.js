/* custom.js */

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

window.onload = function() {

	fitVids('.video');

	var projects = document.getElementById('projects').getElementsByTagName('article');

	for(var i = 0, l = projects.length; i < l; i++) {
		var container = projects[i].getElementsByClassName('diaporama')[0].getElementsByClassName('swiper-container')[0];
		var swiper = new Swiper(container, {
			loop: true,
			observer: true,
			preloadImages: false, 
			lazyLoading: true,
			lazyLoadingInPrevNext: true,
			prevButton: container.getElementsByClassName('prev')[0],
			nextButton: container.getElementsByClassName('next')[0]
		});

		var description = projects[i].getElementsByClassName('description')[0];
		(function(description) {
			description.onclick = function(e) {
				description.classList.toggle('active');
			}
		})(description);
	}

	var about		  = document.getElementById('about'),
		toggleAbout   = document.getElementById('toggleAbout'),
		contact		  = document.getElementById('contact'),
		toggleContact = document.getElementById('toggleContact');

	toggleAbout.onclick = function() {
		about.classList.toggle('active');
	};

	toggleContact.onclick = function() {
		contact.classList.toggle('active');
	};

	document.getElementById('top').onclick = function() {
		scrollTo(0, 500, easing.easeInOutCubic, document.getElementById('projects'));
	}

	function scrollTo(Y, duration, easingFunction, elem, callback) {
    
	    var start = Date.now(),
	    	from = elem.scrollTop;

	    if(from === Y) {
	        callback();
	        return; /* Prevent scrolling to the Y point if already there */
	    }

	    function min(a,b) {
	    	return a<b?a:b;
	    }

	    function scroll(timestamp) {

	        var currentTime = Date.now(),
	            time = min(1, ((currentTime - start) / duration)),
	            easedT = easingFunction(time);

	        elem.scrollTop = (easedT * (Y - from)) + from;

	        if(time < 1) requestAnimationFrame(scroll);
	        else
	            if(callback) callback();
	    }

	    requestAnimationFrame(scroll)
	}

	/* bits and bytes of the scrollTo function inspired by the works of Benjamin DeCock */

	/*
	 * Easing Functions - inspired from http://gizma.com/easing/
	 * only considering the t value for the range [0, 1] => [0, 1]
	 */
	var easing = {
	  // no easing, no acceleration
	  linear: function (t) { return t },
	  // accelerating from zero velocity
	  easeInQuad: function (t) { return t*t },
	  // decelerating to zero velocity
	  easeOutQuad: function (t) { return t*(2-t) },
	  // acceleration until halfway, then deceleration
	  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
	  // accelerating from zero velocity 
	  easeInCubic: function (t) { return t*t*t },
	  // decelerating to zero velocity 
	  easeOutCubic: function (t) { return (--t)*t*t+1 },
	  // acceleration until halfway, then deceleration 
	  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
	  // accelerating from zero velocity 
	  easeInQuart: function (t) { return t*t*t*t },
	  // decelerating to zero velocity 
	  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
	  // acceleration until halfway, then deceleration
	  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
	  // accelerating from zero velocity
	  easeInQuint: function (t) { return t*t*t*t*t },
	  // decelerating to zero velocity
	  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
	  // acceleration until halfway, then deceleration 
	  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
	}
	
};
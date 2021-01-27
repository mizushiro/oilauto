'use strict';

//Polyfill
if (!Object.create) {
	Object.create = function (o) {
		if (arguments.length > 1) {
			throw new Error('Sorry the polyfill Object.create only accepts the first parameter.');
		}
		function F() {}
		F.prototype = o;
		return new F();
	};
}
if (!Array.indexOf){ 
	Array.prototype.indexOf = function(obj){ 
		for(var i=0; i<this.length; i++){ 
			if(this[i]==obj){ return i; } 
		} 
		return -1; 
	};
}
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback,thisArg) {
		var T,k;
		if(this === null) {
			throw new TypeError('error');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if(typeof callback !== "function"){
			throw new TypeError('error');
		}
		if(arguments.length > 1){
			T = thisArg;
		}
		k = 0;
		while(k < len){
			var kValue;
			if(k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
}
if (!Array.isArray) {
	Array.isArray = function(arg){
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}
if (!Object.keys){
	Object.keys = (function() {
		'use strict';
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({ toDtring : null }).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'varructor'
			],
			dontEnumsLength = dontEnums.length;
		
		return function(obj) {
			if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
				throw new TypeError('Object.keys called on non=object');
			}
			var result = [], prop, i;
			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}
			if (hasDontEnumBug) {
				for (i=0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}()); 
}

//utils module
;(function ($, win, doc, undefined) {

	'use strict';

	var global = '$plugins';
	var namespace = 'jipkok.plugins';
	
	//global namespace
	if (!!win[global]) {
		throw new Error("already exists global!> " + global);
	} else {
		win[global] = createNameSpace(namespace, {
			uiNameSpace: function (identifier, module) { 
				return createNameSpace(identifier, module); 
			}
		});
	}
	function createNameSpace(identifier, module) {
		var name = identifier.split('.'),
			w = win,
			p;

		if (!!identifier) {
			for (var i = 0, len = name.length; i < len; i += 1) {
				(!w[name[i]]) ? (i === 0) ? w[name[i]] = {} : w[name[i]] = {} : '';
				w = w[name[i]];
			}
		}

		if (!!module) {
			for (p in module) {
				if (!w[p]) {
					w[p] = module[p];
				} else {
					throw new Error("module already exists! >> " + p);
				}
			}
		}
		return w;
	}

	//jquery easing add
	var easings = {
		linear : function(t,b,c,d){return c*t/d+b;},
		easeInQuad : function(t,b,c,d){return c*(t/=d)*t+b;},
		easeOutQuad : function(t,b,c,d){return -c*(t/=d)*(t-2)+b;},
		easeInOutQuad : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return -c/2*((--t)*(t-2)-1)+b;},
		easeOutInQuad : function(t,b,c,d){if(t < d/2)return easings.easeOutQuad(t*2,b,c/2,d);return easings.easeInQuad((t*2)-d,b+c/2,c/2,d);},
		easeInCubic : function(t,b,c,d){return c*(t/=d)*t*t+b;},
		easeOutCubic : function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},
		easeInOutCubic : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},
		easeOutInCubic : function(t,b,c,d){if(t<d/2)return easings.easeOutCubic(t*2,b,c/2,d);return easings.easeInCubic((t*2)-d,b+c/2,c/2,d);},
		easeInQuart : function(t,b,c,d){return c*(t/=d)*t*t*t+b;},
		easeOutQuart : function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b;},
		easeInOutQuart : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return -c/2*((t-=2)*t*t*t-2)+b;},
		easeOutInQuart : function(t,b,c,d){if(t<d/2)return easings.easeOutQuart(t*2,b,c/2,d);return easings.easeInQuart((t*2)-d,b+c/2,c/2,d);},
		easeInQuint : function(t,b,c,d){return c*(t/=d)*t*t*t*t+b;},
		easeOutQuint : function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},
		easeInOutQuint : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},
		easeOutInQuint : function(t,b,c,d){if(t<d/2)return easings.easeOutQuint(t*2,b,c/2,d);return easings.easeInQuint((t*2)-d,b+c/2,c/2,d);},
		easeInSine : function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b;},
		easeOutSine : function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},
		easeInOutSine : function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b;},
		easeOutInSine : function(t,b,c,d){if(t<d/2)return easings.easeOutSine(t*2,b,c/2,d);return easings.easeInSine((t*2)-d,b+c/2,c/2,d);},
		easeInExpo : function(t,b,c,d){return (t===0)? b : c*Math.pow(2,10*(t/d-1))+b-c*0.001;},
		easeOutExpo : function(t,b,c,d){return (t==d)? b+c : c*1.001*(-Math.pow(2,-10*t/d)+1)+b;},
		easeInOutExpo : function(t,b,c,d){if(t===0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b-c*0.0005;return c/2*1.0005*(-Math.pow(2,-10*--t)+2)+b;},
		easeOutInExpo : function(t,b,c,d){if(t<d/2)return easings.easeOutExpo(t*2,b,c/2,d);return easings.easeInExpo((t*2)-d,b+c/2,c/2,d);},
		easeInCirc : function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;},
		easeOutCirc : function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},
		easeInOutCirc : function(t,b,c,d){if((t/=d/2)<1)return -c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},
		easeOutInCirc : function(t,b,c,d){if (t<d/2)return easings.easeOutCirc(t*2,b,c/2,d);return easings.easeInCirc((t*2)-d,b+c/2,c/2,d);},		
		easeInElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},
		easeOutElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return (a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b);},
		easeInOutElastic : function(t,b,c,d,a,p){if(t===0)return b;if((t/=d/2)==2)return b+c;var s,p=d*(.3*1.5),a=0;var s,p=(!p||typeof(p)!='number')? d*(.3*1.5) : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return -.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},
		easeOutInElastic : function(t,b,c,d,a,p){if (t<d/2)return easings.easeOutElastic(t*2,b,c/2,d,a,p);return easings.easeInElastic((t*2)-d,b+c/2,c/2,d,a,p);},
		easeInBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*(t/=d)*t*((s+1)*t-s)+b;},
		easeOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},
		easeInOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},
		easeOutInBack : function(t,b,c,d,s){if(t<d/2)return easings.easeOutBack(t*2,b,c/2,d,s);return easings.easeInBack((t*2)-d,b+c/2,c/2,d,s);},			
		easeInBounce : function(t,b,c,d){return c-easings.easeOutBounce(d-t,0,c,d)+b;},
		easeOutBounce : function(t,b,c,d){if((t/=d)<(1/2.75))return c*(7.5625*t*t)+b;else if(t<(2/2.75))return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;else if(t<(2.5/2.75))return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;else return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;},
		easeInOutBounce : function(t,b,c,d){if(t<d/2)return easings.easeInBounce(t*2,0,c,d)*.5+b;else return easings.easeOutBounce(t*2-d,0,c,d)*.5+c*.5+b;},
		easeOutInBounce : function(t,b,c,d){if(t<d/2)return easings.easeOutBounce(t*2,b,c/2,d);return easings.easeInBounce((t*2)-d,b+c/2,c/2,d);}
	};
	var easing;
	for (easing in easings) {
		$.easing[easing] = (function(easingname) {
			return function(x, t, b, c, d) {
				return easings[easingname](t, b, c, d);
			};
		})(easing);
	}

	//html5 tag & device size class 
	(function () {
		var devsize = [1920, 1600, 1440, 1280, 1024, 960, 840, 720, 600, 480, 400, 360];
		var html5tags = ['article', 'aside', 'details', 'figcaption', 'figure', 'footer', 'header', 'hgroup', 'nav', 'main', 'section', 'summary'];
		var width = $('html').outerWidth(),
			colClass = width >= devsize[5] ? 'col-12' : width > devsize[8] ? 'col-8' : 'col-4',
			i = 0,
			size_len = devsize.length,
			max = html5tags.length,
			sizeMode,
			timer;

		win[global].breakpoint = width >= devsize[5] ? true : false;

		var deviceSizeClassName = function(w) {
			for (var i = 0; i < size_len; i++) {
				if (w >= devsize[i]) {
					
					sizeMode = devsize[i];
					win[global].breakpoint = width >= devsize[5] ? true : false;
					break;
				} else {
					w < devsize[size_len - 1] ? sizeMode = 300 : '';
				}
			}
		};

		for (i = 0; i < max; i++) {
			doc.createElement(html5tags[i]);
		}

		deviceSizeClassName(width);
		var sizeCls = 's' + sizeMode;
		
		$()
		$('html').addClass(sizeCls).addClass(colClass);
		win.addEventListener('resize', function() {
			clearTimeout(timer);			
			timer = setTimeout(function () {
				var $html = $('html');
				
				width = win.innerWidth; 
				// document.body.offsetWidth === $(win).outerWidth()
				// win.innerWidth : scroll 포함된 width (+17px)
				// win.outerWidth === screen.availWidth 
				deviceSizeClassName(width);

				colClass = width >= devsize[5] ? 'col-12' : width > devsize[8] ? 'col-8' : 'col-4';
				$html.removeClass('s1920 s1600 s1440 s1280 s1024 s940 s840 s720 s600 s480 s400 s360 s300 col-12 col-8 col-4');
				win[global].breakpoint = width >= devsize[5] ? true : false;

				deviceSizeClassName(width);
				sizeCls = 's' + sizeMode;
				$html.addClass(sizeCls).addClass(colClass);
			}, 100);
		});
	})();

	//requestAnimationFrame
	win.requestAFrame = (function () {
		return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame ||
			//if all else fails, use setTimeout
			function (callback) {
				return win.setTimeout(callback, 1000 / 60); //shoot for 60 fp
			};
	})();
	win.cancelAFrame = (function () {
		return win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame ||
			function (id) {
				win.clearTimeout(id);
			};
	})();

	//components option 
	win[global].option = {
		pageName: function() {
			var page = document.URL.substring(document.URL.lastIndexOf("/") + 1),
				pagename = page.split('?');

			return pagename[0]
		},
		keys: { 
			'tab': 9, 'enter': 13, 'alt': 18, 'esc': 27, 'space': 32, 'pageup': 33, 'pagedown': 34, 'end': 35, 'home': 36, 'left': 37, 'up': 38, 'right': 39, 'down': 40
		},
		effect: {
			//http://cubic-bezier.com - css easing effect
			linear: '0.250, 0.250, 0.750, 0.750',
			ease: '0.250, 0.100, 0.250, 1.000',
			easeIn: '0.420, 0.000, 1.000, 1.000',
			easeOut: '0.000, 0.000, 0.580, 1.000',
			easeInOut: '0.420, 0.000, 0.580, 1.000',
			easeInQuad: '0.550, 0.085, 0.680, 0.530',
			easeInCubic: '0.550, 0.055, 0.675, 0.190',
			easeInQuart: '0.895, 0.030, 0.685, 0.220',
			easeInQuint: '0.755, 0.050, 0.855, 0.060',
			easeInSine: '0.470, 0.000, 0.745, 0.715',
			easeInExpo: '0.950, 0.050, 0.795, 0.035',
			easeInCirc: '0.600, 0.040, 0.980, 0.335',
			easeInBack: '0.600, -0.280, 0.735, 0.045',
			easeOutQuad: '0.250, 0.460, 0.450, 0.940',
			easeOutCubic: '0.215, 0.610, 0.355, 1.000',
			easeOutQuart: '0.165, 0.840, 0.440, 1.000',
			easeOutQuint: '0.230, 1.000, 0.320, 1.000',
			easeOutSine: '0.390, 0.575, 0.565, 1.000',
			easeOutExpo: '0.190, 1.000, 0.220, 1.000',
			easeOutCirc: '0.075, 0.820, 0.165, 1.000',
			easeOutBack: '0.175, 0.885, 0.320, 1.275',
			easeInOutQuad: '0.455, 0.030, 0.515, 0.955',
			easeInOutCubic: '0.645, 0.045, 0.355, 1.000',
			easeInOutQuart: '0.770, 0.000, 0.175, 1.000',
			easeInOutQuint: '0.860, 0.000, 0.070, 1.000',
			easeInOutSine: '0.445, 0.050, 0.550, 0.950',
			easeInOutExpo: '1.000, 0.000, 0.000, 1.000',
			easeInOutCirc: '0.785, 0.135, 0.150, 0.860',
			easeInOutBack: '0.680, -0.550, 0.265, 1.550'
		},
		uiComma: function(n){
			//숫자 세자리수마다 , 붙이기
			var parts = n.toString().split(".");

			return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
		},
		partsAdd0 :function(x) {
			//숫자 한자리수 일때 0 앞에 붙이기
			return Number(x) < 10 ? '0' + x : x;
		}
	};

	// set device information
	(function () {
		var ua = navigator.userAgent,
			ie = ua.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
			deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'],
			filter = "win16|win32|win64|mac|macintel",
			uAgent = ua.toLowerCase(),
			deviceInfo_len = deviceInfo.length;

		var browser = win[global].browser = {},
			support = win[global].support = {},
			i = 0,
			version,
			device;

		for (i = 0; i < deviceInfo_len; i++) {
			if (uAgent.match(deviceInfo[i]) != null) {
				device = deviceInfo[i];
				break;
			}
		}
		
		browser.local = (/^http:\/\//).test(location.href);
		browser.firefox = (/firefox/i).test(ua);
		browser.webkit = (/applewebkit/i).test(ua);
		browser.chrome = (/chrome/i).test(ua);
		browser.opera = (/opera/i).test(ua);
		browser.ios = (/ip(ad|hone|od)/i).test(ua);
		browser.android = (/android/i).test(ua);
		browser.safari = browser.webkit && !browser.chrome;
		browser.app = ua.indexOf('appname') > -1 ? true : false;

		//touch, mobile 환경 구분
		support.touch = browser.ios || browser.android || (doc.ontouchstart !== undefined && doc.ontouchstart !== null);
		browser.mobile = support.touch && ( browser.ios || browser.android);
		//navigator.platform ? filter.indexOf(navigator.platform.toLowerCase()) < 0 ? browser.mobile = false : browser.mobile = true : '';
		
		//false 삭제
		// for (j in browser) {
		// 	if (!browser[j]) {
		// 		delete browser[j]
		// 	}
		// }
		
		//os 구분
		browser.os = (navigator.appVersion).match(/(mac|win|linux)/i);
		browser.os = browser.os ? browser.os[1].toLowerCase() : '';

		//version 체크
		if (browser.ios || browser.android) {
			version = ua.match(/applewebkit\/([0-9.]+)/i);
			version && version.length > 1 ? browser.webkitversion = version[1] : '';
			if (browser.ios) {
				version = ua.match(/version\/([0-9.]+)/i);
				version && version.length > 1 ? browser.ios = version[1] : '';
			} else if (browser.android) {
				version = ua.match(/android ([0-9.]+)/i);
				version && version.length > 1 ? browser.android = parseInt(version[1].replace(/\./g, '')) : '';
			}
		}

		if (ie) {
			browser.ie = ie = parseInt( ie[1] || ie[2] );
			( 11 > ie ) ? support.pointerevents = false : '';
			( 9 > ie ) ? support.svgimage = false : '';
		} else {
			browser.ie = false;
		}

		var clsBrowser = browser.chrome ? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie ie' + browser.ie : 'other';
		var clsMobileSystem = browser.ios ? "ios" : browser.android ? "android" : 'etc';
		var clsMobile = browser.mobile ? browser.app ? 'ui-a ui-m' : 'ui-m' : 'ui-d';

		//doc.querySelector('html').classList.add(browser.os, clsBrowser, clsMobileSystem, clsMobile);
		$('html').addClass(browser.os);
		$('html').addClass(clsBrowser);
		$('html').addClass(clsMobileSystem);
		$('html').addClass(clsMobile);

	})();


	/* **************************************************************************************************** */
	/* **************************************************************************************************** */
	/* **************************************************************************************************** */
	/* **************************************************************************************************** */

	/* ------------------------
	 * [base] selector type
	 * date : 2020-06-09
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiSelectorType: function (v) {
			return createUiSelectorType(v);
		}
	});
	function createUiSelectorType(v) {
		var selector = $('body');
		if (v === null) {
			selector = $('body')
		} else {
			if (typeof v === 'string') {
				selector = $('#' + v);
			} else {
				selector = v;
			}
		}

		return selector;
	}

	/* ------------------------
	 * [base] loading
	 * date : 2020-06-09
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiLoading: function (opt) {
			return createUiLoading(opt);
		}
	});
	win[global].uiLoading.timerShow = {};
	win[global].uiLoading.timerHide = {};
	win[global].uiLoading.option = {
		id: null,
		visible: true,
		txt : null,
		styleClass : 'orbit' //time
	}
	function createUiLoading(opt) {
		var opt = $.extend(true, {}, win[global].uiLoading.option, opt);
		var id = opt.id;
		var styleClass = opt.styleClass;
		var loadingVisible = opt.visible;
		var txt = opt.txt;
		var	$selector = win[global].uiSelectorType(id);
		var htmlLoading = '';

		$('.ui-loading').not('.visible').remove();

		id === null ?
			htmlLoading += '<div class="ui-loading '+ styleClass +'">':
			htmlLoading += '<div class="ui-loading '+ styleClass +'" style="position:absolute">';
		htmlLoading += '<div class="ui-loading-wrap">';

		txt !== null ?
			htmlLoading += '<strong class="ui-loading-txt"><span>'+ txt +'</span></strong>':
			htmlLoading += '';

		htmlLoading += '</div>';
		htmlLoading += '<button type="button" class="btn-base" style="position:fixed; bottom:10%; right:10%; z-index:100;" onclick="$plugins.uiLoading({ visible:false });"><span>$plugins.uiLoading({ visible:false })</span></button>';
		htmlLoading += '</div>';

		if(loadingVisible) {
			clearTimeout(win[global].uiLoading.timerShow);
			clearTimeout(win[global].uiLoading.timerHide);
			win[global].uiLoading.timerShow = setTimeout(function(){
				showLoading();
			},300);
			
		}
		if(!loadingVisible) {
			clearTimeout(win[global].uiLoading.timerShow);
			win[global].uiLoading.timerHide = setTimeout(function(){
				hideLoading();
			},300)
			
		}	

		function showLoading(){
			!$selector.find('.ui-loading').length && $selector.append(htmlLoading);	
			htmlLoading = '';		
			$selector.data('loading', true);
			$('.ui-loading').addClass('visible').removeClass('close');			
		}
		function hideLoading(){
			$selector.data('loading', false);
			$('.ui-loading').addClass('close');	
			setTimeout(function(){
				$('.ui-loading').removeClass('visible')
				$('.ui-loading').remove();
			},300);
		}
	}


	/* ------------------------
	 * [base] console guide
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiConsoleGuide: function (opt) {
			return createUiConsoleGuide(opt);
		}
	});
	function createUiConsoleGuide(opt) {
		if (!win[global].browser.ie) {
			console.log('');
			for (var i = 0; i < opt.length; i++) {
				(i === 0) ? console.log("%c" + opt[i], "background:#333; color:#ffe400; font-size:12px"): console.log(opt[i]);
			}
			console.log('');
		}
	}


	/* --------------------------------------------------------------------------------------------------------
	 * [base] valueCheck
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiValueCheck: function(opt) {
			return createUivalueCheck(opt)
		}
	});
	win[global].uiValueCheck.option = {
		first: false
	}
	function createUivalueCheck(opt){
		var opt = $.extend(true, {}, win[global].uiValueCheck.option, opt),
			type = opt.type,
			target = opt.target,
			first = opt.first,
			msg = opt.message,
			callback = opt.callback,
			error,
			err;

		if (first && target.val().length === 0) {
			return false;
		}

		var	regex,
			reg_id = /^[a-z0-9][a-z0-9_\-]{4,19}$/,
			reg_pw = /^[A-Za-z0-9`\-=\\\[\];',\./~!@#\$%\^&\*\(\)_\+|\{\}:"<>\?]{8,16}$/,
			reg_phone = /^((01[1|6|7|8|9])[1-9][0-9]{6,7})$|(010[1-9][0-9]{7})$/,
			reg_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			reg_email_id = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^()[\]\\.,;:\s@\"]+)*)|(\".+\"))$/,
			reg_email_address = /^((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
			reg_kr = /^[가-힣]{2,}$/,
			reg_en = /^[a-zA-Z]{2,}$/,
			reg_tel = /^[0-9\*]+$/,
			reg_number = /^[0-9]+$/;

		target.val().length === 0 ? err = false : '';
		!err && !!target.attr('required') ? err = true : '';

		switch(type){
			case 'test': 
				valueCheck(reg_kr, target, 'error message', err);
				break;

			case 'id': 
				target.val().length > 0 ? msg ='5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.' : '';
				valueCheck(reg_id, target, msg, err);
				break;

			case 'pw': 
				(target.val().length < 8 && target.val().length > 0) || target.val().length > 16 ? msg = '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.' : '';
				valueCheck(reg_pw, target, msg, err);
				break;

			case 'email':  
				valueCheck(reg_email, target, msg, err);
				break;

			case 'email_id':  
				valueCheck(reg_email_id, target, '정확한 이메일 아이디를 입력해주세요.', err);
				break;

			case 'email_address': 
				valueCheck(reg_email_address, target, '정확한 이메일 주소를 입력해주세요.', err);
				break;


			case 'number': 
				valueCheck(reg_number, target, '숫자로만 입력하세요', err);
				break;

			case 'phone': 
				var str = target.val();
				target.val(str.replace(/\-/g,''));
				
				valueCheck(reg_tel, target, msg, err, 'tel');
				//phoneFomatter(target.val(),0);
				break;

			case 'kr': 
				valueCheck(reg_kr, target, '한글로만 2자 이상 입력하세요.', err);
				break;
			case 'en': 
				valueCheck(reg_en, target, '한글로만 2자 이상 입력하세요.', err);
				break;
		}
		
		function phoneFomatter(num, type){
			var formatNum = '';
			
			if (num.length === 11) {
				if (type === 0) {
					formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
				} else {
					formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
				}
			} else if (num.length === 8) {
				formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
			} else {
				if (num.indexOf('02') === 0) {
					if (type === 0) {
						if (num.length === 9) {
							formatNum = num.replace(/(\d{2})(\d{3})(\d{4})/, '$1-****-$3');
						} else {
							formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
						}
					} else {
						if (num.length === 9) {
							formatNum = num.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
						} else {
							formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
						}
					}
				} else {
					if (type === 0) {
						formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
						
					} else {
						formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
					}
				}
			}
			return target.val(formatNum);
		}

		function valueCheck(reg, target, msg, err, type){
			if (reg.test(target.val())) {
				error = false;
			} else {
				error = true;
			}

			if (err !== undefined) {
				error = err;
			}

			win[global].uiError({ 
				selector:target, 
				error: error, 
				message: msg 
			});
			
			type === 'tel' ? phoneFomatter(target.val()) : '';

			callback ? callback() : '';
			// target.value = '';
			// target.focus();
		}
		
	}


	/* ------------------------
	 * [base] Ajax
	 * date : 2020-06-09
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiAjax: function (opt) {
			return createUiAjax(opt);
		}
	});
	win[global].uiAjax.option = {
		page: true,
		add: false,
		prepend: false,
		effect: false,
		loading:false,
		callback: false,
		errorCallback: false,

		type: 'GET',
		cache: false,
		async: true,
		contType: 'application/x-www-form-urlencoded',
		dataType: 'html'
	};
	function createUiAjax(opt) {
		if (opt === undefined) {
			return false;
		}

		var opt = opt === undefined ? {} : opt;
		var opt = $.extend(true, {}, win[global].uiAjax.option, opt);
		var $id = typeof opt.id === 'string' ? $('#' + opt.id) : typeof opt.id === 'object' ? opt.id : $('body');
		var loading = opt.loading;
		var effect = opt.effect;
		var callback = opt.callback === undefined ? false : opt.callback;
		var errorCallback = opt.errorCallback === undefined ? false : opt.errorCallback;

		if (loading) {
			win[global].uiLoading({
				visible: true
			});
		}

		if (effect) {
			$id.removeClass('changeover action');
			$id.addClass('changeover');
		}

		$.ajax({
			type: opt.type,
			url: opt.url,
			cache: opt.cache,
			async: opt.async,  
			headers: {
				"cache-control": "no-cache",
				"pragma": "no-cache"
			},
			error: function (request, status, err) {
				if (loading) {
					win[global].uiLoading({
						visible: false
					});
				}
				//console.log(request, status, err);
				errorCallback ? errorCallback() : '';
			},
			success: function (v) {
				if (loading) {
					win[global].uiLoading({
						visible: false
					});
				}

				if (opt.page) {
					opt.add ? opt.prepend ? $id.prepend(v) : $id.append(v) : $id.html(v);
					callback && callback();
					effect && $id.addClass('action');
				} else {
					callback && callback(v);
				}
			},
			complete: function(v){
				//console.log(v);
			}
		});
	}


	/* ------------------------
	 * [base] scroll move
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiScroll: function (opt) {
			return createUiScroll(opt);
		}
	});
	win[global].uiScroll.option = {
		value: 0,
		speed: 0,
		callback: false,
		ps: 'top',
		addLeft: false,
		focus: false,
		target: 'html, body'
	};
	function createUiScroll(opt){
		if (opt === undefined) {
			return false;
		}

		var opt = $.extend(true, {}, win[global].uiScroll.option, opt),
			psVal = opt.value,
			s = opt.speed,
			c = opt.callback,
			p = opt.ps,
			addLeft = opt.addLeft,
			overlap = false,
			f = typeof opt.focus === 'string' ? $('#' + opt.focus) : opt.focus,
			$target = typeof opt.target === 'string' ? $(opt.target) : opt.target;
		
		if (p === 'top') {
			$target.stop().animate({ 
					scrollTop : psVal 
				}, { 
					duration: s,
					step: function(now) { 
					!!c && now !== 0 ? c({ scrolltop:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					if (overlap) {
						!!c ? c({ focus:f, complete:true }) : '';
						!!f ? f.attr('tabindex', 0).focus() : '';
					} else {
						overlap = true;
					}
				}
			});
		} else if (p === 'left') {
			$target.stop().animate({ 
					scrollLeft : psVal
				}, { 
					duration: s,
					step: function(now) { 
						!!c && now !== 0 ? c({ scrollleft:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					!!c ? c({ focus:f, complete:true }) : '';
					!!f ? f.attr('tabindex', 0).focus() : '';
				}
			});
		} else if (p === 'center') {
			var w = $target.outerWidth();

			$target.stop().animate({ 
				scrollLeft : psVal - (w / 2) + addLeft
			}, { 
				duration: s,
				step: function(now) { 
					!!c && now !== 0 ? c({ scrollleft:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					!!c ? c({ focus:f, complete:true }) : '';
					!!f ? f.attr('tabindex', 0).focus() : '';
				}
			});
		}
	}


	/* ------------------------
	 * [base] URL parameter
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiPara: function (v) {
			return createUiPara(v);
		}
	});
	function createUiPara(paraname){
		var _tempUrl = win.location.search.substring(1),
			_tempArray = _tempUrl.split('&'),
			_tempArray_len = _tempArray.length,
			_keyValue;

		for (var i = 0, len = _tempArray_len; i < len; i++) {
			_keyValue = _tempArray[i].split('=');

			if (_keyValue[0] === paraname) {
				return _keyValue[1];
			}
		}
	}


	/* ------------------------
	 * scroll bar
	 * date : 2020.06.12
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiScrollBar: function (opt) {
			return createuiScrollBar(opt);
		}
	});
	win[global].uiScrollBar.option = {
		id: false,
		callback:false,
		infiniteCallback:false,
		space: false,
		remove: false
	};
	sessionStorage.setItem('scrollbarID', 0);
	win[global].uiScrollBar.timer = {}
	function createuiScrollBar(opt) {
		var opt = $.extend(true, {}, win[global].uiScrollBar.option, opt),
			id = opt.id,
			space = opt.space,
			callback = opt.callback,
			infiniteCallback = opt.infiniteCallback,
			remove = opt.remove,
			$base = !id ? $('.ui-scrollbar') : typeof id === 'object' ? id : $('[scroll-id="' + id +'"]');
		
		if (win[global].support.touch) {
			return false;
		} 

		$base.each(function () {
			!remove ? scrollbarReady($(this)) : scrollbarRemove($(this));
		});
		function scrollbarUpdate(t, wrapH, wrapW, itemH, itemW, space){
			var $wrap = t;
			var	$item = $wrap.children('.ui-scrollbar-item');

			if (!$item.length) {
				return false;
			}

			var nWrapH = $wrap.outerHeight();
			var nWrapW = $wrap.outerWidth();
			var nItemH = $item.prop('scrollHeight');
			var nItemW = $item.prop('scrollWidth');

			var changeH = (itemH !== nItemH || wrapH !== nWrapH);
			var changeW = (itemW !== nItemW || wrapW !== nWrapW);


			if (changeH || changeW) {
				var barH = Math.floor(nWrapH / (nItemH / 100));
				var barW = Math.floor(nWrapW / (nItemW / 100));
				var $barY = $wrap.find('> .ui-scrollbar-barwrap.type-y .ui-scrollbar-bar');
				var $barX = $wrap.find('> .ui-scrollbar-barwrap.type-x .ui-scrollbar-bar');

				changeH && $barY.css('height', barH + '%').data('height', barH);
				changeW && $barX.css('width', barW + '%').data('width', barW);
				
				(nWrapH < nItemH) ? $wrap.addClass('view-y') : $wrap.removeClass('view-y');
				(nWrapW < nItemW) ? $wrap.addClass('view-x') : $wrap.removeClass('view-x');

				$wrap.data('opt', {'itemH':nItemH, 'itemW':nItemW, 'wrapH':nWrapH, 'wrapW':nWrapW });
				eventFn();
				scrollEvent($item, space);
			}

			var timer;

			clearTimeout(timer);
			timer = setTimeout(function(){
				scrollbarUpdate(t, nWrapH, nWrapW, nItemH, nItemW);
			}, 300);
		}
		function scrollbarRemove(t){
			var $wrap = t;

			$wrap.removeClass('ready view-scrollbar').removeData('infiniteCallback').removeData('ready').removeAttr('style');
			$wrap.find('> .ui-scrollbar-item').contents().unwrap();
			$wrap.find('> .ui-scrollbar-wrap').contents().unwrap();
			$wrap.find('> .ui-scrollbar-barwrap').remove();
		}
		function scrollbarReady(t) {
			var $wrap = t;
			var	html_scrollbar = '';

			$wrap.removeClass('ready').data('infiniteCallback', infiniteCallback).data('ready', false);
			$wrap.find('> .ui-scrollbar-item').contents().unwrap();
			$wrap.find('> .ui-scrollbar-wrap').contents().unwrap();
			$wrap.find('> .ui-scrollbar-barwrap').remove();

			var wrapW = $wrap.innerWidth();
			var wrapH = $wrap.outerHeight();

			$wrap.wrapInner('<div class="ui-scrollbar-item"><div class="ui-scrollbar-wrap"></div></div>');

			var	$item = $wrap.find('> .ui-scrollbar-item');
			var	$itemWrap = $item.find('> .ui-scrollbar-wrap');

			var cssDisplay = $wrap.css('display');
			var cssPadding = $wrap.css('padding');

			$itemWrap.css({
				display: cssDisplay,
				padding: cssPadding
			});

			if (!space) {
				cssDisplay === 'inline-block' && $itemWrap.css('display','block');
				$itemWrap.css('width','100%');
			} 

			!space && $item.css('width','100%');
			$wrap.css('overflow','hidden');

			var itemW =  $item.prop('scrollWidth');
			var itemH =$item.prop('scrollHeight');

			$wrap.data('opt', {'itemH':itemH, 'itemW':itemW, 'wrapH':wrapH, 'wrapW':wrapW });
			
			var idN = JSON.parse(sessionStorage.getItem('scrollbarID'));

			//idN = idN === undefined ? 0 : idN;
			
			if (!$wrap.data('ready') || !$wrap.attr('scroll-id')) {
				
				if (!$wrap.attr('scroll-id')) {
					$wrap.attr('scroll-id', 'uiScrollBar_' + idN).data('ready', true).addClass('ready');
					idN = idN + 1;
					sessionStorage.setItem('scrollbarID', idN);
				} else {
					$wrap.data('ready', true).addClass('ready');
				}

				$item.attr('tabindex', 0);
				$wrap.css('height', wrapH + 'px');
				
				if (space) {
					$item.addClass('scroll-y-padding');
					$item.addClass('scroll-x-padding');
				} else {
					!!$wrap.parent('.ui-tablescroll').length && $wrap.parent('.ui-tablescroll').addClass('not-space');
				}

				html_scrollbar += '<div class="ui-scrollbar-barwrap type-y" >';
				html_scrollbar += '<button type="button" class="ui-scrollbar-bar" aria-hidden="true" tabindex="-1" data-scrollxy="y"><span class="hide">scroll</span></button>';
				html_scrollbar += '</div>';
				html_scrollbar += '<div class="ui-scrollbar-barwrap type-x" >';
				html_scrollbar += '<button type="button" class="ui-scrollbar-bar" aria-hidden="true" tabindex="-1" data-scrollxy="x"><span class="hide">scroll</span></button>';
				html_scrollbar += '</div>';
				
				$wrap.prepend(html_scrollbar);

				(wrapH < itemH) ? $wrap.addClass('view-y') : $wrap.removeClass('view-y');
				(wrapW < itemW) ? $wrap.addClass('view-x') : $wrap.removeClass('view-x');

				var barH = Math.floor(wrapH / (itemH / 100));
				var barW = Math.floor(wrapW / (itemW / 100));
				var $barY = $wrap.find('> .ui-scrollbar-barwrap.type-y .ui-scrollbar-bar');
				var $barX = $wrap.find('> .ui-scrollbar-barwrap.type-x .ui-scrollbar-bar');
				
				$barY.css('height', barH + '%').data('height', barH);
				$barX.css('width', barW + '%').data('width', barW);

				$wrap.addClass('view-scrollbar');
				!!callback && callback(); 
				scrollEvent($item);
				scrollbarUpdate(t, wrapH, wrapW, itemH, itemW, space);
				eventFn();
			}
		}	
		function eventFn(){
			$(doc).find('.ui-scrollbar-item').off('scroll.uiscr').on('scroll.uiscr', function(){
				scrollEvent(this);
			});
			$(doc).find('.ui-scrollbar-bar').off('mousedown.bar touchstart.bar').on('mousedown.bar touchstart.bar', function(e) {
				dragMoveAct(e, this);
			});
		}	
		function scrollEvent(t){
			var $this = $(t),
				$wrap = $this.closest('.ui-scrollbar'),
				$barY = $wrap.find('> .type-y .ui-scrollbar-bar'),
				$barX = $wrap.find('> .type-x .ui-scrollbar-bar');
			
			var opt = $wrap.data('opt');

			if (opt === undefined) {
				return false;
			}

			var itemH = opt.itemH,
				itemW = opt.itemW,
				wrapH = opt.wrapH,
				wrapW = opt.wrapW;

			var scrT = $this.scrollTop(),
				scrL = $this.scrollLeft(),
				barH = $barY.data('height'),
				barW = $barX.data('width');
			
			var hPer = Math.round(scrT / (itemH - wrapH) * 100),
				_hPer = (barH / 100) * hPer,
				wPer = Math.round(scrL / (itemW - wrapW) * 100),
				_wPer = (barW / 100) * wPer;

			var _infiniteCallback = $wrap.data('infiniteCallback');

			$barY.css('top', hPer - _hPer + '%');
			$barX.css('left', wPer - _wPer + '%');

			if (!!_infiniteCallback) {
				hPer === 100 && _infiniteCallback(); 
			}
		}
		function dragMoveAct(e, t) {
			var $bar = $(t),
				$uiScrollbar = $bar.closest('.ui-scrollbar'),
				$barWrap = $bar.closest('.ui-scrollbar-barwrap'),
				$wrap = $bar.closest('.ui-scrollbar'),
				$item = $uiScrollbar.find('> .ui-scrollbar-item');

			var off_t = $barWrap.offset().top,
				w_h = $barWrap.innerHeight(),
				off_l = $barWrap.offset().left,
				w_w = $barWrap.innerWidth(),
				barH = $bar.data('height'),
				barW = $bar.data('width'),
				opt = $wrap.data('opt');

			var yRPer, xRPer;
			var $btn = e.target;
			var isXY = $btn.getAttribute('data-scrollxy');
			
			$('body').addClass('scrollbar-move');

			$(doc).off('mousemove.bar touchmove.bar').on('mousemove.bar touchmove.bar', function (e) {
				var y_m, 
					x_m;
				
				if (e.touches === undefined) {
					if (e.pageY !== undefined) {
						y_m = e.pageY;
					} else if (e.pageY === undefined) {
						y_m = e.clientY;
					}

					if (e.pageX !== undefined) {
						x_m = e.pageX;
					} else if (e.pageX === undefined) {
						x_m = e.clientX;
					}
				}

				var yR = y_m - off_t;
				var xR = x_m - off_l;

				yR < 0 ? yR = 0 : '';
				yR > w_h ? yR = w_h : '';
				xR < 0 ? xR = 0 : '';
				xR > w_w ? xR = w_w : '';

				yRPer = yR / w_h * 100;
				xRPer = xR / w_w * 100;
				var nPerY = (yRPer - (barH / 100 * yRPer)).toFixed(2);
				var nPerX = (xRPer - (barW / 100 * xRPer)).toFixed(2);

				if (isXY === 'y') {
					$bar.css('top', nPerY + '%');
					$item.scrollTop(opt.itemH * nPerY / 100);
				} else {
					$bar.css('left', nPerX + '%');
					$item.scrollLeft(opt.itemW * nPerX / 100);
				}

			}).off('mouseup.bar touchcancel.bar touchend.bar').on('mouseup.bar touchcancel.bar touchend.bar', function () {
				var _infiniteCallback = $wrap.data('infiniteCallback');

				if (!!_infiniteCallback) {
					yRPer === 100 && _infiniteCallback(); 
				}

				$('body').removeClass('scrollbar-move');
				$(doc).off('mousemove.bar mouseup.bar touchmove.bar');
			});
		}
	}


	/* ------------------------
	 * [base] scroll or not
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiHasScrollBarY: function (opt) {
			return createuiHasScrollBarY(opt);
		},
		uiHasScrollBarX: function (opt) {
			return createUiHasScrollBarX(opt);
		}
	});
	function createuiHasScrollBarY(opt) {
		var $this = opt.selector;

		return ($this.prop('scrollHeight') == 0 && $this.prop('clientHeight') == 0) || ($this.prop('scrollHeight') > $this.prop('clientHeight'));
	}
	function createUiHasScrollBarX(opt) {
		var $this = opt.selector;

		return ($this.prop('scrollWidth') == 0 && $this.prop('clientWidth') == 0) || ($this.prop('scrollWidth') > $this.prop('clientWidth'));
	}


	/* ------------------------
	 * [base] focus scope
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiFocusTab: function (opt) {
			return createUiFocusTab(opt);
		}
	});
	win[global].uiFocusTab.option = {
		focusitem : '.ui-select-tit, iframe, a:not([data-disabled]), button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), label, [role="button"]',
		callback: false,
		focusnot: false,
		type: 'hold' //'hold', 'sense'
	};
	function createUiFocusTab(opt){
		if (opt === undefined) {
			return false;
		}
		
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiFocusTab.option, opt),
			$focus = $(opt.selector),
			$item = $focus.find(opt.focusitem),
			callback = opt.callback,
			focusnot = opt.focusnot,
			type = opt.type,
			timer; 

		if (!!$item.length) {
			$item.eq(0).addClass('ui-fctab-s').attr('tabindex', 0).attr('holds', true);
			$item.eq(-1).addClass('ui-fctab-e').attr('tabindex', 0).attr('holde', true);
		} else {
			$focus.prepend('<div class="ui-fctab-s" tabindex="0" holds="true"></div>');
			$focus.append('<div class="ui-fctab-e" tabindex="0" holde="true"></div>');
			$item = $focus.find('.ui-fctab-s, .ui-fctab-e');
		}
		
		clearTimeout(timer);
		timer = setTimeout(function(){
			!focusnot ? $item.eq(0).focus() : '';
		},300);
		timer = '';

		$focus.find('.ui-fctab-s').off('keydown.holds').on('keydown.holds', function (e) {
			if (type === 'hold') {
				if (e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$focus.find('.ui-fctab-e').focus();
				}
			} else if (type === 'sense') {
				$focus.off('keydown.holds');
				(e.shiftKey && e.keyCode == 9) ? callback('before') : '';
			}
		});
		$focus.find('.ui-fctab-e').off('keydown.holde').on('keydown.holde', function (e) {
			if (type === 'hold') {
				if (!e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$focus.find('.ui-fctab-s').focus();
				}
			} else if (type === 'sense') {
				$focus.off('keydown.holds');
				(!e.shiftKey && e.keyCode == 9) ? callback('after') : '';
			}
		});
	}


	/* ------------------------
	 * window popup
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiPopup: function (opt) {
			return createUiPopup(opt);
		}
	});
	win[global].uiPopup.option = {
		name: 'new popup',
		width: 790,
		height: 620,
		align: 'center',
		top: 0,
		left: 0,
		toolbar: 'no',
		location: 'no',
		memubar: 'no',
		status: 'no',
		resizable: 'no',
		scrolbars: 'yes'
	};
	function createUiPopup(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiPopup.option, opt),
			specs;

		if (opt.align === 'center') {
			opt.left = ($(win).outerWidth() / 2) - (opt.width / 2);
			opt.top = ($(win).outerHeight() / 2) - (opt.height / 2);
		}

		specs = 'width=' + opt.width + ', height='+ opt.height + ', left=' + opt.left + ', top=' + opt.top;
		specs += ', toolbar=' + opt.toolbar + ', location=' + opt.location + ', resizable=' + opt.resizable + ', status=' + opt.status + ', menubar=' + opt.menubar + ', scrollbars=' + opt.scrollbars;
		
		win.open(opt.link, opt.name , specs);
	}


	/* ------------------------
	 * cookie
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiCookieSet: function (opt) {
			return creaeteUiCookieSet(opt);
		},
		uiCookieGet: function (opt) {
			return creaeteUiCookieGet(opt);
		},
		uiCookieDel: function (opt) {
			return creaeteUiCookieDel(opt);
		}
	});
	function creaeteUiCookieSet(opt){
		var cookieset = opt.name + '=' + opt.value + ';',
			expdate;
		if (opt.term) {
			expdate = new Date();
			expdate.setTime( expdate.getTime() + opt.term * 1000 * 60 * 60 * 24 ); // term 1 is a day
			cookieset += 'expires=' + expdate.toGMTString() + ';';
		}
		(opt.path) ? cookieset += 'path=' + opt.path + ';' : '';
		(opt.domain) ? cookieset += 'domain=' + opt.domain + ';' : '';
		document.cookie = cookieset;
	}
	function creaeteUiCookieGet(opt){
		var match = ( document.cookie || ' ' ).match( new RegExp(opt.name + ' *= *([^;]+)') );
		return (match) ? match[1] : null;
	}
	function creaeteUiCookieDel(opt){
		var expireDate = new Date();

		expireDate.setDate(expireDate.getDate() + -1);
		win[global].uiCookieSet({ name:opt.name, term:'-1' });
	}


	/* ------------------------
	 * table caption
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiCaption: function () {
			return createUiCaption();
		}
	});
	function createUiCaption(){
		var $cp = $('.ui-caption');

		$cp.text('');
		$cp.each(function(){
			var $table = $(this).closest('table'),
				isthead = !!$table.find('> thead').length,
				$th = $(this).closest('table').find('> tbody th'),
				th_len = $th.length,
				i = 0,
				cp_txt = '';
			if (isthead) {
				$th = $(this).closest('table').find('> thead th');
				th_len = $th.length
			}

			for (i = 0; i < th_len; i++) {
				if ($th.eq(i).text() !== '') {
					cp_txt += $th.eq(i).text();
				}
				if (i < th_len - 1) {
					cp_txt += ', ';
				}
			}
			$(this).text(cp_txt + ' 정보입니다.');
		});
	}


	/* ------------------------
	 * in label
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiInnerLabel: function () {
			return createUiInnerLabel();
		}
	});
	function createUiInnerLabel(){
		var $input = $('.field-inlabel .inp-base');
		var $select = $('.field-inlabel select');
		var $datepicker = $('.field-inlabel .ui-datepicker .inp-base');

		//set
		$input.each(function(){
			checkValue(this, 'input');
		});
		$select.each(function(){
			checkValue(this, 'select');
		});
		$datepicker.each(function(){
			checkValue(this, 'datepicker');
		});

		//event input
		$input.off('keydown.inlabel blur.inlabel').on('keydown.inlabel blur.inlabel', function(){
			checkValue(this, 'input');
		});
		//event select
		$select
			.off('focus.inlabel').on('focus.inlabel', function(){
				$(this).closest('.ui-select').addClass('activated');
			})
			.off('blur.inlabel').on('blur.inlabel', function(){
				checkValueSelect(this)
			})
			.off('change.inlabel').on('change.inlabel', function(){
				checkValueSelect(this)
			});
		$(doc).find('.field-inlabel .ui-select-btn')
			.off('focus.inlabel').on('focus.inlabel', function(){
				checkValueSelectBtn(this)
			})
			.off('blur.inlabel').on('blur.inlabel', function(){
				checkValueSelectBtn(this, 'blur')
			});

		function checkValue(v, type){
			var $this = $(v);
			var $wrap;

			if (type === 'select') {
				$wrap = $this.closest('.ui-select');
			} else if (type === 'datepicker'){
				$wrap = $this.closest('.ui-datepicker');
			}

			if (type === 'input') {
				!!$this.val() ? $this.addClass('activated') : $this.removeClass('activated');
			} else {
				($this.val() === null) ?
					$wrap.addClass('is-null'):
					$wrap.removeClass('is-null').addClass('activated');
			}
		}
		function checkValueSelectBtn(v, s){
			var $this = $(v).closest('.ui-select').find('select');
			var $wrap = $this.closest('.ui-select');
			var eBlur = !!s ? true : false;

			if ($this.val() === null) {
				eBlur ?
				$wrap.removeClass('activated').addClass('is-null'):
				$wrap.addClass('activated').removeClass('is-null');
			} else {
				eBlur ?
				$wrap.removeClass('is-null').addClass('activated'):
				$wrap.addClass('activated');
			}
		}
		function checkValueSelect(v){
			var $this = $(v);
			var $wrap = $this.closest('.ui-select');

			if ($this.val() === null) {
				$wrap.removeClass('activated').addClass('is-null');
			} else {
				$wrap.removeClass('is-null').addClass('activated');
			}
		}
	}


	/* ------------------------
	 * error message
	 * date : 
	 * option
	 * - opt.message : 'message text' / [string]
	 * - opt.error : true or false / [string]
	 * - opt.selector : 'id' or $(...) / [strong] or [object]
	 * - opt.wrapper : '...' / [strong]
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiError: function (opt) {
			return createUiError(opt);
		}
	});
	function createUiError(opt){
		var msg = opt.message, 
			err = opt.error, 
			$this = typeof opt.selector === 'string' ? $('#' + opt.selector) : opt.selector,
			$wrap = opt.wrapper === undefined ? $this.parent() : $this.closest(opt.wrapper),
			id = $this.attr('id'),
			err_html = '<em class="ui-error-msg" aria-hidden="true" id="'+ id +'-error">'+ msg +'</em>';

		//generate error message
		$this.attr('aria-labelledby', id + '-error');

		!$('#'+ id +'-error').length ? $wrap.append(err_html) : $wrap.find('.ui-error-msg').text(msg) ;
		
		//error 여부에 따른 설정
		if (err) {
			$('#'+ id +'-error').attr('aria-hidden', false);
			$wrap.addClass('ui-error-true');
			$this.addClass('ui-error-item');
			$this.closest('.ui-select').addClass('ui-error-select');
		} else {
			$('#'+ id +'-error').attr('aria-hidden', true).remove();
			$wrap.find('.ui-error-item').length === 1 ? $wrap.removeClass('ui-error-true') : '';
			$this.removeClass('ui-error-item');
			$this.closest('.ui-select').removeClass('ui-error-select');
		}
	}



	/* ------------------------
	 * input placeholder
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiPlaceholder: function () {
			return createUiPlaceholder();
		}
	});
	function createUiPlaceholder(){
		var $ph = $('[placeholder]'),
			phname = '';

		$('.ui-placeholder').remove();
		$ph.each(function(){
			phname = $(this).attr('placeholder');
			$(this).before('<span class="hide ui-placeholder">' + phname + '</span>')
		});
	}



	/* ------------------------
	* table scroll(vertical)
	* date : 2020-05-17
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiTableScroll: function (opt) {
			return createUiTableScroll(opt);
		}
	});
	win[global].uiTableScroll.option = {
		callback:false
	};
	function createUiTableScroll(opt){
		var opt = $.extend(true, {}, win[global].uiAccordion.option, opt);
		var callback = opt.callback;
		var $tblWrap = $('.ui-tablescroll');

		for (var i = 0, len = $tblWrap.length; i < len; i++) {
			var $tbl = $tblWrap.eq(i),
				_$tblWrap = $tbl.find('.ui-tablescroll-wrap'),
				_$tbl = _$tblWrap.find('table'),
				cloneTable = _$tbl.clone();
			
			if (!$tbl.find('.ui-tablescroll-clone').length) {
				$tbl.prepend(cloneTable);

				var $cloneTable = $tbl.find('> table:first-child'),
					$cloneTableTh = $cloneTable.find('th');

				$cloneTable.find('caption').remove();
				$cloneTable.find('tbody').remove();
				$cloneTable.addClass('ui-tablescroll-clone');
				$cloneTable.attr('aria-hidden', true);
				$cloneTableTh.each(function(){
					$(this).attr('aria-hidden', true);
				});
			}
		}

		!!callback && callback();
	}


	/* ------------------------
	* accordion tab  
	* date : 2020-05-17
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiAccordion: function (opt) {
			return createUiAccordion(opt);
		},
		uiAccordionToggle: function (opt) {
			return createUiAccordionToggle(opt);
		}
	});
	win[global].uiAccordion.option = {
		current: null,
		autoclose: false,
		callback: false,
		add: false,
		level: 3,
		effect: win[global].option.effect.easeInOut,
		effTime: '.2'
	};
	function createUiAccordion(opt){
		if (opt === undefined || !$('#' + opt.id).length) {
			return false;
		}

		var opt = $.extend(true, {}, win[global].uiAccordion.option, opt),
			id = opt.id,
			current = opt.current,
			callback = opt.callback,
			autoclose = opt.autoclose,
			level = opt.level,
			add = opt.add,
			effect = opt.effect,
			effTime = opt.effTime;

		var	$acco = $('#' + id),
			$wrap = $acco.children('.ui-acco-wrap'),
			$pnl = $wrap.children('.ui-acco-pnl'),
			$tit = $wrap.children('.ui-acco-tit'),
			$btn = $tit.find('.ui-acco-btn');

		var	len = $wrap.length, 
			keys = win[global].option.keys,
			optAcco;

		var para = win[global].uiPara('acco'),
			paras,
			paraname;

		//set up
		if (!!para && !add) {
			if (para.split('+').length > 1) {
				//2 or more : acco=exeAcco1*2+exeAcco2*3
				paras = para.split('+');

				for (var j = 0; j < paras.length; j++ ) {
					paraname = paras[j].split('*');
					opt.id === paraname[0] ? current = [Number(paraname[1])] : '';
				}
			} else {
				//only one : tab=1
			 	if (para.split('*').length > 1) {
					paraname = para.split('*');
					opt.id === paraname[0] ? current = [Number(paraname[1])] : '';
				} else {
					current = [Number(para)];
				}
			}
		}

		if (add) {
			current = [];
			var ss = JSON.parse(sessionStorage.getItem(id));

			autoclose = autoclose || ss.close;

			$acco.find('.ui-acco-btn.selected').each(function(){
				current.push($(this).closest('.ui-acco-wrap').index());
			});
			$btn.removeAttr('acco-last').removeAttr('acco-first');

			autoclose = $acco.data('opt').close;
			callback = $acco.data('opt').callback;
		}

		sessionStorage.setItem(id, JSON.stringify({ 'close': autoclose, 'current': current, 'effTime':effTime, 'effect':effect }) );
		win[global].uiAccordion[id] = callback;

		//set up
		!$pnl ? $pnl = $tit.children('.ui-acco-pnl') : '';
		$acco.data('opt', { 
			id: id, 
			close: autoclose, 
			callback: callback
		});

		for (var i = 0; i < len; i++) {
			var $wrap_i = $wrap.eq(i),
				$accotit = $wrap_i.find('> .ui-acco-tit'),
				$accopln = $wrap_i.find('> .ui-acco-pnl'),
				$accobtn = $accotit.find('.ui-acco-btn');

			if ($accotit.prop('tagName') !== 'DT') {
				$accotit.attr('role','heading');
				$accotit.attr('aria-level', level);
			}
			
			if (!$accopln) {
				$accopln = $accotit.children('.ui-acco-pnl');
			}

			($accotit.attr('id') === undefined) && $accobtn.attr('id', id + '-btn' + i);
			($accopln.attr('id') === undefined) && $accopln.attr('id', id + '-pnl' + i);
			
			$accobtn
				.data('selected', false)
				.attr('data-n', i)
				.attr('data-len', len)
				.attr('aria-expanded', false)
				.attr('aria-controls', $accopln.attr('id'))
				.removeClass('selected');
			$accopln
				.attr('data-n', i)
				.attr('data-len', len)
				.attr('aria-labelledby', $accobtn.attr('id'))
				.attr('aria-hidden', true).hide();

			(i === 0) && $accobtn.attr('acco-first', true);
			(i === len - 1) && $accobtn.attr('acco-last', true);
		}
		
		if (current !== null) {
			win[global].uiAccordionToggle({ 
				id: id, 
				current: current, 
				motion: false 
			});
		}

		//event
		$btn.off('click.uiaccotab keydown.uiaccotab')
			.on({
				'click.uiaccotab': evtClick,
				'keydown.uiaccotab': evtKeys
			});

		function evtClick(e) {
			if (!!$(this).closest('.ui-acco-wrap').find('.ui-acco-pnl').length) {
				e.preventDefault();
				var $this = $(this);

				optAcco = $this.closest('.ui-acco').data('opt');
				win[global].uiAccordionToggle({ 
					id: optAcco.id, 
					current: [$this.data('n')], 
					close: optAcco.close, 
					callback: optAcco.callback
				});
			}
		}
		function evtKeys(e) {
			var $this = $(this),
				n = Number($this.data('n')),
				m = Number($this.data('len')),
				id = $this.closest('.ui-acco').attr('id');

			switch(e.keyCode){
				case keys.up: upLeftKey(e);
				break;

				case keys.left: upLeftKey(e);
				break;

				case keys.down: downRightKey(e);
				break;

				case keys.right: downRightKey(e);
				break;

				case keys.end: endKey(e);
				break;

				case keys.home: homeKey(e);
				break;
			}

			function upLeftKey(e) {
				e.preventDefault();
				
				!$this.attr('acco-first') ?
				$('#' + id + '-btn' + (n - 1)).focus():
				$('#' + id + '-btn' + (m - 1)).focus();
			}
			function downRightKey(e) {
				e.preventDefault();

				!$this.attr('acco-last') ? 
				$('#' + id + '-btn' + (n + 1)).focus():
				$('#' + id + '-btn0').focus();
			}
			function endKey(e) {
				e.preventDefault();

				$('#' + id + '-btn' + (m - 1)).focus();
			}
			function homeKey(e) {
				e.preventDefault();
				$('#' + id + '-btn0').focus();
			}
		}
	}
	function createUiAccordionToggle(opt){
		if (opt === undefined) {
			return false;
		}
		
		var id = opt.id,
			$acco = $('#' + id),
			dataOpt = $acco.data('opt'),
			current = opt.current === undefined ? null : opt.current,
			callback = opt.callback === undefined ? dataOpt.callback : opt.callback,
			state = opt.state === undefined ? 'toggle' : opt.state,
			motion = opt.motion === undefined ? true : opt.motion,
			autoclose = dataOpt.close,
			open = null,
			$wrap = $acco.children('.ui-acco-wrap'),
			$pnl,
			$tit,
			$btn,
			len = $wrap.length,
			speed = 200,
			i, c = 0;
		
		(motion === false) ? speed = 0 : speed = 200;

		if (current !== 'all') {
			for (i = 0 ; i < current.length; i++) {
				$pnl = $wrap.eq(current[i]).children('.ui-acco-pnl');
				$tit = $wrap.eq(current[i]).children('.ui-acco-tit');
				$btn = $tit.find('.ui-acco-btn');
				
				if (state === 'toggle') {
					(!$btn.data('selected')) ? act('down') : act('up');
				} else {
					(state === 'open') ? act('down') : (state === 'close') ? act('up') : '';
				}
			}
			!callback ? '' :
				callback({ 
					id:id, 
					open:open, 
					current:current
				});
		} else if (current === 'all') {
			checking();
		}

		function checking() {
			//열린상태 체크하여 전체 열지 닫을지 결정
			c = 0;
			$wrap.each(function(i){
				c = ($wrap.eq(i).find('> .ui-acco-tit .ui-acco-btn').attr('aria-expanded') === 'true') ? c + 1 : c + 0;
			});
			//state option 
			if (state === 'open') {
				c = 0;
				$acco.data('allopen', false);
			} else if (state === 'close') {
				c = len;
				$acco.data('allopen', true);
			}
			//all check action
			if (c === 0 || !$acco.data('allopen')) {
				$acco.data('allopen', true);
				act('down');
			} else if (c === len || !!$acco.data('allopen')) {
				$acco.data('allopen', false);
				act('up');
			}
		}
		function act(v) {
			var isDown = v === 'down',
				a = isDown ? true : false, 
				cls = isDown ? 'addClass' : 'removeClass', 
				updown = isDown ? 'slideDown' : 'slideUp';
			
			open = isDown ? true : false;

			if (autoclose === true && isDown) {
				$wrap.each(function(i){
					$wrap.eq(i).find('> .ui-acco-tit .ui-acco-btn').data('selected', false).removeClass('selected').attr('aria-expanded', false);
					$wrap.eq(i).find('> .ui-acco-pnl').attr('aria-hidden',true).stop().slideUp(speed);
				});
			}

			if (current === 'all') {
				$wrap.each(function(i){
					$wrap.eq(i).find('> .ui-acco-tit .ui-acco-btn').data('selected', a)[cls]('selected').attr('aria-expanded', a);
					$wrap.eq(i).find('> .ui-acco-pnl').attr('aria-hidden', !a).stop()[updown](speed, function(){
						$(this).css({ height: '', padding: '', margin: '' }); 
					});
				});
			} else {
				$btn.data('selected', a).attr('aria-expanded', a)[cls]('selected');
				$pnl.attr('aria-hidden', !a).stop()[updown](speed, function(){
					$(this).css({ height: '', padding: '', margin: '' }); 
				});
			}
		}
	}


	/* ------------------------
	* name : brick list
	* date : 2020-06-09
	* date : 2020-08-18 : 반응형 추가
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiBrickList: function (opt) {
			return createUiBrickList(opt);
		},
		uiBrickListItem: function (opt) {
			return createUiBrickListItem(opt);
		}
	});
	win[global].uiBrickList.option = {
		fixCol: {
			1500:4,
			1200:3,
			800:2,
			400:1,
		},
		response: true
	}
	function createUiBrickList(opt){
		if (opt === undefined) { return false; }
		
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiBrickList.option, opt),
			$base = $('#' + opt.id), 
			$item = $base.find('.ui-bricklist-item').not('.disabled'),
			fixCol = opt.fixCol,
			re = opt.response,
			wrapW = $base.outerWidth(),
			itemW = $item.outerWidth(),
			itemSum = $item.length,
			itemCol = Math.floor(wrapW / itemW),
			itemRow = (itemSum / itemCol) + (itemSum % itemCol) ? 1 : 0,
			itemTopArray = [],
			timer;

		if (!!fixCol) {
			var key = Object.keys(fixCol);
			key.sort(function(a,b){
				return a - b;
			});
			var fixCol__;
			for (var i = 0; i < key.length; i++) {
				if (Number(key[i]) > $(win).outerWidth()) {
					fixCol__ = fixCol[key[i]];
					break;
				} else {
					fixCol__ = fixCol[key[key.length - 1]];
				}
			}

			itemCol = fixCol__;
			if (!!re) {
				itemW = wrapW / fixCol__;
			}
		} 
		$base.data('orgcol', itemCol);

		//the number of columns 
		for (var i = 0; i < itemCol; i++) {		
			var $itemN = $item.eq(i);

			$itemN.attr('role','listitem').css({
				position: 'absolute',
				left : itemW * i,
				top : 0
			});

			if (!!fixCol && !!re) {
				$itemN.css('width', itemW + 'px');
			} 
			itemTopArray[i] = 0;
		}
		//save option information
		$base.data('opt', { 
			'wrap': wrapW, 
			'width': itemW, 
			'itemTopArray': itemTopArray, 
			'row': itemRow, 
			'col': itemCol, 
			'response': re,
			'fixCol': fixCol,
			'start': 0
		});

		win[global].uiBrickListItem({ id: opt.id });
		var winW = $(win).outerWidth();
		if (re) {
			$(win).off('resize.win').on('resize.win', function(){
				var $uiBricklist = $('.ui-bricklist');

				clearTimeout(timer);
				timer = setTimeout(function(){
					if (winW !== $(win).outerWidth()) {
						console.log('re');
						$uiBricklist.each(function(){
							var $this = $(this);
							var dataOpt = $this.data('opt');
							var reColN = Math.floor($this.outerWidth() / $this.find('.ui-bricklist-item').outerWidth());

							if ($this.data('orgcol') !== reColN || !!dataOpt.fixCol) {
								win[global].uiBrickList({ 
									id : $this.attr('id'),
									fixCol: dataOpt.fixCol,
									response: dataOpt.response
								});
								
								$this.find('.ui-bricklist-wrap').css('height', Math.max.apply(null, itemTopArray));
							}
						});
					}
				},300);
			});
		}	
	}
	function createUiBrickListItem(opt){
		if (opt === undefined) { return false; }
		
		var $base = $('#' + opt.id), 
			$item = $base.find('.ui-bricklist-item').not('.disabled'),
			dataOpt = $base.data('opt'),
			fixCol = dataOpt.fixCol,
			re = dataOpt.response,
			wrapW = dataOpt.wrap,
			itemW = dataOpt.width,
			itemRow = dataOpt.row,
			itemTopArray = dataOpt.itemTopArray,
			itemSum = $item.length;
		
		//$plugins.uiLoading({ id: opt.id, visible:true });

		var n = dataOpt.start;
		var timer;
		var setItem = function(){
			var $itemN = $item.eq(n);
			var $itemImg = $itemN.find('img');
			
			$itemImg.attr('src', $itemImg.attr('data-src'));
			$itemImg.load(function(){
				if (!!fixCol && !!re) {
					$itemN.css('width', itemW + 'px');
				} 
				
				var minH = Math.min.apply(null, itemTopArray);
				var nextN = itemTopArray.indexOf(minH);
				var itemH = Number($itemN.outerHeight());

				$itemN.attr('data-left', itemW * nextN).attr('data-top', itemTopArray[nextN]);
				itemTopArray[nextN] = Number(minH + itemH);
				n = n + 1;

				clearTimeout(timer);
				if (n < itemSum) {
					setItem();
				} else {
					$plugins.uiLoading({ visible:false });
				}

				timer = setTimeout(function(){
					$item.each(function(){
						$(this).css({
							position: 'absolute',
							top : $(this).attr('data-top') + 'px',
							left:  $(this).attr('data-left') + 'px'
						}).addClass('on');
					});
					$base.data('opt', { 
						'wrap': wrapW, 
						'width':itemW, 
						'itemTopArray':itemTopArray, 
						'row':itemRow, 
						'col':n, 
						'response': re,
						'fixCol': fixCol,
						'start': itemSum 
					});
					$base.find('.ui-bricklist-wrap').css('height', Math.max.apply(null, itemTopArray));
				},100);
			});
		} 
		setItem();
	}

	/* ------------------------
	* name : dropdown
	* date : 2020-06-10
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiDropdown: function (opt) {
			return createUiDropdown(opt);
		},
		uiDropdownToggle: function (opt) {
			return createUiDropdownToggle(opt);
		},
		uiDropdownHide: function () {
			return createUiDropdownHide();
		},
	});
	win[global].uiDropdown.option = {
		ps: 'BL',
		hold: true,
		dropSpace: $('body'),
		dropSrc: false,
		dropOffset: false,
		openback:false,
		closeback:false
	};
	function createUiDropdown(opt){
		if (opt === undefined || !$('#' + opt.id).length) {
			return false;
		}

		var opt = $.extend(true, {}, win[global].uiDropdown.option, opt),
			id = opt.id,
			ps = opt.ps,
			hold = opt.hold,
			dropSpace = opt.dropSpace,
			dropSrc = opt.dropSrc,
			dropOffset = opt.dropOffset,
			openback = opt.openback,
			closeback = opt.closeback;

		if (!!dropSrc && !$('[data-id="' + opt.id + '"]').length) {
			$plugins.uiAjax({
				id: dropSpace,
				url: dropSrc,
				add: true,
				callback: function(){
					setDropdown();
				}
			});
		} else {
			setDropdown();
		}
		
		function setDropdown(){
			var $btn = $('#' + id),
				$pnl = $('[data-id="'+ id +'"]'); 

			//set up
			$btn.attr('aria-expanded', false)
				.data('opt', { 
					id: id, 
					ps: ps,
					hold: hold, 
					openback: openback,
					closeback: closeback,
					dropOffset: dropOffset
				});
			$pnl.attr('aria-hidden', true).attr('aria-labelledby', id).addClass(ps)
				.data('opt', { 
					id: id, 
					ps: ps,
					hold: hold, 
					openback: openback,
					closeback: closeback,
					dropOffset: dropOffset
				});
			
			//event
			$btn.off('click.dp').on('click.dp', function(e){
				action(this);
			});
			$(doc).find('.ui-drop-close').off('click.dp').on('click.dp', function(e){
				var pnl_opt = $('#' + $(this).closest('.ui-drop-pnl').data('id')).data('opt');
				win[global].uiDropdownToggle({ 
					id: pnl_opt.id 
				});
				$('#' + pnl_opt.id).focus();
			})

			//dropdown 영역 외에 클릭 시 
			$(doc).off('click.dpb').on('click.dpb', function(e){
				if (!!$('body').data('dropdownOpened')){
					if ($(doc).find('.ui-drop-pnl').has(e.target).length < 1) {
						win[global].uiDropdownHide();
					}
				}
			});

			function action(t) {
				var $this = $(t),
					btn_opt = $this.data('opt');

				$this.data('sct', $(doc).scrollTop());
				win[global].uiDropdownToggle({ 
					id: btn_opt.id 
				});
			}
		}
	}
	function createUiDropdownToggle(opt){
		if (opt === undefined) {
			return false;
		}
		
		var id = opt.id,
			$btn = $('#' + id),
			$pnl = $('.ui-drop-pnl[data-id="'+ id +'"]'),
			defaults = $btn.data('opt'),
			opt = $.extend(true, {}, defaults, opt),
			
			ps = opt.ps,
			openback = opt.openback,
			closeback = opt.closeback,
			hold = opt.hold,
			state = opt.state,
			dropOffset = opt.dropOffset,
			btnExpanded =  $btn.attr('aria-expanded'),
			is_modal = !!$btn.closest('.ui-modal').length,

			btn_w = Math.ceil($btn.outerWidth()),
			btn_h = Math.ceil($btn.outerHeight()),
			btn_t = Math.ceil($btn.position().top) + parseInt($btn.css('margin-top')),
			btn_l = Math.ceil($btn.position().left) + parseInt($btn.css('margin-left')),
			pnl_w = Math.ceil($pnl.outerWidth()),
			pnl_h = Math.ceil($pnl.outerHeight());

		//dropOffset: ture 이거나 modal안의 dropdown 일때 position -> offset 으로 위치 값 변경
		if (dropOffset || is_modal) {
			btn_t = Math.ceil($btn.offset().top);
			btn_l = Math.ceil($btn.offset().left);
			is_modal ? btn_t = btn_t - $(win).scrollTop(): '';
		}

		//test 
		!!$btn.attr('data-ps') ? ps = $btn.attr('data-ps') : '';
		
		if (state === 'open') {
			btnExpanded = 'false';
		} else if (state === 'close') {
			btnExpanded = 'true';
		}

		btnExpanded === 'false' ? pnlShow(): pnlHide();

		function pnlShow(){
			var drop_inner = $btn.closest('.ui-drop-pnl').data('id');
			
			//dropdown in dropdown 인 경우
			if (!!drop_inner) {
				$('.ui-drop').not('#' + drop_inner).attr('aria-expanded', false);
				$('.ui-drop-pnl').not('[data-id="' + drop_inner +'"]')
						.attr('aria-hidden', true)
						.attr('tabindex', -1)
						.removeAttr('style');
			} else {
				win[global].uiDropdownHide();
			}

			$btn.attr('aria-expanded', true);
			$pnl.attr('aria-hidden', false).attr('tabindex', 0).addClass('on');

			//focus hold or sense
			hold ?	
				win[global].uiFocusTab({ selector:'.ui-drop-pnl[data-id="'+ id +'"]', type:'hold' }):
				win[global].uiFocusTab({ selector:'.ui-drop-pnl[data-id="'+ id +'"]', type:'sense', callback:pnlHide });

			switch (ps) {
				case 'BL': 
					$pnl.css({ 
						top: btn_t + btn_h, 
						left: btn_l
					}); 
					break;
				case 'BC': 
					$pnl.css({ top: btn_t + btn_h, left: btn_l - ((pnl_w - btn_w) / 2) }); 
					break;
				case 'BR': 
					$pnl.css({ top: btn_t + btn_h, left: btn_l - (pnl_w - btn_w) }); 
					break;
				case 'TL': 
					$pnl.css({ top: btn_t - pnl_h, left: btn_l }); 
					break;
				case 'TC': 
					$pnl.css({ top: btn_t - pnl_h, left: btn_l - ((pnl_w - btn_w) / 2) }); 
					break;
				case 'TR': 
					$pnl.css({ top: btn_t - pnl_h, left: btn_l - (pnl_w - btn_w) }); 
					break;
				case 'RT': 
					$pnl.css({ top: btn_t, left: btn_l + btn_w }); 
					break;
				case 'RM': 
					$pnl.css({ top: btn_t - ((pnl_h - btn_h) / 2), left:  btn_l + btn_w  }); 
					break;
				case 'RB': 
					$pnl.css({ top: btn_t - (pnl_h - btn_h), left: btn_l + btn_w }); 
					break;
				case 'LT': 
					$pnl.css({ top: btn_t, left: btn_l - pnl_w }); 
					break;
				case 'LM': 
					$pnl.css({ top: btn_t - ((pnl_h - btn_h) / 2), left: btn_l - pnl_w  }); 
					break;
				case 'LB': 
					$pnl.css({ top: btn_t - (pnl_h - btn_h), left: btn_l - pnl_w }); 
					break; 
				case 'CM': 
					$pnl.css({ top: '50%', left: '50%', marginTop: (pnl_h / 2 ) * -1, marginLeft: (pnl_w / 2 ) * -1 }); 
					break;
			}

			setTimeout(function(){
				$('body').data('dropdownOpened',true).addClass('dropdownOpened');
				setTimeout(function(){
					$pnl.focus();
				},0);
			},0);

			!!openback ? openback() : '';			
		}
		function pnlHide(){
			if ($('#' + id).closest('.ui-drop-pnl').length < 1) {
				$('body').data('dropdownOpened',false).removeClass('dropdownOpened');
			}

			$btn.attr('aria-expanded', false).focus();
			$pnl.attr('aria-hidden', true).attr('tabindex', -1).removeClass('on');
			
			!!closeback ? closeback() : '';
		}
	}
	function createUiDropdownHide(){
		$('body').data('dropdownOpened',false).removeClass('dropdownOpened');
		$('.ui-drop').attr('aria-expanded', false);
		$('.ui-drop-pnl[aria-hidden="false"]').each(function(){
			var $pnl = $(this),
				defaults = $pnl.data('opt'),
				opt = $.extend(true, {}, defaults),
				closeback = opt.closeback;
			
			$pnl.attr('aria-hidden', true).attr('tabindex', -1).removeClass('on');
			!!closeback ? closeback() : '';
		});	
	}
	

	/* ------------------------
	* name : object floating
	* date : 2020-06-10
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiFloating: function (opt) {
			return createUiFloating(opt);
		}
	});
	win[global].uiFloating.option = {
		ps: 'bottom',
		add: false,
		fix: true,
		callback: false
	};
	function createUiFloating(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiFloating.option, opt),
			id = opt.id,
			ps = opt.ps,
			add = opt.add,
			fix = opt.fix,
			callback = opt.callback,
			$id = $('#' + id),
			$idwrap = $id.find('.ui-floating-wrap'),
			$add = $('#' + add),
			$addwrap = $add.find('.ui-floating-wrap').length ? $add.find('.ui-floating-wrap') : $add,
			c = 'ui-fixed-' + ps,
			timer;
		
		!!fix ? $id.addClass(c) : '';
		
		if ($id.length) {
			clearTimeout(timer);
			timer = setTimeout(act, 300);
		}
		
		$(win).on('scroll.win', function(){
			if ($id.length) {
				act();
				clearTimeout(timer);
				timer = setTimeout(act, 500);
			}
		});
		
		function act(){
			var tt = Math.ceil($id.offset().top),
				th = Math.ceil($idwrap.outerHeight()),
				st = $(win).scrollTop(),
				wh = Math.ceil( win[global].browser.mobile ? window.screen.height : $(win).outerHeight() ),
				dh = Math.ceil($(doc).outerHeight()),
				lh = (!!add) ? $add.outerHeight() : 0 ,
				lt = (!!add) ? dh - ($add.offset().top).toFixed(0) : 0,
				lb = 0, 
				_lb;
			
			$idwrap.removeAttr('style');
			$id.data('fixbottom', th);

			if (!!add) {
				if ($add.data('fixbottom') === undefined) {
					$add.data('fixbottom', th + $addwrap.outerHeight());
				}
			}

			!!add ? lh = lh + Number($add.data('fixtop') === undefined ? 0 : $add.data('fixtop')) : '';
			!!callback ? callback({ id:id, scrolltop:st, boundaryline: tt - lh }) : '';
			$id.css('height', th);

			// 상단으로 고정
			if (ps === 'top') {
				// 고정 > 흐름
				if (fix === true) {
					if (tt - lh <= st) { 
						$id.removeClass(c).data('fixtop', false);
						$idwrap.removeAttr('style');
					} else { 
						$id.addClass(c).data('fixtop', lh);
						$idwrap.css('top', lh);
					}
				} 
				// 흐름 > 고정	
				else {
					if (tt - lh <= st) { 
						$id.addClass(c).data('fixtop', lh);
						$idwrap.css('top', lh);
					} else { 
						$id.removeClass(c).data('fixtop', false);
						$idwrap.removeAttr('style');
					}
				}
			} 
			// 하단으로 고정
			else if (ps === 'bottom') {
				if (!!add) { 
					lb = th + Number($add.data('fixbottom'));
					$id.data('fixbottom', lb);
				}
				_lb = (lb - th < 0) ? 0 : lb - th;
				// 고정 > 흐름
				if (fix === true) {
					if (tt + th + _lb - wh <= st) { 
						$id.removeClass(c);
						$idwrap.removeAttr('style');
					} else {
						$id.addClass(c)
						$idwrap.css('bottom', _lb);
					}
						
				// 흐름 > 고정		
				} else {
					if (tt + th + _lb - wh <= st) {
						$id.addClass(c);
						$idwrap.css('bottom', _lb);
					} else {
						$id.removeClass(c);
						$idwrap.removeAttr('style');
					}
				}
			}
		}
	}


	/* ------------------------
	* name : object floating Range
	* date : 2020-06-10
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiFloatingRange: function (opt) {
			return createUiFloatingRange(opt);
		}
	});
	win[global].uiFloatingRange.option = {
		margin: 0
	};
	function createUiFloatingRange(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiFloatingRange.option, opt),
			id = opt.id,
			mg = opt.margin,
			$range = $('#' + id),
			$item = $range.find('.ui-floating-range-item'),
			item_h = $item.outerHeight(),
			range_t = $range.offset().top,
			range_h = $range.outerHeight(),
			win_scrt = $(win).scrollTop(),
			itemTop = $item.position().top;
						
		$(win).on('scroll.win', function(){
			act();
		});
		
		function act(){
			range_t = $range.offset().top;
			range_h = $range.outerHeight();
			win_scrt = $(win).scrollTop();
			
			if (range_t <= (win_scrt - itemTop + mg)) {
				if ((range_t + range_h) - item_h < (win_scrt + mg)) {
					$item.css('top', range_h - item_h - itemTop);
				} else {
					$item.css('top', (win_scrt - itemTop + mg) - range_t );
				}
			} else {
				$item.css('top', 0);
			}
		}
	}


	/* ------------------------
	* name : modal
	* date : 2020-06-11
	------------------------ */	
	
	win[global] = win[global].uiNameSpace(namespace, {
		uiModalOpen: function (opt) {
			return createUiModalOpen(opt);
		},
		uiModalClose: function (opt) {
			return createUiModalClose(opt);
		},
		uiSystemModalClose: function () {
			return createUiSystemModalClose();
		}
	});
	win[global].uiModalOpen.option = {
		type: 'normal',
		wrap: false,
		mobileFull: false,
		ps: 'center',
		src: false,
		remove: false,
		modalWidth: false,
		modalHeight: false,
		innerScroll: false,
		mg: 10,
		callback:false,
		closeCallback:false,
		endfocus:false,

		sMessage: '',
		sBtnConfirmTxt: 'Ok',
		sBtnCancelTxt: 'Cancel',
		sZindex: false,
		sClass: 'type-system',
		sConfirmCallback: false,
		sCancelCallback: false
	}
	function createUiModalOpen(opt) {
		var opt = $.extend(true, {}, win[global].uiModalOpen.option, opt),
			wrap = opt.wrap === false ? $('body') : typeof opt.wrap === 'object' ? opt.wrap : $('#' + opt.wrap),
			type = opt.type,
			id = opt.id,
			src = opt.src,
			mobileFull = opt.mobileFull,
			ps = opt.ps,
			mg = opt.mg,
			remove = opt.remove,
			w = opt.modalWidth,
			h = opt.modalHeight,
			innerScroll = opt.innerScroll,
			scr_t = $(win).scrollTop(),
			endfocus = opt.endfocus === false ? document.activeElement : typeof opt.endfocus === 'string' ? $('#' + opt.endfocus) : opt.endfocus,
			callback = opt.callback,
			closeCallback = opt.closeCallback,
			timer;
		
		var sMessage = opt.sMessage,
			sBtnConfirmTxt = opt.sBtnConfirmTxt,
			sBtnCancelTxt = opt.sBtnCancelTxt,
			sZindex = opt.sZindex,
			sClass = opt.sClass,
			sConfirmCallback = opt.sConfirmCallback,
			sCancelCallback = opt.sCancelCallback;

		if (type === 'normal') {
			if (!!src && !$('#' + opt.id).length) {
				$plugins.uiAjax({
					id: wrap,
					url: src,
					add: true,
					callback: function(){
						act();
					}
				});
			} else {
				act();
			}
		} else {
			endfocus = null;
			remove = true;
			id = 'uiSystemModal';
			makeSystemModal();
		}

		if (endfocus === 'body') {
			endfocus = $('body').data('active');
		}

		function makeSystemModal(){
			var htmlSystem = '';
			
			htmlSystem += '<div class="ui-modal type-system '+ sClass +'" id="uiSystemModal">';
			htmlSystem += '<div class="ui-modal-wrap">';
			htmlSystem += '<div class="ui-modal-body">';
			htmlSystem += sMessage;
			htmlSystem += '</div>';
			htmlSystem += '<div class="ui-modal-footer">';
			htmlSystem += '<div class="btn-wrap">';

			if (type === 'confirm') {
				htmlSystem += '<button type="button" class="btn-base ui-modal-cancel"><span>'+ sBtnCancelTxt +'</span></button>';
			}

			htmlSystem += '<button type="button" class="btn-base ui-modal-confirm"><span>'+ sBtnConfirmTxt +'</span></button>';	
			htmlSystem += '</div>';
			htmlSystem += '</div>';
			htmlSystem += '</div>';
			htmlSystem += '</div>';

			$('body').append(htmlSystem);
			htmlSystem = '';
			act();
		}

		function act(){
			var $modal = $('#' + id);
			var $modalWrap = $modal.find('> .ui-modal-wrap');
			var $modalBody = $modalWrap.find('> .ui-modal-body');
			var $modalHeader = $modalWrap.find('> .ui-modal-header');
			var $modalFooter = $modalWrap.find('> .ui-modal-footer');
			var headerH = 0;
			var footerH = 0;

			$('.ui-modal').removeClass('current');
			$('body').addClass('scroll-no');
			
			$modal
				.attr('tabindex', '0')
				.attr('n', $('.ui-modal.open').length)
				.attr('role', 'dialog')
				.addClass('n' + $('.ui-modal.open').length + ' current')
				.data('scrolltop', scr_t)
				.data('active', endfocus)
				.data('closecallback', closeCallback);

			if (mobileFull && !$plugins.breakpoint) {
				$modal.addClass('type-full');
				mg = 0;
			} 

			$('html').addClass('is-modal');
			
			switch (ps) {
				case 'center' :
					$modal.addClass('ready ps-center');
					break;
				case 'top' :
					$modal.addClass('ready ps-top');
					break;
				case 'bottom' :
					$modal.addClass('ready ps-bottom');
					break;
			}

			if (innerScroll) {
				headerH = $modalHeader.length ? $modalHeader.outerHeight() : 0;
				footerH = $modalFooter.length ? $modalFooter.outerHeight() : 0;

				if (!h) {
					$modalBody
						.addClass('is-scrollable')
						.css({
							'max-height' : 'calc(100vh - '+ (headerH + footerH + (mg * 2)) +'px)',
							'overflow-y' : 'auto',
							'height' : '100%'
						});
				} else {
					$modalBody
						.addClass('is-scrollable')
						.css({
							'overflow-y' : 'auto',
							'height' : h + 'px'
						});
				}
				
			} else {
				!!w && $modalWrap.css('width', w);
				!!h && $modalBody.css({ 'height': h + 'px', 'overflow-y' : 'auto' });
			}
			
			clearTimeout(timer);
			timer = setTimeout(function(){
				win[global].uiFocusTab({ 
					selector: $modal, 
					type:'hold' 
				});

				$modal.addClass('open');

				!!sZindex && $modal.css('z-index', sZindex);
				callback && callback(opt);

				$('html').off('click.uimodaldim').on('click.uimodaldim', function(e){
					if(!$(e.target).closest('.ui-modal-wrap').length) {
						var openN = [];
						
						$('.ui-modal.open').each(function(){
							var thisN = $(this).attr('n');

							thisN !== undefined ?
								openN.push(thisN) : '';
						});
						
						var currentID = $('.ui-modal.open[n="'+ Math.max.apply(null, openN) +'"]').attr('id');

						if (currentID !== 'uiSystemModal') {
							$plugins.uiModalClose({ 
								id: currentID, 
								remove: remove,
								closeCallback: closeCallback
							});
						}
					}
				});

				$(win).outerHeight() < $modal.find('.ui-modal-wrap').outerHeight() ?
					$modal.addClass('is-over'):
					$modal.removeClass('is-over');
			},150);

			$(doc).find('.ui-modal-close').off('click.close').on('click.close', function(e){
				$plugins.uiModalClose({ 
					id: $(this).closest('.ui-modal').attr('id'), 
					remove: remove,
					closeCallback: closeCallback
				});
			});
			$(doc).find('.ui-modal-confirm').off('click.callback').on('click.callback', function(e){
				sConfirmCallback();
			});
			$(doc).find('.ui-modal-cancel').off('click.callback').on('click.callback', function(e){
				sCancelCallback();
			});
			$(doc).find('.ui-modal').find('button, a').off('click.act').on('click.act', function(e){
				var $this = $(this); 
				$this.closest('.ui-modal').data('active', $this);
			});
		}
	}
	win[global].uiModalClose.option = {
		remove: false,
		endfocus: false
	}
	function createUiSystemModalClose(){
		$plugins.uiModalClose({ 
			id: 'uiSystemModal', 
			remove: true
		});
	}
	function createUiModalClose(v) {
		var opt = $.extend(true, {}, win[global].uiModalClose.option, v),
			id = opt.id,
			remove = opt.remove,
			$modal = $('#' + id),
			endfocus = opt.endfocus,
			closeCallback = opt.closeCallback === undefined ? $modal.data('closecallback') === undefined ? false : $modal.data('closecallback') : opt.closeCallback;

		$modal.removeClass('open').addClass('close');

		var timer;
		var $modalPrev = $('.ui-modal.open.n' + ($('.ui-modal.open').length - 1));

		if (!$('.ui-modal.open').length) {
			endfocus = endfocus === false ? $('body').data('active') : typeof opt.endfocus === 'string' ? $('#' + opt.endfocus) : opt.endfocus;

			$('html').off('click.uimodaldim');
			$('html').removeClass('is-modal');
		} else {
			endfocus = endfocus === false ? $modalPrev.data('active') : typeof opt.endfocus === 'string' ? $('#' + opt.endfocus) : opt.endfocus;
		}

		$modalPrev.addClass('current');
		
		win[global].uiScroll({
			value: Number($modal.data('scrolltop'))
		});
		
		clearTimeout(timer);
		timer = setTimeout(function(){
			$modal.find('.ui-modal-wrap').removeAttr('style');
			$modal.find('.ui-modal-body').removeAttr('style');
			$modal.removeClass('ready is-over current close ps-bottom ps-top ps-center type-normal type-full n0 n1 n2 n3 n4 n5 n6 n7');
			$modal.removeAttr('n');
			
			if (!$('.ui-modal.open').length) {
				$("html, body").removeClass('scroll-no');
			}
			closeCallback ? closeCallback(opt) : '';
			remove ? $modal.remove() : '';

			console.log($modal.attr('id'), endfocus);

			!!endfocus ? endfocus.focus() : '';
		},210);
	}


	/* ------------------------
	* name : parallax box
	* date : 2020-06-13
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiParallax: function (opt) {
			return createUiParallax(opt);
		}
	});
	win[global].uiParallax.option = {
		id : null,
		scope : 'window'
	}
	function createUiParallax(opt) {	
		var opt = $.extend(true, {}, win[global].uiParallax.option, opt),
			$scope = opt.scope === 'window' ? $(win) : opt.scope,
			$parallax = opt.id === null ? $('.ui-parallax') : $('#' + opt.id),
			$item = $parallax.find('> .ui-parallax-item'),
			len = $item.length,
			i = 0;

		// var checkVisible = function (){
		// 	var itemTop = $item.eq(i).offset().top;

		// 	if ($scope.outerHeight() > itemTop && i < len) {
		// 		$item.eq(i).addClass('parallax-s');
		// 		i = i + 1;
		// 		checkVisible();
		// 	}
		// }
		// checkVisible();

		parallax();
		$scope.off('scroll.win').on('scroll.win', parallax);
		$item.find('*').off('focus.parallax').on('focus.parallax', function(){
			$(this).closest('.ui-parallax-item').addClass('parallax-s');
		});

		function parallax() {
			var $parallax = $('.ui-parallax');
			var $item = $parallax.find('.ui-parallax-item');

			var scopeH = $scope.outerHeight();
			var scopeT = Math.floor($scope.scrollTop());
			var baseT = Math.floor($item.eq(0).offset().top);

			for (var i = 0; i < len; i++) {
				var $current = $item.eq(i);
				
				var attrStart = $current.attr('start');
				var attrEnd = $current.attr('end');

				attrStart === undefined ? attrStart = 0 : '';
				attrEnd === undefined ? attrEnd = 0 : '';

				var h = Math.floor($current.outerHeight());
				var start = Math.floor($current.offset().top);
				var end = h + start;
				var s = scopeH * Number(attrStart) / 100;
				var e = scopeH * Number(attrEnd) / 100;
				
				if (opt.scope !== 'window') {
					start = (start + scopeT) - (baseT + scopeT);
					end = (end + scopeT) - (baseT + scopeT);
				}

				(scopeT >= start - s) ? $current.addClass('parallax-s') : $current.removeClass('parallax-s');
				(scopeT >= end - e) ? $current.addClass('parallax-e') : $current.removeClass('parallax-e');
			}
		}

		function act() {
			var scopeH = $scope.outerHeight();
			var scopeT = $scope.scrollTop();
			var addH = (scopeH / 6);

			var $parallax = $('.ui-parallax');
			var $item = $parallax.find('> .ui-parallax-item');

			

			var n = i;
			var itemCheck = function () {
				var $itemN = $item.eq(n >= len ? len - 1 : n);
				var itemTop = opt.scope === 'window' ? $itemN.offset().top : $itemN.position().top;

				// var h = $current.outerHeight();
				// var start = $current.position().top;
				// var end = h - winH + start;

				
				if (n >= len) {
					return false;
				}

				Math.abs(scopeH - itemTop) + addH < scopeT ?
					itemShow():
					itemHide();

				function itemShow(){
					$itemN.addClass('visible');
					n = n + 1;
					itemCheck();
				}
				function itemHide(){
					n = n - 1;
					$itemN.removeClass('visible');
				}
			}
			itemCheck();
		}
	}

	/* ------------------------
	* name : parallax box
	* date : 2020-06-13
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiPopupBook: function () {
			return createUiPopupBook();
		}
	});
	function createUiPopupBook() {	
		var $wrap = $('.ui-popupbook');
					
        $wrap.off('mouseover.pspt').on('mouseover.pspt', function(){
            $wrap.off('mousemove.pspt').on('mousemove.pspt', function(event){
                event = event || window.event;
				
				var wrapL = $wrap.position().left;
                var _x = ( event.pageX ) ? event.pageX - wrapL : event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - wrapL; 
                var isMove = $wrap.data('move');

                if (_x > $wrap.outerWidth() / 2) {
                    if (!isMove || isMove === 'right') {
                        moving('.ui-popupbook-scene-a', true, 'left');
                        moving('.ui-popupbook-scene-b', true, 'left');
                        moving('.ui-popupbook-scene-c', true, 'left');
                    } 
                } else {
                    if (!isMove || isMove === 'left') {
                        moving('.ui-popupbook-scene-a', true, 'right');
                        moving('.ui-popupbook-scene-b', true, 'right');
                        moving('.ui-popupbook-scene-c', true, 'right');
                    } 
                }
            });
        }).off('mouseleave.pspt').on('mouseleave.pspt', function(){
            moving('.ui-popupbook-scene-a', false);
            moving('.ui-popupbook-scene-b', false);
            moving('.ui-popupbook-scene-c', false);
        });

        $wrap.find('.ui-popupbook-item').off('mouseover.pspti').on('mouseover.pspti', function(event){
            pause();
        }).off('mouseleave.pspti').on('mouseleave.pspti', function(event){
            moving('.ui-popupbook-scene-a', false);
            moving('.ui-popupbook-scene-b', false);
            moving('.ui-popupbook-scene-c', false);
        });

        function pause() {
			$wrap.data('move', 'stop');
			$('.ui-popupbook-scene-a').stop();
			$('.ui-popupbook-scene-b').stop();
			$('.ui-popupbook-scene-c').stop();
        }
        function moving(t, v, w){
            var $scene = $(t);

            if (v) {
                var n = $scene.outerWidth() - $wrap.outerWidth();
                var per = Math.floor((n - Math.abs($scene.position().left)) / n * 100);
                var per2 = Math.floor(Math.abs($scene.position().left) / n * 100);
                var speed = 8000 * (per / 100);
                var speed2 = 8000 * (per2 / 100);

                if (w === 'left') {
                    $wrap.data('move', 'left');
                    $scene.stop().animate({
                        left: ($scene.outerWidth() - $wrap.outerWidth()) * -1 + 'px'
                    }, speed);
                } else {
                    $wrap.data('move', 'right');
                    $scene.stop().animate({
                        left: 0
                    }, speed2);
                }
            } else {
				$wrap.data('move', false);
				$scene.stop();	
            }
        }
	}


	/* ------------------------
	* name : tab
	* date : 2020-06-14
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiTab: function (opt) {
			return createUiTab(opt);
		},
		uiTabAction: function (opt) {
			return createuiTabAction(opt);
		}
	});
	win[global].uiTab.option = {
		current: 0,
		onePanel: false,
		callback: false,
		effect: false,
		align : 'center'
	};
	function createUiTab(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiTab.option, opt),
			id = opt.id,
			effect = opt.effect,
			current = isNaN(opt.current) ? 0 : opt.current,
			onePanel = opt.onePanel,
			callback = opt.callback,
			align = opt.align;
			
		var	$tab = $('#' + id),
			$btns = $tab.find('> .ui-tab-btns'),
			$btn = $btns.find('.ui-tab-btn'),
			$pnls = $tab.find('> .ui-tab-pnls'),
			$pnl = $pnls.find('> .ui-tab-pnl');

		var	len = $btn.length,
			keys = win[global].option.keys;
			
		var	para = win[global].uiPara('tab'),
			paras,
			paraname;

		//set up
		if (!!para) {
			if (para.split('+').length > 1) {
				//2 or more : tab=exeAcco1*2+exeAcco2*3
				paras = para.split('+');

				for (var j = 0; j < paras.length; j++ ) {
					paraname = paras[j].split('*');
					opt.id === paraname[0] ? current = Number(paraname[1]) : '';
				}
			} else {
				//only one : tab=1
			 	if (para.split('*').length > 1) {
					paraname = para.split('*');
					opt.id === paraname[0] ? current = Number(paraname[1]) : '';
				} else {
					current = Number(para);
				}
			}
		}

		//set up
		!!effect && $tab.addClass(effect);
		$tab.data('opt', opt);
		$btns.attr('role','tablist');
		$btn.attr('role','tab');
		$pnl.attr('role','tabpanel');
		
		var ps_l = [];

		for (var i = 0; i < len; i++) {
			var $btnN = $btn.eq(i);
			var $pnlN = $pnl.eq(i);
			
			if ($btnN.data('tabnum') === undefined ) {
				$btnN.attr('data-tabnum', i);
			}

			var tabN = Number($btnN.data('tabnum'));
			var isCurrent = current === tabN;
			var cls = isCurrent ? 'addClass' : 'removeClass';
			var attrs = isCurrent ? 'removeAttr' : 'attr';
			
			//make ID
			$btnN.attr('id') === undefined ? $btnN.attr('id', id + 'Btn' + tabN) : '';
			$pnlN.attr('id') === undefined ? $pnlN.attr('id', id + 'Pnl' + tabN) : '';
			
			var btnID = $btnN.attr('id');
			var pnlID = $pnlN.attr('id');

			if (!onePanel) {
				$btnN.attr('aria-controls', pnlID)[cls]('selected');
				$btnN.attr('aria-controls', $pnlN.attr('id'));
				$pnlN.attr('aria-labelledby', btnID).attr('aria-hidden', (current === tabN) ? false : true)[attrs]('tabindex', -1)[cls]('selected');
			} else {
				$btnN.attr('aria-controls', $pnl.eq(0).attr('id')).addClass('selected');
				isCurrent && $pnl.attr('aria-labelledby', btnID).addClass('selected');
			}

			if (isCurrent) {
				$btnN.attr('aria-selected', true).addClass('selected');
			} else {
				$btnN.attr('aria-selected', false).removeClass('selected');
			}
				
			ps_l.push(Math.ceil($btnN.position().left));

			i === 0 ? $btnN.attr('tab-first', true) : '';
			i === len - 1 ? $btnN.attr('tab-last', true) : ''
		}

		callback ? callback(opt) : '';
		$btn.data('psl', ps_l).data('len', len);

		win[global].uiScroll({ 
			value: ps_l[current], 
			target: $btns,
			speed: 0, 
			ps: align
		});

		//event
		$btn.off('click.uitab keydown.uitab')
			.on({
				'click.uitab': evtClick,
				'keydown.uitab': evtKeys
			});

		function evtClick() {
			win[global].uiTabAction({ 
				id: id, 
				current: $(this).index(), 
				align:align 
			}); 
		}
		function evtKeys(e) {
			var $this = $(this),
				n = $this.index(),
				m = Number($this.data('len'));

			switch(e.keyCode){
				case keys.up: upLeftKey(e);
				break;

				case keys.left: upLeftKey(e);
				break;

				case keys.down: downRightKey(e);
				break;

				case keys.right: downRightKey(e);
				break;

				case keys.end: endKey(e);
				break;

				case keys.home: homeKey(e);
				break;
			}

			function upLeftKey(e) {
				e.preventDefault();
				!$this.attr('tab-first') ? 
				win[global].uiTabAction({ id: id, current: n - 1, align:align }): 
				win[global].uiTabAction({ id: id, current: m - 1, align:align});
			}
			function downRightKey(e) {
				e.preventDefault();
				!$this.attr('tab-last') ? 
				win[global].uiTabAction({ id: id, current: n + 1, align:align }): 
				win[global].uiTabAction({ id: id, current: 0, align:align });
			}
			function endKey(e) {
				e.preventDefault();
				win[global].uiTabAction({ id: id, current: m - 1, align:align });
			}
			function homeKey(e) {
				e.preventDefault();
				win[global].uiTabAction({ id: id, current: 0, align:align });
			}
		}
	}
	function createuiTabAction(opt) {
		var id = opt.id,
			$tab = $('#' + id),
			$btns = $tab.children('.ui-tab-btns'),
			$btn = $btns.find('.ui-tab-btn'),
			$pnls = $tab.children('.ui-tab-pnls'),
			$pnl = $pnls.children('.ui-tab-pnl'),
			$target = $btns;

		var ps_l = $btn.data('psl'),
			
			opt = $.extend(true, {}, $tab.data('opt'), opt),
			current = isNaN(opt.current) ? 0 : opt.current,
			onePanel = opt.onePanel,
			align = opt.align,
			callback = opt.callback;

		//$btn.eq(current).append('<b class="hide">선택됨</b>');

		var currentPnl = $btns.find('.ui-tab-btn[data-tabnum="'+ current +'"]').index();
		$btn.removeClass('selected').eq(current).addClass('selected').focus();

		var $btnN = $btn.eq(current),
			btnId = $btn.eq(currentPnl).attr('id');

		if ($btns.hasClass('ui-scrollbar')) {
			$target = $btns.find('> .ui-scrollbar-item');
		}

		win[global].uiScroll({ 
			value: ps_l[current], 
			addLeft : $btn.outerWidth(),
			target: $target, 
			speed: 300, 
			ps: align 
		});

		if (onePanel === false) {
			$pnl.attr('aria-hidden', true).removeClass('selected').attr('tabindex', '-1');
			$pnl.eq(current).addClass('selected').attr('aria-hidden', false).removeAttr('tabindex');
		} else {
			$pnl.attr('aria-labelledby', btnId);
		}

		!!callback ? callback(opt) : '';
	}   


	/* ------------------------
	* name : print
	* date : 2020-06-14
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiPrint: function (opt) {
			return createUiPrint(opt);
		}
	});
	function createUiPrint(opt) {
		var $print = typeof opt.id === 'object' ? opt.id : $('[print-id="'+ opt.id+'"]'),
			$body = $('body'),
			clone = $print.clone(),
			html = '<div class="ui-print"></div>';
		
		function preview_print(){ 
			var webBrowser ='<OBJECT ID="previewWeb" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
			
			doc.body.insertAdjacentHTML('beforeEnd', webBrowser);
			previewWeb.ExecWB(7,1);
			previewWeb.outerHTML='';
		} 

		if (self !== top) {
			parent.$body.append(html);
			parent.$('.ui-print').append(clone);
			
			win[global].browser.ie ? preview_print() : win.parent.print();

			setTimeout(function () {
				parent.$('.ui-print').remove();
			}, 0);
		} else {
			$body.addClass('ui-print-ing').append(html);

			$('.ui-print').append(clone);
			
			win[global].browser.ie ? preview_print() : win.print();
			
			setTimeout(function () {
				$body.removeClass('ui-print-ing')
				$('.ui-print').remove();
			}, 0);
		}
	}


	/* ------------------------
	* name : tooltip
	* date : 2020-06-15
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiTooltip: function (opt) {
			return createUiTooltip(opt);
		}
	});
	win[global].uiTooltip.option = {
		visible: null,
		id: false,
		ps: false
	};
	function createUiTooltip(opt){
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiTooltip.option, opt);

		var $btn = $('.ui-tooltip-btn'),
			$tip = opt.id ? typeof opt.id === 'string' ? $('#' + opt.id) : opt.id : false,
			visible = opt.visible,
			id = opt.id ? $tip.attr('id') : '',
			
			sp = 10,
			ps = opt.ps,
			timer,
			class_ps = 'ps-ct ps-cb ps-lt ps-lb ps-rt ps-rb';

		if (visible !== null) {
			visible ? tooltipSet(id) : tooltipHide();
		}

		// $btn
		// .on('click', function(e){
		// 	e.preventDefault();
		// 	tooltipSet($(this).attr('aria-describedby'));
		// });

		$btn
		.off('mouseover.ui focus.ui').on('mouseover.ui focus.ui', function(e){
			e.preventDefault();
			tooltipSet(this);
		})
		.off('mouseleave.ui ').on('mouseleave.ui', function(){
			tooltipHideDelay();

			$('.ui-tooltip').on('mouseover.ui', function(){
				clearTimeout(timer);
			}).on('mouseleave.ui', function(e){
				tooltipHideDelay();
			});
		});

		$btn
		.off('touchstart.uitooltip').on('touchstart.uitooltip', function(e){
			e.preventDefault();
			var $this = $(this);

			if (!$this.data('view')){
				$this.data('view', true);
				tooltipHide();
				tooltipSet(this);
			} else {
				$this.data('view', false);
				tooltipHide();
			}

			// $(doc).off('click.bdd').on('click.bdd', function(e){
			// 	//dropdown 영역 외에 클릭 시 판단
			// 	if (!!$('body').data('dropdownOpened')){
			// 		if ($('.ui-tooltip').has(e.target).length < 1) {
			// 			tooltipHide();
			// 		}
			// 	}
			// });
		});

		function tooltipSet(v) {
			var $t = $(v);
			var $win = $(win);
			var $doc = $(doc);
			var id = $t.attr('aria-describedby');
			var src = $t.data('src');

			var off_t = $t.offset().top;
			var off_l =$t.offset().left;
			var w = $t.outerWidth();
			var h = $t.outerHeight();
			var bw = $win.innerWidth();
			var bh = $win.innerHeight();
			var st = $doc.scrollTop();
			var sl = $doc.scrollLeft();
			
			if (!!src && !$('#' + id).length) {
				$('body').append('<div class="ui-tooltip" id="'+ id +'" role="tooltip" aria-hidden="true"><div class="ui-tooltip-arrow"></div>')

				$plugins.uiAjax({
					id: $('#' + id),
					url: src,
					add: true,
					callback: function(){
						act();
					}
				});
			} else {
				act();
			}
			
			function act(){
				$('#' + id).removeClass(class_ps);	
				tooltipShow(off_t, off_l, w, h, bw, bh, st, sl, id, false);
			}
		}
		function tooltipHide() {
			$('.ui-tooltip').removeAttr('style').attr('aria-hidden', true).removeClass(class_ps);
		}
		function tooltipHideDelay(){
			timer = setTimeout(tooltipHide, 100);
		}

		function tooltipShow(off_t, off_l, w, h, bw, bh, st, sl, id) {
			var $id = $('#' + id),
				pst = (bh / 2 > (off_t - st) + (h / 2)) ? true : false,
				psl = (bw / 2 > (off_l - sl) + (w / 2)) ? true : false,
				tw = $id.outerWidth(),
				th = $id.outerHeight(),
				ps_l, ps_r, cursorCls = 'ps-';
				
			if (psl) {
				if (off_l - sl > tw / 2) {
					cursorCls += 'c';
					ps_l = off_l - (tw / 2) + (w / 2);
				} else {
					cursorCls += 'l';
					ps_l = off_l;
				}
			} else {
				if (bw - (off_l - sl + w) > tw / 2) {
					cursorCls += 'c';
					ps_r = Math.ceil(off_l) - (tw / 2) + (w / 2);
				} else {
					cursorCls += 'r';
					ps_r = off_l - tw + w;
				}
			}

			ps ? cursorCls = 'ps-l' : '';
			ps ? ps_l = off_l : '';
			ps ? psl = true : '';
			pst ? cursorCls += 'b' : cursorCls += 't';

			if (!!$id.attr('modal')) {
				if (!win[global].browser.oldie) {
					ps_l = ps_l;
					ps_r = ps_r;
				}

				win[global].browser.ie ? '' : off_t = off_t;
			}

			if (!!$id.closest('.type-fixed-bottom').length) {
				off_t = off_t - $('ui-modal-tit').outerHeight();
			}

			$id.addClass(cursorCls).attr('aria-hidden', false).css({ 
				display:'block'
			}).css({
				top : pst ? off_t + h + sp : off_t - th - sp,
				left : psl ? ps_l : ps_r
			});
		}
	}


	/* ------------------------
	* name : date picker
	* date : 2020-06-15
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiDatePicker: function (opt) {
			return createUiDatePicker(opt);
		}
	});
	win[global].uiDatePicker.option = {
		selector: '.ui-datepicker',
		type : 'normal',
		period: false,
		title: false,
		dateSplit: '-',

		openback: false,
		closeback: false,
		dual: false,
		callback: null,
		shortDate: false, //DDMMYYYY
		dateMonths: new Array('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'),
		weekDay: new Array('일', '월', '화', '수', '목', '금', '토')
	};
	function createUiDatePicker(opt) {
		var opt = $.extend(true, {}, win[global].uiDatePicker.option, opt),
			dateSplit = opt.dateSplit,
			selector = opt.selector,
			period = opt.period,
			dual = opt.dual,
			type = opt.type,
			openback = opt.openback,
			date_title = opt.title,
			closeback = opt.closeback,
			callback = opt.callback,
			dateMonths = opt.dateMonths,
			weekDay = opt.weekDay,
			shortDate = opt.shortDate;

		var	$datepicker = $(selector),
			date = new Date(),
			dateToday = date,
			calVar,
			day_start,
			day_end;

		win[global].uiDatePicker.option.dual = dual;
		$datepicker.data('opt', { callback: callback, shortDate: shortDate, openback: openback, closeback: closeback, period: period });

		//이달의 날짜 텍스트화
		function textDate(d, m, y, whatday) {
			var _date = new Date(y, m - 1, d);
			var gDate = _date.getFullYear() + dateSplit + dateMonths[_date.getMonth()] + dateSplit + win[global].option.partsAdd0(_date.getDate());

			if (whatday === true) {
				//요일 추가
				return (gDate + " (" + weekDay[_date.getDay()] + ")");
			} else {
				return (gDate);
			}
		}

		//사용여부확인 필요
		function subtractDate(oneDate, anotherDate) {
			return (anotherDate - oneDate);
		}

		//DD.MM.YYYY 순으로 정렬
		function toDDMMYYYY(d) {
			var d = new Date(d);
			return (win[global].option.partsAdd0(d.getDate()) + dateSplit + win[global].option.partsAdd0(d.getMonth() + 1) + dateSplit + d.getFullYear());
		}

		//input에 출력
		function writeInputDateValue(calendarEl, obj, end) {
			var d = $(obj).data("day"),
				id = calendarEl.inputId,
				org_id = id,
				opt = $("#" + id).closest('.ui-datepicker').data('opt');

			!!end ? id = id + '_end' : '';

			//DD.MM.YYYY로 설정
			calendarEl.shortDate ? d = toDDMMYYYY(d) : '';

			$("#" + id).val(d);

			//기간설정
			d !== '' ? $("#" + id).closest('.field-inlabel').addClass('activated') : '';
			!!opt.callback ? opt.callback({ id: id, value: d, name: end ? $('#' + id).attr('name') : $('#' + org_id).attr('name')}) : '';
		}
		function writeInputMonthValue(calendarEl, obj) {
			var getMonth = $(obj).data("month"),
				getyear = $(obj).closest('.datepicker-head-select').find('select').val(),
				id = calendarEl.inputId,
				opt = $("#" + id).closest('.ui-datepicker').data('opt'),
				getYM = getyear + dateSplit + win[global].option.partsAdd0(getMonth);

			//DD.MM.YYYY로 설정
			calendarEl.shortDate ? getYM = toDDMMYYYY(getYM) : '';

			$("#" + id).val(getYM);

			//기간설정
			getYM !== '' ? $("#" + id).closest('.field-inlabel').addClass('activated') : '';
			!!opt.callback ? opt.callback({ id: id, value: getYM, name: $('#' + id).attr('name')}) : '';
		}

		function calendarObject(opt) {
			this.calId = opt.calId;
			this.dpId = opt.dpId;
			this.inputId = opt.inputId;
			this.buttonId = opt.buttonId;
			this.shortDate = opt.shortDate;
		}

		//사용여부확인 필요
		function matchToday() {
			$('.tbl-datepicker button').not(':disabled').each(function () {
				var $this = $(this);

				$this.data('day') === textDate(dateToday.getDate(), dateToday.getMonth() + 1, dateToday.getFullYear(), false)
					? $this.attr('title', $this.attr('aria-label') + ' 오늘 입니다.').addClass('today')
					: '';
			});
		}

		//달력 Build
		function buildCalendar(date, calendarEl, v) {
			var inp_val = $('#' + calendarEl.inputId).val(),
				nVal = inp_val.split(dateSplit),
				generate = v === 'generate' ? true : false,
				day = !generate ? date.getDate() : inp_val === '' ? date.getDate() : Number(nVal[2]),
				month = !generate ? date.getMonth() : inp_val === '' ? date.getMonth() : Number(nVal[1] - 1),
				year = !generate ? date.getFullYear() : inp_val === '' ? date.getFullYear() : Number(nVal[0]),
				prevMonth = new Date(year, month - 1, 1),
				thisMonth = new Date(year, month, 1),
				nextMonth = new Date(year, month + 1, 1),
				firstWeekDay = thisMonth.getDay(),
				daysInMonth = Math.floor((nextMonth.getTime() - thisMonth.getTime()) / (1000 * 60 * 60 * 24)),
				daysInMonth_prev = Math.floor((thisMonth.getTime() - prevMonth.getTime()) / (1000 * 60 * 60 * 24)),
				$input = $('#' + calendarEl.inputId).eq(0),
				tit = !date_title ? $input.attr('title') : date_title,
				_minDay = new Array(),
				_maxDay = new Array(),
				htmlHead = '',
				//_isOver = false,
				mm = nextMonth.getMonth(),
				week_day;

			$input.attr('data-min') !== undefined ? _minDay = $input.attr('data-min').split(dateSplit, 3) : _minDay[0] = 1910;// 최소 선택 가능
			$input.attr('data-max') !== undefined ? _maxDay = $input.attr('data-max').split(dateSplit, 3) : _maxDay[0] = 2050;// 최대 선택 가능
			month === 2 ? daysInMonth = 31 : '';

			$('#' + calendarEl.dpId).data('min-month', _minDay[0] + _minDay[1]).data('max-month', _maxDay[0] + _maxDay[1]);

			/* datepicker-head -------------------- */
			htmlHead += '<button type="button" class="btn-close ui-datepicker-close"><span class="hide">닫기</span></button>';
			htmlHead += '<div class="datepicker-head">';

			/* title: datepicker-head-tit */
			if (period && !date_title) {
				htmlHead += '<div class="datepicker-head-tit">' + tit + ' ~ '+ $('#' + calendarEl.inputId + '_end').attr('title') +'</div>';
			} else {
				htmlHead += '<div class="datepicker-head-tit">' + tit + '</div>';
			}
			
			/* 년월 선택: datepicker-head-select */
			// if (type === 'normal') {
				
			// 	htmlHead += '<div class="datepicker-head-select">';
			// 	htmlHead += '<div class="ui-select datepicker-head-year">';
			// 	htmlHead += '<select title="년도 선택" id="sel_' + calendarEl.inputId + '_year">';
			// 	console.log('_minDay[0]', _minDay[0], _minDay[1],  _maxDay[1])
			// 	for (var y = Number(_minDay[0]); y < Number(_maxDay[0]) + 1; y++) {
			// 		htmlHead += y === year ? '<option value="' + y + '" selected>' + y + '년</option>' : '<option value="' + y + '">' + y + '년</option>';
			// 	}

			// 	htmlHead += '</select>';
			// 	htmlHead += '</div>';
			// 	htmlHead += '<div class="ui-select datepicker-head-month">';
			// 	htmlHead += '<select title="월 선택" id="sel_' + calendarEl.inputId + '_month">';

			// 	for (var m = Number(_minDay[1]); m < Number(_maxDay[1]) + 1; m++) {
			// 		m < 10 ? m = '0' + m : '';
			// 		htmlHead += m === month + 1 ? '<option value="' + Number(m) + '" selected>' + m + '월</option>' : '<option value="' + Number(m) + '">' + m + '월</option>';
			// 		m = Number(m);
			// 	}

			// 	htmlHead += '</select>';
			// 	htmlHead += '</div>';
			// 	htmlHead += '</div>';
		
			// }  
			if (type === 'month') {
				htmlHead += '<div class="datepicker-head-select">';
				htmlHead += '<div class="ui-select">';
				htmlHead += '<select title="년도 선택" id="sel_' + calendarEl.inputId + '_year">';

				for (var y = Number(_minDay[0]); y < Number(_maxDay[0]) + 1; y++) {
					htmlHead += y === year ? '<option value="' + y + '" selected>' + y + '년</option>' : '<option value="' + y + '">' + y + '년</option>';
				}

				htmlHead += '</select>';
				htmlHead += '</div>';
				htmlHead += '<div class="datepicker-head-month">';
				for (var m = 1; m < 13; m++) {
					m < 10 ? m = '0' + m : '';
					htmlHead += m === month + 1 ? 
						'<button type="button" class="btn-base datepicker-month" data-month="' + Number(m) + '" selected><span>' + m + '월</span></button>' : 
						'<button type="button" class="btn-base datepicker-month" data-month="' + Number(m) + '"><span>' + m + '월</span></button>';
					m = Number(m);
				}
				htmlHead += '</div>';
				htmlHead += '</div>';
			}
			

			if (type === 'normal') {
				/* 년월 선택: button */
				htmlHead += '<div class="datepicker-head-btn">';
				htmlHead += '<div class="datepicker-head-y">';
				htmlHead += '<button type="button" class="btn-arrow ui-datepicker-prev-y" title="이전 년도"><span class="hide">이전 ' + (year - 1) + ' 년으로 이동</span></button>';
				htmlHead += '<span class="year" data-y="' + year + '"><strong>' + year + '</strong>년</span> ';
				htmlHead += '<button type="button" class="btn-arrow ui-datepicker-next-y" title="다음 년도"><span class="hide">다음 ' + (year + 1) + ' 년으로 이동</span></button>';
				htmlHead += '</div>';

				htmlHead += '<div class="datepicker-head-m">';
				htmlHead += '<button type="button" class="btn-arrow ui-datepicker-prev" title="이전 달">';
				(dual) 
					? htmlHead += '<span class="hide">이전 ' + dateMonths[(month === 0) ? 11 : month - 2] + ' 월로 이동</span></button>'
					: htmlHead += '<span class="hide">이전 ' + dateMonths[(month === 0) ? 11 : month - 1] + ' 월로 이동</span></button>';
				htmlHead += '<span class="month" data-m="' + dateMonths[month] + '"><strong>' + dateMonths[month] + '</strong>월</span>';
				htmlHead += '<button type="button" class="btn-arrow ui-datepicker-next" title="다음 달">';
				(dual) 
					? htmlHead += '<span class="hide">다음 ' + dateMonths[(month == 11) ? 0 : month + 2] + ' 월로 이동</span></button>'
					: htmlHead += '<span class="hide">다음 ' + dateMonths[(month == 11) ? 0 : month + 1] + ' 월로 이동</span></button>';
				
				htmlHead += '</div>';

				htmlHead += '</div>';

				/* today */
				htmlHead += '<div class="datepicker-head-today">';
				htmlHead += '<button type="button" class="btn-today" data-day=' + textDate(dateToday.getDate(), dateToday.getMonth() + 1, dateToday.getFullYear(), false) + ' title="오늘'+ textDate(dateToday.getDate(), dateToday.getMonth() + 1, dateToday.getFullYear(), true) +'로 이동"><span class="hide">today</span></button>';
				htmlHead += '</div>';
				htmlHead += '<div class="datepicker-head-week">';
				htmlHead += '<span scope="col" class="day-sun"><abbr title="일요일">' + weekDay[0] + '</abbr></span>';
				htmlHead += '<span scope="col"><abbr title="월요일">' + weekDay[1] + '</abbr></span>';
				htmlHead += '<span scope="col"><abbr title="화요일">' + weekDay[2] + '</abbr></span>';
				htmlHead += '<span scope="col"><abbr title="수요일">' + weekDay[3] + '</abbr></span>';
				htmlHead += '<span scope="col"><abbr title="목요일">' + weekDay[4] + '</abbr></span>';
				htmlHead += '<span scope="col"><abbr title="금요일">' + weekDay[5] + '</abbr></span>';
				htmlHead += '<span scope="col" class="day-sat"><abbr title="토요일">' + weekDay[6] + '</abbr></span>';
				htmlHead += '</div>';

				/* datepicker-head-date */
				// htmlHead += '<div class="datepicker-head-date">';

				// if (dual) {
				// 	htmlHead += '<div class="datepicker-period-head">';

				// 	htmlHead += '<div class="n1">';
				// 	htmlHead += '<span class="year" data-y="' + year + '"><strong>' + year + '</strong>년</span> ';
				// 	htmlHead += '<span class="month" data-m="' + dateMonths[month] + '"><strong>' + dateMonths[month] + '</strong>월</span>';
				// 	htmlHead += '</div>';

				// 	htmlHead += '<div class="n2">';

				// 	if (month === 11) {
				// 		htmlHead += '<span class="year2" data-y="' + (year + 1) + '"><strong>' + (year + 1) + '</strong>년</span> ';
				// 		htmlHead += '<span class="month2" data-m="' + dateMonths[0] + '"><strong>' + dateMonths[0] + '</strong>월</span>';
				// 	} else {
				// 		htmlHead += '<span class="year2" data-y="' + year + '"><strong>' + year + '</strong>년</span> ';
				// 		htmlHead += '<span class="month2" data-m="' + dateMonths[month + 1] + '"><strong>' + dateMonths[month + 1] + '</strong>월</span>';
				// 	}

				// 	htmlHead += '</div>';
				// 	htmlHead += '</div>';
					
				// } else {
				// 	htmlHead += '<span class="year" data-y="' + year + '"><strong>' + year + '</strong>년</span> ';
				// 	htmlHead += '<span class="month" data-m="' + dateMonths[month] + '"><strong>' + dateMonths[month] + '</strong>월</span>';
				// }

				// htmlHead += '</div>';
				htmlHead += '</div>';

				/* datepicker-core -------------------- */
				htmlHead += '<div class="datepicker-core"></div>';
			}
			
			htmlHead += '<div class="datepicker-foot">';
			htmlHead += '<button type="button" class="btn-base-s ui-datepicker-close"><span>닫기</span></button>';
			htmlHead += '</div>';


			return htmlHead;
		}
		function buildCore(date, calendarEl, v , endMinMax) {
			var $base = $('#' + calendarEl.calId);
			var $end = $('#' + calendarEl.inputId + '_end');
			var $prevM = $base.find('.ui-datepicker-prev');
			var $nextM = $base.find('.ui-datepicker-next');
			var $prevY = $base.find('.ui-datepicker-prev-y');
			var $nextY = $base.find('.ui-datepicker-next-y')
			var $headDate = $base.find('.datepicker-head-btn');
			var $headDateYearE = $headDate.find('.year2');
			var $headDateMonthE = $headDate.find('.month2');
			var $headYear = $base.find('.datepicker-head-year');
			var $headmonth = $base.find('.datepicker-head-month');

			var inp_val = $('#' + calendarEl.inputId).val(),
				nVal = inp_val.split(dateSplit),
				generate = v === 'generate' ? true : false,
				day = !generate ? date.getDate() : inp_val === '' ? date.getDate() : Number(nVal[2]),
				month = !generate ? date.getMonth() : inp_val === '' ? date.getMonth() : Number(nVal[1] - 1),
				year = !generate ? date.getFullYear() : inp_val === '' ? date.getFullYear() : Number(nVal[0]),
				prevMonth = new Date(year, month - 1, 1),
				thisMonth = new Date(year, month, 1),
				nextMonth = new Date(year, month + 1, 1),
				nextMonth2 = new Date(year, month + 2, 1),
				firstWeekDay = thisMonth.getDay(),
				nextWeekDay = nextMonth.getDay(),
				prevWeekDay = prevMonth.getDay(),
				daysInMonth = Math.floor((nextMonth.getTime() - thisMonth.getTime()) / (1000 * 60 * 60 * 24)),
				daysInMonth_prev = Math.floor((thisMonth.getTime() - prevMonth.getTime()) / (1000 * 60 * 60 * 24)),
				daysInMonth_next = Math.floor((nextMonth2.getTime() - nextMonth.getTime()) / (1000 * 60 * 60 * 24)),
				$input = $('#' + calendarEl.inputId).eq(0),
				tit = $input.attr('title'),
				_minDay = new Array(),
				_maxDay = new Array(),
				mm = nextMonth.getMonth(),
				week_day,
				empty_before = daysInMonth_prev - firstWeekDay,
				empty_after = 0,
				endMinMax = endMinMax === undefined ? false : endMinMax;

			var dateMonthsNext = dateMonths[month + 1];
			var dateMonthsNow = dateMonths[month];

			dateMonthsNext === undefined ? dateMonthsNext = '01' : '';

			// 최소,최대 선택 가능
			if (endMinMax) {
				$end.attr('data-min', $input.attr('data-min'));
				$end.attr('data-min') !== undefined ? _minDay = $end.attr('data-min').split(dateSplit, 3) : _minDay[0] = 1910;
				$end.attr('data-max') !== undefined ? _maxDay = $end.attr('data-max').split(dateSplit, 3) : _maxDay[0] = 2050;
			} else {
				$input.attr('data-min') !== undefined ? _minDay = $input.attr('data-min').split(dateSplit, 3) : _minDay[0] = 1910;
				$input.attr('data-max') !== undefined ? _maxDay = $input.attr('data-max').split(dateSplit, 3) : _maxDay[0] = 2050;
			}

			month === 2 ? daysInMonth = 31 : '';
			
			if (dual) {
				$prevM.find('span').text('이전 ' + dateMonths[(month - 2 < 0) ? (month - 2 < -1) ? 10 : 11 : month - 2] + '월로 이동');
				$nextM.find('span').text('다음 ' + dateMonths[(month + 2 > 11) ? (month + 2 > 12) ? 1 : 0 : month + 2] + '월로 이동');
			} else {
				$prevM.find('span').text('이전 ' + dateMonths[(month - 1 < 0) ? 11 : month - 1] + '월로 이동');
				$nextM.find('span').text('다음 ' + dateMonths[(month + 1 > 11) ? 0 : month + 1] + '월로 이동');
			}
			
			$headDate.find('.year').data('y', year).find('strong').text(year);
			$headDate.find('.month').data('m', dateMonthsNow).find('strong').text(dateMonthsNow);

			if (dual) {
				if (month + 1 === 12) {
					$headDateYearE.data('y', year + 1).find('strong').text(year + 1);
					$headDateMonthE.data('m', dateMonths[0]).find('strong').text(dateMonths[0]);
				} else {
					$headDateYearE.data('y', year).find('strong').text(year);
					$headDateMonthE.data('m', dateMonthsNext).find('strong').text(dateMonthsNext);
				}
			}

			$headYear.find('option').prop('selected', false).removeAttr('selected');
			$headYear.find('option[value="' + year + '"]').prop('selected', true);
			$headmonth.find('option').prop('selected', false).removeAttr('selected');
			$headmonth.find('option[value="' + (month + 1) + '"]').prop('selected', true);

			year <= _minDay[0] && dateMonthsNow <= _minDay[1] ?
				$prevM.addClass('disabled').attr('disabled') :
				$prevM.removeAttr('disabled').removeClass('disabled');

			year <= _minDay[0] ?
				$prevY.addClass('disabled').attr('disabled') :
				$prevY.removeAttr('disabled').removeClass('disabled');

			year >= _maxDay[0] && dateMonthsNow >= _maxDay[1] ?
				$nextM.addClass('disabled').attr('disabled') :
				$nextM.removeAttr('disabled').removeClass('disabled');

			year >= _maxDay[0] ?
				$nextY.addClass('disabled').attr('disabled') :
				$nextY.removeAttr('disabled').removeClass('disabled');

			//table datepicker
			var htmlCalendar = '';
			htmlCalendar += '<div class="tbl-datepicker" data-date="' + year + '' + dateMonthsNow + '">';

			htmlCalendar += '<div class="tbl-datepicker-head" role="text">';
			htmlCalendar += '<span class="year" data-y="' + year + '"><strong>' + year + '</strong>년</span> ';
			htmlCalendar += '<span class="month" data-m="' + dateMonths[month] + '"><strong>' + dateMonths[month] + '</strong>월</span>';
			htmlCalendar += '</div>';

			htmlCalendar += '<table>';
			// htmlCalendar += '<caption>' + year + '년 ' + dateMonthsNow + '월 일자 선택</caption>';
			htmlCalendar += '<colgroup>';
			htmlCalendar += '<col class="n1">';
			htmlCalendar += '<col span="5" class="n1">';
			htmlCalendar += '<col class="n1">';
			htmlCalendar += '</colgroup>';
			// htmlCalendar += '<thead><tr>';
			// htmlCalendar += '<th scope="col" class="day-sun"><abbr title="일요일">' + weekDay[0] + '</abbr></th>';
			// htmlCalendar += '<th scope="col"><abbr title="월요일">' + weekDay[1] + '</abbr></th>';
			// htmlCalendar += '<th scope="col"><abbr title="화요일">' + weekDay[2] + '</abbr></th>';
			// htmlCalendar += '<th scope="col"><abbr title="수요일">' + weekDay[3] + '</abbr></th>';
			// htmlCalendar += '<th scope="col"><abbr title="목요일">' + weekDay[4] + '</abbr></th>';
			// htmlCalendar += '<th scope="col"><abbr title="금요일">' + weekDay[5] + '</abbr></th>';
			// htmlCalendar += '<th scope="col" class="day-sat"><abbr title="토요일">' + weekDay[6] + '</abbr></th>';
			// htmlCalendar += '</tr></thead>';
			htmlCalendar += '<tbody><tr>';

			//이전 달
			prevMonthday(firstWeekDay);

			mm < 1 ? mm = 12 : '';
			mm = win[global].option.partsAdd0(mm);
			week_day = firstWeekDay;

			//현재 달
			for (var dayCounter = 1; dayCounter <= daysInMonth; dayCounter++) {
				
				week_day %= 7;
				week_day === 0 ? daysInMonth - dayCounter < 7 ? htmlCalendar += '</tr>' : htmlCalendar += '</tr><tr>' : '';

				if (week_day === 0) {
					htmlCalendar += '<td class="day-sun">';
				} else if (week_day === 6) {
					htmlCalendar += '<td class="day-sat">';
				} else {
					htmlCalendar += '<td>';
				}

				if ((year < _minDay[0]) || (year == _minDay[0] && dateMonthsNow < _minDay[1]) || (year == _minDay[0] && dateMonthsNow == _minDay[1] && dayCounter < _minDay[2])) {
					//선택 불가월
					htmlCalendar += '<button type="button" disabled class="disabled" aria-label="' + textDate(dayCounter, mm, year, true) + '" data-day="' + textDate(dayCounter, mm, year, false)+'">' + win[global].option.partsAdd0(dayCounter) + '</button></td>';
				} else if ((year > _maxDay[0]) || (year == _maxDay[0] && dateMonthsNow > _maxDay[1]) || (year == _maxDay[0] && dateMonthsNow == _maxDay[1] && dayCounter > _maxDay[2])) {
					//선택 불가일
					htmlCalendar += '<button type="button" disabled class="disabled" aria-label="' + textDate(dayCounter, mm, year, true) + '" data-day="' + textDate(dayCounter, mm, year, false)+'">' + win[global].option.partsAdd0(dayCounter) + '</button></td>';
				} else {
					//선택가능 일
					htmlCalendar += '<button type="button" aria-label="' + textDate(dayCounter, mm, year, true) + '" data-day="' + textDate(dayCounter, mm, year, false) + '" value="' + dayCounter + '">' + win[global].option.partsAdd0(dayCounter) + '</button></td>';
				}
				week_day++;
			}

			//다음 달
			nextMonthday(week_day);

			htmlCalendar += '</tr></tbody></table></div>';

			// period datepicker table
			if (dual) {
				empty_after = 0;
				empty_before = daysInMonth - nextWeekDay;
				htmlCalendar += '<div class="tbl-datepicker type-period" data-date="' + year + '' + dateMonthsNext + '">';
				htmlCalendar += '<div class="tbl-datepicker-head" role="text">';
				htmlCalendar += '<span class="year" data-y="' + year + '"><strong>' + year + '</strong>년</span> ';
				htmlCalendar += '<span class="month" data-m="' + dateMonthsNext + '"><strong>' + dateMonthsNext + '</strong>월</span>';
				htmlCalendar += '</div>';
				htmlCalendar += '<table>';
				// htmlCalendar += '<caption>' + year + '년 ' + dateMonthsNext + '월 일자 선택</caption>';
				htmlCalendar += '<colgroup>';
				htmlCalendar += '<col class="n1">';
				htmlCalendar += '<col span="5" class="n1">';
				htmlCalendar += '<col class="n1">';
				htmlCalendar += '</colgroup>';
				// htmlCalendar += '<thead><tr>';
				// htmlCalendar += '<th scope="col" class="day-sun"><abbr title="일요일">' + weekDay[0] + '</abbr></th>';
				// htmlCalendar += '<th scope="col"><abbr title="월요일">' + weekDay[1] + '</abbr></th>';
				// htmlCalendar += '<th scope="col"><abbr title="화요일">' + weekDay[2] + '</abbr></th>';
				// htmlCalendar += '<th scope="col"><abbr title="수요일">' + weekDay[3] + '</abbr></th>';
				// htmlCalendar += '<th scope="col"><abbr title="목요일">' + weekDay[4] + '</abbr></th>';
				// htmlCalendar += '<th scope="col"><abbr title="금요일">' + weekDay[5] + '</abbr></th>';
				// htmlCalendar += '<th scope="col" class="day-sat"><abbr title="토요일">' + weekDay[6] + '</abbr></th>';
				// htmlCalendar += '</tr></thead>';
				htmlCalendar += '<tbody><tr>';

				//이전 달
				prevMonthday(nextWeekDay);

				mm = Number(mm) + 1;
				mm < 1 ? mm = 12 : '';

				if (mm > 12) {
					mm = 1;
					year = year + 1;
				};

				mm = win[global].option.partsAdd0(mm);
				week_day = nextWeekDay;

				//현재 달
				for (var dayCounter = 1; dayCounter <= daysInMonth_next; dayCounter++) {
					week_day %= 7;
					week_day === 0 ? daysInMonth_next - dayCounter < 7 ? htmlCalendar += '</tr>' : htmlCalendar += '</tr><tr>' : '';

					if (week_day === 0) {
						htmlCalendar += '<td class="day-sun">';
					} else if (week_day === 6) {
						htmlCalendar += '<td class="day-sat">';
					} else {
						htmlCalendar += '<td>';
					}

					if ((year < _minDay[0]) || (year == _minDay[0] && dateMonthsNext < _minDay[1]) || (year == _minDay[0] && dateMonthsNext == _minDay[1] && dayCounter < _minDay[2])) {
						htmlCalendar += '<button type="button" class="disabled" aria-label="' + textDate(dayCounter, mm, year, true) + '" data-day="' + textDate(dayCounter, mm, year, false)+'" disabled>' + win[global].option.partsAdd0(dayCounter) + '</button></td>';
					} 
					else if ((year > _maxDay[0]) || (year == _maxDay[0] && dateMonthsNext > _maxDay[1]) || (year == _maxDay[0] && dateMonthsNext == _maxDay[1] && dayCounter > _maxDay[2])) {
						htmlCalendar += '<button type="button"class="disabled"  aria-label="' + textDate(dayCounter, mm, year, true) + '" data-day="' + textDate(dayCounter, mm, year, false)+'" disabled>' + win[global].option.partsAdd0(dayCounter) + '</button></td>';
					} 
					else {
						htmlCalendar += '<button type="button" aria-label="' + textDate(dayCounter, mm, year, true) + '" data-day="' + textDate(dayCounter, mm, year, false) + '" value="' + dayCounter + '">' + win[global].option.partsAdd0(dayCounter) + '</button></td>';
					}
					week_day++;
				}

				//다음 달
				nextMonthday(week_day);

				htmlCalendar += '</tr></tbody></table></div>';
			}

			//이전달 다시보기
			function prevMonthday(weekDay) {
				for (var week = 0; week < weekDay; week++) {
					empty_before = empty_before + 1;

					if (week < weekDay - 1) {
						htmlCalendar += '<td class="empty"><button type="button" disabled>' + win[global].option.partsAdd0(empty_before) + '</button></td>';
					} else {
						htmlCalendar += '<td class="empty last"><button type="button" disabled>' + win[global].option.partsAdd0(empty_before) + '</button></td>';
					}
				}
			}
			//다음달 미리보기
			function nextMonthday(week_day) {
				for (var _week_day = week_day; _week_day < 7; _week_day++) {
					empty_after = empty_after + 1;
					if (_week_day > week_day) {
						htmlCalendar += '<td class="empty"><button type="button" disabled>' + win[global].option.partsAdd0(empty_after) + '</button></td>';
					} else {
						htmlCalendar += '<td class="empty first"><button type="button" disabled>' + win[global].option.partsAdd0(empty_after) + '</button></td>';
					}
					

				}
			}
			return htmlCalendar;
		}

		//달력 Hide&Remove
		function hideCalendar() {
			var $dp = $('.ui-datepicker.visible'),
				$wrap = $dp.find('.datepicker-sec');
			
			$dp.removeClass('visible');
			$dp.find('.ui-datepicker-btn').data('selected',false);
			$dp.on('transitionend', function(){
				$wrap.remove();
			});

		}
		function datepickerClose(calendarEl) {
			var $btn = $('#' + calendarEl.calId).closest('.ui-datepicker').find('.ui-datepicker-btn'),
				$dp = $("#" + calendarEl.dpId),
				$sec = $('#' + calendarEl.calId);

			$('body').removeClass('open-datepicker');
			$dp.removeClass('visible');
			$dp.find('.ui-datepicker-btn').data('selected',false);

			var closeback = !!$dp.data('opt').closeback ? $dp.data('opt').closeback : false;

			closeback ? closeback() : '';
			
			$dp.on('transitionend', function(){
				//win[global].uiScroll({ value: $btn.data('sct'), speed: 200 });
				
				$sec.remove();
			});
		}

		//달력 table
		function reDisplayCalendar(calendarEl, v, endMinMax) {
			var $calWrap = $("#" + calendarEl.calId),
				endMinMax = endMinMax === undefined ? false : endMinMax;

			if (endMinMax) {
				$calWrap.find('.tbl-datepicker').remove();
				$calWrap.find('.datepicker-core').append(buildCore(date, calendarEl, v, endMinMax));
			} else {
				$calWrap.find('.datepicker-core').empty().append(buildCore(date, calendarEl, v, false));
			}
			matchToday();
			dayPeriodSelect(calendarEl);
		}
		//달력 layout
		function displayCalendar(calendarEl, v) {
			var id_ = "#" + calendarEl.calId,
				$dp = $("#" + calendarEl.dpId),
				$calWrap = $(id_);
				
			//date = new Date();
			$calWrap.empty().append(buildCalendar(date, calendarEl, v));
			reDisplayCalendar(calendarEl, v);
			$dp.addClass('visible');
			win[global].uiFocusTab({ selector: $calWrap, type: 'hold' });

			//datepicker event--------------------------------------------------------
			$('.datepicker-head-year select').off('change.uidpsel').on('change.uidpsel', function (e) {
				e.preventDefault();
				yearMonthSelect(this, 'year');
			});
			$('.datepicker-head-month select').off('change.uidpsel').on('change.uidpsel', function (e) {
				e.preventDefault();
				yearMonthSelect(this, 'month');
			});
			$('.ui-datepicker-prev').off('click.uidatepicker').on('click.uidatepicker', function (e) {
				e.preventDefault();
				monthNextPrev(this, 'prev');
			});
			$('.ui-datepicker-next').off('click.uidatepicker').on('click.uidatepicker', function (e) {
				e.preventDefault();
				monthNextPrev(this, 'next');
			});
			$('.ui-datepicker-prev-y').off('click.uidatepicker').on('click.uidatepicker', function (e) {
				e.preventDefault();
				yearNextPrev(this, 'prev');
			});
			$('.ui-datepicker-next-y').off('click.uidatepicker').on('click.uidatepicker', function (e) {
				e.preventDefault();
				yearNextPrev(this, 'next');
			});
			$('.ui-datepicker-close').off('click.uidayclose').on('click.uidayclose', function () {
				datepickerClose(calendarEl);
			});

			function yearMonthSelect(t, v) {
				var $currentDate = $(t).closest('.datepicker-sec').find('.tbl-datepicker-head'),
					$core = $(t).closest('.ui-datepicker').find('.datepicker-core'),
					_y = v === 'year' ?
						$(t).closest('.datepicker-head-year').find('select').eq(0).val() :
						Number($currentDate.find('.year').data('y')),
					_m = v === 'month' ?
						$(t).closest('.datepicker-head-month').find('select').eq(0).val() :
						Number($currentDate.find('.month').data('m') - 1),
					dateTemp = v === 'year' ? new Date(_y, _m, 1) : new Date(_y, _m - 1, 1);

				date = dateTemp;

				reDisplayCalendar(calendarEl, v, period && (!!$core.data('start') || !!$core.data('end')) ? true : false);

				v === 'year' ?
					$calWrap.find('.datepicker-head-year select').eq(0).focus() :
					$calWrap.find('.datepicker-head-month select').eq(0).focus();
			}
			function monthNextPrev(t, v) {
				var $this = $(t),
					$core = $this.closest('.ui-datepicker').find('.datepicker-core'),
					limit = v === 'next' ? 'max' : 'min',
					$currentDate = $this.closest('.datepicker-sec').find('.tbl-datepicker-head'),
					_y = Number($currentDate.find('.year').data('y')),
					_m = Number($currentDate.find('.month').data('m') - 1),
					dateTemp = v === 'next' ? (dual) ? new Date(_y, _m + 2, 1) : new Date(_y, _m + 1, 1) : (dual) ? new Date(_y, _m - 2, 1) : new Date(_y, _m - 1, 1);

				date = dateTemp;

				reDisplayCalendar(calendarEl, v, period && (!!$core.data('start') || !!$core.data('end')) ? true : false);
				$this.eq(0).focus();
			}
			function yearNextPrev(t, v) {
				var $this = $(t),
					$core = $this.closest('.ui-datepicker').find('.datepicker-core'),
					limit = v === 'next' ? 'max' : 'min',
					$currentDate = $this.closest('.datepicker-sec').find('.tbl-datepicker-head'),
					_y = Number($currentDate.find('.year').data('y')),
					_m = Number($currentDate.find('.month').data('m') - 1),
					dateTemp = v === 'next' ? new Date(_y + 1, _m, 1) : new Date(_y - 1, _m, 1);

				date = dateTemp;
				reDisplayCalendar(calendarEl, v, period && (!!$core.data('start') || !!$core.data('end')) ? true : false);
				$this.eq(0).focus();
			}

			if (period) {
				$(doc).off('click.'+ id_).on('click.'+ id_, id_ + ' td button', function (e) {
					e.preventDefault();
					daySelectAct(calendarEl, this);
				}).off('mouseover.'+ id_ +'sel').on('mouseover.'+ id_ +'sel', id_ + ' td button', function () {
					dayHover(this);
				}).off('mouseover.'+ id_ +'sel2').on('mouseover.'+ id_ +'sel2', id_ + ' .type-period td button', function () {
					monthHover(this);
				}).off('mouseleave.'+ id_ +'sel3').on('mouseleave.'+ id_ +'sel3', id_ + ' .tbl-datepicker', function () {
					$('.tbl-datepicker').find('.hover').removeClass('hover');
				});

				$(doc).off('click.'+ id_ +'today').on('click.'+ id_ +'today', id_ + ' .datepicker-head-today button', function () {
					date = new Date();
					reDisplayCalendar(calendarEl);
				}).off('click.'+ id_ +'d').on('click.'+ id_ +'d', id_ + ' .btn-base', function () {
					day_start ? writeInputDateValue(calendarEl, day_start) : '';
					day_end ? writeInputDateValue(calendarEl, day_end, true) : '';

					datepickerClose(calendarEl);
				});
			} else {
				$(doc).off('click.'+ id_).on('click.'+ id_ , id_ + ' td button', function () {
					var $this = $(this);

					writeInputDateValue(calendarEl, $this);
					datepickerClose(calendarEl);
				}).off('click.'+ id_ +'today').on('click.'+ id_+'today', id_ + ' .datepicker-head-today button', function () {
					date = new Date();
					reDisplayCalendar(calendarEl);
					$calWrap.find('td button.today').eq(0).focus();
				});
			}	
			
			$('.datepicker-month').on('click', function(){
				var $this = $(this);
				writeInputMonthValue(calendarEl, $this);
				datepickerClose(calendarEl);
			});
			return false;
		}

		function monthHover(t) {
			var $this = $(t),
				$core = $this.closest('.datepicker-core'),
				$tbl = $this.closest('.tbl-datepicker');

			if ($tbl.hasClass('on-start-tbl')) {
				$tbl.prev().addClass('off-tbl')
			}

			if (!!$core.data('start') && !$tbl.hasClass('on-start-tbl')) {

				if ($tbl.prev().data('date') > $this.closest('.ui-datepicker').data('min-month')) {
					$tbl.prev().find('tr').addClass('hover').find('td').addClass('hover');
				}
				
			}
		}
		function dayHover(t) {
			var $this = $(t),
				$core = $this.closest('.datepicker-core');

			if (!!$core.data('start')) {
				$this.closest('td').addClass('hover').prevAll().addClass('hover');
				$this.closest('tr').addClass('hover').prevAll().find('td').addClass('hover');

				$this.closest('td').nextAll().removeClass('hover');
				$this.closest('tr').removeClass('hover').nextAll().find('td').removeClass('hover');
			}
		}
		function daySelectAct(calendarEl, t) {
			var $this = $(t),
				$core = $this.closest('.datepicker-core'),
				n_day = $this.data('day').replace(/\-/g, ''),
				n_day_ = $core.data('day') === undefined ? false : $core.data('day').replace(/\-/g, '');

			if (win[global].uiDatePicker.option.dateSplit === '.') {
				n_day = $this.data('day').replace(/\./g, '');
				n_day_ = $core.data('day') === undefined ? false : $core.data('day').replace(/\./g, '');
			}

			var sam_day = n_day === n_day_,
				next_day = n_day > n_day_,
				prev_day = n_day < n_day_;

			//first event start, next event end
			if (!$core.data('start') && !$core.data('end')) {
				$core.data('end', false);
				$core.data('start', true);
				$core.data('day', n_day);

				//init
				$core.find('.selected-end').removeClass('selected-end').removeAttr('aria-selected');
				$core.find('.disabled').removeClass('disabled');
				$core.find('.hover-on').removeClass('hover-on');
				$core.find('.selected-start').removeClass('selected-start').removeAttr('aria-selected');
				$core.find('.selected').removeClass('selected').removeAttr('aria-selected');
				$core.find('td').removeClass('on-start on-end');
				$core.find('tr').removeClass('on-start on-end');

				//선택 및 반영
				$core.addClass('state-ready');
				$this.addClass('selected-start').attr('aria-selected', true);
				if (!!$this.closest('table').hasClass('type-period')) {
					$this.closest('table').prev().find('tr').addClass('disabled').find('td').addClass('disabled').find('button');
				}
				$this.closest('td').addClass('on-start').prevAll().addClass('disabled').find('button');
				$this.closest('tr').addClass('on-start').prevAll().addClass('disabled').find('td').addClass('disabled').find('button');
				$('.on-start').find('tr.on-start').find('button').attr('disabled');
				$('#' + $this.closest('.ui-datepicker').find('.inp-base').attr('id') + '_end').val('');

				day_start = $this;
				writeInputDateValue(calendarEl, $this);
				reDisplayCalendar(calendarEl, $this, true);
			} else if (next_day || sam_day) {
				$core.data('start', false);
				$core.removeClass('state-ready');
				$core.data('end', true).data('endday', n_day);
				$core.find('.selected-end').removeClass('selected-end').removeAttr('aria-selected');
				$this.addClass('selected-end').attr('aria-selected', true);
				$core.find('.on-ing').removeClass('on-ing');
				$core.find('.on-end').removeClass('on-end');
				$this.closest('td').addClass('on-end');
				$this.closest('tr').addClass('on-end');
				$core.find('.hover').addClass('on-ing');
				$core.addClass('date-ing-on');

				day_end = $this;
				writeInputDateValue(calendarEl, $this, true);
				datepickerClose(calendarEl);
			} else if (prev_day) {
				$core.find('.selected-end').removeClass('selected-end').removeAttr('aria-selected');
				$core.find('.hover-on').removeClass('hover-on');
				$core.find('.selected-start').removeClass('selected-start').removeAttr('aria-selected');
				$core.find('.selected').removeClass('selected').removeAttr('aria-selected');
				$core.data('day', n_day);
				$core.find('td').removeClass('on-start on-end');
				$core.find('tr').removeClass('on-start on-end');

				$this.addClass('selected-start').attr('aria-selected', true);
				if (!!$this.closest('table').hasClass('type-period')) {
					$this.closest('table').prev().find('tr').addClass('disabled').find('td').addClass('disabled').find('button');
				}
				$this.closest('td').addClass('on-start').prevAll().addClass('disabled').find('button');
				$this.closest('tr').addClass('on-start').prevAll().addClass('disabled').find('td').addClass('disabled').find('button');
				$this.closest('td').addClass('on-start').nextAll().removeClass('disabled').find('button');
				$this.closest('tr').addClass('on-start').nextAll().removeClass('disabled').find('td').removeClass('disabled').find('button');
				$('.on-start').find('tr.on-start').find('button').attr('disabled');

				day_start = $this;
				writeInputDateValue(calendarEl, $this);
			}
		}

		//event
		$datepicker.find('.ui-datepicker-btn').off('click.uidatepicker').on('click.uidatepicker', function () {
			var btn = $(this);

			if (!btn.data('selected')) {
				$('.ui-datepicker-btn').data('selected', false);
				btn.data('selected', true);
				datepickerReady(this);
			} else {
				btn.data('selected', false);
				hideCalendar();
			}
		});
		$datepicker.find('.inp-base').off('focus.uidpinp').on('focus.uidpinp', function () {
			$(this).closest('.inp-datepicker').addClass('focus');
		}).off('blur.uidpinp').on('blur.uidpinp', function () {
			$(this).closest('.inp-datepicker').removeClass('focus');
		});

		//datepicker ready
		function datepickerReady(v) {
			var $this = $(v),
				$datepicker = $this.closest('.ui-datepicker'),
				dataPeriod = $datepicker.attr('data-period'),
				dataDual = $datepicker.attr('data-dual'),
				dataTitle = $datepicker.attr('data-title'),
				dataType = $datepicker.attr('data-type'),
				$this_inp = $datepicker.find('.ui-datepicker-inp'),
				dp_id = $datepicker.attr('id'),
				inputId = $this_inp.attr('id'),
				regExp = /^([0-9]{4})-([0-9]{2})-([0-9]{2})/g,
				_val = $this_inp.val();
				//_val = $('#' + inputId).val();

			(win[global].uiDatePicker.option.date_split === '.') ? regExp = /^([0-9]{4}).([0-9]{2}).([0-9]{2})/g : '';
			
			var openback = !!$datepicker.data('opt').openback ? $datepicker.data('opt').openback : false;
			openback ? openback() : '';
			
			win[global].browser.mobile && $('body').addClass('open-datepicker');

			hideCalendar();
			
			if (!!dataType) {
				type = dataType;
			}
			if (!!dataPeriod) {
				period = dataPeriod === 'true' ? true : false;
			}
			if (!!dataDual) {
				dual = dataDual === 'true' ? true : false;
			}
			if (!!dataTitle) {
				date_title = dataTitle;
			}

			var reset = regExp.test(_val),
				htmlWrap = '';

			$this.data('sct', $(doc).scrollTop());
			!reset ? $this_inp.val('') : '';
			date = new Date();
			$datepicker.find('.datepicker-sec').remove();

			calVar = new calendarObject({
				calId: "calWrap_" + dp_id,
				dpId: dp_id,
				inputId: inputId,
				buttonId: "calBtn_" + dp_id,
				shortDate: shortDate
			});

			htmlWrap += '<div id="' + calVar.calId + '" class="datepicker-sec">';
			htmlWrap += '<div class="datepicker-wrap">';
			htmlWrap += '</div>';
			htmlWrap += '</div>';

			$this.closest('.ui-datepicker').find('.ui-datepicker-wrap').append(htmlWrap);
			
			displayCalendar(calVar, 'generate');

			dual ? $datepicker.addClass('type-dual') : $datepicker.removeClass('type-dual');
			dataType === 'month' ? $datepicker.addClass('type-month') : $datepicker.removeClass('type-month');
			(period && dual) && $datepicker.find('.ui-datepicker-wrap').addClass('period');

		}

		function dayPeriodSelect(calendarEl) {
			if (period) {
				$datepicker.find('.tbl-datepicker button[data-day="' + $('#' + calendarEl.inputId).val() + '"]').addClass('selected-start').attr('aria-selected', true).closest('td').addClass('on-start').closest('tr').addClass('on-start').closest('table').addClass('on-start-tbl');
				
				$datepicker.find('.tbl-datepicker button[data-day="' + $('#' + calendarEl.inputId + '_end').val() + '"]').addClass('selected-end').attr('aria-selected', true).closest('td').addClass('on-end').closest('tr').addClass('on-end').closest('table').addClass('on-end-tbl');

				var s = $('#' + calendarEl.inputId).val().replace(/\-/g, '').substring(0, 6),
					e = $('#' + calendarEl.inputId + '_end').val().replace(/\-/g, '').substring(0, 6);

				if (win[global].uiDatePicker.option.dateSplit === '.') {
					s = $('#' + calendarEl.inputId).val().replace(/\./g, '').substring(0, 6);
					e = $('#' + calendarEl.inputId + '_end').val().replace(/\./g, '').substring(0, 6);
				}
				
				$datepicker.find('.tbl-datepicker').find('.on-start').prevAll().addClass('disabled').find('td').addClass('disabled');
				$datepicker.find('.tbl-datepicker').find('.on-start').nextAll().addClass('hover-on').find('td').addClass('hover-on');
				$datepicker.find('.tbl-datepicker').find('.on-end').prevAll().addClass('hover-on').find('td').addClass('hover-on');
				$datepicker.find('.tbl-datepicker').find('.on-end').nextAll().removeClass('hover-on').find('td').removeClass('hover-on');
				$datepicker.find('.tbl-datepicker').find('.on-start').prevAll().removeClass('hover-on').find('td').removeClass('hover-on');

				if (!$('#' + calendarEl.inputId + '_end').val()) {
					$datepicker.find('.hover-on').removeClass('hover-on');
				} else {
					$datepicker.find('.tbl-datepicker').each(function () {
						var $this = $(this);
						var thisDate = $this.data('date');

						if (s < thisDate && thisDate < e) {
							$this.find('table').addClass('on-ing-tbl');
							$this.find('td').addClass('hover-on');
						}
					});
				}
			} else {
				$datepicker.find('.tbl-datepicker button[data-day="' + $('#' + calendarEl.inputId).val() + '"]').addClass('selected').attr('aria-selected', true);
			}
		}
	}  


	/* ------------------------
	* name : input cancel
	* date : 2020-06-15
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiInputClear: function () {
			return createUiInputClear();
		}
	});
	function createUiInputClear(){
		var $inp = $('.ui-inpcancel');

		$inp.each(function(i){
			var $this = $(this);
			var $cancel = $this.next('.ui-inpcancel-btn');

			$this.val() === '' ?
				$cancel.remove():
				$cancel.length === 0 ?
				$this.after('<button type="button" class="ui-inpcancel-btn" data-id="'+ $this.attr('id') +'"><span>clear</span></button>') : '';

			$inp.eq(i).off('keyup.inpcancel').on('keyup.inpcancel', function(){
				var _$this = $(this);

				if (_$this.val() === '') {
					_$this.next('.ui-inpcancel-btn').remove();
				} else {
					!!$('.ui-inpcancel-btn[data-id="'+ _$this.attr('id') +'"]').length ? '' :
					_$this.after('<button type="button" class="ui-inpcancel-btn" data-id="'+ _$this.attr('id') +'"><span>clear</span></button>');
				}
			});
		});

		//event
		$(doc).off('click.inpcancel').on('click.inpcancel', '.ui-inpcancel-btn', function(){
			$('#' + $(this).data('id')).val('').focus();
			$(this).remove();
		});
	}
	

	/* ------------------------
	* table cell fix(horizontal)
	* date : 2020-05-17
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiTableFixTd: function () {
			return createUiTableFixTd();
		}
	});
	function createUiTableFixTd() {
		var $tbl = $('.ui-fixtd');

		$tbl.each(function(i){
			var $tbln = $(this);
			var $tbl_col = $tbln.find('col');
			var $tbl_tr = $tbln.find('tr');
			var col_len = $tbl_col.length;
			var fix_sum = col_len - $tbln.attr('fix');
			var len = $tbl_tr.length;
			var tit = [];

			$tbln.attr('current', 1).attr('total', col_len);

			for (var i = 0; i < len; i++) {
				for (var j = 0; j < fix_sum; j++) {
					var $tr_this = $tbl_tr.eq(i);
					var $td_this = $tr_this.find('> *').eq(j - fix_sum);
					var jj = (j + 1);

					$td_this.addClass('ui-fixtd-n' + jj).data('n', j);
					if ($tr_this.closest('thead').length) {
						tit.push($td_this.text());
						$td_this.prepend('<button type="button" class="ui-fixtd-btn prev" data-btn="prev" data-idx="'+ jj +'"><span class="hide">previous</span></button>');
						$td_this.append('<button type="button" class="ui-fixtd-btn next" data-btn="next" data-idx="'+ jj +'"><span class="hide">next</span></button>');
					}
					$tbl_col.eq(j - fix_sum).addClass('ui-fixtd-n' + jj);
				}
			}
		});

		$tbl.find('.ui-fixtd-btn').off('click.uifixtd').on('click.uifixtd', function(){
			var $tbl_this = $(this).closest('.ui-fixtd');
			var this_sum =  Number($tbl_this.attr('total') - $tbl_this.attr('fix'));
			var n = Number($(this).data('idx'));

			if ($(this).data('btn') === 'next') {
				$tbl_this.attr('current', n + 1 > this_sum ? n = 1 : n + 1);
			} else {
				$tbl_this.attr('current', n - 1 <= 0 ? n = this_sum : n - 1);
			}
		});
	}


	/* ------------------------
	* name : select
	* date : 2020-06-16
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiSelect: function (opt) {
			return createUiSelect(opt);
		},
		uiSelectAction: function (opt) {
			return createuiSelectAction(opt);
		}
	});
	win[global].uiSelect.option = {
		id: false, 
		current: null,
		customscroll: true,
		callback: false
	};
	function createUiSelect(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiSelect.option, opt),
			current = opt.current,
			callback = opt.callback,
			customscroll = opt.customscroll,
			id = opt.id,
			is_id = id === false ? false : true,
			$ui_select = is_id ? typeof id === 'string' ? $('#' + opt.id).closest('.ui-select') : id.find('.ui-select') : $('.ui-select'),
			keys = win[global].option.keys,
			len = $ui_select.length;

		var $sel,
			$selectCurrent,
			selectID,
			listID,
			optionSelectedID,
			selectN,
			selectTitle,
			selectDisabled,
			btnTxt = '',
			hiddenClass = '',
			htmlOption = '',
			htmlButton = '' ;

		//init
		win[global].browser.mobile ? customscroll = false : '';

		$ui_select.find('.ui-select-btn').remove();
		$ui_select.find('.ui-select-wrap').remove();
		$ui_select.find('.dim').remove();

		var idN = JSON.parse(sessionStorage.getItem('scrollbarID'));

		//select set
		for (var i = 0; i < len; i++) {
			$selectCurrent = $ui_select.eq(i);
			$sel = $selectCurrent.find('select');
			
			selectID = $sel.attr('id');
			selectID === undefined && $sel.attr('id', 'uiSelect_' + idN);
			listID = selectID + '_list';
			selectDisabled = $sel.prop('disabled');
			selectTitle = $sel.attr('title');
			hiddenClass = '';
			
			(!$sel.data('callback') || !!callback) && $sel.data('callback', callback);

			if (customscroll) {
				htmlOption += '<div class="ui-select-wrap ui-scrollbar" scroll-id="uiSelectScrollBar_'+ idN +'">';
				idN = idN + 1;
				sessionStorage.setItem('scrollbarID', idN);
			} else {
				htmlOption += '<div class="ui-select-wrap" style="min-width:' + $selectCurrent.outerWidth() + 'px">';
			}

			htmlOption += '<strong class="ui-select-title">'+ selectTitle +'</strong>';
			htmlOption += '<div class="ui-select-opts" role="listbox" id="' + listID + '" aria-hidden="false">';

			setOption();

			htmlOption += '</div>';
			htmlOption += '<button type="button" class="ui-select-confirm"><span>확인</span></strong>';
			htmlOption += '</div>';
			htmlButton = '<button type="button" class="ui-select-btn '+ hiddenClass +'" id="' + selectID + '_inp" role="combobox" aria-autocomplete="list" aria-owns="' + listID + '" aria-haspopup="true" aria-expanded="false" aria-activedescendant="' + optionSelectedID + '" data-n="' + selectN + '" data-id="' + selectID + '" tabindex="-1"><span>' + btnTxt + '</span></button>';

			$selectCurrent.append(htmlButton);
			$sel.addClass('off');
			//$sel.attr('aria-hidden', true).attr('tabindex', -1);
			$selectCurrent.append(htmlOption);

			selectDisabled ? $selectCurrent.find('.ui-select-btn').prop('disabled', true).addClass('disabled') : '';

			htmlOption = '';
			htmlButton = '';
		}
		
		function setOption(t, v){
			var _$sel = (t !== undefined) ? $(t).closest('.ui-select').find('select') : $sel;
			var _$option = _$sel.find('option');
			var _$optionCurrent = _$option.eq(0);

			selectID = _$sel.attr('id');

			var _optionID = selectID + '_opt';
			var _optLen = _$option.length;
			var _current = current;
			var _selected = false;
			var _disabled = false;
			var _hidden = false;
			var _val = false;
			var _hiddenCls;
			var _optionIdName;

			if (v !== undefined) {
				_current = v;
			}

			for (var j = 0; j < _optLen; j++) {
				_$optionCurrent = _$option.eq(j);
				_hidden = _$optionCurrent.prop('hidden');

				if (_current !== null) {
					
					if (_current === j) {
						_selected = true;
						_$optionCurrent.prop('selected', true);
					} else {
						_selected = false;
						_$optionCurrent.prop('selected', false);
					}

				} else {
					_selected = _$optionCurrent.prop('selected');
				}

				_disabled = _$optionCurrent.prop('disabled');
				_hiddenCls =  _hidden ? 'hidden' : '';

				if (_selected) {
					_val = _$optionCurrent.val();
					btnTxt = _$optionCurrent.text();
					optionSelectedID = _optionID + '_' + j;
					selectN = j;
				}

				_selected && _hidden ? hiddenClass = 'opt-hidden' : '';
				_optionIdName = _optionID + '_' + j;

				if (win[global].browser.mobile) {
					_disabled ?
						_selected ?
							htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled selected '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" disabled tabindex="-1">' :
							htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" disabled tabindex="-1">' :
						_selected ?
							htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt selected '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" tabindex="-1">' :
							htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" tabindex="-1">';
				} else {
					_disabled ?
						_selected ?
							htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled selected '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" disabled tabindex="-1">' :
							htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" disabled tabindex="-1">' :
						_selected ?
							htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt selected '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" tabindex="-1">' :
							htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" tabindex="-1">';
				}

				htmlOption += '<span class="ui-select-txt">' + _$optionCurrent.text() + '</span>';
				htmlOption += '</button>';
			}

			if (t !== undefined) {
				_$sel.closest('.ui-select').find('.ui-select-opts button').remove();
				_$sel.closest('.ui-select').find('.ui-select-opts').append(htmlOption);
				htmlOption = '';
				eventFn();
			}
		}

		//event
		eventFn();
		function eventFn(){
			var $doc = $(doc);

			$doc.find('.dim-select').off('click.dim').on('click.dim', function () {
				if ($('body').data('select-open')) {
					optBlur();
				}
			});
			$doc.find('.ui-select-confirm').off('click.cfm').on('click.cfm', optClose);
			$doc.find('.ui-select-btn').off('click.ui keydown.ui mouseover.ui focus.ui mouseleave.ui').on({
				'click.ui': selectClick,
				'keydown.ui': selectKey,
				'mouseover.ui': selectOver,
				'focus.ui': selectOver,
				'mouseleave.ui': selectLeave
			});
			$doc.find('.ui-select-opt').off('click.ui mouseover.ui').on({
				'click.ui': optClick,
				'mouseover.ui': selectOver
			});
			$doc.find('.ui-select-wrap').off('mouseleave.ui').on({ 'mouseleave.ui': selectLeave });
			$doc.find('.ui-select-wrap').off('blur.ui').on({ 'blur.ui': optBlur });
			$doc.find('.ui-select-label').off('click.ui').on('click.ui', function () {
				var idname = $(this).attr('for');

				setTimeout(function () {
					$('#' + idname + '_inp').focus();
				}, 0);
			});
			$doc.find('.ui-select select').off('change.ui').on({ 'change.ui': selectChange });
		}

		function selectLeave() {
			$('body').data('select-open', true);
		}
		function selectChange() {
			var $this = $(this);
			$this.closest('.ui-select').data('fn');

			win[global].uiSelectAction({
				id:$this .attr('id'),
				current: $this.find('option:selected').index(),
				callback: $this.data('callback'), original:true
			});
		}
		function optBlur() {
			optClose();
		}
		function selectClick() {
			var $btn = $(this);
			$btn.data('sct', $(doc).scrollTop());

			setOption(this, $btn.closest('.ui-select').find('option:selected').index() );
			optExpanded(this);
		}
		function optClick() {
			var t = this;
			var idx =  $(t).index();

			if (customscroll) {
				win[global].uiSelectAction({ 
					id: $(t).closest('.ui-select').find('.ui-select-btn').data('id'), 
					current: idx 
				});

				$(t).closest('.ui-select').find('.ui-select-btn').focus();
				optClose();
			} else {
				scrollSelect(idx, $(t).closest('.ui-select').find('.ui-select-wrap') );
			}
		}
		function selectOver() {
			$('body').data('select-open', false);
		}
		function selectKey(e) {
			var t = this,
				$btn = $(this),
				id = $btn.data('id'),
				$list = $('#' + id + '_list'),
				$wrap = $list.closest('.ui-select-wrap'),
				$opts = $wrap.find('.ui-select-opts'),
				$opt = $wrap.find('.ui-select-opt'),

				n = Number($list.find('.selected').index()),
				nn = 0,
				nnn = 0,
				wrap_h = $wrap.outerHeight(),
				len = $opt.length,
				n_top = 0;

			if (e.altKey) {
				if (e.keyCode === keys.up) {
					optOpen(t);
				}

				e.keyCode === keys.down && optClose();
				return;
			}

			switch (e.keyCode) {
				case keys.up:
				case keys.left:
					nn = n - 1 < 0 ? 0 : n - 1;
					nnn = Math.abs($opts.position().top);
					n_top = $opt.eq(nn).position().top + nnn;

					optScroll($wrap, n_top, wrap_h, 'up');
					optPrev(e, id, n, len);
					break;

				case keys.down:
				case keys.right:
					nn = n + 1 > len - 1 ? len - 1 : n + 1;
					nnn = Math.abs($opts.position().top);
					n_top = $opt.eq(nn).position().top + nnn;
					
					optScroll($wrap, n_top, wrap_h, 'down');
					optNext(e, id, n, len);
					break;
			}
		}
		function optExpanded(t) {
			if (win[global].browser.mobile) {
				optOpen(t)
			} else {
				if ($(t).attr('aria-expanded') === 'false') {
					optClose();
					optOpen(t);
				} else {
					optClose();
				}
			}
		}
		function optScroll($wrap, n_top, wrap_h, key) {
			win[global].uiScroll({ 
				value: Number(n_top), 
				target: customscroll ? $wrap.find('> .ui-scrollbar-item') : $wrap, 
				speed: 0, 
				ps: 'top' 
			});
		}
		function optPrev(e, id, n, len) {
			e.preventDefault();
			n === 0 ? n = 0 : n = n - 1;
			win[global].uiSelectAction({ id: id, current: n });
		}
		function optNext(e, id, n, len) {
			e.preventDefault();
			n === len - 1 ? n = len - 1 : n = n + 1;
			win[global].uiSelectAction({ id: id, current: n });
		}
		function optOpen(t) {
			var $body = $('body'),
				_$sel = $(t),
				_$uisel = _$sel.closest('.ui-select'),
				_$wrap = _$uisel.find('.ui-select-wrap'),
				_$opts = _$wrap.find('.ui-select-opts'),
				_$opt = _$opts.find('.ui-select-opt');

			var offtop = _$uisel.offset().top,
				scrtop = $(doc).scrollTop(),
				wraph = _$wrap.outerHeight(),
				btn_h = _$sel.outerHeight(),
				opt_h = _$opt.outerHeight(),
				win_h = $(win).outerHeight(),
				className = win_h - ((offtop - scrtop) + btn_h) > wraph ? 'bottom' : 'top';

			$body.addClass('dim-select');

			if (!_$sel.data('expanded')) {
				_$sel.data('expanded', true).attr('aria-expanded', true);
				_$uisel.addClass('on');
				_$wrap.addClass('on ' + className).attr('aria-hidden', false);
				_$opts.find('.ui-select-opt').eq(_$uisel.find(':selected').index());
			}
			
			if (customscroll) {
				win[global].uiScrollBar({
					id : _$wrap
				});
				win[global].uiScroll({ 
					value: Number(opt_h * _$uisel.find(':checked').index()), 
					target: _$wrap.find('> .ui-scrollbar-item'), 
					speed: 0, 
					ps: 'top' 
				});
			} else {
				win[global].uiScroll({ 
					value: Number(opt_h * _$uisel.find(':checked').index()), 
					target: _$wrap, 
					speed: 0, 
					ps: 'top' 
				});
			}

			openScrollMove(_$uisel);

			var timerScroll = null;
			var touchMoving = false;

			_$wrap.off('touchstart.uiscroll').on('touchstart.uiscroll', function(e){
				var $this = $(this);
				var getScrollTop = $this.scrollTop();
				var currentN = 0;
				clearTimeout(timerScroll);
				touchMoving = false;

				$this.stop();
				
				_$wrap.off('touchmove.uiscroll').on('touchmove.uiscroll', function(e){
					touchMoving = true;
					getScrollTop = $this.scrollTop();
				}).off('touchcancel.uiscroll touchend.uiscroll').on('touchcancel.uiscroll touchend.uiscroll', function(e){
					var _$this = $(this);

					

					function scrollCompare(){
						timerScroll = setTimeout(function(){
							if (getScrollTop !== _$wrap.scrollTop()) {
								getScrollTop = _$wrap.scrollTop();
								scrollCompare();
							} else {
								currentN = Math.floor((Math.floor(getScrollTop) + 20) / 40);
								scrollSelect(currentN, _$this );
							}
						},100);
					} 
					touchMoving && scrollCompare();
					_$wrap.off('touchmove.uiscroll');
				});
			});
		}

		function scrollSelect(v, _$this){
			_$this.stop().animate({
				scrollTop : 40 * v
			}, 100);
			win[global].uiSelectAction({ 
				id: _$this.closest('.ui-select').find('.ui-select-btn').data('id'), 
				current: v
			});
		}

		function openScrollMove(_$uisel){
			var __$uiSel = _$uisel;
			var __scrollTop = Math.floor($(doc).scrollTop());
			var __winH = $(win).outerHeight();
			var __$uiSelBtn = __$uiSel.find('.ui-select-btn');
			var __btnTop = __$uiSelBtn.offset().top;
			var __btnH = __$uiSelBtn.outerHeight();
			var a = Math.floor(__btnTop - __scrollTop);
			var b = __winH - 240;

			__$uiSel.data('orgtop', __scrollTop);

			(a > b) && $('html, body').scrollTop(a - b + __btnH + 10 + __scrollTop);
		}


		function optClose() {
			var $body = $('body');
			var $btn = $('.ui-select-btn[aria-expanded="true"]');
			var $select = $btn.closest('.ui-select');
			var $wrap = $select.find('.ui-select-wrap');
			var orgTop = $select.data('orgtop');

			$body.removeClass('dim-select');
			$btn.data('expanded', false).attr('aria-expanded', false).focus();
			$select.removeClass('on');
			$wrap.removeClass('on top bottom').attr('aria-hidden', true);
			$('html, body').scrollTop(orgTop);
		}
	}
	function createuiSelectAction(opt) {
		var id = typeof opt.id === 'string' ? opt.id : opt.id.attr('id'),
			$sel = $('#' + id),
			$uiSelect = $sel.closest('.ui-select');

		var dataCallback = $sel.data('callback'),
			callback = opt.callback === undefined ? dataCallback === undefined ? false : dataCallback : opt.callback,
			current = opt.current,
			org = opt.original === undefined ? false : opt.original;

		//!org && $uiSelect.find('option').prop('selected', false).eq(current).prop('selected', true);
		!org && $uiSelect.find('option').prop('selected', false).eq(current).prop('selected', true).trigger('change');
		//trigger 오류 확인필요
		
		var $optCurrent = $sel.find('option').eq(current);
		var $selButton = $sel.closest('.ui-select').find('.ui-select-btn');

		!$optCurrent.prop('hidden')
			?  $selButton.removeClass('opt-hidden')
			:  $selButton.addClass('opt-hidden');

		$uiSelect.find('.ui-select-btn span').text($optCurrent.text());
		$uiSelect.find('.ui-select-opt').removeClass('selected').eq(current).addClass('selected');

		win[global].browser.mobile && $uiSelect.find('.ui-select-opt').eq(current).focus();

		callback && callback({ 
			id: id, 
			current: current, 
			val: $optCurrent.val() 
		});
	}


	/* ------------------------
	* name : coding list
	* date : 2020-06-20
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiCodinglist: function (opt) {
			return createUiCodinglist(opt);
		}
	});
	function createUiCodinglist(opt) {
		var dataExecel;

		win[global].uiAjax({ 
			url: opt.url, 
			page: false, 
			callback: callback 
		});
		function callback(v) {
			dataExecel = v;

			var today = new Date();
			today = getFormatDate(today); 

			function getFormatDate(date){
				var year = date.getFullYear();
				var month = (1 + date.getMonth());
				month = month >= 10 ? month : '0' + month;
				var day = date.getDate();
				day = day >= 10 ? day : '0' + day;
				return  year + '-' + month + '-' + day;
			}
			function changeFormatDate(date){
				var year = date.substring(0,4);
				var month = date.substring(5,6); 
				month = month >= 10 ? month : '0' + month;
				var day = date.substring(6,8);
				day = day >= 10 ? day : '0' + day; 
				return year + '-' + month + '-' + day; 
			}

			function dateDiff(_date1, _date2) {
				var diffDate_1 = _date1 instanceof Date ? _date1 :new Date(_date1);
				var diffDate_2 = _date2 instanceof Date ? _date2 :new Date(_date2);
				diffDate_1 =new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
				diffDate_2 =new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());
				var isAbs = diffDate_2.getTime() - diffDate_1.getTime() < 0 ? '' : '-';
				var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());

				diff = isAbs + Math.ceil(diff / (1000 * 3600 * 24));
			
				return diff;
			}

			var len = dataExecel.list.length,
				i = 0,
				state, date, enddate, moddate, pub, dev, id, idm, memo, overl,
				d1, d2, d3, d4, d5, d6, d7, d8,
				r1, r2, r3, r4,
				d1_, d2_, d3_, d4_, d5_, d6_, d7_, d8_,
				c1, c2, c3, c4, c5, c6, c7, c8;

			var	endsum = 0, delsum = 0, tstsum = 0, ingsum = 0, watsum = 0, chksum = 0, num = -1,
				ctg_state = [],
				ctg_pub = [],
				ctg_dev = [],
				ctg_date = [],
				ctg_enddate = [],
				ctg_mdate = [],
				ctg_menu = [],
				ctg_dev = [],
				cls2 = '',
				cls = '',
				root = '',
				depth = '',
				table = '';

			for (i = 0; i < len; i++) {
				state = dataExecel.list[i].state || '';
				date = dataExecel.list[i].date || '';
				enddate = dataExecel.list[i].enddate || '';
				moddate = dataExecel.list[i].moddate || '';
				pub = dataExecel.list[i].pub || '';
				dev = dataExecel.list[i].dev || '';
				id = dataExecel.list[i].id || '';
				idm = dataExecel.list[i].idm || '';

				memo = dataExecel.list[i].memo || '';
				d1 = dataExecel.list[i].d1 || '';
				d2 = dataExecel.list[i].d2 || '';
				d3 = dataExecel.list[i].d3 || '';
				d4 = dataExecel.list[i].d4 || '';
				d5 = dataExecel.list[i].d5 || '';
				d6 = dataExecel.list[i].d6 || '';
				d7 = dataExecel.list[i].d7 || '';
				d8 = dataExecel.list[i].d8 || '';
				r1 = dataExecel.list[i].r1 || '';
				r2 = dataExecel.list[i].r2 || '';
				r3 = dataExecel.list[i].r3 || '';
				r4 = dataExecel.list[i].r4 || '';
				overl = dataExecel.list[i].overlap || '';
				root = dataExecel.list[i].root || '';

				(d1 !== '') ? d1_ = dataExecel.list[i - 1 < 0 ? 0 : i].d1 : d1 = d1_;

				(dataExecel.list[i].d1 === '') ?
					(d2 !== '') ? d2_ = dataExecel.list[i - 1 < 0 ? 0 : i].d2 : d2 = d2_ :
					(!!dataExecel.list[i - 1 < 0 ? 0 : i].d2) ? d2_ = dataExecel.list[i - 1 < 0 ? 0 : i].d2 : d2_ = '';

				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '') ?
					(d3 !== '') ? d3_ = dataExecel.list[i - 1 < 0 ? 0 : i].d3 : d3 = d3_ :
					(!!dataExecel.list[i - 1 < 0 ? 0 : i].d3) ? d3_ = dataExecel.list[i - 1 < 0 ? 0 : i].d3 : d3_ = '';

				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '') ?
					(d4 !== '') ? d4_ = dataExecel.list[i - 1 < 0 ? 0 : i].d4 : d4 = d4_ :
					(!!dataExecel.list[i - 1 < 0 ? 0 : i].d4) ? d4_ = dataExecel.list[i - 1 < 0 ? 0 : i].d4 : d4_ = '';

				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '' && dataExecel.list[i].d4 === '') ?
					(d5 !== '') ? d5_ = dataExecel.list[i - 1 < 0 ? 0 : i].d5 : d5 = d5_ :
					(!!dataExecel.list[i - 1 < 0 ? 0 : i].d5) ? d5_ = dataExecel.list[i - 1 < 0 ? 0 : i].d5 : d5_ = '';

				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '' && dataExecel.list[i].d4 === '' && dataExecel.list[i].d5 === '') ?
					(d6 !== '') ? d6_ = dataExecel.list[i - 1 < 0 ? 0 : i].d6 : d6 = d6_ :
					(!!dataExecel.list[i - 1 < 0 ? 0 : i].d6) ? d6_ = dataExecel.list[i - 1 < 0 ? 0 : i].d6 : d6_ = '';

				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '' && dataExecel.list[i].d4 === '' && dataExecel.list[i].d5 === '' && dataExecel.list[i].d6 === '') ?
					(d7 !== '') ? d7_ = dataExecel.list[i - 1 < 0 ? 0 : i].d7 : d7 = d7_ :
					(!!dataExecel.list[i - 1 < 0 ? 0 : i].d7) ? d7_ = dataExecel.list[i - 1 < 0 ? 0 : i].d7 : d7_ = '';

				!!dataExecel.list[i].d1 ? d1 = dataExecel.list[i].d1 : '';
				!!dataExecel.list[i].d2 ? d2 = dataExecel.list[i].d2 : '';
				!!dataExecel.list[i].d3 ? d3 = dataExecel.list[i].d3 : '';
				!!dataExecel.list[i].d4 ? d4 = dataExecel.list[i].d4 : '';
				!!dataExecel.list[i].d5 ? d5 = dataExecel.list[i].d5 : '';
				!!dataExecel.list[i].d6 ? d6 = dataExecel.list[i].d6 : '';
				!!dataExecel.list[i].d7 ? d7 = dataExecel.list[i].d7 : '';
				!!dataExecel.list[i].d8 ? d8 = dataExecel.list[i].d8 : '';

				endsum = (state === "완료") ? endsum + 1 : endsum;
				tstsum = (state === "검수") ? tstsum + 1 : tstsum;
				delsum = (state === "제외") ? delsum + 1 : delsum;
				watsum = (state === "대기") ? watsum + 1 : watsum;

				var x = (i === 0) ? 0 : i - 1;

				c1 = (dataExecel.list[i].d1 !== dataExecel.list[x].d1) ? ' c1' : '';
				c2 = (dataExecel.list[i].d2 !== dataExecel.list[x].d2) ? ' c2' : '';
				c3 = (dataExecel.list[i].d3 !== dataExecel.list[x].d3) ? ' c3' : '';
				c4 = (dataExecel.list[i].d4 !== dataExecel.list[x].d4) ? ' c4' : '';
				c5 = (dataExecel.list[i].d5 !== dataExecel.list[x].d5) ? ' c5' : '';
				c6 = (dataExecel.list[i].d6 !== dataExecel.list[x].d6) ? ' c6' : '';
				c7 = (dataExecel.list[i].d7 !== dataExecel.list[x].d7) ? ' c7' : '';
				c8 = (dataExecel.list[i].d8 !== dataExecel.list[x].d8) ? ' c8' : '';

				cls2 = 
					state === '완료' ? 'end' : 
					state === '검수' ? 'tst' : 
					state === '제외' ? 'del' : 
					state === '약관' ? 'trm' : '';

				cls = cls2 + c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8;

				ctg_state.push(dataExecel.list[i].state);
				ctg_pub.push(dataExecel.list[i].pub);
				ctg_dev.push(dataExecel.list[i].dev);
				state !== '제외' ? ctg_date.push(dataExecel.list[i].date) : '';
				ctg_enddate.push(dataExecel.list[i].enddate);
				ctg_menu.push(dataExecel.list[i].d2);

				if (state !== '제외' && i === 0) {
					table += '<table>';
					table += '<caption>코딩리스트</caption>';

					table += '<colgroup>';
					table += '<col class="col-1">';//상태
					table += '<col class="col-2">';//일정
					table += '<col class="col-3">';//완료일
					table += '<col class="col-3">';//수정일
					table += '<col class="col-4">';//퍼블담당자
					table += '<col class="col-4">';//개발담당자

					table += '<col class="col-8">';//화면아이디
					table += '</colgroup>';

					table += '<colgroup>';
					(dataExecel.list[i].d1 !== undefined) ? table += '<col class="col-9">' : '';
					(dataExecel.list[i].d2 !== undefined) ? table += '<col class="col-9">' : '';
					(dataExecel.list[i].d3 !== undefined) ? table += '<col class="col-9">' : '';
					(dataExecel.list[i].d4 !== undefined) ? table += '<col class="col-9">' : '';
					(dataExecel.list[i].d5 !== undefined) ? table += '<col class="col-9">' : '';
					(dataExecel.list[i].d6 !== undefined) ? table += '<col class="col-9">' : '';
					(dataExecel.list[i].d7 !== undefined) ? table += '<col class="col-9">' : '';
					(dataExecel.list[i].d8 !== undefined) ? table += '<col class="col-9">' : '';
					table += '</colgroup>';

					table += '<col class="col-10">';//메모

					table += '<thead>';
					table += '<th scope="col">' + state + '</th>';
					table += '<th scope="col">' + date + '</th>';
					table += '<th scope="col">' + enddate + '</th>';
					table += '<th scope="col">' + moddate + '</th>';
					table += '<th scope="col">' + pub + '</th>';
					table += '<th scope="col">' + dev + '</th>';

					table += '<th scope="col">' + id + '</th>';
					(dataExecel.list[i].d1 !== undefined) ? table += '<th scope="col">' + d1 + '</th>' : '';
					(dataExecel.list[i].d2 !== undefined) ? table += '<th scope="col">' + d2 + '</th>' : '';
					(dataExecel.list[i].d3 !== undefined) ? table += '<th scope="col">' + d3 + '</th>' : '';
					(dataExecel.list[i].d4 !== undefined) ? table += '<th scope="col">' + d4 + '</th>' : '';
					(dataExecel.list[i].d5 !== undefined) ? table += '<th scope="col">' + d5 + '</th>' : '';
					(dataExecel.list[i].d6 !== undefined) ? table += '<th scope="col">' + d6 + '</th>' : '';
					(dataExecel.list[i].d7 !== undefined) ? table += '<th scope="col">' + d7 + '</th>' : '';
					(dataExecel.list[i].d8 !== undefined) ? table += '<th scope="col">' + d8 + '</th>' : '';
					table += '<th scope="col">' + memo + '</th>';
					table += '</thead>';
					table += '</tbody>';
				}
				else if (state !== '제외') {
					num = num + 1;

					if (!(date === '미정' || date === '일정' || date === undefined) && state !== '완료' && state !== '검수' && state !== '체크') {
						var dateStart = date;
						dateStart = changeFormatDate(dateStart)

						var care = dateDiff(dateStart, new Date());
	
						if (care < 3 && care >= 0) {
							cls = cls + ' sch_care';
						} else if (care < 0) {
							cls = cls + ' sch_warn';
						}
	
					}


					win[global].browser.mobile ?
						table += '<tr class="' + cls + '" >' :
						table += '<tr class="' + cls + '">';
					table += '<td class="state"><span>' + state + '</span></td>';
					table += '<td class="date"><span>' + date + '</span></td>';
					table += '<td class="enddate"><span>' + enddate + '</span></td>';
					table += '<td class="enddate"><span>' + moddate + '</span></td>';
					table += '<td class="name pub"><span>' + pub + '</span></td>';
					table += '<td class="name dev"><span>' + dev + '</span></td>';
					table += id !== '' ?
						'<td class="id ico_pg"><span><a href="' + root + '/' + id + '.html" target="coding">' + id + '</a></span></td>' :
						'<td class="id "><span></span></td>';	
					
					(dataExecel.list[i].d1 !== '') ? table += '<td class="d d1"><span>' + d1 + '</span></td>' : table += '<td class="d"></td>';
					(dataExecel.list[i].d2 !== '') ? table += '<td class="d d2"><span>' + d2 + '</span></td>' : table += '<td class="d"></td>';
					(dataExecel.list[i].d3 !== '') ? table += '<td class="d d3"><span>' + d3 + '</span></td>' : table += '<td class="d"></td>';
					(dataExecel.list[i].d4 !== '') ? table += '<td class="d d4"><span>' + d4 + '</span></td>' : table += '<td class="d"></td>';
					(dataExecel.list[i].d5 !== '') ? table += '<td class="d d5"><span>' + d5 + '</span></td>' : table += '<td class="d"></td>';
					(dataExecel.list[i].d6 !== '') ? table += '<td class="d d6"><span>' + d6 + '</span></td>' : table += '<td class="d"></td>';
					(dataExecel.list[i].d7 !== '') ? table += '<td class="d d7"><span>' + d7 + '</span></td>' : table += '<td class="d"></td>';
					(dataExecel.list[i].d8 !== '') ? table += '<td class="d d8"><span>' + d8 + '</span></td>' : table += '<td class="d"></td>';
					(dataExecel.list[i].memo === '') ? table += '<td class="memo none"><span>' + memo + '</span></td>' : table += '<td class="memo"><span>' + memo + '</span></td>';
					table += '</tr>';
					(i === len - 1) ? table += '</tbody>' : '';
					(i === len - 1) ? table += '</table>' : '';
				}
				root = '';
			}
			$('#' + opt.id).html(table);
			table = '';

			var info = '';
			info += '<dl class="ui-codinglist-state"><dt>'+ today +'</dt><dd>'
			info += '<ul class="ui-codinglist-info">';
			info += '<li>진행율(완료+검수) : <span class="n_all">0</span> / <span class="total">0</span> (<span class="per0">0</span>%)</li>';
			info += '<li>완료 : <span class="n_end">0</span> (<span class="per1">0</span>%)</li>';
			info += '<li>검수 : <span class="n_tst">0</span> (<span class="per2">0</span>%)</li>';
			info += '<li>대기 : <span class="n_wat">0</span> (<span class="per4">0</span>%)</li>';
			info += '</ul></dd></dl>';

			var sel = '';
			sel += '<div class="ui-codinglist-sel mgb-xxxs">';
			sel += '<button type="button" class="btn-base"><span>전체</span></button>';
			sel += '<select id="uiCLstate" data-ctg="state">';
			sel += '<option value="0">상태선택</option>';
			sel += '</select>';
			sel += '<select id="uiCLpub" data-ctg="pub">';
			sel += '<option value="0">퍼블선택</option>';
			sel += '</select>';
			sel += '<select id="uiCLdev" data-ctg="dev">';
			sel += '<option value="0">개발선택</option>';
			sel += '</select>';
			sel += '<select id="uiCLDate" data-ctg="date">';
			sel += '<option value="0">일정선택</option>';
			sel += '</select>';
			// sel += '<select id="uiCLdepth" data-ctg="d2">';
			// sel += '<option value="0">메뉴선택</option>';
			// sel += '</select>';
			sel += '</div>';
			sel += '<div class="box-srch mgb-xxxs">';
			sel += '<div class="srch-area">';
			sel += '<input type="search" id="uiCodinglistSrchCode" class="inp-base ui-inpcancel" value="" placeholder="검색어를 입력해주세요.">';
			sel += '</div>';
			sel += '</div>';
			
			$('#' + opt.id).prepend(sel);
			$('#' + opt.id).prepend(info);

			if (!$('.ui-codinglist-info .total').data('data')) {
				$('.ui-codinglist-info .total').data('data', true).text(len - delsum - 1);
				$('.ui-codinglist-info .n_all').text(endsum + tstsum);
				$('.ui-codinglist-info .per0').text(((endsum + tstsum) / (len - delsum - 1) * 100).toFixed(0));
				$('.ui-codinglist-info .n_end').text(endsum);
				$('.ui-codinglist-info .per1').text((endsum / (len - delsum - 1) * 100).toFixed(0));
				$('.ui-codinglist-info .n_tst').text(tstsum);
				$('.ui-codinglist-info .per2').text((tstsum / (len - delsum - 1) * 100).toFixed(0));
				$('.ui-codinglist-info .n_wat').text(watsum);
				$('.ui-codinglist-info .per4').text((watsum / (len - delsum - 1) * 100).toFixed(0));
			}

			selectoption('uiCLstate', ctg_state);
			selectoption('uiCLpub', ctg_pub);
			selectoption('uiCLDate', ctg_date, true);
			selectoption('uiCLdepth', ctg_menu);
			selectoption('uiCLdev', ctg_dev);
			selectAct();

			function selectoption(id, optarray, v) {
				var $sel = $('#' + id);
				var nn = 1,
					nnn = 1;
				if (!$sel.data('data')) {
					var optionArray = [],
						optionSum = [],
						j = 0,
						optionHtml = '';
					v ? optarray.push('일정') : '';
					optarray.splice(0, 1);

					// 숫자 .sort(function(a,b){return a-b}) , 문자 sort()
					optionArray = optarray.slice().sort().reduce(function (a, b) {
						if (a.slice(-1)[0] !== b && b !== '') {
							a.push(b);
							v ? optionSum.push(nn) : '';
							nn = 1;
						} else {
							nn = nn + 1;
						}
						return a;
					}, []);

					var alen = optionArray.length;
					for (j; j < alen; j++) {
						if (v) {
							if (j < alen - 1) {
								optionHtml += '<option value="' + optionArray[j] + '">' + optionArray[j] + ' [' + optionSum[j + 1] + ']건</option>';
							}
						} else {
							optionHtml += '<option value="' + optionArray[j] + '">' + optionArray[j] + '</option>';
						}
					}
					$sel.data('data', true).append(optionHtml);
				}
			}

			function selectAct() {
				$('.ui-codinglist-sel select').on('change', function () {
					var $this = $(this),
						v = $this.val(),
						c = $this.data('ctg'),
						$sel = $('#' + opt.id + ' .' + c);

					if (v === '0') {
						$sel.closest('tr').removeClass('hidden');
					} else {
						$this.siblings().find('option:eq(0)').prop('selected', true);
						$sel.each(function (i) {
							v === 'all' ? $sel.closest('tr').removeClass('hidden') :
								v !== $sel.find('span').eq(i).text() ?
									$(this).closest('tr').addClass('hidden') : $(this).closest('tr').removeClass('hidden');
						});
					}
				});
			}

			$('.ui-codinglist-sel button').on('click', function (e) {
				$('#' + opt.id + ' tr').removeClass('hidden');
				$('.ui-codinglist-sel select').find('option:eq(0)').prop('selected', true);
			});
			$('.ui-codinglist table a, .ui-codinglist table button').off('click.uicoding').on('click.uicoding', function () {
				$(this).closest('tr').addClass('selected').siblings().removeClass('selected');
			});

			if ($('#uiCodinglistSrchCode').val() !== '') {
				var temp = $('.ui-codinglist tbody tr td *:contains('+ $('#uiCodinglistSrchCode').val() +')');

				$('.ui-codinglist tbody tr').hide();
				$(temp).closest('tr').show();
			}
			$.expr[":"].contains = $.expr.createPseudo(function(arg){
				return function(elem) {
					return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
				}
			});
			$('#uiCodinglistSrchCode').on('keyup', function(){
				var k = $(this).val(),
					temp = $('.ui-codinglist tbody tr td *:contains('+ k +')');
				$('.ui-codinglist tbody tr').hide();
				$(temp).closest('tr').show();
			});

			win[global].uiInputClear();
		}
	}


	
	/* ------------------------
	* name : file uploadt
	* date : 2020-06-20
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiFileUpload: function (opt) {
			return createUiFileUpload(opt);
		}
	});
	function createUiFileUpload(opt){
		$(doc).on('change', '.ui-file-inp', function(){
				upload(this);
			})
			.on('click', '.ui-file-del', function(){
				fileDel(this);
			});
			
		//fn
		function upload(t){
			var $this = $(t),
				files= $this[0].files,
				id = $this.attr('id'),
				len = files.length,
				$list = $('.ui-file-list[aria-labelledby="'+ id +'"]');

			$list.find('.ui-file-item').remove();
			$list.find('.ui-file-del').remove();
			for (var i = 0; i < len; i++) {
				$list.append('<div class="ui-file-item n'+ i +'">'+ files[i].name +'</div>');

			}
			$list.append('<button type="button" class="ui-file-del"><span class="hide">Delete attachment</span></button>');
		}
		function fileDel(t){
			var $this = $(t),
				$list = $this.closest('.ui-file-list'),
				id = $list.attr('aria-labelledby'),
				$id = $('#' + id);

			win[global].browser.ie ?
				$id.replaceWith( $id.clone(true) ) : $id.val(''); 
			$list.find('.ui-file-item').remove();
			$this.remove();
		}
	}
	

	/* ------------------------
	* name : count number
	* date : 2020-06-20
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {	
		uiCountStep: function (opt) {
			return createUiCountStep(opt);
		},
		uiCountSlot: function (opt) {
			return createUiCountSlot(opt);
		}
	});
	function createUiCountSlot(opt){
		var $base = $('#' + opt.id),
			countNum = !!opt.value === true ? opt.value : $base.text(),
			base_h = $base.outerHeight(),
			textNum = 0,
			len = countNum.toString().length,
			speed = !!opt.speed === true ? opt.speed + 's' : '1.0s',
			eff  = !!opt.eff === true ? opt.eff : 'easeOutQuart',
			transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend',
			i = 0,
			step, 
			// re, 
			timer, 
			r;
			
		if ($base.data('ing') !== true) {
			textNum = win[global].option.uiComma(countNum);
			base_h === 0 ? base_h = $base.text('0').outerHeight() : '';
			$base.data('ing',true).empty().css('height', base_h);
			len = textNum.length;
			step = len;
			// re = Math.ceil(len / 9); 
			(step < 9) ? step = 9 - len : step = 1;	

			// 숫자 단위만큼 
			for (i; i < len; i++) {
				var n = Number(textNum.substr(i, 1)),
					$thisNum, $base_div;
				
				if (isNaN(n)) {
					// 숫자가 아닐때 ', . ' 
					$base.append('<div class="n' + i + '"><div class="ui-count-og" style="top:' + base_h + 'px">' + textNum.substr(i, 1) + '</div></div>');
					$base.find('.n' + i).append('<span>' + textNum.substr(i, 1) + '</span>');
				}
				else {
					// 숫자일때
					$base.append('<div class="n' + i + '"><div class="ui-count-og" style="top:' + base_h + 'px">' + n + '</div></div>');
					$base.find('.n' + i).append('<span>9<br>8<br>7<br>6<br>5<br>4<br>3<br>2<br>1<br>0<br>' + n + '</span>');
					step = step + 1;
				}
				
				$base_div = $base.children('.n' + i);
				$base_div.find('span').wrapAll('<div class="ui-count-num" style="top:' + base_h + 'px; transition:top '+ speed +' cubic-bezier(' + win[global].option.effect[eff] + ');"></div>');
				$thisNum = $base_div.find('.ui-count-num');
				$thisNum.data('height', $thisNum.height()); 
			}

			r = len;
			timer = setInterval(function() {
				count(r)
				r = r - 1; 
				(r < 0) ? clearInterval(timer) : '';
			},150);
			
			
		}
		function count(r){
			var $current_num = $base.children('.n' + r).find('.ui-count-num'),
				num_h = Number($current_num.data('height'));
			$current_num.css('top', (num_h - base_h) * -1); 
			
			if (r === 0) {
				$current_num.one(transitionEnd, function(){
					$base.text(textNum).data('ing', false);
				});
			}
		}
	}
	function createUiCountStep(opt) {
		var $base = $('#' + opt.id);
		var countNum = !!opt.value === true ? opt.value : $base.text();

		var count = 0,
			timer, diff, counter,
			add = Math.ceil((countNum - count) / (countNum - count), -2),
			j = 1,
			v = 0,
			s = 100;
		
		if ($base.data('ing') !== true) {
			counter = function(){
				j = v < 10? j = 0 : v < 10 ? j + 11 : v < 40 ? j +111 : v < 70 ? j + 1111 : j + 11111;
				s = s < 0 ? s = 0 : s - 10;
				diff = countNum - count;
				(diff > 0) ? count += add + j : '';

				var n = win[global].option.uiComma(count);
				$base.text(n);
				v = v + 1;

				if(count < countNum) {
					timer = setTimeout(function() { 
						counter(); 
					}, s);
				} else {
					$base.text(win[global].option.uiComma(countNum));
					clearTimeout(timer);
				}
			}
			counter();
		}
	}



	/* ------------------------
	* name : dragglable
	* date : 2020-06-20
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {	
		uiDraggable: function (opt) {
			return createUiDraggable(opt);
		},
		uiDraggableReset: function (opt) {
			return createUiDraggableReset(opt);
		}
	});
	function createUiDraggable(opt){
		var $wrap = $('#' + opt.id);
		var $item = $wrap.find('.ui-draggable-item');
		var $area = $wrap.find('.ui-draggable-area');
		var scale = 1;
		var $svg = $wrap.find('svg');
		
		//기본값 세팅
		$(window).off('resize.aaa').on('resize.aaa', function(){
			set();
		});
		set();
		function set(){
			scale =1;
			$item.each(function(i){
				var $this = $(this);
				
				$this.addClass('original');
				$this.attr('orgt', $this.offset().top / scale - ($wrap.offset().top / scale));
				$this.attr('orgl', $this.offset().left / scale - ($wrap.offset().left / scale));
				
				if (!$this.attr('onlymove')) {
					$this.after($this.clone().removeClass('original').addClass('clone').prop('disabled', true));
				}
				if (!!$this.attr('line')) {
					var nm = $this.attr('name');
					var strokWidth = 4 / scale;
					var lineX = Number($this.attr('orgl')) + ($this.outerWidth() / 2 / scale ) - strokWidth / 2;
					var lineY = Number($this.attr('orgt')) + ($this.outerHeight() / 2 / scale ) - strokWidth / 2;

					$this.attr('linex', lineX);
					$this.attr('liney', lineY);
					$svg.find('line[name="'+ nm +'"]')
						.attr('x1', lineX)
						.attr('y1', lineY)
						.attr('x2', lineX)
						.attr('y2', lineY)
						.attr('stroke-width', strokWidth);
				}
			});

			$wrap.attr('ts',$wrap.offset().top / scale);
			$wrap.attr('te',$wrap.offset().top / scale + $wrap.outerHeight() / scale);
			$wrap.attr('ls',$wrap.offset().left / scale);
			$wrap.attr('le',$wrap.offset().left / scale + $wrap.outerWidth() / scale);

			$area.each(function(i){
				scale = 1;
				var $this = $(this);

				$this.attr('ts',$this.offset().top / scale);
				$this.attr('te',$this.offset().top / scale + $this.outerHeight() / scale);
				$this.attr('ls',$this.offset().left / scale);
				$this.attr('le',$this.offset().left / scale + $this.outerWidth() / scale);
			});

			$item.off('mousedown.drag').on('mousedown.drag', function (e) {
				scale = 1;
				//dragStart(e, this);
				var $this = $(this);
				var $wrap_ = $this.closest('.ui-draggable');
				var itemName = $this.attr('name');
				var $area = $wrap_.find('.ui-draggable-area[name="'+ itemName +'"]');
				var wrapW = $wrap_.outerWidth();
				var wrapH = $wrap_.outerHeight();
				var itemW = $this.outerWidth();
				var itemH = $this.outerHeight();
				var moving = false;
				var onlymove = !!$this.attr('onlymove');
				var line = !!$this.attr('line');
				var x, y;
				
				var scopeW = wrapW - itemW,
					scopeH = wrapH - itemH;

				var arrTs = [],
					arrTe = [],
					arrLs = [],
					arrLe = [];	

				var off_tw = $wrap.offset().top / scale,
					off_lw = $wrap.offset().left / scale,
					off_t = $this.position().top / scale,
					off_l = $this.position().left / scale;

				for (var i = 0, len = $area.length; i < len; i++) {
					console.log(i);
					arrTs.push($area.eq(i).position().top);
					arrTe.push($area.eq(i).position().top + $area.eq(i).outerHeight() * scale);
					arrLs.push($area.eq(i).position().left);
					arrLe.push($area.eq(i).position().left + $area.eq(i).outerWidth() * scale);
				}

				$this.css({
					top: off_t + 'px',
					left: off_l + 'px'
				});

				$(document).off('mousemove.drag').on('mousemove.drag', function (e) {
					moving = true;

					if (e.touches !== undefined) {
						y = e.touches[0].pageY / scale;
						x = e.touches[0].pageX / scale;
					} else {
						if (e.pageY !== undefined) {
							y = e.pageY / scale;
							x = e.pageX / scale;
						}
						if (e.pageY === undefined) {
							y = e.clientY / scale;
							x = e.clientX / scale;
						}
					}
					
					var $body = $('body');
					var nowT = y - (itemH / 2) - off_tw;
					var nowL = x - (itemW / 2) - off_lw;
					
					if (0 > nowT) {
						nowT = 0;
					} 
					if (scopeH < nowT) {
						nowT = scopeH;
					} 
					if (0 > nowL) {
						nowL = 0;
					} 
					if (scopeW < nowL) {
						nowL = scopeW;
					} 
					if (onlymove) {
						for(var i = 0; i < arrTs.length; i++) {
							var isInVer = (nowT * scale > arrTs[i] - (itemH * scale / 2) && nowT * scale < arrTe[i] - (itemH * scale / 2));
							var isInHor = (nowL * scale > arrLs[i] - (itemW * scale / 2) && nowL * scale < arrLe[i] - (itemW * scale / 2));

							if (isInVer && isInHor) {
								if (Number($body.attr('dragps')) !== i) {
									$body.attr('dragps', i);
								}
								break;
							} else {
								if (0 <= nowT && scopeH >= nowT && 0 <= nowL && scopeW >= nowL) {
									$body.removeAttr('dragps');
								}
							} 
						}
					}

					if (line) {
						var lineName = $this.attr('name');
						var lineX = Number(nowL) + Number($this.outerWidth() / 2);
						var lineY = Number(nowT) + Number($this.outerHeight() / 2);

						$svg.find('line[name="'+ lineName +'"]')
							.attr('x2', lineX)
							.attr('y2', lineY);

						(0 > nowT) && $svg.find('line[name="'+ lineName +'"]').attr('y2', 0);
						(scopeH < nowT) && $svg.find('line[name="'+ lineName +'"]').attr('y2', scopeH);
						(0 > nowL) && $svg.find('line[name="'+ lineName +'"]').attr('x2', 0);
						(scopeW < nowL) && $svg.find('line[name="'+ lineName +'"]').attr('x2', scopeW);
					}
					
					$this.css({
						top: nowT + 'px',
						left: nowL + 'px'
					});
				}).off('mouseup.drag').on('mouseup.drag', function (e) {
					if (moving && !onlymove) {
						var nowT = $this.position().top + (itemH / 2);
						var nowL = $this.position().left + (itemW / 2);

						for(var i = 0; i < arrTs.length; i++) {
							var isIn = (nowT > arrTs[i] && nowT < arrTe[i]) && (nowL > arrLs[i] && nowL < arrLe[i]);
							var $area_ = $area.eq(i);

							if (isIn && !$area_.attr('full')) {
								if(!$area_.attr('full')) {
									if (!!$area_.attr('limit')) {
										$area_.attr('full', true);
										$area_.addClass('ok');
									} else {
										$area.eq(0).addClass('ok');
									}
									
									$this.addClass('ok');
									$this.prop('disabled', true);
								} 
							} 
						}

						if (!$this.hasClass('ok')) {
							if (line) {
								var lineName = $this.attr('name');
								$svg.find('line[name="'+ lineName +'"]')
									.attr('x2', $this.attr('linex'))
									.attr('y2', $this.attr('liney'));
							}

							$this.stop().animate({
								top: $this.attr('orgt') + 'px',
								left: $this.attr('orgl') + 'px'
							});
						}
					}
					$(document).off('mousemove.drag');
					$(document).off('mouseup.drag');
				});
			});
		}
	}
	function createUiDraggableReset(opt){
		var $wrap = opt !== undefined ? $('#' + opt.id) :$('.ui-draggable');
		var $item = $wrap.find('.ui-draggable-item');
		var $area = $wrap.find('.ui-draggable-area');
		var $svg = $wrap.find('svg');

		$('body').removeAttr('draggable');
		$area.removeClass('ok').removeAttr('full');
		$item.each(function(){
			var $this = $(this);

			$this.prop('disabled', false).removeClass('ok');
			$this.stop().animate({
				top: $this.attr('orgt') + 'px',
				left: $this.attr('orgl') + 'px'
			});

			if (!!$this.attr('line')) {
				var nm = $this.attr('name');
				
				$svg.find('line[name="'+ nm +'"]')
					.attr('x2', $this.attr('linex'))
					.attr('y2', $this.attr('liney'));
			}
		});
	}






























































	


	



	/* ------------------------------------------------------------------------
	 * slide(carousel) v1.0 
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiSlide: function (opt) {
			return createUiSlide(opt);
		},
		uiSlideFnEvt: function (opt) {
			return createUiSlideFnEvt(opt);
		},
		uiSlideFnAuto: function (opt) {
			return createUiSlideFnAuto(opt);
		}
	});
	win[global].uiSlide.options = {
		current:0,
		multi:false,
		loop:true,
		items:1,
		eff:'slide',
		dot:true,
		nav:true,
		auto:true,
		play:false,
		gauge:true,
		resize: true,
		speed:300,
		autoTime:3000,
		callback: false,
		/* multi use */
		margin:0,
		mouseDrag:true,
		touchDrag:true
	};
	function createUiSlide(opt) {
		//option guide
		if (opt === undefined) {
			return false;
		}
		
		win[global].uiSlide[opt.id] = {};
		var base = win[global].uiSlide[opt.id];

		//루트설정
		base.root = $('#' + opt.id);
		base.tit = base.root.find('.ui-slide-tit');
		base.wrap = base.root.find('.ui-slide-wrap');
		base.itemwrap = base.root.find('.ui-slide-itemwrap');
		base.item = base.root.find('.ui-slide-item');
		base.itemtit = base.root.find('.ui-slide-itemtit');

		//옵션저장
		base.opt = $.extend({}, win[global].uiSlide.options, opt);
		
		//중복실행 방지
		if (!base.root.is('.load')) {
			base.root.addClass('load');
			uiSlideSet(base);

			
		}
	}
	function uiSlideSet(base){
		var base = base;

		//기본필요값 설정
		base.opt.len = base.item.length;
		base.opt.w = base.item.eq(base.opt.current).outerWidth();
		base.opt.h = base.item.eq(base.opt.current).outerHeight();
		base.opt.win_w = $(win).outerWidth();
		base.opt.docw = $(doc).outerHeight();
		
		//multi
		base.multi = {};
		base.multi.is = base.opt.multi;
		if (base.multi.is) {
			base.multi.w = [0]; //items width array
			base.multi.h = [];
			base.multi.ww = 0; //itemwrap width
			base.multi.rw = base.root.outerWidth(); //slide width
			base.root.addClass('ui-slide-multi n' + base.opt.items);
			base.itemwrap.addClass('ui-slide-multiitem');
			
			for (var i = 0; i < base.opt.len; i++) {
				base.item.eq(i).css('margin-right', (i !== base.opt.len - 1) ? base.opt.margin: 0 );
				base.multi.h.push(base.item.eq(i).outerHeight());
				base.multi.ww = base.multi.ww + base.item.eq(i).outerWidth() + Number((i !== base.opt.len - 1) ? base.opt.margin : 0);
				base.multi.w.push(base.multi.ww);
			}
			base.itemwrap.css('width', base.multi.ww);
			base.itemwrap.data('left', 0) ;
		}
		
		//current item 설정
		//base.opt.eff !== 'slide' ? base.item.addClass('animated') : '';
		if (!base.multi.is) {
			base.item.attr('aria-hidden', true).css('left', base.opt.w).eq(base.opt.current).attr('aria-hidden', false).css('left',0);
		}
		
		//heigth 설정
		base.wrap.css('height', base.opt.h);
		base.itemwrap.css('height', base.opt.h);
		base.item.eq(base.opt.current).css('height', base.opt.h);

		//이벤트 관련 설정
		base.evt = {};
		base.evt.offsetX = 0;
		base.evt.offsetY = 0;
		base.evt.activate = false; //현재 모션 여부
		base.evt.swap = 'off'; //dragmove,cancel 이벤트 실행여부
		base.evt.cancel = false;
		base.evt.xaxis = false;
		base.evt.movX = 0;
		base.evt.movY = 0;

		//자동진행
		base.auto = {};
		base.timer = {};
		base.timers = {};
		
		//fade effect value
		base.fade = {};
		base.fade.opacity = 0;
		
		//control 
		(base.opt.dot) ? uiSlideDot(base) : ''; 
		(base.opt.nav) ? uiSlideNav(base) : '';
		(base.opt.auto) ? uiSlideAuto(base) : '';
		(base.opt.gauge) ? uiSlideGauge(base) : ''; 
		
		uiSlideReset(base);
		uiSlideEvtType(base);
		uiSlideEvt(base);

		$(win).resize(function(){
			base.itemwrap.find('.ui-slide-item[aria-hidden="true"]').css('left', base.itemwrap.outerWidth());
			uiSlideReset(base);
			uiSlideEvtType(base);
			uiSlideEvt(base);
		});
		base.root.data('base', base);
	}
	function uiSlideDot(base) {
		var base = base,
			i, dotwrap, dotdiv, selected;
		
		dotwrap = doc.createElement("div");
		dotdiv = doc.createElement("div");
		$(dotwrap).addClass('ui-slide-dotwrap');
		$(dotdiv).addClass('ui-slide-dotdiv').attr('role', 'tablist');

		for (i = 0; i < base.opt.len; i++) {
			selected = (base.opt.current === i) ? 'true' : 'false'; 
			$(dotdiv).append('<button class="ui-slide-dot" type="button" role="tab" aria-selected="' + selected + '"><span class="hide">' + base.item.eq(i).find(".ui-slide-itemtit").text() + '</span></button>');
		}
		base.root.prepend(dotwrap);
		base.dotwrap = base.root.find('.ui-slide-dotwrap');
		base.dotwrap.append(dotdiv);
		base.dotdiv = base.dotwrap.find('.ui-slide-dotdiv');
		base.dotbtn = base.dotdiv.find('.ui-slide-dot');
	}
	function uiSlideNav(base) {
		var base = base,
			navwrap, $navwrap, eqNext, eqPrev;
		
		eqNext = base.opt.current + 1 >= base.opt.len ? 0 : base.opt.current + 1;
		eqPrev = base.opt.current - 1 < 0 ? base.opt.len - 1 : base.opt.current - 1;
		
		navwrap = doc.createElement("div");
		$navwrap = $(navwrap);
		
		$navwrap.addClass('ui-slide-navwrap');
		$navwrap.append('<button type="button" class="ui-slide-prev">이전 : <span>' + base.item.eq(eqPrev).find(".ui-slide-itemtit").text() + '</span></button>');
		$navwrap.append('<button type="button" class="ui-slide-next">다음 : <span>' + base.item.eq(eqNext).find(".ui-slide-itemtit").text() + '</span></button>');
		base.root.append(navwrap);
		
		base.nav = base.root.find('.ui-slide-navwrap');
		base.nav.prev = base.nav.find('.ui-slide-prev');
		base.nav.next = base.nav.find('.ui-slide-next');
	}
	function uiSlideAuto(base) {
		var base = base,
				dotwrap, autobtn;

			if (!base.root.find('.ui-slide-dotwrap').length) {
				dotwrap = doc.createElement("div");
				$(dotwrap).addClass('ui-slide-dotwrap');
				base.root.prepend(dotwrap);
				base.dotwrap = base.root.find('.ui-slide-dotwrap');
			}
			if (!!base.opt.play) {
				autobtn = '<button type="button" class="ui-slide-auto" state="play"><span>정지</span></button>';
			} else {
				autobtn = '<button type="button" class="ui-slide-auto" state="stop"><span>자동 진행</span></button>';
			}
			base.dotwrap.prepend(autobtn);
			base.autobtn = base.dotwrap.find('.ui-slide-auto');
			(base.opt.play && base.opt.auto) ? uiSlideAutoEvt(base, true) : '';
	}
	function uiSlideGauge(base) {
		var base = base,
			gaugewrap = doc.createElement("div"),
			$gaugewrap = $(gaugewrap);
		
		$gaugewrap.addClass('ui-slide-gauge');
		$gaugewrap.append('<div class="ui-slide-gaugebar"></div>');
		base.root.append(gaugewrap);
		
		base.gauge =  base.root.find('.ui-slide-gauge');
		base.gauge.bar = base.gauge.find('.ui-slide-gaugebar');
	}
	function uiSlideReset(base) {
		var base = base;

		$(win).resize(function(){
			clearTimeout(base.timers);
			base.timers = setTimeout(function(){
				if (base.opt.win_w !== $(win).outerWidth()) {
					base.opt.len = base.item.length;
					base.opt.w = base.item.eq(base.opt.current).outerWidth();
					base.opt.h = base.item.eq(base.opt.current).outerHeight();
					base.opt.win_w = $(win).outerHeight();
					base.opt.docw = $(doc).outerHeight();
					base.evt.activate = false; //현재 모션 여부
					
					if (base.multi.is) {
						base.multi.w = [0]; //items width array
						base.multi.h = [];
						base.multi.ww = 0; //itemwrap width
						base.multi.rw = base.root.outerWidth(); //slide width
						base.root.addClass('ui-slide-multi n' + base.opt.items);
						base.itemwrap.addClass('ui-slide-multiitem');
						
						for (var i = 0; i < base.opt.len; i++) {
							base.item.eq(i).css('margin-right', (i !== base.opt.len - 1) ? base.opt.margin: 0 );
							base.multi.h.push(base.item.eq(i).outerHeight());
							base.multi.ww = base.multi.ww + base.item.eq(i).outerWidth() + Number((i !== base.opt.len - 1) ? base.opt.margin : 0);
							base.multi.w.push(base.multi.ww);
						}
						base.itemwrap.css({ width: base.multi.ww, left: 0 });
						base.itemwrap.data('left', 0) ;
					}
				}
			}, 200);
		});	
	}
	function uiSlideEvtType(base) {
		var base = base,
			types = ['as', 'ever', 'j', 'o'];

		if (base.opt.mouseDrag === true && base.opt.touchDrag === true) {
			types = ['touchstart.uiSlide mousedown.uiSlide', 'touchmove.uiSlide mousemove.uiSlide', 'touchend.uiSlide touchcancel.uiSlide mouseup.uiSlide', 'click.uiSlide'];
		}
		else if (base.opt.mouseDrag === false && base.opt.touchDrag === true) {
			types = ['touchstart.uiSlide', 'touchmove.uiSlide', 'touchend.uiSlide touchcancel.uiSlide', 'click.uiSlide'];
		}
		else if (base.opt.mouseDrag === true && base.opt.touchDrag === false) {
			types = ['mousedown.uiSlide', 'mousemove.uiSlide', 'mouseup.uiSlide', 'click.uiSlide'];
		}
		
		base.evt.start = types[0];
		base.evt.move = types[1];
		base.evt.end = types[2]; 
		base.evt.click = types[3]; 
	}
	function uiSlideEvtCurrent(base){
		var base = base;
		
		//이전 다음 번호생성
		base.evt.next = (base.opt.current + 1 >= base.opt.len) ? 0 : base.opt.current + 1;
		base.evt.prev = (base.opt.current - 1 < 0) ? base.opt.len - 1 : base.opt.current - 1;
	}
	function uiSlideEvt(base) {
		var base = base;

		base.opt.past = base.opt.current;
		
		//click event
		base.root.off(base.evt.click).on(base.evt.click, 'button', function(){
			var $this = $(this);
			
			if (!base.evt.activate) {
				uiSlideEvtCurrent(base);

				if ($this.hasClass('ui-slide-next')) {
					actfn(base.evt.next, 'next');
				} else if ($this.hasClass('ui-slide-prev')) {
					actfn(base.evt.prev, 'prev');
				} else if ($this.hasClass('ui-slide-dot')) {
					actfn($this.index(), base.opt.past < base.opt.current ? 'next' : 'prev');
				} else if ($this.hasClass('ui-slide-auto')) {
					$this.attr('state') === 'play' && base.opt.auto ? uiSlideAutoEvt(base, false) : uiSlideAutoEvt(base, true);
				}
			}
		});
		function actfn(c, d){
			base.opt.current = c;
			base.dir = d;
			uiSlideAct(base);
			base.opt.auto ? uiSlideAutoEvt(base, false) : '';
		}
		
		if (!base.multi.is) {
			base.item.off(base.evt.start).on(base.evt.start, function(event){
				if (!base.evt.activate) {
					uiSlideDragStart(base, event);
				}
			});
		} else {
			base.itemwrap.off(base.evt.start).on(base.evt.start, function(event){
				if (!base.evt.activate) {
					uiSlideDragStart(base, event);
				}
			});
		}
	}
	function uiSlideAutoEvt(base, v) {
		//자동실행 v값이 true이면 실행, false이면 정지
		var base = base;

		if (v === true) {
			base.opt.play = false;
			base.autobtn.attr('state', 'play').find('span').text('정지');
			base.timer = win.requestAFrame(autoRAF);
			//base.timer = window.requestAFrame(autoRAF);
		} else {
			base.opt.play = true;
			base.autobtn.attr('state', 'stop').find('span').text('자동 진행');
			win.cancelAFrame(base.timer);
			//window.cancelAFrame(base.timer);
		}

		function autoRAF(timestamp){
			var tstamp = !timestamp ? base.timer : timestamp.toFixed(0),
				limit = !timestamp ? base.opt.autoTime / 10 : base.opt.autoTime,
				progress;

			(!base.startA) ? base.startA = tstamp : '';
			progress = tstamp - base.startA;
			
			if (progress < limit) {
				base.gauge.bar.css('width', (progress / limit * 100).toFixed(0) + '%');
				base.timer = win.requestAFrame(autoRAF);
				/*base.timer = window.requestAFrame(autoRAF);*/
			} else {
				base.opt.current = (base.opt.current + 1 >= base.opt.len) ? 0 : base.opt.current + 1;
				base.dir = 'next';
				base.startA = null;
				base.gauge.bar.css('width', '100%');
				
				uiSlideAct(base, callbackAuto);
				
			}
		}
		function callbackAuto(){
			base.timer = win.requestAFrame(autoRAF);
			/*base.timer = window.requestAFrame(autoRAF);*/
		}
	}
	function uiSlideGetTouches(event) {
		//터치 이벤트가 undefined 가 아니라면
		if (event.touches !== undefined) {
			return { x : event.touches[0].pageX, y : event.touches[0].pageY };
		}
		if (event.touches === undefined) {
			if (event.pageX !== undefined) {
				return { x : event.pageX, y : event.pageY };
			}
			//ie
			if (event.pageX === undefined) {
				return { x : event.clientX, y : event.clientY };
			}
		}
	}
	function uiSlideEvtDrag(base) {
		var base = base;

		if (base.evt.swap === 'on') {
			$(doc).off(base.evt.move).on(base.evt.move, function(event){
				base.root.data('touch', 'move');
				uiSlideDragMove(base, event);
			});
			$(doc).off(base.evt.end).on(base.evt.end, function(event){
				base.root.data('touch', 'end');
				uiSlideDragEnd(base, event);
			});
		} else if (base.evt.swap === 'off') {
			$(doc).off(base.evt.move);
			$(doc).off(base.evt.end);
		}
	}
	function uiSlideDragStart(base, event) {
		var ev = event.originalEvent || event || win.event,
			base = base;
		
		base.evt.offsetX = uiSlideGetTouches(ev).x;
		base.evt.offsetY = uiSlideGetTouches(ev).y;
		base.evt.swap = 'on';
		base.evt.yaxis = false;

		uiSlideEvtCurrent(base);
		if (!base.multi.is) {
			switch(base.opt.eff){
			case 'slide': 
				startLeft(base.opt.w, base.opt.w * -1);
				break;
			case 'fade': 
				startLeft(0, 0);
				break;
			//The default value is 'slide'. So no default value is required.
			}
		}
		function startLeft(n,p){
			base.item.eq(base.evt.next).css('left', n);
			base.item.eq(base.evt.prev).css('left', p);
		}
		
		uiSlideEvtDrag(base);
		//$('body').on('touchstart.bodyscroll', uiSlideLockTouch);
		// /
	}
	function uiSlideDragEnd(base, event) {
		var ev = event.originalEvent || event || win.event,
			base = base;

		base.evt.swap = 'off';
		base.evt.xaxis = false;
		uiSlideEvtDrag(base);
		//$('body').off('touchstart.bodyscroll', NETIVE.uiSlide.lockTouch);
		if (!base.multi.is) {
			if (Math.abs(base.evt.movX) > base.opt.w / 5) {
				if (base.evt.movX < 0) {
					base.opt.current = base.evt.next;
					base.dir = 'next';
				} else if (base.evt.movX > 0) {
					base.opt.current = base.evt.prev;
					base.dir = 'prev';
				}
				base.evt.cancel = false;
				uiSlideAct(base);
			} else if(base.evt.movX !== 0) {
				base.evt.cancel = true;
				uiSlideAct(base);
			}
		} else {
			var n = 0;
			for (var i = 0; i < base.multi.w.length; i++) {
				if (Number(base.multi.w[i]) > Number(base.itemwrap.css('left').replace(/[^0-9]/g, ""))) {
					n = i;
					break;
				}
			}
			if (base.multi.p === 'prev') {
				n = n - 1 < 0 ? 0 : n - 1;
			}
			
			base.itemwrap.stop().animate({
				left:(base.multi.ww - base.multi.rw) < base.multi.w[n] ? (base.multi.ww - base.multi.rw) * -1 : base.multi.w[n] * -1
			},200 , function(){
				base.itemwrap.data('left', base.multi.w[n] * -1);
			});
		}
	}
	function uiSlideDragMove(base, event) {
		var ev = event.originalEvent || event || win.event,
			base = base;
		
		base.evt.movX = parseInt(base.evt.offsetX - uiSlideGetTouches(ev).x, 10) * -1;
		base.evt.movY = parseInt(base.evt.offsetY - uiSlideGetTouches(ev).y, 10) * -1;
		
		base.opt.auto ? uiSlideAutoEvt(base, false) : '';

		//single drag scope
		if (Math.abs(base.evt.movX) > base.opt.w && !base.multi.is) {
			base.evt.movX = (base.evt.movX < 0) ? base.opt.w * -1 : base.opt.w;
		} 
		if (base.multi.is) {
			base.multi.p = (base.evt.movX < 0) ? 'next' : 'prev';
		}

		//y축이 x축보다 이동이 크고 X축 이동이 5보다 작을때
		if (Math.abs(base.evt.movY) > 2 && Math.abs(base.evt.movX) < 2 && base.evt.xaxis === false) {
			base.evt.swap = 'off';
			base.evt.yaxis = true;
			uiSlideEvtDrag(base);
			//$('body').off('touchstart.bodyscroll', NETIVE.uiSlide.lockTouch);
			//$('html, body').off('touchstart.bodyscroll', NETIVE.uiSlide.lockTouch);
		}
		//X축이 y축보다 이동이 클때	
		else if(base.evt.yaxis === false){
			base.evt.xaxis = true;
			//멀티일때 좌우 끝에서 복원되는 모션 일때 중복실행 방지
			//base.multi.restore : 멀티일때 좌우 끝에서 복원되는 모션
			//if (!base.multi.restore) {
				
				//slide mode
				if (base.opt.eff === 'slide') {
					//single slide mode
					if (!base.multi.is) {
						base.item.eq(base.opt.current).css('left', base.evt.movX);
						base.item.eq(base.evt.next).css('left', base.opt.w + base.evt.movX);
						base.item.eq(base.evt.prev).css('left', (base.opt.w * -1) + base.evt.movX);
					} 
					//multi slide mode
					else if (base.multi.is) {
						// data left 값이 없다면 0으로 설정.
						//base.itemwrap.data('left') ? base.itemwrap.data('left', 0) : '';

						/*clearTimeout(base.multi.timer);
						if (base.evt.movX + Number(base.itemwrap.data('left')) > 0) {
							base.multi.timer = setTimeout(function(){
								NETIVE.uiSlide.restore(base, 0);
							},200);
							base.itemwrap.data('left', 0);
							base.evt.movX = 0;
						} 
						*/

						//multi drag scope 
						if (base.evt.movX + Number(base.itemwrap.data('left')) > 0) {
							//앞부분
							base.itemwrap.css('left', 0).data('left', 0);
						} else if(base.evt.movX + Number(base.itemwrap.data('left')) <  (base.multi.ww - base.multi.rw) * -1){
							//뒷부분
							base.itemwrap.css('left', (base.multi.ww - base.multi.rw) * -1).data('left', (base.multi.ww - base.multi.rw) * -1);
						} else {
							base.itemwrap.css('left', base.evt.movX + Number(base.itemwrap.data('left'))).data('movx', base.evt.movX + Number(base.itemwrap.data('left')));
						}
					}
				}
				
				//fade mode
				else if (base.opt.eff === 'fade') {
					base.fade.opacity = ((base.opt.w - Math.abs(base.evt.movX)) / base.opt.w).toFixed(2);
					base.item.css({ opacity: 0, zIndex: 0 }).eq(base.opt.current).css({ opacity: base.fade.opacity, zIndex: 1 });
					(base.evt.movX < 0) ?
						base.item.eq(base.evt.next).css({ opacity: 1 - base.fade.opacity, zIndex: 0 }) :
						base.item.eq(base.evt.prev).css({ opacity: 1 - base.fade.opacity, zIndex: 0 });
				}
			//}
		}
	}
	function uiSlideAct(base, callbackAuto) {
		var base = base,
			$current = base.item.eq(base.opt.current),
			$past = base.item.eq(base.opt.past),
			w = base.opt.w,
			h = base.opt.h;

		if (base.opt.past !== base.opt.current || base.evt.cancel) {
			if (base.dir === 'next' && base.evt.movX === 0) {
				$current.css('left', w);
			} else if(base.dir === 'prev' && base.evt.movX === 0) {
				$current.css('left', w * -1);
			} else {
				if (base.evt.cancel) {
					$current.css('left', base.evt.movX);
				} else {
					base.evt.movX < 0 ? $current.css('left', w + base.evt.movX) : $current.css('left', (w * -1) + base.evt.movX);
				}
			}
			
			base.item.removeClass('on').attr('aria-hidden', true);
			$current.addClass('on').attr('aria-hidden', false);
			base.start = null;
			uiSlideStep(base, callbackAuto);
		}
	}
	function uiSlideStep(base, callbackAuto) {
		//eff분기
		switch(base.opt.eff){
		case'slide':
			(!base.multi.is) ? uiSlideSteplide(base, callbackAuto) : uiSlideStepMulti(base, callbackAuto);
			break;
		case'fade':
			uiSlideStepFade(base, callbackAuto);
			break;
		}
		
		//heigth 재설정
		base.opt.w = base.item.eq(base.opt.current).outerWidth();
		base.opt.h = base.item.eq(base.opt.current).outerHeight();
		base.wrap.css('height', base.opt.h);
		base.itemwrap.css('height', base.opt.h);
		base.item.eq(base.opt.current).css('height', base.opt.h);
	}
	function uiSlideStepMulti(base, callbackAuto) {
		base.itemwrap.data('left', base.itemwrap.data('movx'));
	}
	function uiSlideStepFade(base, callbackAuto) {
		var base = base,
			step = (base.opt.speed / 16).toFixed(0),
			per = Math.ceil(100 / step),
			n = 0,
			opa = 0,
			tstamp, 
			progress;

			win.requestAFrame(stepRAF);
		base.evt.activate = true;

		function stepRAF(timestamp){
			if (!!timestamp) {
				tstamp = timestamp.toFixed(0);
				(!base.start) ? base.start = tstamp : '';
				progress = tstamp - base.start;
				opa = Number((per * n) / 100);

				base.fade.opacity !== 0 ? opa = opa + (1 - Number(base.fade.opacity)) : '';
				opa = opa.toFixed(2);
				n = n + 1;
				
				if (!base.evt.cancel) {
					base.item.eq(base.opt.past).css({ 
						left: 0,
						opacity: 1 - opa < 0 ? 0 : 1 - opa,
						zIndex: 0
					});
					base.item.eq(base.opt.current).css({
						left: 0,
						opacity: opa > 1 ? 1 : opa,
						zIndex: 1
					});
				} 
				//cancle step
				else {
					//next cancel
					if (base.evt.movX < 0) {
						base.item.eq(base.opt.current).css({ 
							left: 0,
							opacity: 1,
							zIndex: 1
						});
						base.item.eq(base.evt.next).css({ 
							left: 0,
							opacity: 0,
							zIndex: 0
						});
					} 
					//prev cancel
					else {
						base.item.eq(base.opt.current).css({ 
							left: 0,
							opacity: 1,
							zIndex: 1
						});
						base.item.eq(base.evt.prev).css({ 
							left: 0,
							opacity: 0,
							zIndex: 0
						});
					}
				}
				//ing or end
				(progress < base.opt.speed) ? win.requestAFrame(stepRAF) : uiSlideEnd(base, callbackAuto);
			}
			//animated
			else {
				base.item.eq(base.opt.current).stop().animate({
					left: 0,
					opacity: 1,
					zIndex: 1
				},300, function(){
					uiSlideEnd(base, callbackAuto)
				});

				if (!base.evt.cancel) {
					base.item.eq(base.opt.past).stop().animate({
						left: 0,
						opacity: 0,
						zIndex: 0
					}, 300);
				}
			}
		}
	}
	function uiSlideSteplide(base, callbackAuto){
		var base = base,
			tstamp, progress, m, n, 
			j = (base.dir === 'next') ? [-1, 1] : [1, -1],
			nn = 0,
			px_add = (base.opt.w / (base.opt.speed / 16)) - 16,
			px;

			win.requestAFrame(stepRAF);
		base.evt.activate = true;
		
		function stepRAF(timestamp){
			//requestAnimationFrame
			if (!!timestamp) {
				tstamp = timestamp.toFixed(0);
				(!base.start) ? base.start = tstamp : '';
				progress = tstamp - base.start;
				
				m = base.evt.movX < 0 ? base.evt.movX : base.evt.movX * -1; //X축으로 이동값 정수로 변경
				px = progress + (px_add * nn);
				n = Math.ceil(px - m); 
				nn = nn + 1;
				//next & prev step
				if (!base.evt.cancel) {
					base.item.eq(base.opt.past).css({ 
						left: Math.min(n , base.opt.w) * j[0] + 'px',
						zIndex: 1
					});
					base.item.eq(base.opt.current).css({
						left: Math.max(base.opt.w - n, 0) * j[1] + 'px',
						zIndex: 1
					});
				} 
				//cancle step
				else {
					//next cancel
					if (base.evt.movX < 0) {
						base.item.eq(base.opt.current).css({ 
							left: Math.min(base.evt.movX + px, 0),
							zIndex: 1
						});
						base.item.eq(base.evt.next).css({ 
							left: Math.min((base.opt.w + base.evt.movX) + px, base.opt.w),
							zIndex: 1
						});
					} 
					//prev cancel
					else {
						base.item.eq(base.opt.current).css({ 
							left: Math.max(base.evt.movX - px, 0),
							zIndex: 1
						});
						base.item.eq(base.evt.prev).css({ 
							left: Math.max( ((base.opt.w * -1) + base.evt.movX) - px, base.opt.w * -1 ),
							zIndex: 1
						});
					}
				}
				//ing or end
				(px < base.opt.w) ? win.requestAFrame(stepRAF) : uiSlideEnd(base, callbackAuto);
			}
			//animated
			else {
				base.item.eq(base.opt.current).stop().animate({
					left: 0,
					zIndex: 1
				},300, function(){
					uiSlideEnd(base, callbackAuto)
				});

				if (!base.evt.cancel) {
					base.item.eq(base.opt.past).stop().animate({
						left: base.opt.w * j[0] + 'px',
						zIndex: 1
					}, 300);
				}
			}
		}
	}
	function uiSlideEnd(base, callbackAuto) {
		var base = base;

		base.item.css('z-index', 0);
		base.item.eq(base.opt.current).css('z-index', 1);
		
		(!base.evt.cancel) ? base.opt.past = base.opt.current : '';
		
		//base.opt.eff !== 'slide' ? base.item.eq(base.opt.current).addClass(base.opt.eff) : '';
		base.evt.activate = false;
		base.evt.cancel = false;
		base.evt.movX = 0;
		base.evt.movY = 0;
		base.root.data('base', base);
		base.fade.opacity = 0;
		base.opt.gauge ? 
		base.gauge.bar.css('width', 0) : '';
		
		(base.opt.nav) ? uiSlideNavTxt(base) : '';
		(base.opt.dot) ? uiSlideDotChg(base) : ''; 
		!!callbackAuto ? callbackAuto() : '';
		!!base.opt.callback ?  uiSlideCallback(base) : '';
	}
	function uiSlideNavTxt(base){
		//이전다음 버튼 명 설정
		var base = base;
		
		base.nav.prev.find('span').text(base.item.eq(base.opt.current - 1 < 0 ? base.opt.len - 1 : base.opt.current - 1).find('.ui-slide-itemtit').text());
		base.nav.next.find('span').text(base.item.eq(base.opt.current + 1 >= base.opt.len ? 0 : base.opt.current + 1).find('.ui-slide-itemtit').text());
	}
	function uiSlideDotChg(base){
		//이전다음 버튼 명 설정
		var base = base;
		
		base.dotbtn.attr('aria-selected', false).eq(base.opt.current).attr('aria-selected', true)
	}
	function uiSlideCallback(base) {
		//callback
		var base = base,
			v = { 'id':base.opt.id, 'current':base.opt.current};
		base.opt.callback(v);		
	}
	function createUiSlideFnEvt(opt) {
		//함수실행
		var base = $('#' + opt.id).data('base');
			
		base.opt.current = opt.current;
		base.dir = base.opt.past < base.opt.current ? 'next' : 'prev';
		
		uiSlideAct(base);
	}
	function createUiSlideFnAuto(opt) {
		//함수실행
		var base = $('#' + opt.id).data('base');

		base.opt.auto ? uiSlideAutoEvt(base, opt.play) : '';

	}



	/* ------------------------------------------------------------------------
	* name : slider
	* Ver. : v1.0.0
	* date : 2018-12-21
	* EXEC statement
	* - $plugins.uiSlider({ option });
	------------------------------------------------------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiSlider: function (opt) {
			return createUiSlider(opt);
		}
	});
	win[global].uiSlider.option = {
		vertical: false, //가로,세로형
		range: false, //범위슬라이더
		reverse : false, //역순
		acc: false, //select 연결
		stepname: false,
		callback: false,
		
		tooltip: false,
		unit: '',
		txt_s:'',
		txt_e:'',

		now: [0],
		step: 10,
		min: 0,
		max: 100,
	}
	function createUiSlider(opt) {
		var opt = $.extend(true, {}, win[global].uiSlider.option, opt),
			$slider = $('#' + opt.id),
			$wrap = $slider.find('.ui-slider-wrap'),
			$divwrap = $slider.find('.ui-slider-divwrap'),
			$bg = $wrap.find('.ui-slider-bg'),
			$btn = $wrap.find('button'),
			$btn_s = $wrap.find('.ui-slider-btn-s'),
			$btn_e = $wrap.find('.ui-slider-btn-e'),
			$bar = $bg.find('.ui-slider-bar');

		var vertical = opt.vertical,
			range = opt.range,
			rev = opt.reverse,
			stepname = opt.stepname,
			acc = opt.acc;//select 연결

		rev ? $slider.addClass('type-reverse') : $slider.removeClass('type-reverse');
		vertical ? $slider.addClass('type-vertical') : $slider.removeClass('type-vertical');

		var	step = opt.step,
			id = opt.id,
			min = opt.min,
			max = opt.max,
			tooltip = opt.tooltip,
			callback = opt.callback,
			unit = opt.unit,
			txt_e = opt.txt_e,
			txt_s = opt.txt_s,
			txt_e2 = '', 
			txt_s2 = '',

			slider_w = !vertical ? $bg.outerWidth() : $bg.outerHeight(),
			step_w = 100 / step,
			unit_sum = (max - min) / step,
			now_s = opt.now[0] < min ? min : opt.now[0],
			now_e = opt.now[1] > max ? max : opt.now[1],
			per_min = ((now_s - min) / (max - min)) * 100,
			per_max = ((now_e - min) / (max - min)) * 100,
			div_w = Math.ceil(slider_w / step),
			lmt_max,
			lmt_min,
			now_sum = [],
			sliderstep = [],
			p, keyCode, $sel_s, $sel_e, txt_val,
			dir = !vertical ? rev ? 'right' : 'left' : rev ? 'bottom' : 'top',
			siz = !vertical ? 'width' : 'height';

		//percent change
		per_min = perStep(per_min);
		range ? per_max = perStep(per_max) : '';

		//web accessibility : select 
		if (acc) {
			$sel_s = $('[data-sliderselect="' + opt.id + '"]').find('.ui-slider-min');
			range ? $sel_e = $('[data-sliderselect="' + opt.id + '"]').find('.ui-slider-max') : '';
		}
		
		//reset
		$wrap.find('.ui-slider-tooltip').remove();
		$divwrap.find('span').remove();
		
		//tooltip setting
		if (!!tooltip) {
			$wrap.append('<div class="ui-slider-tooltip"></div>');
			sliderTooltip({ unit:unit, now_1:opt.now[0], now_2:opt.now[1], per_min:per_min, per_max:per_max });
			sliderCallback({ callback:callback, now_1:opt.now[0], now_2:opt.now[1] });
		} 
		
		//button setting
		$btn_s.css(dir, per_min + '%').find('.ui-slider-txt').text(((per_min / step_w) * unit_sum) + min);
		range ? $btn_e.css(dir, per_max + '%').find('.ui-slider-txt').text(((per_max / step_w) * unit_sum) + min) : '';
		//range 타입 : 버튼이 겹치는 경우 우선 클릭될 버튼 설정
		if (per_min === per_max && per_min >= 50 && range) {
			$btn_s.addClass('on');
			$btn_e.removeClass('on');
		} else if (per_min === per_max && per_max < 50 && range){
			$btn_s.removeClass('on');
			$btn_e.addClass('on');
		}
		
		//graph bar setting
		!range ? $bar.css(siz,per_min + '%').css(dir,0) : $bar.css(siz,per_max - per_min + '%').css(dir,per_min + '%' );

		//graph step & select option setting
		for (var i = 0; i < step + 1; i++) {
			txt_s2 = (i === 0) && opt.txt_s;
			txt_e2 = (i === step) && opt.txt_e;
			
			txt_val = parseInt(min + (unit_sum * i));
			now_sum.push(txt_val);

			if (stepname) {
				$divwrap.append('<span class="ui-slider-div n'+ i +'" style="'+ dir +':' + step_w * i + '%; '+ siz +':' + div_w + 'px; margin-'+ dir +':' + (div_w / 2) * -1 + 'px"><em>' + stepname[i] + '</em></div>');
			} else {
				$divwrap.append('<span class="ui-slider-div n'+ i +'" style="'+ dir +':' + step_w * i + '%; '+ siz +':' + div_w + 'px; margin-'+ dir +':' + (div_w / 2) * -1 + 'px"><em>' + txt_val + ' ' + txt_e2 + '' + txt_s2 + '</em></div>');
			}
			
			sliderstep.push(parseInt(min + (unit_sum * i)));

			if (stepname) {
				if (acc) {
					if (now_s === txt_val) {
						$sel_s.append('<option value="' + txt_val + '" selected>' + stepname[i] + '</option>');
					} else if (now_e < txt_val) {
						$sel_s.append('<option value="' + txt_val + '" disabled>' + stepname[i] + '</option>');
					} else {
						$sel_s.append('<option value="' + txt_val + '">' + stepname[i] + '</option>');
					}
					
					if (now_e === txt_val && range) {
						$sel_e.append('<option value="' + txt_val + '" selected>' + stepname[i] + '</option>');
					} else if (now_s > txt_val && range) {
						$sel_e.append('<option value="' + txt_val + '" disabled>' + stepname[i] + '</option>');
					} else if (range){
						$sel_e.append('<option value="' + txt_val + '">' + stepname[i] + '</option>');
					}
				}
			} else {
				if (acc) {
					if (now_s === txt_val) {
						$sel_s.append('<option value="' + txt_val + '" selected>' + txt_val + '' + opt.unit + ' ' + txt_e2 +'' + txt_s2 + '</option>');
					} else if (now_e < txt_val) {
						$sel_s.append('<option value="' + txt_val + '" disabled>' + txt_val + '' + opt.unit + ' ' + txt_e2 +'' + txt_s2 + '</option>');
					} else {
						$sel_s.append('<option value="' + txt_val + '">' + txt_val + '' + opt.unit + ' ' + txt_e2 +'' + txt_s2 + '</option>');
					}
					
					if (now_e === txt_val && range) {
						$sel_e.append('<option value="' + txt_val + '" selected>' + txt_val + '' + opt.unit + ' ' + txt_e2 +'' + txt_s2 + '</option>');
					} else if (now_s > txt_val && range) {
						$sel_e.append('<option value="' + txt_val + '" disabled>' + txt_val + '' + opt.unit + ' ' + txt_e2 +'' + txt_s2 + '</option>');
					} else if (range){
						$sel_e.append('<option value="' + txt_val + '">' + txt_val + '' + opt.unit + ' ' + txt_e2 +'' + txt_s2 + '</option>');
					}
				}
			}
			
		}
		
		if (acc) {
			$('[data-sliderselect="' + opt.id + '"]').find('.ui-slider-min').on('change', function(){
				per_min = (($(this).val() - min) / (max - min)) * 100;
				per_min = perStep(per_min);
				actSel($(this).find('option:selected').index(), 'min');
				act($btn_s, 'min');
			});
			$('[data-sliderselect="' + opt.id + '"]').find('.ui-slider-max').on('change', function(){
				per_max = (($(this).val() - min) / (max - min)) * 100,
				per_max = perStep(per_max);
				actSel($(this).find('option:selected').index(), 'max');
				act($btn_e, 'max');
			});
		}

		$('body	.ui-slider-wrap button').on('touchmove.uislider', function(e){
			e.preventDefault()
		});

		$btn.off('mousedown.sliderstart touchstart.sliderstart').on('mousedown.sliderstart touchstart.sliderstart', function(e){
			e.preventDefault();
			var $this = $(this),
				minmax = $this.data('btn'),
				moving = false;

			$(doc).off('mousemove.slidermove touchmove.slidermove').on('mousemove.slidermove touchmove.slidermove', function(e){
				moving = true;
				($('html').is('.ui-m')) ? per($this, event, minmax) : per($this, e, minmax);
				sliderTooltip({ now_1:((per_min / step_w) * unit_sum) + min, now_2:((per_max / step_w) * unit_sum) + min, per_min:perStep(per_min), per_max:perStep(per_max) });
				
			}).off('mouseup.sliderend touchcancel.slidermove touchend.slidermove').on('mouseup.sliderend touchcancel.slidermove touchend.slidermove', function(e){
				$this.closest('.ui-slider').find('.ui-slider-wrap button').removeClass('on');
				moving ? act($this, minmax) : '';
				$(doc).off('mousemove.slidermove mouseup.sliderend touchmove.slidermove');
			});
		});
		
		/* 접근성 이슈 : 키보드와 스크리리더기의 키 중복 */
		$btn_s.off('keyup.' + opt.id).on('keyup.' + opt.id, function(e){
			e.preventDefault();
			keyCode = e.keyCode || e.which;
			p = per_min;
			
			var $btnthis = $(this),
				$barthis = $btnthis.closest('.ui-slider').find('.ui-slider-bar');

			if(keyCode == 39 || keyCode == 40) {
				per_min = per_min + step_w;
				if (per_min > per_max) {
					per_min = per_max;
					alert('최대값을 수정하세요');
				} else {
					$btnthis.css(dir, per_min + '%').find('.ui-slider-txt').text(((per_min / step_w) * unit_sum) + min);
					$barthis.css(dir,per_min + '%').css(siz,(per_max - per_min) + '%');
				}
			}
			
			if(keyCode == 37 || keyCode ==  38) {
				per_min = per_min - step_w;
				if (per_min < 0) {
					per_min = 0;
					alert('최소값입니다.');
				} else {
					$btnthis.css(dir, per_min + '%').find('.ui-slider-txt').text(((per_min / step_w) * unit_sum) + min);
					$barthis.css(dir,per_min + '%').css(siz,(per_max - per_min) + '%');
				}
			}
			
			sliderTooltip({ now_1:((per_min / step_w) * unit_sum) + min, now_2:((per_max / step_w) * unit_sum) + min, per_min:per_min, per_max:per_max });
			sliderCallback({ callback:callback, now_1:((per_min / step_w) * unit_sum) + min, now_2:((per_max / step_w) * unit_sum) + min });
		});
		
		$btn_e.off('keyup.' + opt.id).on('keyup.' + opt.id, function(e){
			e.preventDefault();
			keyCode = e.keyCode || e.which;
			p = per_max;
			
			var $btnthis = $(this),
				$barthis = $btnthis.closest('.ui-slider').find('.ui-slider-bar');
			
			if(keyCode == 39 || keyCode == 40) {
				per_max = per_max + step_w;
				if (per_max > 100) {
					per_max = 100;
					alert('최대값입니다');
				} else {
					$btnthis.css(dir, per_max + '%').find('.ui-slider-txt').text(((per_max / step_w) * unit_sum) + min);
					$barthis.css(dir,per_min + '%').css(siz, (per_max - per_min) + '%');
				}
			}
			
			if(keyCode == 37 || keyCode ==  38) {
				per_max = per_max - step_w;
				if (per_max < per_min) {
					per_max = per_min;
					alert('최소값을 수정하세요.');
				} else {
					$btnthis.css(dir, per_max + '%').find('.ui-slider-txt').text(((per_max / step_w) * unit_sum) + min);
					$barthis.css(dir,per_min + '%').css(siz, (per_max - per_min) + '%');
				}
			}
			
			sliderTooltip({ now_1:((per_min / step_w) * unit_sum) + min, now_2:((per_max / step_w) * unit_sum) + min, per_min:per_min, per_max:per_max });
			sliderCallback({ callback:callback, now_1:((per_min / step_w) * unit_sum) + min, now_2:((per_max / step_w) * unit_sum) + min });
		});
		
		function act($this, minmax){
			if (minmax === 'min') {
				per_min = perStep(per_min);
				!range ? $bar.css(siz, per_min + '%').css(dir, 0) : $bar.css(siz, per_max - per_min + '%').css(dir, per_min + '%');
				lmt_min = per_min;
				if (acc) {
					now_sum.forEach(function(v, i){
						(v === ((per_min / step_w) * unit_sum) + min) ? actSel(i, minmax) : '';
					});
				}

				$this.css(dir, per_min + '%').addClass('on').find('.ui-slider-txt').text(((per_min / step_w) * unit_sum) + min);
			} else {
				per_max = perStep(per_max);
				$bar.css(siz, (per_max - per_min) + '%').css(dir,per_min + '%');

				lmt_max = per_max;
				if (acc) {
					now_sum.forEach(function(v, i){
						(v === ((per_max / step_w) * unit_sum) + min) ? actSel(i, minmax): '';
					});
				}
				$this.css(dir, per_max + '%').addClass('on').find('.ui-slider-txt').text(((per_max / step_w) * unit_sum) + min);
			}

			sliderTooltip({ now_1: ((per_min / step_w) * unit_sum) + min, now_2: ((per_max / step_w) * unit_sum) + min, per_min: per_min, per_max: per_max });
			sliderCallback({ callback:callback, now_1:Number(((per_min / step_w) * unit_sum) + min), now_2:Number(((per_max / step_w) * unit_sum) + min) });
		}
		function actSel(n, minmax){
			if (minmax === 'min') {
				range ? $sel_e.find('option').removeAttr('disabled') : '';
				$sel_s.find('option').eq(n).prop('selected', 'selected');
				range ? $sel_e.find('option:lt('+ n +')').prop('disabled', 'disabled') : '';
			} else {
				$sel_s.find('option').removeAttr('disabled');
				$sel_e.find('option').eq(n).prop('selected', 'selected');
				$sel_s.find('option:gt('+ n +')').prop('disabled', 'disabled');
			}
		}
		function perStep(v){
			var n = ((v % step_w) >= step_w / 2) ? 1 : 0;
			
			return (Math.floor(v / step_w) + n) * step_w;
		}
		function per($this, e, minmax){
			var value_l;
			slider_w = !vertical ? $bg.outerWidth() : $bg.outerHeight();
			if (!vertical) {
				if (e.touches !== undefined) {
					value_l = e.touches[0].pageX - $bg.offset().left - 0;
				}
				if (e.touches === undefined) {
					if (e.pageX !== undefined) {
						value_l = e.pageX - $bg.offset().left - 0;
					}
					//ie
					if (e.pageX === undefined) {
						value_l = e.clientX - $bg.offset().left - 0;
					}
				}
			} else {
				if (e.touches !== undefined) {
					value_l = e.touches[0].pageY - $bg.offset().top - 0;
				}
				if (e.touches === undefined) {
					if (e.pageX !== undefined) {
						value_l = e.pageY - $bg.offset().top - 0;
					}
					//ie
					if (e.pageX === undefined) {
						value_l = e.clientY - $bg.offset().top - 0;
					}
				}
			}

			p = (value_l <= 0) ? 0 : (value_l >= slider_w) ? slider_w - 0 : value_l;
			p = (p / slider_w) * 100;
			rev ? p = 100 - p : ''; 
			p > 50 ? Math.floor(p/10) * 10 : Math.ceil(p/10) * 10;
			p = p.toFixed(0);
			p = p < 0 ? 0 : p > 100 ? 100 : p;


			if (minmax === 'min') {
				lmt_min = 0;
				isNaN(lmt_max) ? lmt_max = per_max : '';
				p * 1 >= lmt_max * 1 ? p = lmt_max: '';
				per_min = p; 
				!range ? $bar.css(siz, per_min + '%').css(dir, 0) : $bar.css(siz, lmt_max - per_min + '%').css(dir, per_min + '%');
			}  
			 
			if (minmax === 'max') {
				lmt_max = 100;
				isNaN(lmt_min) ? lmt_min = per_min : '';
				p * 1 <= lmt_min * 1 ? p = lmt_min: '';
				per_max = p;
				$bar.css(siz, per_max - per_min + '%');
			}
			$this.css(dir, p + '%');
		}

		function sliderCallback(opt){
			$(doc).off('mouseup.sliderend touchcancel.slidermove touchend.slidermove');
			opt.callback ? opt.callback({ id:id, per_min:per_min, per_max:per_max, min: opt.now_1, max: opt.now_2 }) : '';
		}

		function sliderTooltip(opt){
			var $tooltip = $('#' + id).find('.ui-slider-tooltip'),
				tooltip_w, 
				bar_w,
				timer, 
				per_min = opt.per_min,
				per_max = opt.per_max,
				n_min = opt.now_1,
				n_max = opt.now_2,
				in_s = (per_min === 0) ? txt_s : '',
				in_e = (per_max === 100) ? txt_e : '',
				in_se = (per_min === 0) ? txt_s : (per_max === 100) ? txt_e : '';

			!range ? in_e = (per_min === 100) ? txt_e : '' : '';

			if (per_min === 0 && per_max === 100) {
				$tooltip.text('전체');
			} else if (n_min === n_max) {
				$tooltip.text(n_min.toFixed(0) + '' + unit + ' ' + in_se);
			} else {
				if (!range) {
					$tooltip.text(n_min.toFixed(0) + '' + unit + '' + in_s + '' + in_e);
				} else {
					$tooltip.text(n_min.toFixed(0) + '' + unit + '' + in_s + ' ~ '+ n_max.toFixed(0) + '' + unit + '' + in_e);
				}
			}

			clearTimeout(timer);
			timer = setTimeout(function(){
				var tt_l, tt_ml;

				if (!vertical) {
					tooltip_w = $tooltip.outerWidth();
					bar_w = $('#' + id).find('.ui-slider-bar').outerWidth();
				} else {
					tooltip_w = $tooltip.outerHeight();
					bar_w = $('#' + id).find('.ui-slider-bar').outerHeight();
				}

				if (!range) {
					tt_l = per_min + '%';
					tt_ml = (per_min === 0) ? 0 : (per_min === 100) ? tooltip_w * -1 : (tooltip_w / 2) * -1;
				} else {
					if (per_min === 0 && tooltip_w > bar_w) {
						tt_l = '0%';
						tt_ml = 0;
					} else if (per_max === 100 && tooltip_w > bar_w) {
						tt_l = '100%';
						tt_ml = tooltip_w * -1;
					} else {
						tt_l = per_min + ((per_max - per_min)/ 2) + '%';
						tt_ml = (tooltip_w / 2) * -1;
					}
				}

				$tooltip.css(dir, tt_l).css('margin-' + dir, tt_ml);
			},0);
		}
	}



	win[global] = win[global].uiNameSpace(namespace, {
		uiSlot: function (opt) {
			return createUiSlot(opt);
		},
		uiSlotStart: function (opt) {
			return createUiSlotStart(opt);
		},
		uiSlotStop: function (opt) {
			return createUiSlotStop(opt);
		}
	});
	win[global].uiSlot.play = {}
	function createUiSlot(opt){
		if (opt === undefined) {
			return false;
		}
		
		var $slot = $('#' + opt.id),
			current = opt.current === undefined ? 0 : opt.current,
			auto = opt.auto === undefined ? false : opt.auto,
			single = opt.single === undefined ? true : opt.single,
			$wrap = $slot.find('.ui-slot-wrap'),
			$item = $wrap.find('.ui-slot-item'),
			item_h = $item.outerHeight(),
			len = $item.length,
			cut, clone;
		
		//common set up
		$slot.data('n', len).data('single', single);
		$item.each(function(i){
			$(this).attr('n', i + 1).data('n', i + 1);
		});
		
		//single or multi set up
		if (single) {
			$wrap.css({ 
				marginTop: 0, 
				top: (current - 1) * item_h * -1
			});
			itemClone({ n: 0, append: true });
		} else {
			$wrap.css({ 
				marginTop: ((item_h/2) + item_h) * -1, 
				top: 0
			});
			if (current - 1 > 0) {
				for(var i = 0; i < current - 1; i++){
					// 2일경우
					if (current - 2 === i) {
						itemClone({ n: i - 1, append: false });
						itemClone({ n: i, append: true });
						itemClone({ n: i + 1, append: true });
						itemClone({ n: i + 2, append: true });
					} else {
						cut = $item.eq(i).detach();
						$wrap.append(cut);
					}
				}
			} else {
				itemClone({ n: - 1, append: false });
				itemClone({ n: - 2, append: false });
				itemClone({ n: current - 1, append: true });
				itemClone({ n: current, append: true });
			}
		}

		function itemClone(opt) {
			//var stickitem = opt.append ? 'append' : 'prepend';
			clone = $item.eq(opt.n).clone().addClass('clone').removeAttr('n');
			$wrap[opt.append ? 'append' : 'prepend'](clone);
		}
		auto ? win[global].uiSlotStart(opt) : '';
	}
	function createUiSlotStart(opt){
		//option guide
		if (opt === undefined) {
			return false;
		}
		
		var $slot = $('#' + opt.id),
			$wrap = $slot.find('.ui-slot-wrap'),
			$item = $wrap.find('.ui-slot-item'),
			single = $slot.data('single'),
			item_h = $item.outerHeight(),
			len = $item.length,
			wrap_h = len * item_h,
			h = 0;
		
		var s = 500;
		if (!$slot.data('ing')) {
			$slot.data('ing', true);
			win[global].uiSlot.play[opt.id] = win.setInterval(steplot, s);
		}
		
		function steplot(){
			$wrap.css('top', 0).stop().animate({
				top: single ? item_h * (len - 1) * -1 : Math.ceil(item_h * (len - 3) * -1)
			},s , 'linear') ;
			win.clearInterval(win[global].uiSlot.play[opt.id]);
			win[global].uiSlot.play[opt.id] = win.setInterval(steplot, s);
		}
	}
	function createUiSlotStop(opt){
		//option guide
		if (opt === undefined) {
			return false;
		}
		
		var $slot = $('#' + opt.id),
			$wrap = $slot.find('.ui-slot-wrap'),
			$item = $wrap.find('.ui-slot-item'),
			item_h = $item.outerHeight(),
			len = $item.length,
			
			callback = opt.callback,
			single = $slot.data('single'),
			n = $slot.data('n'),
			result = Math.floor(Math.random() * n) + 1,
			index =  $wrap.find('.ui-slot-item[n="' + result + '"]').index(),
			x = single ? index : index - 2,
			timer, t, s = 500;
		
		$slot.data('ing', false);
		$item.removeClass('selected');
		single ? $wrap.css('margin-top', 0): '';

		clearTimeout(timer);
		timer = setTimeout(function(){
			win.clearInterval(win[global].uiSlot.play[opt.id]);
			t = item_h * x * -1 > 0 ? item_h * x : item_h * x * -1;
			$wrap.stop().animate({
				top: t
			},1000, 'easeOutQuad', function(){
				$wrap.find('.ui-slot-item').eq(index).addClass('selected');
				callback(result);
			});
		},10);
	}
})(jQuery, window, document);
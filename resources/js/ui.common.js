;(function($, win, doc, undefined) {

	'use strict';
	
	$plugins.common = {
		init: function(){

			console.log('init');

			$plugins.uiAjax({ 
				id:'baseHeader', 
				url:'../html/inc/header.html', 
				page:true, 
				callback:$plugins.common.header 
			});

			$plugins.uiAjax({ 
				id:'baseNav', 
				url:'../html/inc/nav.html', 
				page:true, 
				callback:$plugins.common.nav 
			});

	

		},
		
		header: function(){
			console.log('header load');

			$('.tit-area h1').text($('#baseHeader').data('title'));

		},
		nav: function(){
			console.log('header load');

			$('.nav-area a').removeClass('active');
			$('.nav-area a').eq(Number($('#baseNav').data('nav'))).addClass('active')

		}
	};

	//modal
	

	//page 

	//callback
	$plugins.callback = {
		modal: function(modalId){
			switch(modalId) {
				case 'modalID':
					break;  

					
			}
		}
	};
   
})(jQuery, window, document);

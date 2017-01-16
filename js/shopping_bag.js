$(function() {
// $( window ).on("load", function() {

		shoppingBagSly = new Sly('#tosbm_frame', {
			itemNav: 'basic',
			// smart: 1,
			activateOn: 'click',
			// dragSource: $('#tosbm_frame'),
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			startAt: 0,
			scrollBar: $('#tosbm_popup-scrollbar'),
			scrollBy: 1,
			scrollTrap: true,
			// pagesBar: $wrap.find('.pages'),
			activatePageOn: 'click',
			speed: 300,
			elasticBounds: 1,
			// easing: 'easeOutExpo',
			dragHandle: 1,
			// dynamicHandle: 1,
			clickBar: 1,
		}).init();
		
		
		
		$('.tosbm_item-block .tosbm_close-icon').click(function() {
			var frameHeight = $('#tosbm_frame').height();

			var parent = $(this).parent().parent();

			parent.animate({
				opacity: 0
			}, 300, function() {

				if (shoppingBagSly.items.length == 2 && frameHeight != $('#tosbm_frame li').height() ) {
					$('#tosbm_frame').animate({
						height: frameHeight / 2
					}, 300);
				} else if (shoppingBagSly.items.length == 1) {
					$('#tosbm_frame').animate({
						height: 'toggle'
					}, 300);
				}

				$(this).animate({
					height: "toggle"
				}, 300, function(){
					parent.remove();
					// console.log(sly.items.length);

					TO_ShoppingBag.rebuildCart();

				});

			})
		})

		window.TO_ShoppingBag = {
			'hide' : function() {
				$('#tosbm_popup-wrap').fadeOut(500, function(){
					$('#tosbm_frame').height('auto');
				});
			},
			'show' : function() {

				// console.log("height - " + $('#tosbm_frame').height());

				if ($('.tosbm_slidee > li').length == 0) {
					$('#tosbm_popup-wrap').addClass('empty-cart');
				} else {
					$('#tosbm_popup-wrap').removeClass('empty-cart');
				}
				

				if ($('.tosbm_slidee > li').length == 2 && !$('#tosbm_popup-wrap').hasClass('smallHeightMode') ) {
					$('#tosbm_popup-wrap').addClass('no-scroll');
				} else if (shoppingBagSly.items.length <= 1) {
					$('#tosbm_popup-wrap').addClass('no-scroll');
				} else {
					$('#tosbm_popup-wrap').removeClass('no-scroll');
				}


				$('#tosbm_popup-wrap').fadeIn(500, function() {
					TO_ShoppingBag.rebuildCart();
				});
			},
			'rebuildCart': function() {
				shoppingBagSly.reload();

				if (shoppingBagSly.items.length == 0) {
					// $('#tosbm_popup-wrap').addClass('empty-cart');

					$('.tosbm_content:not(.empty)').fadeOut(500);
					$('.tosbm_content.empty').fadeIn(500);
				}

				if (shoppingBagSly.items.length == 2 && !$('#tosbm_popup-wrap').hasClass('smallHeightMode') ) {
					$('#tosbm_popup-wrap').addClass('no-scroll');
				} else if (shoppingBagSly.items.length <= 1) {
					$('#tosbm_popup-wrap').addClass('no-scroll');
				} else {
					$('#tosbm_popup-wrap').removeClass('no-scroll');
				}
			}
		}

		$('#tosbm_close-popup, .tosbm_popup-fade').click(function() {
			TO_ShoppingBag.hide();
			// console.log("shopud be cllosed");
		});


		function iOSversion() {
		  // if (/iP(hone|od|ad)/.test(navigator.platform)) {
		  if (!!navigator.platform && /iP(hone|od)/.test(navigator.platform)) {
		    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
		    // console.log(v[1]);
		    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
		  }
		}

		ver = iOSversion();

		var smallHeightMode = function() {
	  		// console.log($(window).height());
	  		// console.log('screen height' + window.innerHeight);

	  		if (window.innerHeight && window.innerHeight < 400 || (ver && ver[0] < 8)) {
	  			// console.log("lanscape");
	  			$('#tosbm_popup-wrap').addClass('smallHeightMode');
	  			shoppingBagSly.reload();
	  		} else {
	  			$('#tosbm_popup-wrap').removeClass('smallHeightMode');
	  			shoppingBagSly.reload();
	  		}			
		};

		smallHeightMode();

		// var toSmallSize = false;
		// var toBigSize

		var	makeOneColumn = function() {
			if ($(window).width() <= 483) {
	  			$( ".tosbm_frame" ).height($('#tosbm_frame > ul > li').first().outerHeight());

	  			// console.log($(window).width());
	  			// toSmallSize = true;
	  		} else {
	  			$( ".tosbm_frame" ).height('auto');
	  		}
		}
		$( window ).resize(function() {
			smallHeightMode();
	  		shoppingBagSly.reload();
	  		// console.log("window resize is");

		    makeOneColumn();
		});

		shoppingBagSly.on('load', function (eventName) {
			makeOneColumn();
		});

	  		// if ($(window).width() < 500) {
	  		// 	$( "</li><li>" ).insertBefore( ".tosbm_item-block:nth-of-type(2)" );
	  		// }
	  		// shoppingBagSly.reload();
		// $('#tosbm_frame').scroll(function(e) {
		// 	console.log(e.originalEvent.touches[0].clientY);
		// 	console.log("sdsd");
		// 	// shoppingBagSly.nextItem()
		// })

});
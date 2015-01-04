define(function(require, exports, module) {
	var $ = require('jquery');

	function Dialog(btn) {
		this.btn = $(btn);
	}

	module.exports = Dialog;

	Dialog.prototype = {
		constructor: Dialog,
		init: function() {
			var nX, nY, nMaxTop, nMaxLeft
				bDrag = false,
				self = this,
				oShade = '<div class="shade"></div>',
				oBox = $('<div class="box"></div>');
				oBox.append('<div class="title"><a href="javascript:;" class="close">close</a><span></span></div>');
				
			this.btn.on('click', function() {
				var nTop = $(document).scrollTop();
				$('body').prepend(oShade).append(oBox);
				oBox.css({'top': nTop + 80, 'margin-left': -201, 'left': '50%'});
				$('span').text('标题' + $('button').index(this));
				nMaxTop = $(window).height() - oBox.outerHeight();
				nMaxLeft = $(window).width() - oBox.outerWidth();	
			});

			$('body').on('click', '.close', function() {
				$('.box, .shade').remove();
			});

			$('body').on('mousedown', '.title',function(ev) {
				bDrag = true;
				nX = ev.pageX - $('.box').offset().left;
				nY = ev.pageY - $('.box').offset().top;
				return false;
			});

			$(document).on('mousemove', function(ev) {
				if (bDrag) {
					var nLeft = ev.pageX - nX,
						nTop = ev.pageY - nY,
						nTopScroll = $(document).scrollTop();

					if (nLeft <= 0) {
						nLeft = 0;
					} else if (nLeft >= nMaxLeft) {
						nLeft = nMaxLeft;
					}

					if (nTop - nTopScroll <= 0) {
						nTop = nTopScroll;
					} else if (nTop - nTopScroll >= nMaxTop) {
						nTop = nMaxTop + nTopScroll;
					}

					oBox.css({'margin-left': 0, 'left': nLeft, 'top': nTop});
				}
				return false;
			});

			$(document).on('mouseup', function() {
				bDrag = false;
				return false;
			});
		}
	}
});
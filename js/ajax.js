define(function(require, exports, module) {
	var $ = require('jquery');

	function Ajax(li, box) {
		this.li = $(li);
		this.box = $(box);
	}

	module.exports = Ajax;

	Ajax.prototype = {
		constructor: Ajax,
		init: function() {
			var self = this;

			this.li.on('click', function() {
				location.hash = $(this).attr('data-html');
			});

			$(window).on('hashchange', function() {
				self.changeHashInit(location.hash.slice(1));
			});

			this.changeHashInit(location.hash.slice(1) || 'ajax1');
		},
		changeHashInit: function(sHash) {
			this.box.load(sHash + '.html');
			this.li.eq(sHash.slice(-1) - 1).addClass('current').siblings().removeClass('current');
		}
	}
});
define(function(require, exports, module) {
	var $ = require('jquery');

	$.ajax({
		url: '../php/game.php',
		type: 'GET',
		async: false,
		error: function(res) {
			console.log(res);
		},
		success: function(res) {
			console.log(res);
			$('#rank').html(res);
		}
	});

	var sName = prompt('请输入你的姓名', '游客');

	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(n) {
			for (var i = 0; i < this.length; i++) {
				if (this[i] === n) {
					return i;
				}
			}
			return -1;
		}
	}

	

	function Game(time, wrap, btn, where) {
		this.nums = 3;
		this.time = $(time);
		this.wrap = $(wrap);
		this.btn = $(btn);
		this.where = $(where);
		this.aExist = [];
		this.bOpe = false;
	}

	module.exports = Game;

	Game.prototype = {
		constructor: Game,
		init: function() {
			var self = this;

			this.btn.on('click', function() {
				clearInterval(timer);

				this.disabled = true;

				var str = '';

				for (var i = 0; i < self.nums; i++) {
					str += '<div class="radius"><span>' + self.getRandom(0, 100) + '</span></div>';
				}

				self.wrap.html(str);

				var timer = setInterval(function() {
					self.time.text(self.time.text() - 1);

					if (parseInt(self.time.text()) <= 0) {
						clearInterval(timer);
						self.wrap.find('span').hide();
						self.bOpe = true;
					}
				}, 1000);
			});

			self.wrap.on('click', '.radius', function() {
				if (self.bOpe && $(this).find('span').is(':hidden')) {
					var nRadius = parseInt($(this).find('span').text());

					if (nRadius === self.getMin(self.aExist)) {
						$(this).find('span').show();

						self.aExist.splice(self.aExist.indexOf(nRadius), 1);

						if (self.aExist.length === 0) {
							if (self.nums === 15) {
								//成功
								$.ajax({
									url: '../php/game.php',
									type: 'POST',
									data: {
										'user_ip': sName,
										'user_scroe': 'perfect',
										'user_date': new Date().toString()
									},
									error: function(res) {
										console.log(res);
									},
									success: function(res) {
										console.log(res);
									}
								});

								alert('成功!');
								self.wrap.text('恭喜你过关了!');
							} else {
								alert('进入下一关!');
								self.btn[0].disabled = false;
								self.time.text(10);
								self.nums += 2;
								self.aExist = [];
								self.wrap.empty();
								self.where.text(parseInt(self.where.text()) + 1);
								self.bOpe = false;
							}
						}
					} else {
						self.wrap.find('span').show();
						//失败
						$.ajax({
							url: '../php/game.php',
							type: 'POST',
							data: {
								'user_ip': sName,
								'user_scroe': self.nums,
								'user_date': new Date().toString()
							},
							error: function(res) {
								console.log(res);
							},
							success: function(res) {
								console.log(res);
							}
						});

						alert('失败!');
						location.reload();
					}
				}
			});
		},
		getRandom: function(nMin, nMax) {
			var nRange = nMax - nMin,
				nRand = Math.random(),
				nRes = parseInt(nRange * nRand) + nMin;

			if (this.aExist.indexOf(nRes) === -1) {
				this.aExist.push(nRes);
				return nRes;
			} else {
				return this.getRandom(nMin, nMax);	//后面的递归调用函数只是得到这个函数的返回值,这里else需要return才能在当前调用的函数将函数值返回
			}
		},
		getMin: function(a) {
			return Math.min.apply(Math, a);
		},
		getIp: function() {
			
		}
	}
});
(function($) {
	$(function() {
		var oPlay = $('#play'),
			oSave = $('#save'),
			oCard = $('#card').find('li'),
			oTxt = $('textarea'),
			oTimes = $('#times'),
			oMineRes = $('#mine_result'),
			oAllRes = $('#all_result'),
			config = {
				totalScore: '5',
				totalTyies: '3'
			};
		var Page = {
			init: function() {
				this.render();
				this.play();
				this.operator();
				this.getAjax(oMineRes, 'selectMe');
				this.getAjax(oAllRes, 'selectAll')
			},
			render: function() {
				//阻止退格默认行为
				$(document).on('keydown', function(ev) {
					if (ev.keyCode === 8) {
						return false;
					}
				});

				//兼容数组indexOf()方法
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

				//有几次机会
				oTimes.text(config.totalTyies);
			},
			play: function() {
				var	self = this;
				//发牌
				oPlay.on('click', function() {
					oCard.css({'transform': 'rotateY(180deg)', 'background-color': '#f88'});

					setTimeout(function() {
						oCard.css('transform', 'rotateY(0deg)').each(function() {
							var nRandom = self.getRandom(1, 10);
							$(this).text(nRandom);
						});

						oPlay[0].disabled = true;
						oSave[0].disabled = false;
					}, 500);
				});	
			},
			operator: function() {
				var self = this;
				//将牌的内容放入框中
				oCard.on('click', function() {
					if (oPlay[0].disabled && $(this).attr('data-used') === 'false') {
						var sTxt = oTxt.text();

						if (sTxt === '' || isNaN(sTxt.charAt(sTxt.length - 1))) {
							oTxt.text(oTxt.text() + $(this).text());
							$(this).css('background-color', '#ccc').attr('data-used', 'true');
						} else {
							alert('数字不能相连');
						}
					}
				});

				//将操作符放入框中
				$('.ope_btn').on('click', function() {
					oTxt.text(oTxt.text() + $(this).text());
				});

				//删除一个符号或数字,并作判断恢复数字状态
				$('#del').on('click', function() {
					var sTxt = oTxt.text();	//框中内容
					if (sTxt !== '') {
						var	sLast = sTxt.slice(-1);	//框中最后一个字符

						if (isNaN(sLast)) {	//如果不是数字就删除一个
							oTxt.text(sTxt.slice(0, -1));
						} else {	//否则就删除1到多个数字
							var rDel = /\d+$/,
								nDel = sTxt.match(rDel)[0];

							oTxt.text(sTxt.replace(/\d+$/, ''));

							$('li[data-used="true"]').each(function() {
								if ($(this).text() === nDel) {
									$(this).css('background-color', '#f88').attr('data-used', 'false');
									return false;
								}
							});
						}
					}					
				});

				//重置
				$('#reset').on('click', function() {
					oTxt.text('');
					$('li[data-used="true"]').each(function() {
						$(this).css('background-color', '#f88').attr('data-used', 'false');
					});
				});

				//提交结果
				$('#save').on('click', function() {
					if (oCard.is('li[data-used="false"]')) {
						alert('4张牌必须都使用!');
						return;
					}

					var oRes = $('#res');

					try {
						var nRes = eval(oTxt.text());
					} catch(e) {
						alert('输入不合法,请重新输入!');
						return;
					}
					
					if (nRes === 24) {
						
						oRes.text(parseInt(oRes.text()) + 1);

						if (oRes.text() === config.totalScore) {
							alert('恭喜,通关了!');
							oSave[0].disabled = true;
							self.sendAjax(config.totalScore);
						} else {
							alert('正确,进入下一关!');
							oPlay.trigger('click');
							oTxt.text('');
							oCard.attr('data-used', 'false');
						}
					} else {
						var	sTimes = oTimes.text();

						oTimes.text(sTimes - 1);
										
						if (oTimes.text() === '0') {
							oSave[0].disabled = true;
							alert('你没有机会了,失败!');
							self.sendAjax(oRes.text());
						} else {
							alert(nRes + '不是正确的结果,请重新输入!');
						}
					}
				});
			},
			getRandom: function(min, max) {
				var nRange = max- min,
					nRand = Math.random();
				return min + Math.round(nRange * nRand);
			},
			sendAjax: function(sScore) {
				$.ajax({
					url: '../php/card.php',
					type: 'POST',
					data: {
						'action': 'updateUser',
						'score': sScore,
						'time': new Date().toLocaleString()
					},
					error: function(res) {
						console.log(res);
					},
					success: function(res) {
						console.log(res);
					}
				});
			},
			getAjax: function(oRes, sAction) {
				$.ajax({
					url: '../php/card.php?action=' + sAction,
					type: 'GET',
					error: function(res) {
						console.log(res);
					},
					success: function(res) {
						oRes.html(res);
					}
				});
			}
		}
		Page.init();
	});
}(jQuery));
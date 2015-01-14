var $ = jQuery;
$(function() {
	var Page = {
		init: function() {
			this.render();
			this.post();
		},
		render: function() {
			$('#user').text(this.getSearch('user'));
			this.getMsg();
			setInterval(this.getMsg, 1000);
		},
		post: function() {
			$('button').on('click', function() {
				var sMsg = $('input').val();
				if (sMsg === '') {
					alert('消息不能为空!');
					return;
				}
				$.ajax({
					url: '../php/message.php',
					type: 'POST',
					data: {
						'msg_user': $('#user').text(),
						'msg_time': new Date().toLocaleString(),
						'msg_con': sMsg
					},
					error: function(res) {
						console.log(res);
					},
					success: function(res) {
						console.log(res);
					}
				});
			});
		},
		getSearch: function(sKey) {
			var sSearch = location.search.slice(1),
				aSearch = sSearch.split('&'),
				aRes;

			for (var i = 0; i < aSearch.length; i++) {
				aRes = aSearch[i].split('=');
				if (aRes[0] === sKey) {
					return aRes[1]; 
				}
			}
			return '未知';
		},
		getMsg: function() {
			$.ajax({
				url: '../php/message.php',
				type: 'GET',
				error: function(res) {
					console.log(res);
				},
				success: function(res) {
					$('.con').html(res);
				}
			});
		}
	}

	Page.init();
});
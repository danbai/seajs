var $ = jQuery;
$(function() {
	$('button').on('click', function() {
		var sUser = $('#user').val(),
			sPwd = $('#pwd').val(),
			rUser = /^\w/;

		if (!rUser.test(sUser)) {
			alert('用户名以字母数字开头!');
			return;
		}
		if (sPwd !== 'ucm22') {
			alert('密码错误');
			return;
		}
		location.href = 'message.html?user=' + sUser;
	});
});
$(function() {
	var oName = $('#user_name'),
		oPwd = $('#user_pwd'),
		oAge = $('#user_age'),
		oMail = $('#user_mail'),
		oId = $('#user_id'),
		oDel = $('#del'),
		oSave = $('#save'),
		oUpdate = $('#update');
	var Page = {
		init: function() {
			this.render();
			this.save();
			this.del();
			this.update();
		},
		render: function() {
			$.ajax({
				url: '../php/getUser.php',
				type: 'GET',
				dataType: 'json',	//封装了JSON.parse
				error: function(res) {
					console.log(res);
				},
				success: function(res) {
					console.log(res);
					console.log(typeof res);
					oName.val(res[1]);
					oPwd.val(res[2]);
					oAge.val(res[3]);
					oMail.val(res[4]);
				} 
			});
		},
		save: function() {
			oSave.on('click', function() {
				$.ajax({
					url: '../php/user.php',
					type: 'POST',
					data: {
						'user_name': oName.val(),
						'user_pwd': oPwd.val(),
						'user_age': oAge.val(),
						'user_mail': oMail.val()
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
		del: function() {
			oDel.on('click', function() {
				$.ajax({
					url: '../php/user_delete.php',
					type: 'POST',
					data: {
						user_id: oName.val()
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
		update: function() {
			oUpdate.on('click', function() {
				$.ajax({
					url: '../php/user_update.php',
					type: 'POST',
					data: {
						'user_name': oName.val(),
						'user_pwd': oPwd.val(),
						'user_age': oAge.val(),
						'user_mail': oMail.val(),
						'user_id': 1
					},
					error: function(res) {
						console.log(res);
					},
					success: function(res) {
						console.log(res);
					}
				});
			});
		}
	}
	Page.init();
});
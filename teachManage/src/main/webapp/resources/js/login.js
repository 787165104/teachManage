var resend;
$(function(){
	
	$('#phone').focus();
	$('#phone').blur(function(){
		var phone = $(this).val();
		var txtPhone = $(this).parent();
		if(phone){
			$('i', txtPhone).show();
			$.ajax({
				url : 'checkUser',
				type : 'post',
				data : {phone : phone},
				success : function(rs){
					$('i', txtPhone).hide();
					
					if(rs){
						$('#authCode').removeAttr('disabled');
						$('#btnAuthCode').removeAttr('disabled');
						$('#newLoginPwd').removeAttr('disabled');
						//$('#btnResetPwd').removeAttr('disabled');
						$('#errorMsgUserName').hide();
					} else {
						$('#errorMsgUserName').show();
						
						$('#authCode').val('');
						$('#authCode').attr('disabled', 'disabled');
						$('#btnAuthCode').attr('disabled', 'disabled');
						$('#newLoginPwd').val('');
						$('#newLoginPwd').attr('disabled', 'disabled');
						$('#btnResetPwd').attr('disabled', 'disabled');
					}
				}
			});
		} else {
			$('i', txtPhone).hide();
			$('#errorMsgUserName').hide();
			
			$('#authCode').val('');
			$('#authCode').attr('disabled', 'disabled');
			$('#btnAuthCode').attr('disabled', 'disabled');
			$('#newLoginPwd').val('');
			$('#newLoginPwd').attr('disabled', 'disabled');
			$('#btnResetPwd').attr('disabled', 'disabled');
		}
	});
	
	$('#authCode,#newLoginPwd').blur(function(){
		var authCode = $('#authCode').val();
		var newLoginPwd = $('#newLoginPwd').val();
		
		if(authCode && newLoginPwd){
			$('#errorMsgPwd').hide();
			$('#errorMsgAuthCode').hide();
			
			$('#btnResetPwd').removeAttr('disabled');
		} else {
			$('#btnResetPwd').attr('disabled', 'disabled');
			
			return false;
		}
	});
	
	var timeout;
	var timelimit = 10;
	resend = function(){
		timelimit--;
		$('#btnAuthCode').html('(' + timelimit + ')秒后重发');
		if(timelimit == 0){
			clearInterval(timeout);
			$('#btnAuthCode').html('重现获取');
			$('#btnAuthCode').removeAttr('disabled');
			$('#phone').removeAttr('disabled');
		}
	};
	
	$('#btnAuthCode').click(function(){
		$('#errorMsgAuthCode').hide();
		$('#btnResetPwd').attr('disabled', 'disabled');
		
		timelimit = 10;
		$(this).attr('disabled', 'disabled');
		$('#phone').attr('disabled', 'disabled');
		$('#btnAuthCode').html('正在发送...')
		$.ajax({
			url : 'getAuthCode',
			type : 'post',
			data : {},
			success : function(rs){
				if(rs){
					$('#btnAuthCode').html('(' + timelimit + ')秒后重发');
					
					timeout = setInterval('resend()', 1000);
				} else {
					$('label', '#errorMsgAuthCode').html('Error：验证码获取失败,请重试.');
					$('#errorMsgAuthCode').show();
				}
			},
			error : function(){
				alert('网络异常,请重试.');
			}
		});
	});
	
	
	$('#btnResetPwd').click(function(){
		$('font','#backLogin').html('');
		$('font','#backLogin').hide();
		$('#errorMsgAuthCode').hide();
		$('#errorMsgPwd').hide();
		$('font','#backLogin').hide();
		
		var authCode = $('#authCode').val();
		var newLoginPwd = $('#newLoginPwd').val();
		var phone = $('#phone').val();
		
		var btnResetPwd = $(this);
		if(authCode && newLoginPwd){
			$('i', btnResetPwd).show();
			btnResetPwd.attr('disabled', 'disabled');
			
			$.ajax({
				url : 'modifyUserPwd',
				type : 'post',
				data : {phone : phone, newLoginPwd : newLoginPwd, authCode : authCode},
				success : function(rs){
					$('i', btnResetPwd).hide();
					btnResetPwd.removeAttr('disabled');
					
					if(rs){
						//alert(rs);
						$('font','#backLogin').html(rs + ',');
						$('font','#backLogin').show();
					} else {
						alert('密码修改成功.');
						$('#backLogin').click();
					}
				},
				error : function(){
					$('i', btnResetPwd).hide();
					btnResetPwd.removeAttr('disabled');

					$('font','#backLogin').html('密码重置失败,');
					$('font','#backLogin').show();
					
				}
			});
		} else if(!authCode){
			$('label', '#errorMsgAuthCode').html('短信验证码不能为空');
			$('#errorMsgAuthCode').show();
			//alert('短信验证码不能为空');
		} else if(!newLoginPwd){
			$('#errorMsgPwd').show();
		}
	});
	
	/**
	 * 返回登录页面
	 */
	$('#backLogin').click(function(){
		
		var phone = $('#phone').val();
		$('#findPwdForm').fadeOut('fast', function(){
			$('#phone').val('');
			$('#phone').removeAttr('disabled');
			$('#authCode').val('');
			$('#authCode').attr('disabled', 'disabled');
			$('#btnAuthCode').attr('disabled', 'disabled');
			$('#newLoginPwd').val('');
			$('#newLoginPwd').attr('disabled', 'disabled');
			$('#btnResetPwd').attr('disabled', 'disabled');
			
			$('#loginId').val(phone);
			$('#loginPwd').val('');
			
			$('#loginForm').show('fast');
		});
		
	});
	
	$('#forgetPwd').click(function(){
		var loginId = $('#loginId').val();
		$('#loginForm').fadeOut('fast', function(){
			$('#findPwdForm').show('fast');
			$('#phone').val(loginId);
			$('#phone').focus();
		});
	});
});
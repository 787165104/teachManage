/**
 * 该js 包含的功能 有
 * 1. 前端form 表单验证 
 * 2. toast 警告，提醒
 * 3. alert 警告
 * 4. confirm 框 
 * 该js 引入 前 必须保证已经 引入了 下面js ,从上至下 一次排序
 * 	jquery-1.9.1.min.js
 * 	jquery.validate.min.js
 */
var CommonUtils = function(){
	
	/**
	 * 通用表单验证, 通过jquery.validate.min.js实现。
	 * 并通过自定义的 jquery.validate-method.js 扩展了 验证规则
	 * @param formId ,表单form的id
	 * @param rules 规则（数组）
	 * @example 使用方法举例  from   userAdd.jsp 添加用户
	 *		var ruleObj = {username:{required:true}, password:{required:true}};
        	var messageObj = {username:{required:"请输入用户名"}, password:{required:"请输入密码"}};
        	CommonUtils.formValidate("form", ruleObj, messageObj);
	 * 三个参数必传
	 */
	var formValidate = function(formId, ruleObj, messageObj){
		$("#"+formId).validate({
			rules : ruleObj,
			messages : messageObj
		});	
	}
	
	
	/**
	 * 通用的 toast 消息 提示
	 * toastType 为提示类型 0 =success , 1 = warning , 2 = info , 3 = error (必传)
	 * msg 为提示消息 (必传)
	 * position 为 消息 位置 ，默认 bottom-center (可以不传) 共8种
	 * toast-top-right      0， 
	 * toast-top-left       1,
	 * toast-bottom-right   2 ,
	 * toast-bottom-left    3
	 * toast-top-full-width 4
	 * toast-bottom-full-width 5
	 * toast-top-center 6
	 * toast-bottom-center 7
	 * duration 持续时间 ，默认3秒，单位为毫秒 (可以不传)
	 * @example CommonUtils.toastMsg(0, "重置密码成功");  from  sysuser.js 重置密码
	 * 注意 该方法 需要 引入 toastr.min.js 目前我在common_base_script.jsp中已经引入， 因此 只需要 引了common_base_script.jsp即可
	 * 该方法 还需要css 支持, toastr.min.css
	 */
	var toastMsg = function(toastType, msg, position, duration){
		var toastshowType = "info";
		switch(toastType){
			case 0 : toastshowType = "success"; break;
			case 1 : toastshowType = "warning"; break;
			case 2 : toastshowType = "info"; break;
			case 3 : toastshowType = "error"; break;
			default: toastshowType = "success";	
		}
		var toastPosition = "toast-bottom-center";
		if(position){
			switch(position){
				case 0 : toastPosition = "toast-top-right"; break;
				case 1 : toastPosition = "toast-top-left"; break;
				case 2 : toastPosition = "toast-bottom-right"; break;
				case 3 : toastPosition = "toast-bottom-left"; break;
				case 4 : toastPosition = "toast-top-full-width"; break;
				case 5 : toastPosition = "toast-bottom-full-width"; break;
				case 6 : toastPosition = "toast-top-center"; break;
				case 7 : toastPosition = "toast-bottom-center"; break;
				default: toastPosition = "toast-bottom-center";
			}
		}
		var toastDuration = 3000;
		if(duration){
			toastDuration = duration;
		}
		//toast 参数设置
		toastr.options = {
			"closeButton": true,
			"debug": false,
			"progressBar": true,
			"preventDuplicates": false,
			"positionClass": toastPosition,
			"onclick": null,
			"showDuration": "400",
			"hideDuration": "1000",
			"timeOut": toastDuration,
			"extendedTimeOut": "1000",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		}
		toastr[toastshowType](msg);
	}
	
	/**
	 * 统一的alert 
	 * title 可以不传
	 * content必传
	 * alertType = 0 为基本alert, 不带 动画（成功或失败）
	 * alertType = 1 为 带"成功"动画的alert
	 * alertType = 2 为“失败”error的样式
	 * alertType = 3 为“警告”样式的alert 
	 * confirmButtonText 确定按钮的文字 可以不传
	 */
	var alertMsg = function(alertType, title, content, confirmButtonText){
		if(!title)
			title = "";
		if(!confirmButtonText)
			confirmButtonText = "确定";
		switch(alertType){
			case 0 :
				swal({
	                title: title,
	                text: content,
	                confirmButtonText: confirmButtonText
	            }); break;
			case 1 :
				swal({
	                title: title,
	                text: content,
	                confirmButtonText: confirmButtonText,
	                type: "success"
	            });break;
			case 2:
				swal({
	                title: title,
	                text: content,
	                confirmButtonText: confirmButtonText,
	                type: "error"
	            });break;
			case 3:
				swal({
	                title: title,
	                text: content,
	                confirmButtonText: confirmButtonText,
	                type: "warning"
	            });break;
	        default :
	        	swal({
	                title: title,
	                text: content,
	                confirmButtonText: confirmButtonText
	            }); break;
		}
	}
	
	/**
	 * 统一的 确认 弹窗
	 * confirmButtonText 确定按钮 的文字
	 * cancleButtonText 取消按钮的文字
	 * confirmButtonListener 点击 确定按钮后，执行的方法
	 * cancleButtonListener 点击取消按钮执行的方法 
	 * 
	 * 可以 组合 alertMsg 使用，在confirmButtonListener 调用alertMsg
	 * 
	 */
	var confirmDialog = function(title, content, confirmButtonListener, cancleButtonListener, confirmButtonText, cancleButtonText){
		var closeOnCancel = false;
		var closeOnConfirm = false;
		if(!confirmButtonText)
			confirmButtonText = "确定";
		if(!cancleButtonText)
			cancleButtonText = "取消";
		if(!cancleButtonListener)
			closeOnCancel = true;
		if(!confirmButtonListener)
			closeOnConfirm = true;
		swal({
            title: title,
            text: content,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancleButtonText,
            closeOnConfirm: closeOnConfirm,
            closeOnCancel: closeOnCancel
        },
        function (isConfirm) {
            if (isConfirm) {
            	if(confirmButtonListener)
            		confirmButtonListener();
            } else {
            	if(cancleButtonListener)
            		cancleButtonListener();
            }
        });
	}
	
	
	var message = function (text, messagetype) {
	    setTimeout(function () {
	        toastr.options = {
	            progressBar: true,
	            showMethod: 'slideDown',
	            timeOut: 3000,
	            positionClass: "toast-bottom-right",
	            closeButton: true
	        };
	        switch (messagetype) {
	            case 0:
	                toastr.success(text);
	                break;
	            case 1:
	                toastr.info(text);
	                break;
	            case 2:
	                toastr.warning(text);
	                break;
	            case 3:
	                toastr.error(text);
	                break;
	            default:
	                toastr.success(text);
	                break;
	        }
	    }, 50);
	}
	
	/**
	 * selector为选择器，可以是元素样式，也元素id
	 * text 显示的字符串
	 * textLength 显示的长度
	 * opType 可以不传,展开和收缩的类型， 0 不显示展开和收缩，仅为省略号 || 1 显示展开，不显示收缩 ||2 显示展开和收缩 || 3显示省略号， 默认为2
	 * 
	 */
	var overTexts = function(selector, text, textLength, opType){
		if(!opType)
			opType = "2";
		$(""+selector).overTexts({
            texts: text,
            textLength: textLength,
            overText: "展开",
            openText: "收起",
            ooType: opType                     
        });
	}
	
	
	return {
        //main function to initiate the module
		formValidate: function (formId, ruleObj, messageObj) {	
			formValidate(formId, ruleObj, messageObj);   
        },
        toastMsg: function(toastType, msg, position, duration){
        	toastMsg(toastType, msg, position, duration);
        },
        alertMsg: function(alertType, title, content, confirmButtonText){
        	alertMsg(alertType, title, content, confirmButtonText);
        },
        confirmDialog: function(title, content, confirmButtonListener, cancleButtonListener, confirmButtonText, cancleButtonText){
        	confirmDialog(title, content, confirmButtonListener, cancleButtonListener, confirmButtonText, cancleButtonText);
        },
        overTexts: function(selector, text, textLength, opType){
        	overTexts(selector, text, textLength, opType);
        }
    };
	
	
}();
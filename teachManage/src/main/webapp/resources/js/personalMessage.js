var basePath = $("#basePath").val();
$(function(){
	//未处理的task
	var jqGrid = $('<table id="task_list" style="width:100%;"></table>');
	var jqGridPaging = $('<div id="task_list_paging"></div>');
	var taskPanel = $("#tab-1");

	taskPanel.append(jqGrid);
	taskPanel.append(jqGridPaging);
    jqGrid.jqGrid({
        caption: "",
        url: basePath + '/personalCenter/taskList',
        mtype: "post",
        postData : {},
        styleUI: 'Bootstrap', //设置jqgrid的全局样式为bootstrap样式
        datatype: "json",
        colNames: ["编号", "流程名称", "申请人", "申请时间", "审批时间", "状态",  "流程实例定义id","流程实例id","当前节点", "当前处理人", "操作"],
        colModel: [
                { name: 'id',width:60 ,align: 'center'},
				{ name: 'processDefName', width:100 ,align: 'center'},
                { name: 'userId', width:80 ,align: 'center'},
                { name: 'applyTime', width:100 ,align: 'center'},
                { name: 'taskCreateTiem',width:100 ,align: 'center'},
                { name: 'status' ,width:60 ,align: 'center' },
			{ name: 'processDefinitionId' ,width:60 ,align: 'center',hidden:true},
			{ name: 'processInstanceId' ,width:60 ,align: 'center',hidden:true},
			{ name: 'taskName',width:120 ,align: 'center',
				formatter: function(cellValue, options, rowObject) {
					var html = '';
					var pid = rowObject.id;
					html = '<a class="ac_op ac_diagram_viewer" pid = "'+ rowObject.processInstanceId +'" pdid = "'+ rowObject.processDefinitionId +'" href="javascript:void(0);">'+cellValue+'</a>'
					
					return html;
				}
			},
            { name: 'taskUserId' ,width:125 ,align: 'center'},
            { name: 'assignee' ,align: 'center' , width: 60,
					formatter: function(cellValue, options, rowObject) {
						
						var html = '';
						if(rowObject.assignee){
							var tkey = rowObject.id;
							var tname = rowObject.taskName;
							html = '<a class="ac_op ac_complete" tkey = "'+ tkey +'" tname = "'+ tname +'" href="javascript:void(0);">处理</a>'
						} else {
							var tid = rowObject.id;
							html = '<a class="ac_op ac_claim" tid = "'+ tid +'" href="javascript:void(0);">签收</a>';
						}
						
						return html;
					}
		        }
            ],
        viewrecords: true,
        multiselect: false,
        rownumbers: true,
        autowidth: true,
        height: "300",
        rowNum: 10,
        rownumbers: true, // 显示行号
        rownumWidth: 35, // the width of the row numbers columns
        pager: "#task_list_paging",//分页控件的id
        subGrid: false//是否启用子表格
    });
    var width = $("#containment-wrapper").width() - 270;
    jqGrid.jqGrid('setGridWidth', width);
    
    
    //已处理的表单
    var taskDealList = $("#tab-2");
    var jqGrid1 = $('<table id="task_deal_list"></table>');
	var jqGridPaging1 = $('<div id="task_deal_list_paging"></div>');
	
	taskDealList.append(jqGrid1);
	taskDealList.append(jqGridPaging1);
	
    jqGrid1.jqGrid({
        caption: "",
        url: basePath + '/personalCenter/deallist',
        mtype: "post",
        postData : {},
        styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式
        datatype: "json",
        colNames: ["编号", "流程名称", "申请人", "申请时间", "审批时间", "处理节点"],
        colModel: [
                { name: 'id',width:60 ,align: 'center'},
			    { name: 'processDefName', width:100 ,align: 'center'},
                { name: 'userId', width:80 ,align: 'center'},
                { name: 'applyTime', width:100 ,align: 'center'},
                { name: 'taskCreateTiem',width:100 ,align: 'center'},
                { name: 'status' ,width:60 ,align: 'center' }
            ],
        viewrecords: true,
        multiselect: false,
        rownumbers: true,
        autowidth: true,
        height: "300",
        rowNum: 10,
        rownumbers: true, // 显示行号
        rownumWidth: 35, // the width of the row numbers columns
        pager: "#task_deal_list_paging",//分页控件的id
        subGrid: false//是否启用子表格
    });
    
    jqGrid1.jqGrid('setGridWidth', width);
    
    //申请中的表单
    var taskRuningList = $("#tab-3");
    var jqGrid2 = $('<table id="task_runing_list"></table>');
	var jqGridPaging2 = $('<div id="task_runing_list_paging"></div>');
	
	taskRuningList.append(jqGrid2);
	taskRuningList.append(jqGridPaging2);
	
    jqGrid2.jqGrid({
        caption: "",
        url: basePath + '/personalCenter/runing',
        mtype: "post",
        postData : {},
        styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式
        datatype: "json",
        colNames: ["编号", "流程名称", "申请人", "申请时间", "审批时间", "状态", "流程实例定义id","流程实例id","当前节点", "当前处理人", "操作"],
        colModel: [
                { name: 'id',width:60 ,align: 'center'},
				{ name: 'processDefName', width:100 ,align: 'center'},
                { name: 'userId', width:80 ,align: 'center'},
                { name: 'applyTime', width:100 ,align: 'center'},
                { name: 'taskCreateTiem',width:100 ,align: 'center'},
                { name: 'status' ,width:60 ,align: 'center' },
			{ name: 'processDefinitionId' ,width:60 ,align: 'center',hidden:true},
			{ name: 'processInstanceId' ,width:60 ,align: 'center',hidden:true},
			{ name: 'taskName',width:120 ,align: 'center',
				formatter: function(cellValue, options, rowObject) {
					var html = '';
					var pid = rowObject.id;
					html = '<a class="ac_op ac_diagram_viewer" pid = "'+ rowObject.processInstanceId +'" pdid = "'+ rowObject.processDefinitionId +'" href="javascript:void(0);">'+cellValue+'</a>'
					
					return html;
				}
			},
                { name: 'taskUserId' ,width:125 ,align: 'center'},
            { name: 'assignee' ,align: 'center' , width: 60,
					formatter: function(cellValue, options, rowObject) {
						
						var html = '';
						var tkey = rowObject.id;
						var tname = rowObject.taskName;
						html = '<a class="ac_op ac_detial" tkey = "'+ tkey +'" tname = "'+ tname +'" href="javascript:void(0);">详情</a>'
						
						return html;
					}
		        }
            ],
        viewrecords: true,
        multiselect: false,
        rownumbers: true,
        autowidth: true,
        height: "300",
        rowNum: 10,
        rownumbers: true, // 显示行号
        rownumWidth: 35, // the width of the row numbers columns
        pager: "#task_runing_list_paging",//分页控件的id
        subGrid: false//是否启用子表格
    });
    
    jqGrid2.jqGrid('setGridWidth', width);
    
    //已完成列表
    var taskFinishedList = $("#tab-4");
    var jqGrid3 = $('<table id="task_finished_list"></table>');
	var jqGridPaging3 = $('<div id="task_finished_list_paging"></div>');
	
	taskFinishedList.append(jqGrid3);
	taskFinishedList.append(jqGridPaging3);
	
	
    jqGrid3.jqGrid({
        caption: "",
        url: basePath + '/personalCenter/finished',
        mtype: "post",
        postData : {},
        styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式
        datatype: "json",
        colNames: ["编号", "流程名称", "申请人", "申请时间", "结束时间", "结束原因"/*, "操作"*/],
        colModel: [
                { name: 'id',width:60 ,align: 'center'},
				{ name: 'processDefName', width:100 ,align: 'center'},
                { name: 'userId', width:80 ,align: 'center'},
                { name: 'applyTime', width:100 ,align: 'center'},
                { name: 'endTime',width:100 ,align: 'center'},
                { name: 'status' ,width:60 ,align: 'center' }
            /*,{ name: 'assignee' ,align: 'center' , width: 60,
					formatter: function(cellValue, options, rowObject) {
						
						var html = '';
						var tkey = rowObject.id;
						var tname = rowObject.taskName;
						html = '<a class="ac_op ac_detial" tkey = "'+ tkey +'" tname = "'+ tname +'" href="javascript:void(0);">详情</a>'
						
						return html;
					}
		        }*/
            ],
        viewrecords: true,
        multiselect: false,
        rownumbers: true,
        autowidth: true,
        height: "300",
        rowNum: 10,
        rownumbers: true, // 显示行号
        rownumWidth: 35, // the width of the row numbers columns
        pager: "#task_finished_list_paging",//分页控件的id
        subGrid: false//是否启用子表格
    });
    
    jqGrid3.jqGrid('setGridWidth', width);
    
    
    /**
     * 点击查看任务详细
     */
    $("body").delegate('a.ac_op.ac_detial', 'click', function(){
    		var tkey = $(this).attr('tkey');
    		$.ajax({
    			url : basePath + '/personalCenter/detail',
			type : 'post',
			data : { opType : 'detail', taskId : tkey},
			dataType:'json',
			success : function(data){
				var formkey = data.formkey;
				var pDefId = data.pDefId;
				var pInstId = data.pInstId;
				var taskId = data.taskId;
				var opType = data.opType;
				openTaskDetailViewer(formkey, pDefId, pInstId, taskId, opType);
			}
		});
    });
    
    //流程处理中 - Diagram Viewer
	$("body").delegate("a.ac_op.ac_diagram_viewer",'click',function(){
		var pid = $(this).attr("pid");
		var pdid = $(this).attr("pdid");
		openDiagramViewer(pid,pdid);
	});
	
	//任务签出
	$("body").delegate('a.ac_op.ac_claim', 'click', function(){
		var taskId = $(this).attr('tid')
 		if(taskId){
     		$.ajax({
     			url : basePath + '/dynamicProcess/claim',
     			type : 'post',
     			data : {taskId : taskId},
     			success : function(rs){
     				if(rs.status) {
     					jqGrid.trigger('reloadGrid');
     				} else {
     					alert(rs.msg);
     				}
     			},
     			error : function(e){
     				alert('网络异常.');
     			}
     		});
 		} else {
 			alert('任务签出失败.');
 		}
	});
	
    //处理任务
	$("body").delegate('a.ac_op.ac_complete', 'click', function(){
		var tkey = $(this).attr('tkey');
 		if(tkey) {
 			$.ajax({
	    			url : basePath + '/personalCenter/detail',
				type : 'post',
				data : { opType : 'audit', taskId : tkey},
				dataType:'json',
				success : function(data){
					var formkey = data.formkey;
					var pDefId = data.pDefId;
					var pInstId = data.pInstId;
					var taskId = data.taskId;
					var opType = data.opType;
					openTaskHandleViewer(formkey, pDefId, pInstId, taskId, opType);
				}
			});
 		} else {
 			alert('处理操作触发失败.');
 		}
	});
	//全选反选
	$("body").delegate('#message_select_all', 'click', function(){
		if($(this).data("selected") == false){
			$(this).data("selected", true);
			$("#mailTable").find("input[type='checkbox']").prop("checked", true);
		} else {
			$(this).data("selected", false);
			$("#mailTable").find("input[type='checkbox']").prop("checked", false);
		}
	});
	//删除消息
	$("body").delegate('#delete_message', 'click', function(){
		var basePath = $("#basePath").val();
		var ids = [];
		$("#mailTable").find("input[type='checkbox']").each(function(){
			if($(this).is(":checked")){
				ids.push($(this).val());
			}
		});
		if(ids.length == 0){
			alert("未选择任何消息");
		} else {
			alert("正在执行操作...请稍后", true);
			$.ajax({
				url : basePath + 'personalCenter/deleteMessage',
				type : 'post',
				async : false,
				data :  {
							'ids':JSON.stringify(ids)
				},
				dataType : 'json',
				success : function(data){
					if(data.success){
						var length = ids.length;
						var delCount = data.delCount;
						var msgCount = $("#msgCount").html();
						var la = parseInt(msgCount) - parseInt(delCount);
						if(la > 1){
							$("#msgCount").html(la);
						} else
							$("#msgCount").html('');
						
						var count = $("#message_list_count").find(".count").html();
						var l = parseInt(count) - length;
						$("#message_list_count").find(".count").html(l);
						
						for(var i=0; i<ids.length; i++){
							$("#tr_" + ids[i]).remove();
						}
						alert("删除成功", true);
						if(parseInt(delCount) > 0){
							//刷新父页面 顶部导航栏 消息
							window.parent.searchSysMsgCount();
							window.parent.portionMsgList();
						}
					} else {
						alert("删除失败");
					} 
				},
				error: function (jqXHR) {
		             alert("发生错误：" + jqXHR.status);
		        },
			});
		}
	});
	
	
	
	//删除已发送消息
	$("body").delegate('#delete_send_message', 'click', function(){
		var basePath = $("#basePath").val();
		var ids = [];
		$("#mailTable").find("input[type='checkbox']").each(function(){
			if($(this).is(":checked")){
				ids.push($(this).val());
			}
		});
		if(ids.length == 0){
			alert("未选择任何消息");
		} else {
			alert("正在执行操作...请稍后", true);
			$.ajax({
				url : basePath + 'personalCenter/deleteSendMessage',
				type : 'post',
				async : false,
				data :  {
							'ids':JSON.stringify(ids)
				},
				dataType : 'json',
				success : function(data){
					if(data.success){
						var length = ids.length;
						var count = $("#sendMsgCount").html();
						var msgCount = count.replace('(', '').replace(')', '');
						var l = parseInt(msgCount) - length;
						if(l > 0) {
							$("#sendMsgCount").html('(' + l + ')');
							$("#message_list_count").find(".count").html(l);
						} else {
							$("#sendMsgCount").html('');
							$("#message_list_count").find(".count").html(0);
						}	
						for(var i=0; i<ids.length; i++){
							$("#tr_" + ids[i]).remove();
						}
						alert("删除成功", true);
					} else {
						alert("删除失败");
					} 
				},
				error: function (jqXHR) {
		             alert("发生错误：" + jqXHR.status);
		        },
			});
		}
	});
	
	//标记全部已读
	$("body").delegate('#all_mark', 'click', function(){
		var basePath = $("#basePath").val();
		var msgCount = 0;
		$("#mailTable").find("tr.unread").each(function(){
			++msgCount;
		});
		if(msgCount <= 0)
			alert("没有未读消息");
		else {
			alert("正在执行操作...请稍后", true);
			$.post(basePath + 'personalCenter/allMessageRead',{}, function(data){
				if(data.success){
					$("#msgCount").html('');
					alert("操作成功", true);
					$("#mailTable").find("tr.unread").each(function(){
						$(this).removeClass("unread").addClass("read");
						$(this).find("i.icon-t").removeClass("fa-envelope-o").addClass("fa-envelope-open-o");
					});
					if(parseInt(delCount) > 0){
						//刷新父页面 顶部导航栏 消息
						window.parent.searchSysMsgCount();
						window.parent.portionMsgList();
					}
				}
			});
			
		}
	});
	
	//上一页
	$("body").delegate('#prev', 'click', function(){
		var currentPage = $("#currentPage").val();
		var page = parseInt(currentPage) - 1;
		var totalPage = $("#totalPage").val();
		if(parseInt(page) <= 1){
			loadSystemMessage(1);
		} else if(parseInt(page) >= parseInt(totalPage)){
			loadSystemMessage(parseInt(totalPage));
		} else {
			loadSystemMessage(parseInt(page));
		}
	});
	//下一页
	$("body").delegate('#next', 'click', function(){
		var currentPage = $("#currentPage").val();
		var page = parseInt(currentPage) + 1;
		var totalPage = $("#totalPage").val();
		if(parseInt(page) <= 1){
			loadSystemMessage(1);
		} else if(parseInt(page) >= parseInt(totalPage)){
			loadSystemMessage(parseInt(totalPage));
		} else {
			loadSystemMessage(parseInt(page));
		}
	});
	
	//上一页
	$("body").delegate('#prev_', 'click', function(){
		var currentPage = $("#currentPage_").val();
		var page = parseInt(currentPage) - 1;
		var totalPage = $("#totalPage_").val();
		if(parseInt(page) <= 1){
			loadSendedMessage(1);
		} else if(parseInt(page) >= parseInt(totalPage)){
			loadSendedMessage(parseInt(totalPage));
		} else {
			loadSendedMessage(parseInt(page));
		}
	});
	//下一页
	$("body").delegate('#next_', 'click', function(){
		var currentPage = $("#currentPage_").val();
		var page = parseInt(currentPage) + 1;
		var totalPage = $("#totalPage_").val();
		if(parseInt(page) <= 1){
			loadSendedMessage(1);
		} else if(parseInt(page) >= parseInt(totalPage)){
			loadSendedMessage(parseInt(totalPage));
		} else {
			loadSendedMessage(parseInt(page));
		}
	});
	
	//上一页
	$("body").delegate('#_prev', 'click', function(){
		var currentPage = $("#_currentPage").val();
		var page = parseInt(currentPage) - 1;
		var totalPage = $("#_totalPage").val();
		if(parseInt(page) <= 1){
			tongxunlu(1);
		} else if(parseInt(page) >= parseInt(totalPage)){
			tongxunlu(parseInt(totalPage));
		} else {
			tongxunlu(parseInt(page));
		}
	});
	//下一页
	$("body").delegate('#_next', 'click', function(){
		var currentPage = $("#_currentPage").val();
		var page = parseInt(currentPage) + 1;
		var totalPage = $("#_totalPage").val();
		if(parseInt(page) <= 1){
			tongxunlu(1);
		} else if(parseInt(page) >= parseInt(totalPage)){
			tongxunlu(parseInt(totalPage));
		} else {
			tongxunlu(parseInt(page));
		}
	});
	
	//全选反选
	$("body").delegate('#select_all', 'click', function(){
		if($(this).data("selected") == false){
			$(this).data("selected", true);
			$("#mailTable").find("input[type='checkbox']").prop("checked", true);
		} else {
			$(this).data("selected", false);
			$("#mailTable").find("input[type='checkbox']").prop("checked", false);
		}
	});
	
	//写信
	$("body").delegate('#write_msg', 'click', function(){
		var basePath = $("#basePath").val();
		var ids = [];
		$("#mailTable").find("input[type='checkbox']").each(function(){
			if($(this).is(":checked")){
				var userId = $(this).attr("userId");
				ids.push(userId);
			}
		});
		if(ids.length == 0){
			alert("未选择任何联系人");
		} else {
			$.ajax({
	    			url : basePath + 'personalCenter/toWriteMsg',
	    			type : 'post',
	    			data : {'ids' : JSON.stringify(ids)},
	    			dataType : 'html',
	    			success : function(data){
	    				$("#messageContent").html(data);
	    				var config = {
	    		                '.chosen-select'           : {search_contains:true}
	    		        }
	    		        for (var selector in config) {
	    		            $(selector).chosen(config[selector]).change(function(){
	    		            	$(selector).trigger("liszt:updated");
	    		            });
	    		        }	
	    			}
    		 	});	 
		}
	});
	
	/* 查看消息详情 */
	$("body").delegate('.mail_detail', 'click', function(){
		var basePath = $("#basePath").val();
		var id = $(this).data("id");
		var $tr = $(this).parent().parent();
		loadMessageDetails(id, $tr);
	});
	/* 查看发送消息详情 */
	$("body").delegate('.mail_send_detail', 'click', function(){
		var basePath = $("#basePath").val();
		var id = $(this).data("id");
		var $tr = $(this).parent().parent();
		loadSendMessageDetails(id, $tr);
	});
	
	$(".reload_grid").click(function(){
		var jqgrid = $(this).attr("jqgrid");
		if(jqgrid == "jqGrid"){
			jqGrid.trigger('reloadGrid');
		} else if(jqgrid == "jqGrid1"){
			jqGrid1.trigger('reloadGrid');
		} else if(jqgrid == "jqGrid2"){
			jqGrid2.trigger('reloadGrid');
		}else if(jqgrid == "jqGrid3"){
			jqGrid3.trigger('reloadGrid');
		}
	});
	
	/************ sy coding *************/
	
	$(".update_pwd").click(function(){
		$('#myModal_Password_Center').modal("show");		
	});
	
	$(".update_headImage").click(function(){
		$('#myModal_headImage_Center').modal("show")
	});
	
	var $image = $(".image-crop > img")
    $($image).cropper({
        aspectRatio: 1/1,
        minCanvasWidth:120,
        minCanvasHeight:120,
        minContainerWidth:300,
        minContainerHeight:300,
        preview: ".img-preview",
        done: function(data) {
        		console.log(data);
        }
    });

    var $inputImage = $("#inputImage");
    if (window.FileReader) {
        $inputImage.change(function() {
            var fileReader = new FileReader(),
                    files = this.files,
                    file;
            if (!files.length) {
                return;
            }
            file = files[0];
            if (/^image\/\w+$/.test(file.type)) {
                fileReader.readAsDataURL(file);
                fileReader.onload = function () {
                    $inputImage.val("");
                    $image.cropper("reset", true).cropper("replace", this.result);
                };
            }
        });
    } else {
        $inputImage.addClass("hide");
    }
	
    $("#download").click(function() {
    		var base64 = $image.cropper("getDataURL");
    		$.ajax({
    			url : basePath + '/userinfo/updateUserHeadImage',
    			type : 'post',
    			data : {
    				"imgBase64" : base64	
    			},
    			dataType : 'json',
    			success : function(rs){
    				var status = rs.status;
    				if(rs){
    					var time = new Date().getTime();
    					$('#myModal_headImage_Center').modal('hide');
    					top.$('#imgUserPhoto').attr('src', basePath + '/' + rs.headImage + '?t=' + time);
    					top.showNotice("修改头像", "头像保存成功!");
    				}else{
    					top.showNotice("修改头像", "头像保存失败!");
    				}		
    			}
    		 });	 
    });
    
	//保存密码
	$("#password_save_changes").click(function(){			
		var loginPwd =  $("#loginPwd").val();
		var newPasswordConfirm =  $("#loginPwdConfirm").val();
		
		if(loginPwd != newPasswordConfirm){
			alert("输入密码不一致");
			return;			
		}
		
		$.ajax({
			url : basePath + '/userinfo/updateUserPassword',
			type : 'post',
			data : {
				"loginPwd":loginPwd	
			},
			success : function(rs){
				if(rs){
					$('#myModal_Password_Center').modal('hide')
					$("#loginPwd").val("");
					$("#loginPwdConfirm").val("");
					top.showNotice("修改密码", "密码修改成功!");
				}else{
					top.showNotice("修改密码", "密码修改失败!");
				}		
			}
		 });	 		
	});
	
	//回复邮件
	$("body").delegate('.reply_mail', 'click', function(){
		var sendUserId = $(this).data("id");
		$.ajax({
			url : basePath + 'personalCenter/toSendMessage',
			type : 'post',
			data :  {
				'sendUserId' : sendUserId
			},
			dataType: "html",
			success : function(rs){
				if($("#modal-content")){
					$("#modal-content").html(rs);
				}
			}
		});	
	});
	
	//通讯录部门级联
	$("body").delegate('a.dept_folder', 'click', function(){
		var parent = $(this).parent();
		parent.siblings("li").removeClass("active");
		parent.toggleClass("active");
		if(parent.hasClass("active")){
			$(this).find("i").attr("class", "fa  fa-minus-square-o");
		} else {
			$(this).find("i").attr("class", "fa  fa-plus-square-o")
		}
	});
	
});
//加载消息中心
function loadMessageCenter(){
	$.ajax({
		url : basePath + 'sysmsg/messageCenter',
		type : 'post',
		data :  {},
		dataType: "html",
		success : function(rs){
			$(".tab_2").html(rs);
		}
	});	
}
//不需要改变 消息的状态 
function loadSendMessageDetails(messageId, $tr){
	$.ajax({
		url : basePath + 'personalCenter/loadSendMessageDetails',
		type : 'post',
		async : false,
		data :  {
					'messageId':messageId
				},
		dataType : 'html',
		success : function(data){
			$(".messageDetails").html(data);
			$("#modal-message").modal('show');
		},
		error: function (jqXHR) {
             alert("发生错误：" + jqXHR.status);
        },
	});
}
//需要改变消息的状态
function loadMessageDetails(messageId, $tr){
	$.ajax({
		url : basePath + 'personalCenter/loadMessageDetails',
		type : 'post',
		async : false,
		data :  {
					'messageId':messageId
				},
		dataType : 'html',
		success : function(data){
			$(".messageDetails").html(data);
			$("#modal-message").modal('show');
			if($tr){
				if($tr.hasClass("unread")){
					var msgCount = $("#msgCount").html();
					if(parseInt(msgCount) > 1){
						$("#msgCount").html(parseInt(msgCount)  - 1);
					} else
						$("#msgCount").html('');
				}
				//更新 tr样式
				$tr.removeClass("unread").addClass("read");
				$tr.find("i.icon-t").removeClass("fa-envelope-o").addClass("fa-envelope-open-o");
				//刷新父页面 顶部导航栏 消息
				window.parent.searchSysMsgCount();
				window.parent.portionMsgList();
			}
		},
		error: function (jqXHR) {
             alert("发生错误：" + jqXHR.status);
        },
	});
}

function openTaskDetailViewer(formkey, pDefId, pInstId, taskId, opType){
	var iframeSrc = basePath + '/' + formkey + '?pDefId=' + pDefId +'&taskId='+taskId +'&pInstId=' + pInstId + '&opType=' + opType;
	$("#iframeOuterForm").attr("src", iframeSrc);
	$("#modal-task").modal('show');
	$("#iframeOuterForm").get(0).onload = function(){
		setTimeout(function(){
			var height = $("#iframeOuterForm").contents().find('body').height();
			console.log(height);
			$("#taskContent").height(height);
		},100);
	}
}

function openTaskHandleViewer(formkey, pDefId, pInstId, taskId, opType){
	var iframeSrc = basePath + '/' + formkey + '?pDefId=' + pDefId +'&taskId='+taskId +'&pInstId=' + pInstId + '&opType=' + opType;
	$("#iframeHandle").attr("src", iframeSrc);
	$("#iframeHandle").get(0).onload = function(){
		setTimeout(function(){
			var height = $("#iframeHandle").contents().find('body').height();
			console.log(height);
			$("#handleContent").height(height);
		},100);
	}
	$("#modal-handle").modal('show');
}

function openDiagramViewer(pid,pdid){
	var iframeSrc = basePath + '/diagram-viewer/index.html?processDefinitionId='+pdid+'&processInstanceId='+pid;
	
	$('#iframeAcDiagramViewer').attr('src', iframeSrc);
	$('#dynamic_process_diagram_viewer').modal('show');
};


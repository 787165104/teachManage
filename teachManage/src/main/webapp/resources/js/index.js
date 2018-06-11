//未读消息统计
	function searchSysMsgCount(){
		$.ajax({
			url : ParentUrl + '/sysmsg/getNoReader',
			type : 'post',
			data : {},
			success : function(rs){
				$("#msg_count_id").text(rs);
			}
		});
	}
	
	function portionMsgList(){
		$.ajax({
			url : ParentUrl + '/sysmsg/getSysMsgList',
			type : 'post',
			data : {
				isRead: false,
				pageIndex:0,
				pageSize:3
			},
			dataType:"json",
			success : function(rs){
				if(rs === ""){
					return;
				}
				var html = "";
				
				for(var idx = 0 ; idx < rs.data.length;idx++){
					var dateStr = rs.data[idx].createDate;
//					var dateStr1 = dateStr.replace(/\s/g,'T').replace(/\//g,'-');
//					var da = new Date(dateStr1);
					//兼容safari 浏览器
					var da = new Date( Date.parse(dateStr.replace(/-/g, "/")) );
					var second = (new Date() - da)/1000;
					var fin = "";
					if(second < 60){
						fin = second + "second ago";
					} else if(second >= 60 && second < 3600){
						var minute = Math.floor(second / 60);
						fin = minute + "minute ago";
					} else if(second >= 3600 && second < 3600*24){
						var hour = Math.floor(second / 60/ 60);
						fin = hour + "hour ago";
					} else if(second >= 24*3600 && second < 24*3600 * 31){
						var day = Math.floor(second / 60/ 60 /24);
						fin = day + "day ago";
					} else if(second >= 24*3600 * 31 && second < 24*3600 * 31 * 12){
						var month = Math.floor(second / 60/ 60 /24 / 31);
						fin = month + "month ago";
					} else if(second >= 24*3600 * 31 * 12){
						var year = Math.floor(second / 60/ 60 /24 / 31 / 12);
						fin = year + "year ago";
					}
					html += "<li>";
					html += "    <div class='dropdown-messages-box'>";
//					html += "        <div class='media-body' style='' >";
					html += "        	 <a href='javascript:void(0);' class='modal_info'>";
					html += "            <strong>" + rs.data[idx].title + "</strong>. ";
					html += "            <small >"+fin+"</small>";
					html += "			<br>";
					html += "            <small class='text-muted'>"+ da.getFullYear() + "." + (da.getMonth()+1)+"."+ da.getDate() + "   -   " + da.getHours() + ":" + da.getMinutes() + "</small>";
					html += "            <span style='display:none;' >" + rs.data[idx].id + "</span>";
					//消息发送人
					if(rs.data[idx].msgType == "1")
						html += "		<small class='pull-right'>from: " + rs.data[idx].sendUserName + "</small>";
					else if(rs.data[idx].msgType == "2")
						html += "		<small class='pull-right'>from: 系统消息</small>";
					
					html += "            </a>";
//					html += "        </div>";
					html += "    </div>";
					html += "</li>";
					
					html += "<li class='divider'></li>";
					
				}			
				
				html += "<li>";
				html += "    <div class='text-center link-block'>";
				html += "        <a href='javascript:void(0);' class='modal_list' >";
				html += "            <i class='fa fa-envelope'></i> <strong>查看所有消息</strong>";
				html += "        </a>";
				html += "    </div>";
				html += "</li>";
				
				$("#messages_id").html(html);
			}
		});
	}
	
	/**
	 * 查询任务数量
	 */
	function searchTasksCount(){
		$.ajax({
			url : ParentUrl + '/tasks/getTasksCount',
			type : 'post',
			data : {},
			success : function(rs){
				if(rs.status){
					$("#task_count_id").text(rs.taskCount);
					$("#task_count_id1").text(rs.taskCount + " tasks");
				}
					
			}
		});
	}
	
	//查询任务列表
	function searchTasksList(){
		$.ajax({
			url : ParentUrl + '/tasks/searchTasksList',
			type : 'post',
			data : {},
			success : function(rs){
				if(rs.status){
					var html = '';
					var taskList = rs.taskList;
					for(var i=0; i<taskList.length; i++){
						var task = taskList[i];
						html += '<tr class="check_all_task"><td class="td">' + task.processDefName + '</td><td class="td">' + task.userId + '</td><td class="td">' + task.taskName + '</td></tr>';
					}
					$("#task-content").html(html);
				}
			}
		});
	}
$(function(){
	
	searchSysMsgCount();
	portionMsgList();
	
	searchTasksCount();
	searchTasksList();
	var openID = new Date().getTime() + "_OPEN";
	//点击查看所有的任务,模拟双击 磁贴
	$("body").delegate('.check_all_task', 'click', function(){
		var id = openID;
	    	
	    	var openModel = 2;
	    	
	    	if(openModel !== 3){
	    		
	    		var refreshOnOpen = 1;
	    		
	        	id = 'box_' + id;
	        	
	        	var bgColor = "#4253AF";
	        	
	        	if($('#' + id).length){
	        		$('#' + id).css('backgroundColor', bgColor);
	        		$('#' + id).addClass('open');
	        		var a = "/oneportal/personalCenter/index?tab=3";
	        		$("#" + id).find("iframe").attr("src", a);
	        		if(openModel === 2){
	            		$(".m_toolbar").animate({'background-color': bgColor}, 1000, function(){});
	            	}
	        	} else {
	            	var box = $('<div id=' + id + ' class="box"><span class="close"></span></div>');
	            	box.appendTo('body');
	            	box.attr('data-refreshOnOpen', refreshOnOpen);
	            	
	            	if(openModel === 2){
	            		box.css('top', '51px');
	            		box.height($('body').height() - 51);
	            		box.css('zIndex', 1);
	            		$('.m_toolbar').css('zIndex', 2);
	            	} else {
	            		$('.m_toolbar').css('zIndex', 1);
	            		box.css('zIndex', 2);
	            	}
	            	
	            	$('.close', box).click(function(){
	            		var p = $(this).parent();
	            		p.removeClass('open');
	            		p.css('backgroundColor', 'transparent');
	            		
	            		setTimeout(function(){
	            			var roo = 'true';
	            			if(roo == 'true'){
	            				p.remove();
	            			}
	            		}, 1000);
	            		
	            		$(".m_toolbar").animate({'background-color': 'rgba(255, 255, 255, 0.4)'}, 1000, function(){});
	            	});
	            	
	            	setTimeout(function(){
	            		box.css('backgroundColor', bgColor);
	                	box.addClass('open');
	                	var a = "/oneportal/personalCenter/index?tab=3";
	                	
	                	box.append('<iframe src="' + a + '" style="border: none; margin: 0px; padding: 0px; width: 100%; height: 100%;"></iframe>');
	                	if(openModel === 2){
	                		$(".m_toolbar").animate({'background-color': bgColor}, 1000, function(){});
	                	}
	                	
	            	}, 100);
	        	}
	    	}
	});
	//点击查看单个消息
	$('#messages_id').on("click",'a.modal_info',function(){
		msg_info($(this).find("span").text());
	});
	
	function msg_info(msg_id){
		$.ajax({
			url : ParentUrl + '/sysmsg/getSysMsgDetail',
			type : 'post',
			data : {"id":msg_id},
			success : function(rs){
				$("#msg_info_title").html("标题:"+rs.title);
				$("#msg_info_context").html(rs.context);
				$('#myModal_Info').modal("show");
				var sendUserName = rs.sendUserName;
				$("#mail_from").html(sendUserName);
				var msgType = rs.msgType;
				var senderId = rs.sendUserId;
				if(msgType == '1'){
					$(".reply_sender").show();
					$(".reply_sender").attr("target", senderId);
				} else
					$(".reply_sender").hide();
				if(rs.status){
					var msgCount = $("#msg_count_id").html();
					if(parseInt(msgCount) >= 1){
						$("#msg_count_id").text(parseInt(msgCount) - 1 );
					}
				}
				portionMsgList();
			}
		});
		
		//更新消息状态
//		$.ajax({
//			url : ParentUrl + '/sysmsg/updateSysMsg',
//			type : 'post',
//			data : {
//				"id":msg_id,
//				"isRead":true
//				},
//			success : function(rs){
//				if(rs.status){
//					searchSysMsgCount();
//					portionMsgList();
//				}
//			}
//		});
		
		
	};
	
	//回复邮件
	$("body").delegate('.reply_sender', 'click', function(){
		var senderId = $(this).attr("target");
		//回复邮件
		setTimeout(function(){
			$.ajax({
				url : ParentUrl + '/sysmsg/toSendMessage',
				type : 'post',
				data :  {
					'sendUserId' : senderId
				},
				dataType: "json",
				success : function(rs){
					console.log(rs);
					var userName = rs.userName;
					var loginId = rs.loginId;
					var target = userName + '<' + loginId + '>';
					$('#reply_target').html(target);
					$('#send_message_to_target').attr('target', loginId);
					$('#myModal_Info_sender').modal("show");
				}
			});	
		}, 300);
	});
	
	$("body").delegate('#send_message_to_target', 'click', function(){
		var title = $("#msg_title_title").val();
		var target = $(this).attr("target");
		if(title == ""){
			alert("请填写标题");
			/* window.event? window.event.cancelBubble = true : e.stopPropagation();
			window.event? window.event.returnValue = false : e.preventDefault(); */
			return;
		}
		var body = $("#msg_body_body").val();
		if(body == ""){
			alert("请填写信息内容");
			/* window.event? window.event.cancelBubble = true : e.stopPropagation();
			window.event? window.event.returnValue = false : e.preventDefault(); */
			return;
		}
		// 发送消息
		var val = [];
		val.push(target);
		$.ajax({
			url : ParentUrl + '/personalCenter/sendMessage',
			type : 'post',
			async : false,
			data :  {
				'title': title, 'body':body, 'ids' : JSON.stringify(val)
			},
			dataType : 'json',
			success : function(data){
				if(data.status){
					$('#myModal_Info_sender').modal('hide');
					alert("发送成功");
				}
			},
			error: function (jqXHR) {
	             alert("发生错误：" + jqXHR.status);
	        },
		});
	});
	
	$('#myModal_Info').on('hidden.bs.modal', function (e) {
		$("#msg_info_title").html("标题:");
		$("#msg_info_context").html("");
	})
	
	//消息列表, 改成模拟弹开  个人中心 磁贴，并打开 message tab
	$('#messages_id').on("click",'a.modal_list',function(){
		var id = openID;
    	
	    	var openModel = 2;
	    	
	    	if(openModel !== 3){
	    		
	    		var refreshOnOpen = 1;
	    		
	        	id = 'box_' + id;
	        	
	        	var bgColor = "#4253AF";
	        	
	        	if($('#' + id).length){
	        		$('#' + id).css('backgroundColor', bgColor);
	        		$('#' + id).addClass('open');
	        		var a = "/oneportal/personalCenter/index?tab=2";
	        		$("#" + id).find("iframe").attr("src", a);
	        		if(openModel === 2){
	            		$(".m_toolbar").animate({'background-color': bgColor}, 1000, function(){});
	            	}
	        	} else {
	            	var box = $('<div id=' + id + ' class="box"><span class="close"></span></div>');
	            	box.appendTo('body');
	            	box.attr('data-refreshOnOpen', refreshOnOpen);
	            	
	            	if(openModel === 2){
	            		box.css('top', '51px');
	            		box.height($('body').height() - 51);
	            		box.css('zIndex', 1);
	            		$('.m_toolbar').css('zIndex', 2);
	            	} else {
	            		$('.m_toolbar').css('zIndex', 1);
	            		box.css('zIndex', 2);
	            	}
	            	
	            	$('.close', box).click(function(){
	            		var p = $(this).parent();
	            		p.removeClass('open');
	            		p.css('backgroundColor', 'transparent');
	            		
	            		setTimeout(function(){
	            			var roo = 'true';
	            			if(roo == 'true'){
	            				p.remove();
	            			}
	            		}, 1000);
	            		
	            		$(".m_toolbar").animate({'background-color': 'rgba(255, 255, 255, 0.4)'}, 1000, function(){});
	            	});
	            	
	            	setTimeout(function(){
	            		box.css('backgroundColor', bgColor);
	                	box.addClass('open');
	                	var a = "/oneportal/personalCenter/index?tab=2";
	                	
	                	box.append('<iframe src="' + a + '" style="border: none; margin: 0px; padding: 0px; width: 100%; height: 100%;"></iframe>');
	                	if(openModel === 2){
	                		$(".m_toolbar").animate({'background-color': bgColor}, 1000, function(){});
	                	}
	                	
	            	}, 100);
	        	}
	    	}
//		msg_table();
//		$('#myModal_List').modal("show");
	});
	
	function msg_table(){
		$.ajax({
			url : ParentUrl + '/sysmsg/messageCenter',
			type : 'post',
			data :  {},
			dataType: "html",
			success : function(rs){
				$("#message_center").html(rs);
//				for(var idx = 0 ; idx < rs.data.length;idx++){
//					
//					var rowData = rs.data[idx];
//					
//					html += "<tr style='cursor:pointer;'>";
//					html += "   <td style='display:none;'>"+rowData.id+"</td>"
//					html += "	<td>"+rowData.title+"</td>";
//					html += "	<td><div style='text-overflow: ellipsis;width: 280px;white-space: nowrap;overflow: hidden;'>"+rowData.context+"</div></td>";
//					html += "	<td>"+rowData.receiveUserId+"</td>";
//					html += "	<td>"+rowData.sendUserId+"</td>";
//					html += "	<td>"+rowData.createDate+"</td>";
//					html += "	<td style='text-align: center;'>"+(rowData.isRead ? "已读" : "未读")+"</td>";
//					html += "</tr>";
//				}
//				console.log(rs.pageIndex);
//				$("#page_index").text(rs.pageIndex);
//				$("#page_total").text(rs.pageTotal);
//				$(".pager > li > .begin").text(((rs.pageIndex-1)*10)+1);
//				
//				if((rs.pageIndex+1)==rs.pageTotal){
//					$(".pager > li > .end").text(((rs.pageIndex-1)*10)+(rs.rowTotal%10));
//				}else{
//					$(".pager > li > .end").text(((rs.pageIndex-1)*10)+10);
//				}
//				
//				$("#msg_list_table > tbody").html(html);
			}
		});
	}
	
//	$("#page_previous").click(function(){
//		if($("#page_index").text()=="1"){
//			return;
//		}
//		msg_table(Number($("#page_index").text())-1,10);
//	});
//	$("#page_next").click(function(){
//		var now_page_index = Number($("#page_index").text());
//		if(Number($("#page_total").text()) == 1 || now_page_index==Number($("#page_total").text())){
//			return;
//		}
//		msg_table(now_page_index,10);
//	});
	
	$('#msg_list_table > tbody').on("click",'tr',function(){
		$('#myModal_List').modal("hide");
		msg_info($(this).children(":first").text());
	});
	
	$('#myModal_List').on('hidden.bs.modal', function (e) {
		$("#msg_list_table > tbody").html("");
	})
	
	
	
	
	//个人中心
	$("#personal_id").click(function(){
//		$.ajax({
//			url : ParentUrl + '/userinfo/getUserInfo',
//			type : 'post',
//			data : {},
//			success : function(rs){
//				$("#user_name").val(rs.userName);
//				$("#login_pwd").val(rs.loginPwd);
//				$("#user_email").val(rs.userEmail);
//				$("#user_phone").val(rs.userPhone);
//				$("#user_employeeNo").val(rs.employeNo);
//				$("#user_dept").val(rs.department);
//				
//				$('#myModal_Personal_Center').modal("show");
//				debugger;
//			}
//		});
		var id = openID;
    	
	    	var openModel = 2;
	    	
	    	if(openModel !== 3){
	    		
	    		var refreshOnOpen = 1;
	    		
	        	id = 'box_' + id;
	        	
	        	var bgColor = "#4253AF";
	        	
	        	if($('#' + id).length){
	        		$('#' + id).css('backgroundColor', bgColor);
	        		$('#' + id).addClass('open');
	        		var a = "/oneportal/personalCenter/index?tab=3";
	        		$("#" + id).find("iframe").attr("src", a);
	        		if(openModel === 2){
	            		$(".m_toolbar").animate({'background-color': bgColor}, 1000, function(){});
	            	}
	        	} else {
	            	var box = $('<div id=' + id + ' class="box"><span class="close"></span></div>');
	            	box.appendTo('body');
	            	box.attr('data-refreshOnOpen', refreshOnOpen);
	            	
	            	if(openModel === 2){
	            		box.css('top', '51px');
	            		box.height($('body').height() - 51);
	            		box.css('zIndex', 1);
	            		$('.m_toolbar').css('zIndex', 2);
	            	} else {
	            		$('.m_toolbar').css('zIndex', 1);
	            		box.css('zIndex', 2);
	            	}
	            	
	            	$('.close', box).click(function(){
	            		var p = $(this).parent();
	            		p.removeClass('open');
	            		p.css('backgroundColor', 'transparent');
	            		
	            		setTimeout(function(){
	            			var roo = 'true';
	            			if(roo == 'true'){
	            				p.remove();
	            			}
	            		}, 1000);
	            		
	            		$(".m_toolbar").animate({'background-color': 'rgba(255, 255, 255, 0.4)'}, 1000, function(){});
	            	});
	            	
	            	setTimeout(function(){
	            		box.css('backgroundColor', bgColor);
	                	box.addClass('open');
	                	var a = "/oneportal/personalCenter/index?tab=3";
	                	
	                	box.append('<iframe src="' + a + '" style="border: none; margin: 0px; padding: 0px; width: 100%; height: 100%;"></iframe>');
	                	if(openModel === 2){
	                		$(".m_toolbar").animate({'background-color': bgColor}, 1000, function(){});
	                	}
	                	
	            	}, 100);
	        	}
	    	}
	});
	
	$("#user_save_changes").click(function(){
		$.ajax({
			url : ParentUrl + '/userinfo/updateUserInfo',
			type : 'post',
			data : {"userName":$("#user_name").val(),
					"loginPwd":$("#login_pwd").val(),
					"userEmail":$("#user_email").val(),
					"userPhone":$("#user_phone").val()},
			success : function(rs){
				if(rs){
					$('#myModal_Personal_Center').modal('hide')
					alert("保存成功！");
				}else{
					alert("保存失败！");
				}
				
				
			}
		});
	});
	
//activiti
	
	
	$("#model_create").click(function(){
		$('#mymodal_model_create').modal("show");
	});
	
	$('.close', '#acCreate').click(function(){
		$(this).parent().removeClass('open');
		$("#WorkflowModelList").trigger('reloadGrid');
	});
	
	$("#WorkflowModelList").on('click', '.model_edit', function(){
		
		if($('#iframeAcCreate').length){
			$('#iframeAcCreate').remove();
		}
		
		var iframeAcCreate = $('<iframe id="iframeAcCreate" name="iframeAcCreate" src="" style="border: none; margin: 0px; padding: 0px; width: 100%; height: 100%;"></iframe>');
		
		var modelId = $(this).attr('mId');
		var iframeSrc = ParentUrl + '/modeler.html?modelId=' + modelId;
		
		iframeAcCreate.attr('src', iframeSrc);
		$('#acCreate').append(iframeAcCreate);
		
		setTimeout(function(){
			$('#acCreate').addClass('open');
		},100);
		
	});
	
	//模型工作区 - 创建
	$("#model_save_changes").click(function(){
		
		$('#acCreate').addClass('open');
		$('#modelFormCreate').submit();
		$('#mymodal_model_create').modal("hide");
		
	});
	
	//模型工作区 - 部署
	$("#WorkflowModelList").on("click",'.model_deploy',function(){
		$.ajax({
			url : ParentUrl + '/ModelController/deploy/model',
			type : 'post',
			data : {"modelId":$(this).attr("modelId")},
			success : function(rs){
				alert(rs.message);
				$("#ProcessModelList").trigger('reloadGrid');
			}
		});
	});
	
	//模型工作区 - 删除
	$("#WorkflowModelList").on("click",'.model_delete',function(){
		$.ajax({
			url : ParentUrl + '/ModelController/delete/model',
			type : 'post',
			data : {"modelId":$(this).attr("modelId")},
			success : function(rs){
				alert(rs.message);
				//$("#ProcessModelList").jqGrid().trigger('reloadGrid');
				$("#WorkflowModelList").jqGrid('setGridParam',{  // 重新加载数据
				      page:1
				}).trigger("reloadGrid");
			}
		});
	});
	
	//流程定义及部署管理 - 删除
	$("#ProcessModelList").on("click",'.process_delete',function(){
		$.ajax({
			url : ParentUrl + '/ProcessController/process/delete',
			type : 'post',
			data : {"deploymentId":$(this).attr("deploymentId")},
			success : function(rs){
				alert(rs.message);
				//$("#ProcessModelList").jqGrid().trigger('reloadGrid');
				$("#ProcessModelList").jqGrid('setGridParam',{  // 重新加载数据
				      page:1
				}).trigger("reloadGrid");
			}
		});
	});
	
	//流程定义及部署管理 - 激活
	$("#ProcessModelList").on("click",'.process_active',function(){
		$.ajax({
			url : ParentUrl + '/ProcessController/processdefinition/update/active',
			type : 'post',
			data : {"processDefinitionId":$(this).attr("processDefinitionId")},
			success : function(rs){
				alert(rs.message);
				//$("#ProcessModelList").jqGrid().trigger('reloadGrid');
				$("#ProcessModelList").jqGrid('setGridParam',{  // 重新加载数据
				      page:1
				}).trigger("reloadGrid");
			}
		});
	});
	
	//流程定义及部署管理 - 挂起
	$("#ProcessModelList").on("click",'.process_suspend',function(){
		$.ajax({
			url : ParentUrl + '/ProcessController/processdefinition/update/suspend',
			type : 'post',
			data : {"processDefinitionId":$(this).attr("processDefinitionId")},
			success : function(rs){
				alert(rs.message);
				//$("#ProcessModelList").jqGrid().trigger('reloadGrid');
				$("#ProcessModelList").jqGrid('setGridParam',{  // 重新加载数据
				      page:1
				}).trigger("reloadGrid");
			}
		});
	});
	
	
	//流程定义及部署管理 - 转换为Model
	$("#ProcessModelList").on("click",'.process_convert',function(){
		$.ajax({
			url : ParentUrl + '/ActivitiController/process/convert-to-model',
			type : 'post',
			data : {"processDefinitionId":$(this).attr("processDefinitionId")},
			success : function(rs){
				//alert(rs.message);
				
				$('#mymodal_process_super_list').modal('hide');
				$('#mymodal_model_list').modal('show');
				$("#WorkflowModelList").jqGrid('setGridParam',{  // 重新加载数据
				      page:1
				}).trigger("reloadGrid");
			}
		});
	});

    //流程定义及部署管理 - 部署流程
    $("#deployAutoFile").on("click",'button',function(){
        $.ajax({
            url : ParentUrl + '/ProcessController/activitiDeployFileById',
            type : 'post',
            data : {"wkid":$(this).attr("wkid")},
            success : function(rs){
            	if(rs.status){
            		alert("部署成功！");
					$("#ProcessModelList").jqGrid('setGridParam',{  // 重新加载数据
                        page:1
                    }).trigger("reloadGrid");
				}

            }
        });
    });
	
	//流程定义及部署管理 - 上传文件部署
	$("#deploy").click(function(){
		$('#deployFieldset').toggle('normal');
	});
	$("#modelFileDeploySub").click(function(){
		var index = layer.load(1);
		$('#modelFileDeploy').ajaxSubmit(function(){
			layer.close(index);
			$("#ProcessModelList").jqGrid('setGridParam',{  // 重新加载数据
			      page:1
			}).trigger("reloadGrid");
		});
	});
	
	//流程处理中 - Diagram Viewer
	$("#task_runing_list").on("click",'.ac_diagram_viewer',function(){
		var pid = $(this).attr("pid");
		var pdid = $(this).attr("pdid");
		openDiagramViewer(pid,pdid);
	});
	
	//流程未处理 - Diagram Viewer
	$("#task").on("click",'.ac_diagram_viewer',function(){
 		var pid = $(this).attr("pid");
		var pdid = $(this).attr("pdid");
		openDiagramViewer(pid,pdid);
	});
	
	function openDiagramViewer(pid,pdid){
		var iframeSrc = ParentUrl + '/diagram-viewer/index.html?processDefinitionId='+pdid+'&processInstanceId='+pid;
		
		$('#iframeAcDiagramViewer').attr('src', iframeSrc);
		$('#dynamic_process_diagram_viewer').modal('show');
	};
	
	//activiti
	
	// 消息提示框点击事件处理
	function toastrClick(){
		var batchId = this.msgId;
		
		if(batchId){
			$.ajax({
				url : ParentUrl + '/sysmsg/getSysMsgDetailByBatchId',
				type : 'post',
				data : {"batchId" : batchId},
				success : function(rs){
					$("#msg_info_title").html("标题:"+rs.title);
					$("#msg_info_context").html(rs.context);
					$('#myModal_Info').modal("show");
					
					//更新消息状态
					$.ajax({
						url : ParentUrl + '/sysmsg/updateSysMsg',
						type : 'post',
						data : {
							"id": rs.id,
							"isRead":true
							},
						success : function(rs){
							if(rs.status){
								searchSysMsgCount();
								portionMsgList();
							}
						}
					});
				}
			});
		}
	}

    $('.btn_admin_wrapper').click(function () {
        if($(this).hasClass('active')){
            closeAdminManage(this);
        } else {
            openAdminManage(this);
        }
    });

    loadLogo();
	
	
//	setInterval(function(){
//		var title = "current time";
//		var msg = new Date();
//		showNotice(title, msg);
//	}, 1000);
	
//	JS.Engine.start(ParentUrl + '/comet');
//	
//	JS.Engine.on({
//	    start : function(cId, channelList, engine){
//	      
//	      var id = loginId;
//	      if(loginId.length > 4){
//	    	  id = id.substr(-4);
//	      }
//	      var title = "欢迎您,尾号: [" + id + "] 的朋友";
//	      var msg = '已为您建立的消息实时接收通道, 通道 ID: ' + cId;
//	      showNotice(title, msg);
//	      
//	    },
//	    notice : function(data){
//	    	// 刷新消息数量标记
//	    	searchSysMsgCount();
//	    	portionMsgList();
//	    	
//	    	var title = data.title || "您有新的消息了：";
//	    	showNotice(title, data.msg, data.batchId, toastrClick);
//	    },
//	    stop : function(cause, cId, url, engine){
//
//	      var title = "Stop Connect";
//	      var msg = 'The connection has been disconnected, connected to the ID: '+ cId +', disconnect the reason: '+ cause +', connection address open: '+ url;
//	      showNotice(title, msg);
//	      
//	    }
//	});
	
//	var notice_user = 'notice_' + loginId;
//	JS.Engine.on(notice_user, function(data){
//		// 刷新消息数量标记
//    	searchSysMsgCount();
//    	portionMsgList();
//    	
//    	var title = data.title || "您有新的消息了：";
//    	showNotice(title, data.msg, data.batchId, toastrClick);
//	});
	
	
	//前后台数据交互形式
	var GeneralMessage = {
		handlerMethod: "", // 交给后台 com.dgtis.oneportal.websocket.Handle的执行， 在 Channel枚举中配置
		title : "",  // 标题
		content : "", //内容
		from : "",//发送人信息
		undefine : {} //自定义 数据格式,是个对象
	};
	var HandlerMethod = {
		NOTICE: "NOTICE",
		TASK: "TASK",
		BINDSESSION : "BINDSESSION"
	};
	var Channel = {
		NOTICE : "NOTICE",
		TASK : "TASK"
	};
	
	var ws = null;
	var locate = window.location;
	var url = "ws://" + locate.hostname + ":" + locate.port + "/oneportal/websocket";
	var connected = false;
	var loginId = $("#loginId").val();
	ws = new ReconnectingWebSocket(url);
	ws.onclose = onClose;
	ws.onopen = onOpen;
	ws.onmessage = onMessage;
	
	/**
	 * 每次连接 ，都要bindSession
	 */
	function onOpen(){
		connected = true;
		console.log('onOpen');
		GeneralMessage.handlerMethod = HandlerMethod.BINDSESSION;
		GeneralMessage.undefine = "" + loginId;
		sendWS();
	}
	/**
	 * 接收推送消息
	 */
	function onMessage(event){
		var inboundMsg = JSON.parse(event.data);
		switch(inboundMsg.handlerMethod){
			case HandlerMethod.BINDSESSION :
//				showNotice("系统消息", "websocet连接成了!");
				break;
			case HandlerMethod.NOTICE :
				var title = inboundMsg.title || "您有新的消息了：";
				showNotice(inboundMsg.title, inboundMsg.content, inboundMsg.undefine, toastrClick);
				searchSysMsgCount();
				portionMsgList();
				break;
			case HandlerMethod.TASK :
				showNotice(inboundMsg.title, inboundMsg.content);
				searchTasksCount();
				searchTasksList();
				break;
		}
	}
	
	function onClose(){
		connected = false;
		console.log('onClose');
	}
	
	function sendWS(){
		if(ws && ws != null && connected){
			var msg = JSON.stringify(GeneralMessage);
			ws.send(msg);
		}
	}

});


function showNotice(title, msg, id, clk, tType){
	toastr.options = {
			  "closeButton": true,
			  "debug": false,
			  "progressBar": true,
			  "positionClass": "toast-bottom-right",
			  "showDuration": "300",
			  "hideDuration": "1000",
			  "timeOut": "5000",
			  "extendedTimeOut": "1000",
			  "showEasing": "swing",
			  "hideEasing": "linear",
			  "showMethod": "fadeIn",
			  "hideMethod": "fadeOut",
			  "onclick" : function(){}
			};
	toastr.options.msgId = id;
	if(clk){
		toastr.options.onclick = clk;
	}
	
	var toastrType = tType || 'info';
	
	toastr[toastrType](msg, title);
	
}

function loadLogo(){
	$.ajax({
		url : ParentUrl + '/company/getcompanyInfo',
		type : 'post',
		success : function(rs){
			if(rs){
				$('#logoImg').attr('src', rs['logoPath']);
			}
		}
	});
}

function openAdminManage(o){

	var id = 'box_admin_manage';

    if($('#' + id).length){
        $('#' + id).addClass('open');
        $('#' + id).css('backgroundColor', '#fff');
        $(".m_toolbar").animate({'background-color': '#438eb9'}, 1000, function(){});
    } else {
        var box = $('<div id=' + id + ' class="box"></div>');
        box.appendTo('body');

        box.css('top', '51px');
        box.height($('body').height() - 51);
        box.css('zIndex', 1);
        $('.m_toolbar').css('zIndex', 2);

        setTimeout(function(){
            box.css('backgroundColor', '#fff');
            box.addClass('open');

            box.append('<iframe src="' + ParentUrl + '/admin/adminIndex" style="border: none; margin: 0px; padding: 0px; width: 100%; height: 100%;"></iframe>');
            $(".m_toolbar").animate({'background-color': '#438eb9'}, 1000, function(){});

        }, 100);
	}

    $(o).addClass('active');
    $('i', o).removeClass('icon-reorder');
    $('i', o).addClass('icon-remove');
}

function closeAdminManage(o) {
    var id = 'box_admin_manage';
	var box =  $('#' + id);

    box.removeClass('open');
    box.css('backgroundColor', 'transparent');

    $(".m_toolbar").animate({'background-color': 'rgba(255, 255, 255, 0.4)'}, 1000, function(){});

    $(o).removeClass('active');
    $('i', o).removeClass('icon-remove');
    $('i', o).addClass('icon-reorder');
}
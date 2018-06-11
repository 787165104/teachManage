var dynamicForm = {
	// 未处理 任务列表
	taskList : function(){},
	// 处理中的任务列表
	taskRuning : function(){},
	// 已结束的任务列表
	taskFinished : function(){},
	// 申请
	taskCreate : function(){},
	// 审核
	taskAudit : function(){},
	// 详情
	taskDetail : function(){},
	// 刷新所有表单信息
	refreshAll : function(){},
	//请假流程
	leaveCreate : function(){} 
};

$(function(){
	
	var formTool = {
		createFormEle : function(prop, datas){
			var typeName = prop.type.name
			var eleType = {
					'string' : function(prop, datas){
						var txtId = prop.id;
						var txtName = 'fp_' + prop.id;
						var name = prop.name;
						var value =  prop.value||'';
						var strHtml = '';
						
						if (prop.writable === true) {
							strHtml = '<div class="input-group input-group-sm" style="width:  100%; margin-bottom: 15px;">' + 
										  '<span class="input-group-addon">'+ name +'</span>' + 
										  '<input id="'+ txtId +'" name="'+ txtName +'" type="text" class="form-control" placeholder="'+ name +'" value="'+ value +'">' + 
										'</div>';
						} else {
							strHtml = '<div class="form-group" style="width: 99%; margin: 0 auto; border-bottom: 1px solid rgb(221, 221, 221); padding: 5px 0px;">' + 
									    '<label class="col-sm-2 control-label">'+ name +'</label>' + 
									    '<div class="col-sm-10">' + 
									      '<p class="form-control-static">' + value + '</p>' + 
									    '</div>' + 
									  '</div>';
						}
						
						return $(strHtml);
					},
					
					'long' : function(prop, datas){
						var txtId = prop.id;
						var txtName = 'fp_' + prop.id;
						var name = prop.name;
						var value =  prop.value||'';
						var strHtml = '';
						
						if (prop.writable === true) {
							strHtml = '<div class="input-group input-group-sm" style="width:  100%; margin-bottom: 15px;">' + 
										  '<span class="input-group-addon">'+ name +'</span>' + 
										  '<input id="'+ txtId +'" name="'+ txtName +'" type="number" class="form-control" value="'+ value +'" placeholder="'+ name +'">' + 
										'</div>';
						} else {
							strHtml = '<div class="form-group" style="width: 99%; margin: 0 auto; border-bottom: 1px solid rgb(221, 221, 221); padding: 5px 0px;">' + 
									    '<label class="col-sm-2 control-label">'+ name +'</label>' + 
									    '<div class="col-sm-10">' + 
									      '<p class="form-control-static">' + value + '</p>' + 
									    '</div>' + 
									  '</div>';
						}
						
						return $(strHtml);
					},
					'boolean' : function(prop, datas){
						var txtId = prop.id;
						var txtName = 'fp_' + prop.id;
						var name = prop.name;
						var value =  prop.value;
						var strHtml = '';
						
						if (prop.writable === true) {
							strHtml = '<div class="input-group input-group-sm" style="width:  100%; margin-bottom: 15px;">' + 
									      '<span class="input-group-addon">'+ name +'</span>' + 
									      '<select id="'+ txtId +'" name="'+ txtName +'" class="form-control">';
							strHtml += '<option value="true"' + (value == true ? 'selected="selected"' : '') +'>是</option>';
							strHtml += '<option value="false"' + (value == false ? 'selected="selected"' : '') +'>否</option>';
							strHtml += '</select></div>';
						} else {
							strHtml = '<div class="form-group" style="width: 99%; margin: 0 auto; border-bottom: 1px solid rgb(221, 221, 221); padding: 5px 0px;">' + 
									    '<label class="col-sm-2 control-label">'+ name +'</label>' + 
									    '<div class="col-sm-10">' + 
									      '<p class="form-control-static">' + (value ? '是' : '否') + '</p>' + 
									    '</div>' + 
									  '</div>';
						}
						
						return $(strHtml);
					},
					
					'date' : function(prop, datas){
						var txtId = prop.id;
						var txtName = 'fp_' + prop.id;
						var name = prop.name;
						var value =  prop.value||'';
						
						var strHtml = '';
						if (prop.writable === true) {
							strHtml = '<div class="input-group input-group-sm" style="width:  100%; margin-bottom: 15px; position: relative;">' + 
										  '<span class="input-group-addon">'+ name +'</span>' + 
										  '<span class="add-on" style="position: absolute; z-index: 999; left: auto; right: 5px; top: 7px;"><i class="icon-th"></i></span>' + 
										  '<input id="'+ txtId +'" name="'+ txtName +'" type="text" style="background-color: #fff; cursor: default;" readonly="readonly" class="form-control date" data-date="'+ value +'" data-date-format="mm-dd-yyyy hh:ii" value="'+ value +'" placeholder="'+ name +'">' + 
										  '</div>';
						} else {
							strHtml = '<div class="form-group" style="width: 99%; margin: 0 auto; border-bottom: 1px solid rgb(221, 221, 221); padding: 5px 0px;">' + 
									    '<label class="col-sm-2 control-label">'+ name +'</label>' + 
									    '<div class="col-sm-10">' + 
									      '<p class="form-control-static">' + value + '</p>' + 
									    '</div>' + 
									  '</div>';
						}
						
						var oHtml = $(strHtml);
						$('.date', oHtml).datetimepicker({autoclose : true, todayHighlight : true/*, minView: 'month'*/});
						
						return oHtml;
					},
					
					'enum' : function(prop, datas){
						var txtId = prop.id;
						var txtName = 'fp_' + prop.id;
						var name = prop.name;
						var value =  prop.value;
						
						var strHtml = '';
						if (prop.writable === true) {
							strHtml = '<div class="input-group input-group-sm" style="width:  100%; margin-bottom: 15px;">' + 
									      '<span class="input-group-addon">'+ name +'</span>' + 
									      '<select id="'+ txtId +'" name="'+ txtName +'" class="form-control">';
							
							$.each(datas[prop.id], function(k, v) {
								var selected = value == k ? 'selected="selected"' : '';
								strHtml += "<option value='" + k + "' " + selected + ">" + v + "</option>";
							});
							strHtml += '</select></div>';
						} else {
							var selectValue = '';
							
							$.each(datas[prop.id], function(k, v) {
								
								if(String(k) == String(value)){
									selectValue = v;
									return false;
								}
							});
							
							strHtml = '<div class="form-group" style="width: 99%; margin: 0 auto; border-bottom: 1px solid rgb(221, 221, 221); padding: 5px 0px;">' + 
									    '<label class="col-sm-2 control-label">'+ name +'</label>' + 
									    '<div class="col-sm-10">' + 
									      '<p class="form-control-static">' + selectValue + '</p>' + 
									    '</div>' + 
									  '</div>';
						}
						
						return $(strHtml);
					}
			}
			
			return eleType[typeName](prop, datas);
		},
		
		// 构建表单
		createForm : function(pView, datas, taskId) {
			
			var form = $('<div class="form-group navbar navbar-default" style="width: 60%; margin: 0 auto; border: 1px solid #ddd; border-radius: 3px; padding: 15px;"></div>');
			if(datas.form.formProperties){
				$.each(datas.form.formProperties, function(){
					var ele = formTool.createFormEle(this, datas);
					form.append(ele);
				});
			}
			
			var opType = datas.operate
			
			var btnPanel = $('<div class="input-group" style="width: 100%; margin-bottom: 15px; text-align: right;"></div>');
			
			if(opType == 'create'){
				
				var btnSubmit = $('<button type="button" pId="' + taskId + '" class="btn btn-sm btn-primary" style="width: 60px;">提交</button>');
				btnSubmit.click(formTool.submitForm);
				
				btnPanel.append(btnSubmit);
				
			} else if(opType == 'audit') {
				
				form.addClass('form-horizontal');
				form.css('width', '70%');
				
				if(datas.isOk) {
					var reject = {"id":"reject","name":"审批意见","type":{"name":"string"},"value":"","required":true,"writable":true,"readable":true};
					var ele = formTool.createFormEle(reject, datas);
					form.append(ele);
					
					var btnOk = $('<button type="button" tId="' + taskId + '" isOk="true" class="btn btn-sm btn-primary" style="width: 60px;">同意</button>');
					btnOk.click(formTool.auditTask);
					
					var btnNo = $('<button type="button" tId="' + taskId + '" isOk="false" class="btn btn-sm btn-danger" style="width: 60px;margin-right: 15px;">驳回</button>');
					btnNo.click(formTool.auditTask);
					
					btnPanel.append(btnNo);
					btnPanel.append(btnOk);
				} else {
					var btnOk = $('<button type="button" tId="' + taskId + '" isOk="true" class="btn btn-sm btn-primary" style="width: 60px;">提交</button>');
					btnOk.click(formTool.auditTask);
					btnPanel.append(btnOk);
				}
				
				
			} else if(opType == 'detail'){
				form.addClass('form-horizontal');
				form.css('width', '70%');
			}
			
			form.append(btnPanel);
			
			pView.append(form);
		},
		// 提交表单，开启流程
		submitForm : function(){
			var form = $(this).parents('.form-group');
			var data = {};
			var pId = $(this).attr('pId');
			
			$('input', form).each(function(){
				var name = $(this).attr('name');
				if(name){
					var value = $(this).val();
					data[name] = value;
				}
			});
			
			$('select', form).each(function(){
				var name = $(this).attr('name');
				if(name){
					var value = $(this).val();
					data[name] = value;
				}
			});
			
			data.processDefinitionId = pId;
			
			var btn = $(this);
			btn.attr('disabled', 'disabled');
			
			$.ajax({
				url : ParentUrl + '/dynamicProcess/start',
				type : 'post',
				data : data,
				success : function(rs){
					btn.removeAttr('disabled');
					// 提交成功
					if(rs.status){
						// 表单提交成功情况输入框信息
						$('input', form).each(function(){
							$(this).val('');
						});
						
						var createFormAlert = $('#createFormAlert');
						$('strong', createFormAlert).html('Success!');
						$('font', createFormAlert).html(rs.msg);
						createFormAlert.attr('class', 'alert my_alert alert-success');
						createFormAlert.fadeIn();
						
						// 刷新 待办任务
						var key = taskPanel.attr('key');
						var pId = taskPanel.attr('pId');
						dynamicForm.taskList(key, pId);
						
						// 刷新 进行中 任务列表
						key = taskRuningList.attr('key');
						pId = taskRuningList.attr('pId');
						dynamicForm.taskRuning(key, pId);

						// 刷新 已处理 任务列表
						key = taskFinishedList.attr('key');
						pId = taskFinishedList.attr('pId');
						dynamicForm.taskFinished(key, pId);
						
					} else {
						var createFormAlert = $('#createFormAlert');
						$('strong', createFormAlert).html('Fail!');
						$('font', createFormAlert).html(rs.msg);
						createFormAlert.attr('class', 'alert my_alert alert-danger');
						createFormAlert.fadeIn();
					}
				},
				error : function(e){
					btn.removeAttr('disabled');
					
					var createFormAlert = $('#createFormAlert');
					$('strong', createFormAlert).html('Fail!');
					$('font', createFormAlert).html('网络异常.');
					createFormAlert.attr('class', 'alert my_alert alert-danger');
					createFormAlert.fadeIn();
				}
			});
		},
		
		auditTask : function(){
			
			var taskId = $(this).attr('tId');
			
			if(taskId){
				var form = $(this).parents('.form-group');
				var data = {taskId : taskId};
				
				$('input', form).each(function(){
					var name = $(this).attr('name');
					if(name){
						var value = $(this).val();
						data[name] = value;
					}
				});
				
				$('select', form).each(function(){
					var name = $(this).attr('name');
					if(name){
						var value = $(this).val();
						data[name] = value;
					}
				});
				
				var isOk = $(this).attr('isOk');
				data.isOk = isOk;
				
				var btnOp = $(this);
				$('button', btnOp.parent()).attr('disabled', 'disabled');
				
				$.ajax({
					url : ParentUrl + '/dynamicProcess/complete',
					type : 'post',
					data : data,
					success : function(rs){
						
						if(rs.status){
							
							var auditFormAlert = $('#auditFormAlert');
							$('strong', auditFormAlert).html('Success!');
							$('font', auditFormAlert).html(rs.msg);
							auditFormAlert.attr('class', 'alert my_alert alert-success');
							auditFormAlert.fadeIn();
							
							// 刷新 待办任务
							var key = taskPanel.attr('key');
							var pId = taskPanel.attr('pId');
							dynamicForm.taskList(key, pId);
							
							// 刷新 进行中 任务列表
							key = taskRuningList.attr('key');
							pId = taskRuningList.attr('pId');
							dynamicForm.taskRuning(key, pId);

							// 刷新 已处理 任务列表
							key = taskFinishedList.attr('key');
							pId = taskFinishedList.attr('pId');
							dynamicForm.taskFinished(key, pId);
							
						} else {
							$('button', btnOp.parent()).removeAttr('disable');
							
							var auditFormAlert = $('#auditFormAlert');
							$('strong', auditFormAlert).html('Fail!');
							$('font', auditFormAlert).html(rs.msg);
							auditFormAlert.attr('class', 'alert my_alert alert-danger');
							auditFormAlert.fadeIn();
						}
					},
					error : function(e){
						$('button', btnOp.parent()).removeAttr('disable');
						
						var auditFormAlert = $('#auditFormAlert');
						$('strong', auditFormAlert).html('Fail!');
						$('font', auditFormAlert).html('操作失败,网络异常.');
						auditFormAlert.attr('class', 'alert my_alert alert-danger');
						auditFormAlert.fadeIn();
					}
				});
			} else {
				var auditFormAlert = $('#auditFormAlert');
				$('strong', auditFormAlert).html('Fail!');
				$('font', auditFormAlert).html('操作失败,无法找到taskId.');
				auditFormAlert.attr('class', 'alert my_alert alert-danger');
				auditFormAlert.fadeIn();
				
			}
		},
		
		createOuterForm : function(pView, datas, acId){

			var formkey = datas.formkey;
			var pDefId = datas.pDefId||'';
			var taskId = datas.taskId||'';
			var pInstId = datas.pInstId||'';
			var opType = datas.opType||'';
			
			var iframeSrc = ParentUrl + '/' + formkey + '?pDefId=' + pDefId + '&pInstId=' + pInstId + '&taskId=' + taskId + '&opType=' + opType;
			
			var tabId = pView.parent().attr('aria-labelledby');
			var tabItem = $('#' + tabId);
			tabItem.attr('iframeSrc', iframeSrc);
			var pViewId = pView.attr('id');
			tabItem.attr('pViewId', pViewId);
			
			if(pView.parent().css('display') == 'block'){
				
				if(pViewId){
					var iframeOuterForm = $('<iframe id="iframeOuterForm" name="iframeOuterForm" src="" style="border: none; margin: 0px; padding: 0px; width: 100%; height: 100%;"></iframe>');
					pView.html('');
					pView.append(iframeOuterForm);
						
					iframeOuterForm.attr('src', iframeSrc);
						
					iframeOuterForm.get(0).onload = function(){
						var height = $(this).contents().find('body').height();
						pView.height(height);
					}
				}
				
			} else {
				
				tabItem.one('shown.bs.tab', function(){
					
					if(pViewId){
						var iframeOuterForm = $('<iframe id="iframeOuterForm" name="iframeOuterForm" src="" style="border: none; margin: 0px; padding: 0px; width: 100%; height: 100%;"></iframe>');
						pView.html('');
						pView.append(iframeOuterForm);
							
						iframeOuterForm.attr('src', iframeSrc);
							
						iframeOuterForm.get(0).onload = function(){
							var height = $(this).contents().find('body').height();
							pView.height(height);
						}
					}
					return false;
				});
			}
		}
	};
	
	
	
	var taskPanel = $('#task');
	taskPanel.on('click','a.ac_op', function(){
		
		var jqGrid = $('#task_list');
		
     	if($(this).hasClass('ac_claim')){
     		
     		var taskId = $(this).attr('tid')
     		
     		if(taskId){
	     		$.ajax({
	     			url : ParentUrl + '/dynamicProcess/claim',
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
	     		
	     		//jqGrid.jqGrid('setGridParam',{postData : {key : 'simple-form'}});
	     		
     		} else {
     			alert('任务签出失败.');
     		}
     	} else if($(this).hasClass('ac_complete')) {
     		var tkey = $(this).attr('tkey');
     		
     		if(tkey) {
     			
     			dynamicForm.taskAudit(tkey);
         		
         		var auditTab = $('#audit-tab');
         		auditTab.parent().show();
         		auditTab.tab('show');
         		
         		auditTab.on('hidden.bs.tab', function(e){
         			$(e.target).parent().hide();
         			$('#auditFormAlert').hide();
         		});
     		} else {
     			alert('处理操作触发失败.');
     		}
     		
     	}
     });
	
	var taskRuningList = $('#task_runing_list');
	var taskFinishedList = $('#task_finished_list');
 
	 
	$('#task_runing_list,#task_finished_list').on('click', '.ac_op', function(){
    	if($(this).hasClass('ac_detial')) {
    		var tkey = $(this).attr('tkey');
    		var ttype = $(this).attr('ttype');
    		dynamicForm.taskDetail(tkey,ttype);
    		
    		var detailTab = $('#detail-tab');
    		detailTab.parent().show();
    		detailTab.tab('show');
    		
    		detailTab.on('hidden.bs.tab', function(e){
    			$(e.target).parent().hide();
    		});
    	}
    });
	
	
	$('#create-tab').on('hidden.bs.tab', function(e){
		$('#createFormAlert').hide();
	});
	
	dynamicForm = {
			// 未处理 任务列表
			taskList : function(key, pId){

				taskPanel.attr('key', key);
				taskPanel.attr('pId', pId);
				
				var jqGrid = $('<table id="task_list"></table>');
				var jqGridPaging = $('<div id="task_list_paging"></div>');
				
				taskPanel.html('');
				taskPanel.append(jqGrid);
				taskPanel.append(jqGridPaging);
				
		      	//var jqGrid = $("#task_list");
				var data = {'key' : key};
		        jqGrid.jqGrid({
		            caption: "",
		            url: ParentUrl + '/dynamicProcess/list',
		            mtype: "post",
		            postData : data,
		            styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式
		            datatype: "json",
		            colNames: ["编号","申请人", "申请时间", "审批时间", "状态",  "流程实例定义id","流程实例id","当前节点", "当前处理人", "操作"],
		            colModel: [
		                { name: 'id',width:60 ,align: 'center'},
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
		        
		        jqGrid.jqGrid('setGridWidth', "950");
			},
			
			taskRuning : function(key, pId){
				
				taskRuningList.attr('key', key);
				taskRuningList.attr('pId', pId);
				
				var jqGrid = $('<table id="task_runing_list"></table>');
				var jqGridPaging = $('<div id="task_runing_list_paging"></div>');
				
				taskRuningList.html('');
				taskRuningList.append(jqGrid);
				taskRuningList.append(jqGridPaging);
				
				var data = {'key' : key};
		        jqGrid.jqGrid({
		            caption: "",
		            url: ParentUrl + '/dynamicProcess/runing',
		            mtype: "post",
		            postData : data,
		            styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式
		            datatype: "json",
		            colNames: ["编号","申请人", "申请时间", "审批时间", "状态", "流程实例定义id","流程实例id","当前节点", "当前处理人", "操作"],
		            colModel: [
		                { name: 'id',width:60 ,align: 'center'},
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
									html = '<a class="ac_op ac_detial" tkey = "'+ tkey +'" tname = "'+ tname +'" ttype="tun" href="javascript:void(0);">详情</a>'
									
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
		        
		        jqGrid.jqGrid('setGridWidth', "950");
			},
			
			taskFinished : function(key, pId){
				
				taskFinishedList.attr('key', key);
				taskFinishedList.attr('pId', pId);
				
				var jqGrid = $('<table id="task_finished_list"></table>');
				var jqGridPaging = $('<div id="task_finished_list_paging"></div>');
				
				taskFinishedList.html('');
				taskFinishedList.append(jqGrid);
				taskFinishedList.append(jqGridPaging);
				
				var data = {'key' : key};
				
		        jqGrid.jqGrid({
		            caption: "",
		            url: ParentUrl + '/dynamicProcess/finished',
		            mtype: "post",
		            postData : data,
		            styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式
		            datatype: "json",
		            colNames: ["编号","申请人", "申请时间", "结束时间", "结束原因", "操作"],
		            colModel: [
		                { name: 'id',width:60 ,align: 'center'},
		                { name: 'userId', width:80 ,align: 'center'},
		                { name: 'applyTime', width:100 ,align: 'center'},
		                { name: 'endTime',width:100 ,align: 'center'},
		                { name: 'status' ,width:60 ,align: 'center' }
		                ,{ name: 'assignee' ,align: 'center' , width: 60,
								formatter: function(cellValue, options, rowObject) {
									
									var html = '';
									var tkey = rowObject.id;
									var tname = rowObject.taskName;
									html = '<a class="ac_op ac_detial" tkey = "'+ tkey +'" tname = "'+ tname +'" ttype="finish" href="javascript:void(0);">详情</a>'
									
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
		            pager: "#task_finished_list_paging",//分页控件的id
		            subGrid: false//是否启用子表格
		        });
		        
		        jqGrid.jqGrid('setGridWidth', "950");
		        
			},
			
			taskCreate : function(key, pId){
				var formPanel = $('#create_form');
				formPanel.html('');
				//formPanel.height(0);
				
				$.ajax({
					url : ParentUrl + '/dynamicProcess/form',
					type : 'post',
					data : {processDefinitionId : pId},
					success : function(rs){
						if(rs){
							formPanel.html('');
							if(rs.msg){
								var createFormAlert = $('#createFormAlert');
								$('strong', createFormAlert).html('Fail!');
								$('font', createFormAlert).html(rs.msg);
								createFormAlert.attr('class', 'alert my_alert alert-danger');
								createFormAlert.fadeIn();
							} else {
								if(rs.formkey){
									formTool.createOuterForm(formPanel,rs, pId);
								} else {
									formTool.createForm(formPanel,rs, pId);
								}
							}
						}
					}
				});
			},
			
			taskAudit : function(taskId){
				var formPanel = $('#audit_form');
				formPanel.html('');
				
				$.ajax({
					url : ParentUrl + '/dynamicProcess/detail',
					type : 'post',
					data : {opType : 'audit', taskId : taskId},
					success : function(rs){
						if(rs){
							formPanel.html('');
							
							if(rs.formkey){
								formTool.createOuterForm(formPanel,rs, taskId);
								
							} else {								
								formTool.createForm(formPanel,rs, taskId);
							}
						}
					}
				});
			},
			
			taskDetail : function(taskId,ttype){
				var formPanel = $('#detail_form');
				formPanel.html('');
				
				$.ajax({
					url : ParentUrl + '/dynamicProcess/detail',
					type : 'post',
					data : {opType : 'detail', taskId : taskId,ttype:ttype},
					success : function(rs){
						if(rs){
							formPanel.html('');
							
							if(rs.formkey){
								
								formTool.createOuterForm(formPanel,rs, taskId);
								
							}else{
								formTool.createForm(formPanel,rs);
							}
						}
					}
				});
			},
 
 
			// 刷新所有表单信息
			refreshAll : function(){
				// 刷新 待办任务
				var key = taskPanel.attr('key');
				var pId = taskPanel.attr('pId');
				dynamicForm.taskList(key, pId);
				
				// 刷新 进行中 任务列表
				key = taskRuningList.attr('key');
				pId = taskRuningList.attr('pId');
				dynamicForm.taskRuning(key, pId);

				// 刷新 已处理 任务列表
				key = taskFinishedList.attr('key');
				pId = taskFinishedList.attr('pId');
				dynamicForm.taskFinished(key, pId);
  			},
			
			//请假流程
			leaveCreate : function(key, pId){

				var formPanel = $('#create_form');
				formPanel.html('');
				//formPanel.height(0);
				
				$.ajax({
					url : ParentUrl + '/dynamicProcess/form',
					type : 'post',
					data : {processDefinitionId : pId},
					success : function(rs){
						if(rs){
							formPanel.html('');
							if(rs.msg){
								var createFormAlert = $('#createFormAlert');
								$('strong', createFormAlert).html('Fail!');
								$('font', createFormAlert).html(rs.msg);
								createFormAlert.attr('class', 'alert my_alert alert-danger');
								createFormAlert.fadeIn();
							} else {
								formTool.createForm(formPanel,rs, pId);
							}
						}
					}
				});
				
				
			}
		};
	
	$('button.close', '.my_alert').click(function(){
		$(this).parents('.my_alert').slideUp('fast');
	});
	
	$("#reset_statistics").click(function(){
		$("#dateFrom").val("");
		$("#dateTo").val("");
	}
	)
	$("#reset_log").click(function(){
		$("#userName").val("");
		$("#sysoprtext").val("");
		$("#addTime").val("");
	}
	)
 
	
});
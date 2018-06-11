/**
 * 工作流程引擎相关定义
 */

var my_activiti = {
		init : {
			workflowModel : function(id){
				//模型工作区
        		$('#mymodal_model_list').modal("show");
        		var jqGrid = $("#WorkflowModelList");
                jqGrid.jqGrid({
                    //caption: "<font style='font-size: 14px;'>模型工作区</font>",
                    url: ParentUrl + '/ModelController/list',
                    mtype: "POST",
                    styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式
                    datatype: "json",
                    colNames: ["ID", "Key", "Name", "Version", "创建时间", "最后更新时间","元数据","操作"],
                    colModel: [
                        { name: 'id',width:60, align: 'center'},
                        { name: 'key', width:60, align: 'center'},
                        { name: 'name',width:60 , align: 'center'},
                        { name: 'version',width:60, align: 'center'},
                        { name: 'createTime' , align: 'center',
        						formatter:function(cellValue, options, rowObject){
        							return formatDateTime(cellValue);
        						}
        					},
                        { name: 'lastUpdateTime'  , align: 'center',
        						formatter:function(cellValue, options, rowObject){
        							return formatDateTime(cellValue);
        						}
        					},
                        { name: 'metaInfo', align: 'center' },
                        { name: 'id' , align: 'center',
        						formatter: function(cellValue, options, rowObject) {
        							var html = '<a class="ac_op model_edit" mId="' + cellValue + '" href="javascript:void(0);">编辑</a>';
        							html += '&nbsp;&nbsp;<a class="ac_op model_deploy" modelId="'+cellValue+'" href="#">部署</a>';
        							html += '&nbsp;&nbsp;<a class="ac_op model_delete" modelId="'+cellValue+'" href="#">删除</a>';
        							return html;
        						}
        			        }
                    ],
                    viewrecords: true,
                    multiselect: true,
                    rownumbers: true,
                    autowidth: true,
                    height: "300",
                    rowNum: 10,
                    rownumbers: true, // 显示行号
                    rownumWidth: 35, // the width of the row numbers columns
                    pager: "#WorkflowModelPager",//分页控件的id
                    subGrid: false//是否启用子表格
                });
                
                 function formatDateTime(value) {
                    	try {
                    		// 通过js日期格式化
                    		var date = new Date(value);
                    		var y = date.getFullYear();// 获取年
                    		var m = date.getMonth() + 1;// 获取月
                    		var h = date.getHours(),  //小时   
                    		    mi = date.getMinutes(),  //分   
                    		    s = date.getSeconds();  //秒  
                    		if(m<10){
                    			m = "0"+m;
                    		}
                    		var d = date.getDate();
                    		if(d<10){
                    			d = "0"+d;
                    		}
                    		if(h<10){
                    			h = "0"+h;
                    		}
                    		if(mi<10){
                    			mi = "0"+mi;
                    		}
                    		if(s<10){
                    			s = "0"+s;
                    		}
                    		return y + "-" + m + "-" + d +" "+h+":"+mi+":"+s;
                    	} catch (e) {
                    		alert(e);
                    	}
                };
                return;
			},
			
			deployManange : function(id){
				//流程定义及部署管理
        		$('#mymodal_process_super_list').modal("show");
        		var jqGrid = $("#ProcessModelList");
                jqGrid.jqGrid({
                    //caption: "<font style='font-size: 14px;'>流程定义及部署管理</font>",
                    url: ParentUrl + '/ProcessController/process-list',
                    mtype: "post",
                    styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式
                    datatype: "json",
                    colNames: ["ProcessDefinitionId", "DeploymentId", "名称", "KEY", "版本号", "XML","图片","部署时间","是否挂起","操作"],
                    colModel: [
                        { name: 'id',width:145 ,align: 'center'},
                        { name: 'deploymentId', width:105 ,align: 'center'},
                        { name: 'name', width:60 ,align: 'center'},
                        { name: 'key',width:60 ,align: 'center'},
                        { name: 'version',width:54 ,align: 'center'},
                        { name: 'resourceName' ,width:122 ,align: 'center' ,
				            	formatter: function(cellValue, options, rowObject){
				            		var html = '<a class="ac_op" target="_blank" href="/oneportal/ActivitiController/resource/read?processDefinitionId='+rowObject.id+'&resourceType=xml">'+cellValue+'</a>';
				            		return html;
				            }
        					},
                        { name: 'diagramResourceName' ,width:125 ,align: 'center',
				            	formatter: function(cellValue, options, rowObject){
				            		var html = '<a class="ac_op" target="_blank" href="/oneportal/ActivitiController/resource/read?processDefinitionId='+rowObject.id+'&resourceType=image">'+cellValue+'</a>';
				            		return html;
				            }
        					},
			            { name: 'deploymentTime' ,width: 195, align: 'center'},
			            { name: 'suspended' ,width:102 ,align: 'center' ,
				            	formatter: function(cellValue, options, rowObject){
				            		var html = cellValue + ' | ';
				            		if('true' == cellValue){
				            			html += '<a class="ac_op process_active" processDefinitionId = "'+rowObject.id+'" href="#">激活</a>';
				            		} else {
				            			html += '<a class="ac_op process_suspend" processDefinitionId = "'+rowObject.id+'" href="#">挂起</a>';
				            		}
				            		
				            		return html;
				            }
			            },
                        { name: 'id' ,align: 'center' , width: 150,
        						formatter: function(cellValue, options, rowObject) {
        							var html = '';
        							//html += '';
        							//html += '';
        							
        							var aDel = '<a class="ac_op process_delete" deploymentId="'+rowObject.deploymentId+'" href="#">删除</a>&nbsp;&nbsp;';
        							var aEx = '<a class="ac_op process_convert" processDefinitionId = "'+rowObject.id+'" href="#">转换为Model</a>';
        							html = aDel + aEx ;
        							
        							return html;
        						}
        			        }
                    ],
                    viewrecords: true,
                    multiselect: true,
                    rownumbers: true,
                    autowidth: true,
                    height: "300",
                    rowNum: 10,
                    rownumbers: true, // 显示行号
                    rownumWidth: 35, // the width of the row numbers columns
                    pager: "#ProcessModelPager",//分页控件的id
                    subGrid: false//是否启用子表格
                });
                
                jqGrid.jqGrid('setGridWidth', "1100");




                $.ajax({
                    url : ParentUrl + '/ProcessController/selectActivitiDeployFileAll',
                    type : 'post',
                    success : function(rs){
                    	debugger;
                        var deployHtml = "<div>部署新流程</div>";
                    	for( var act in rs){
                            deployHtml = deployHtml + "<button wkid='"+rs[act].workflowId+"'>"+rs[act].name+"</button>&nbsp;";
						}
                        $("#deployAutoFile").html(deployHtml)
                    },
                    error : function(){
                    }
                });


                return;
			},
			// 业务流程
			businessActiviti : function(tempModel, key){
				var pId = $('a', tempModel).attr('date-href');
        		var name = $('a', tempModel).html();
        		$('.modal-title','#dynamic_process_super_list').html(name);
        		
        		$('#dynamic_process_super_list').modal('show');
        		$('#dynamic_process_super_list').one('shown.bs.modal', function(){
        			$('#task-tab').tab('show');
        		});
        	
         		
         		
        		// 未处理的任务列表
        		dynamicForm.taskList(key, pId);
        		// 处理中的任务列表
        		dynamicForm.taskRuning(key, pId);
        		// 已完成的任务列表
        		dynamicForm.taskFinished(key, pId);
        		// 构建申请表单
        		dynamicForm.taskCreate(key, pId);
         
        	
        		
        		return false;
			}
		}
}
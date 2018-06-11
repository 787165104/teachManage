var CourseGroupList = function(){
	
};
CourseGroupList.prototype = {
		initMethod:function(){
			 $('.i-checks').iCheck({
                 checkboxClass: 'icheckbox_square-green',
                 radioClass: 'iradio_square-green',
             });
			 var basePath = $("#basePath").val();
			 $("#table_list_1").jqGrid({
				 url:basePath +'courseGroupManage/selectCourseGroupPaging',
				 datatype:"json",
				 height: 300,
	                autowidth: true,
	                shrinkToFit: true,
	                multiselect : true,
	               // rownumbers: true, // 显示行号
	                rowNum: 10,
	                rowList: [10, 20, 30],
	                colNames: ['ID','课程组编号','课程组名称','所属课程','课程组组长','课程组项目','课程组项目成果','添加人','添加时间','操作'],
	                colModel: [
                        {name: 'id', index: 'id',hidden:true},
	                    {name: 'groupId', index: 'groupId',width: 100,align:"center"},
	                    {name: 'groupName', index: 'groupName', width: 90,align:"center"},
	                    {name: 'courseName', index: 'courseName', width: 90,align:"center"},
	                    {name: 'groupHeaderId', index: 'groupHeaderId', width: 90,align:"center"},
	                    {name: 'groupProject', index: 'groupProject', width: 90,align:"center"},
	                    {name: 'projectResult', index: 'projectResult', width: 90,align:"center"},
	                    {name: 'addUser', index: 'addUser', width: 90,align:"center"},
	                    {name: 'addTime', index: 'addTime', width: 90,align:"center",formatter: function(cellValue, options, rowObject){
                   		  var date =  new Date(cellValue);
                		     var y = 1900+date.getYear();
                		     var m = "0"+(date.getMonth()+1);
                		     var d = "0"+date.getDate();
                		     return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
	                    }},
	                    {name: '' ,index:'',align: 'center' , width: 90, cellattr: addCellAttr,
	    					formatter: function(cellValue, options, rowObject) {
	    						var html = '';
	    							var tkey = rowObject.groupId;
	    							var href = "javascript:removeMethod('"+tkey+"','remove')";
	    							html += '<div class="dropdown">';
 								html += '<a data-toggle="dropdown" class="dropdown-toggle" href="#"><span class="text-muted text-xs block">操作 <b class="caret"></b></span></a>';
 								html += '<ul class="dropdown-menu animated fadeInRight m-t-xs" style="margin-left: 55px;min-width: 70px;">';
 								html += '<li><a href="courseGroupDetailsView?groupId='+tkey+'" >查看</a></li>';
 								html += '<li><a href="courseGroupUpdateView?groupId='+tkey+'" >修改</a></li>';
									html += '<li><a href="'+href+'">删除</a></li>';
									html += '</ul>';
									html += '</div>';
	    							return html;
	    					}
	    		        }
	                    
	                ],
	                pager: "#pager_list_1",
	                viewrecords: true,
	                caption: "课程组信息列表",
	                hidegrid: false
			 		});
			 function addCellAttr(rowId, val, rawObject, cm, rdata) {  
	                return "style='overflow: visible;'";  
	            }  
	          
	            $(window).bind('resize', function () {
	                var width = $('.jqGrid_wrapper').width();
	                $('#table_list_1').setGridWidth(width);
	            });
	            
	            $.post(
	   				 basePath+'/teachTask/selectGrade',
	   				 {},
	   				 function(data) {
	   					if(data.status==true){
	   						var info = data.grade;
	   						$.each(info,function(name,value){
	   							$("#grade").append("<option value = '"+value.grade+"'>"+value.grade+"</option>")
	   						});
	   						$('#grade').selectpicker('refresh');
	         				     $('#grade').selectpicker('render');
	   					}
	   				},
	   				"json"
	   		 );
	            $.post(
	   				 basePath+'/course/selectAcademyList',
	   				 {},
	   				 function(data) {
	   					if(data.status==true){
	   						var info = data.msg;
	   						$.each(info,function(name,value){
	   							$("#openCourseCollege").append("<option value = '"+value.academyId+"'>"+value.academy+"</option>")
	   						});
	   						$('#openCourseCollege').selectpicker('refresh');
	         				     $('#openCourseCollege').selectpicker('render');
	   					}
	   				},
	   				"json"
	   		 );
		},
		bindEvent:function(){
			 var basePath = $("#basePath").val();
			 $("#exportButton").click(function(){
		    	  
		    	  var arr = "";
		    	  var ids = jQuery("#table_list_1").jqGrid('getGridParam', 'selarrrow');
		    	  if(ids.length > 0){
		    		  for(var i = 0; i < ids.length; i++){
			    		  if(i == 0){
			    			  arr += ids[i];
			    		  }else{
			    			  arr += "," + ids[i]; 
			    		  }
			    	  }
			    	  location.href = 'exportBatchMessage?ids=' + arr;
		    	  }else{
		    		  $("#exportForm").submit();
		    	  }
		      })
		      
			$("#reset").click(function(){
				var inputObjs = $("#query input[type='text']");
				for(var i = 0;i<inputObjs.length;i++){
					var inputObj = inputObjs[i];
					inputObj.value="";
				}
				var selectObjs = $("#query select");
				for(var i=0;i<selectObjs.length;i++){
					var selectObj = selectObjs[i];
					selectObj.value = "";
				}
			});
			
			$("#queryBtn").click(function(){
				$("#table_list_1").jqGrid('setGridParam',{
					datatype:'json',
					postData:{
						'groupId':$("#groupId").val(),
						'groupHeaderId':$("#groupHeaderId").val(),
					},
					pager:'pager_list_1'
				}).trigger("reloadGrid");
			});
			$("#addButton").click(function(){
				window.location.href="addCourseGroupView";
			});
			$("#editButton").click(function(){
		    	  var ids = jQuery("#table_list_1").jqGrid('getGridParam', 'selarrrow');
		    	  if (!ids.length) {
		    		  swal("请选择记录", "", "warning");
						return false;
					} else if (ids.length > 1) {
						 swal("请选择单条记录", "", "warning");
						return false;
					} else if (ids.length == 1) {
						//获取选中行id
						 var rowid=$("#table_list_1").jqGrid("getGridParam","selrow");
						 //根据选中行id获取选中行数据
						 var rowData = $("#table_list_1").jqGrid('getRowData',rowid);
					}
		    	  window.location.href='courseGroupUpdateView?groupId=' + rowData.groupId;
		      })
			 $("#removeButton").click(function(){
		    	  var arr = jQuery("#table_list_1").jqGrid('getGridParam', 'selarrrow');
		    	  if(arr.length == 0){
		    		  swal("请选择记录", "", "warning");
		    	  }else{
		    		  removeMethod(arr, "removeList");
		    	  }
		      });
		}
};

/**
 * 删除读者信息
 */
var removeMethod = function(groupId, flag){
	var params = "";
	if(flag != "remove"){
		for (var i = 0; i < groupId.length; i++) {
			var idVal = groupId[i];
				params += idVal + ",";
	    }
	}else{
		params = groupId;
	}
	swal({
        title: "确定删除吗?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    }, function (confirm) {
    	if(confirm){
    		var basePath = $('#basePath').val();
    		console.log(confirm);
    		 $.post(
    				 basePath + 'courseGroupManage/deleteCourseGroup',
    					{
    					 "groupId" : params
    					},
    					function(data){
    						if(data.status == true){
    						var info =  data.msg;
    						jQuery("#table_list_1").jqGrid('setGridParam', {
    					         page : 1
    					        }).trigger('reloadGrid');
    						swal("删除成功!", "您选中的信息已删除", "success");
    						}else if(data.status == false){
    							CommonUtils.alertMsg("2","",info,"");
    						}
    					},
    					"json"
    			);
    	}
    });
}
$(document).ready(function(){
	var courseGroupList= new CourseGroupList();
	courseGroupList.initMethod();//初始化
	courseGroupList.bindEvent();//按钮事件
});
var CourseList = function(){
	
};
CourseList.prototype = {
		initMethod:function(){
			 $('.i-checks').iCheck({
                 checkboxClass: 'icheckbox_square-green',
                 radioClass: 'iradio_square-green',
             });
			 var basePath = $("#basePath").val();
			 $("#table_list_1").jqGrid({
				 url:basePath +'course/selectCoursePaging',
				 datatype:"json",
				 height: 300,
	                autowidth: true,
	                shrinkToFit: true,
	                multiselect : true,
	               // rownumbers: true, // 显示行号
	                rowNum: 10,
	                rowList: [10, 20, 30],
	                colNames: ['ID','课程编号','课程名称','适用年级','学分','总学时','讲科学时','实验学时','课程实践学时','考核方式','课程性质','课程类型','专业名称','专业方向','开课学院','操作'],
	                colModel: [
                        {name: 'id', index: 'id',hidden:true},
	                    {name: 'courseNum', index: 'courseNum',width: 100,align:"center"},
	                    {name: 'courseName', index: 'courseName', width: 90,align:"center"},
	                    {name: 'grade', index: 'grade', width: 90,align:"center"},
	                    {name: 'credit', index: 'credit', width: 90,align:"center"},
	                    {name: 'totalClassHours', index: 'totalClassHours', width: 90,align:"center"},
	                    {name: 'lectureHours', index: 'lectureHours', width: 90,align:"center"},
	                    {name: 'experimentalHours', index: 'experimentalHours', width: 90,align:"center"},
	                    {name: 'coursePracticeHours', index: 'coursePracticeHours', width: 90,align:"center"},
	                    {name: 'examinationMode', index: 'examinationMode', width: 90,align:"center",
                    		formatter:function(cellValue,options,rowObject){
                    			if (cellValue=="0") {
                    				return "考试";
								} else{
									return "考查";
								}
                    		}},
                		{name: 'courseNature', index: 'courseNature', width: 90,align:"center",
                    		formatter:function(cellValue,options,rowObject){
                    			if (cellValue=="0") {
                    				return "必修";
								} else{
									return "选修";
								}
                    		}},
                		{name: 'courseType', index: 'courseType', width: 90,align:"center"},
                		{name: 'professionalName', index: 'professionalName', width: 90,align:"center"},
                		{name: 'professionalField', index: 'professionalField', width: 90,align:"center"},
                		{name: 'openCourseCollege', index: 'openCourseCollege', width: 90,align:"center"},
	                    {name: '' ,index:'',align: 'center' , width: 90, cellattr: addCellAttr,
	    					formatter: function(cellValue, options, rowObject) {
	    						var html = '';
	    							var tkey = rowObject.courseNum;
	    							var href = "javascript:removeMethod('"+tkey+"','remove')";
	    							html += '<div class="dropdown">';
 								html += '<a data-toggle="dropdown" class="dropdown-toggle" href="#"><span class="text-muted text-xs block">操作 <b class="caret"></b></span></a>';
 								html += '<ul class="dropdown-menu animated fadeInRight m-t-xs" style="margin-left: 55px;min-width: 70px;">';
 								html += '<li><a href="courseDetailsView?courseNum='+tkey+'" >查看</a></li>';
 								html += '<li><a href="courseUpdateView?courseNum='+tkey+'" >修改</a></li>';
									html += '<li><a href="'+href+'">删除</a></li>';
									html += '</ul>';
									html += '</div>';
	    							return html;
	    					}
	    		        }
	                    
	                ],
	                pager: "#pager_list_1",
	                viewrecords: true,
	                caption: "课程信息列表",
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
						'courseNum':$("#courseNum").val(),
						'courseName':$("#courseName").val(),
						'credit':$("#credit").val(),
						'grade':$("#grade").val(),
						'openCourseCollege':$("#openCourseCollege").val(),
						'courseNature':$("#courseNature").val(),
					},
					pager:'pager_list_1'
				}).trigger("reloadGrid");
			});
			$("#addButton").click(function(){
				window.location.href="addCourseView";
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
		    	  window.location.href='courseUpdateView?courseNum=' + rowData.courseNum;
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
var removeMethod = function(courseNum, flag){
	var params = "";
	if(flag != "remove"){
		for (var i = 0; i < courseNum.length; i++) {
			var idVal = courseNum[i];
				params += idVal + ",";
	    }
	}else{
		params = courseNum;
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
    				 basePath + 'course/deleteCourseInfo',
    					{
    					 "courseNum" : params
    					},
    					function(data){
    						if(data.status == true){
    						var info =  data.msg;
    						console.log(info);
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
	var courseList= new CourseList();
	courseList.initMethod();//初始化
	courseList.bindEvent();//按钮事件
});
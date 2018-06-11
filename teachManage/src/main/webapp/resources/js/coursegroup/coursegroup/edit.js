var CourseGroupInsert = function() {
};
CourseGroupInsert.prototype = {
	bindEvent : function() {
		$("#saveBtn").click(function(){
			$("#courseGroupForm").submit();
		});
		
		var $form = $("#courseGroupForm");
		$("#courseGroupForm").validate({
			ignore: "",
			onclick : false,
			rules : {
				courseNum:{
    				required:true
				},
				groupName:{
    				required:true
				},
				groupHeaderId:{
    				required:true
				},
				groupProject:{
    				required:true
				},
				projectResult:{
    				required:true
				}
				
			},
			messages : {
				courseNum:{
    				required:"请选择课程"
				},
				groupName:{
    				required:"请输课程组名称"
				},
				groupHeaderId:{
    				required:"请选择课程组组长"
				},
				groupProject:{
    				required:"请输入科研项目"
				},
				projectResult:{
    				required:"请输入科研成果"
				}
			},
			submitHandler : function() {
				var courseName = $("#courseNum").find("option:selected").text();
				var params = {courseName:courseName};
				var arr = $("#groupMemberId").val();
				var groupId = "";
				for(j=0;j<arr.length;j++) {
					groupId= groupId+arr[j]+",";
				}
				var datas = $("#courseGroupForm").serializeArray();
				$(datas).each(function() {
					params[this.name] = $.trim(this.value);
				});
				params["groupMemberId"] = groupId;
				console.log(params);
				$.post(
					'editCourseGroup', 
					params,
					function(data) {
						var status = data.status;
						if(status=="true"){
							 swal({
							        title: "操作提示！",
							        text: "课程组修改成功！",
							        type: "success",
							        showCancelButton: false,
							        confirmButtonColor: "#00CC99",
							        confirmButtonText: "返回列表",
							        closeOnConfirm: false
							    }, function (confirm) {
							    	if(confirm){
							    		 window.location.href = "courseGroupView";
							    	}
							    });
						
							
						}
					},
					'json'
				);
				
					
			}
		});
		
	},	
	init : function() {
		var basePath = $("#basePath").val();
		 $('.i-checks').iCheck({
             checkboxClass: 'icheckbox_square-green',
             radioClass: 'iradio_square-green',
         });
		 $.post(
				 basePath+'/teachTask/selectTeacher',
				 {},
				 function(data) {
					
					if(data.status==true){
						var info = data.teacher;
						$.each(info,function(name,value){
							$("#groupHeaderId").append("<option value = '"+value.jobNumber+"'>"+value.userName+"</option>");
							$("#groupMemberId").append("<option value = '"+value.jobNumber+"'>"+value.userName+"</option>")
						});
						 $('#groupHeaderId').selectpicker('refresh');
      				     $('#groupHeaderId').selectpicker('render');
      				     $('#groupMemberId').selectpicker('refresh');
    				     $('#groupMemberId').selectpicker('render');
   				    
					}
				},
				"json"
		 );
		 $.post(
					basePath+'/courseGroupManage/selectCourseList',
					{},
					function(data){
						var status = data.status;
						var courseList = data.courseList;
						if(status){
							$("#courseNum").append("<option value = ''>请选择</option>")
							$.each(courseList,function(name,value){
								$("#courseNum").append("<option value = '"+value.courseNum+"'>"+value.courseName+"</option>");
							});
						};
						$('#courseNum').selectpicker('refresh');
  				     $('#courseNum').selectpicker('render');
  				     intStart();
					},
					"json"
			
			);
		 function intStart(){
			 var basePath = $("#basePath").val();
			 $.post(
					 basePath+'/courseGroupManage/getCourseGroupDetail',
					 {"groupId":$("#ids").val(),"editFlag":$("#editFlag").val()},
					 function(data){
						 console.log(data);
						 if(data.status==true){
							 var courseGroupInfo = data.courseGroupInfo;
							 var groupMembers = data.groupMembers;
							 $("#courseNum option").each(function(index,item){
									var a = $(item).val();
									if(a==courseGroupInfo.courseNum){
										$('#courseNum').selectpicker('val',(courseGroupInfo.courseNum));
									}
								});
							 $("#groupName").val(courseGroupInfo.groupName);
							 $("#groupHeaderId option").each(function(index,item){
									var a = $(item).val();
									if(a==courseGroupInfo.groupHeaderId){
										$('#groupHeaderId').selectpicker('val',(courseGroupInfo.groupHeaderId));
									}
								});
							 var str = "";
							 for (var i = 0; i < groupMembers.length; i++) {
								 str = str+groupMembers[i].memberId+",";
							}
							 str = str.substring(0, str.length-1)
							 var arr = str.split(',');
							 //console.log(arr);
							 //console.log(str);
							 $("#groupMemberId").selectpicker('val',arr);
							 $("#groupProject").val(courseGroupInfo.groupProject);
							 $("#projectResult").val(courseGroupInfo.projectResult);
						 }
					 },
					 "json"
			 );
		 }

		
	}

};

var courseGroupInsert = new CourseGroupInsert();
$(document).ready(function() {
	courseGroupInsert.init();
	courseGroupInsert.bindEvent();
});

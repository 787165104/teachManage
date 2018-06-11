var TeachTaskInsert = function() {
};
TeachTaskInsert.prototype = {
	bindEvent : function() {
		$("#addSaveBtn").click(function(){
			$("#addTeachTaskForm").submit();
		});
		
		$("#openCourseCollege").change(function(){
			var basePath = $("#basePath").val();
			var val=$("#openCourseCollege").val();
			$("#courseNum").val("");
			$("#totalClassHours").val("");
			$("#lectureHours").val("");
			$("#experimentalHours").val("");
			$("#courseNature").val("");
			$.post(
					 basePath+'/teachTask/findCourseByAcademyId',
					 {"academyId":val},
					 function(data) {
						if(data.status==true){
							var info = data.course;
							$("#courseName").find("option").remove();
							$("#courseName").append("<option value = ''>请选择</option>")
							$.each(info,function(name,value){
								$("#courseName").append("<option value = '"+value.courseName+"'>"+value.courseName+"</option>")
							    
							});
							$('#courseName').selectpicker('refresh');
	      				     $('#courseName').selectpicker('render');
						}
						if(data.status==false){
						 
						 $('#courseName option').remove()
						 $('#courseName option').empty();
						 $('#courseName').selectpicker('refresh');
      				     $('#courseName').selectpicker('render');
						}
					},
					"json"
			 );
		});
		$("#courseName").change(function(){
			var basePath = $("#basePath").val();
			var val=$("#courseName").val();
			$.post(
					 basePath+'/teachTask/findCourse',
					 {"courseName":val},
					 function(data) {
						if(data.status==true){
							var info = data.courseInfo;
							$.each(info,function(name,value){
								$("#courseNum").val(value.courseNum);
								$("#totalClassHours").val(value.totalClassHours);
								$("#lectureHours").val(value.lectureHours);
								$("#experimentalHours").val(value.experimentalHours);
								$("#courseNature").val(value.courseNature==0?"必修":"选修");
								
							});
						}
						if(data.status==false){
							$("#courseNum").val("");
							$("#totalClassHours").val("");
							$("#lectureHours").val("");
							$("#experimentalHours").val("");
							$("#courseNature").val("");
						}
					},
					"json"
			 );
			
			
		});
		
		var $form = $("#addTeachTaskForm");
		$("#addTeachTaskForm").validate({
			ignore: "",
			onclick : false,
			rules : {
				courseName:{
					required:true
				},
				campusArea:{
    				required:true
				},
				openCourseCollege:{
    				required:true
				},
				grade:{
					
					required:true
				},
				jobNumber:{
					
					required:true
				},
				teachClass:{
					required:true
				}
			},
			messages : {
				courseName:{
					required:"请选择课程名称"
				},
				campusArea:{
    				required:"请选择校区"
				},
				openCourseCollege:{
    				required:"请选择学院"
				},
                grade:{
					
					required:"请选择年级"
				},
				jobNumber:{
					
					required:"请选择授课教师"
				},
				teachClass:{
					required:"请输入开课班级"
				}
			},
			submitHandler : function() {
				//var opurl=$('#bookTypeId').val()=="" ? 'addBookType' : 'editBookType';
				var params = {};
				var datas = $("#addTeachTaskForm").serializeArray();
				$(datas).each(function() {
					params[this.name] = $.trim(this.value);
				});
				console.log(datas);
				$.post(
					'insertTeachTask', 
					params,
					function(data) {
						var status = data.status;
						if(status==true){
							//添加
							console.debug('开始添加');
							 swal({
							        title: "操作提示！",
							        text: "教学任务添加成功！",
							        type: "success",
							        showCancelButton: true,
							        confirmButtonColor: "#00CC99",
							        confirmButtonText: "返回列表",
							        cancelButtonText: "继续添加",
							        closeOnConfirm: false
							    }, function (confirm) {
							    	if(confirm){
							    		 window.location.href = "teachTask";
							    	}else{
							    		 window.location.href = "addTeachTask";
							    	}
							    });
						}
					},
					'json'
				)
					
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
				 basePath+'/teachTask/selectCampusArea',
				 {},
				 function(data) {
					 console.log(data);
					 console.log(data.status);
					if(data.status==true){
						var info = data.msg;
						$.each(info,function(name,value){
							$("#campusArea").append("<option value = '"+value.campusarea+"'>"+value.campusarea+"</option>")
						});
						$('#campusArea').selectpicker('refresh');
      				     $('#campusArea').selectpicker('render');
					}
				},
				"json"
		 );
		 $.post(
				 basePath+'/teachTask/selectGrade',
				 {},
				 function(data) {
					 console.log(data);
					 console.log(data.status);
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
				 basePath+'/teachTask/selectTeacher',
				 {},
				 function(data) {
					 console.log(data);
					 console.log(data.status);
					if(data.status==true){
						var info = data.teacher;
						$.each(info,function(name,value){
							$("#jobNum").append("<option value = '"+value.jobNumber+"'>"+value.userName+"</option>")
						});
						$('#jobNum').selectpicker('refresh');
      				     $('#jobNum').selectpicker('render');
					}
				},
				"json"
		 );
		 $.post(
				 basePath+'/teachTask/selectAllAcademy',
				 {},
				 function(data) {
					 console.log(data);
					 console.log(data.status);
					if(data.status==true){
						var info = data.academy;
						$.each(info,function(name,value){
							$("#openCourseCollege").append("<option value = '"+value.academyId+"'>"+value.academy+"</option>")
						});
						$('#openCourseCollege').selectpicker('refresh');
      				     $('#openCourseCollege').selectpicker('render');
					}
				},
				"json"
		 ); 
	}

};

var teachTaskInsert = new TeachTaskInsert();
$(document).ready(function() {
	teachTaskInsert.init();
	teachTaskInsert.bindEvent();
});

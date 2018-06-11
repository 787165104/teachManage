var CourseInsert = function() {
};
CourseInsert.prototype = {
	bindEvent : function() {
		$("#saveBtn").click(function(){
			$("#courseForm").submit();
		});
		
		var $form = $("#courseForm");
		$("#courseForm").validate({
			ignore: "",
			onclick : false,
			rules : {
				courseName:{
    				required:true
				},
				credit:{
    				required:true
				},
				totalClassHours:{
    				required:true
				},
				lectureHours:{
    				required:true
				},
				experimentalHours:{
    				required:true
				},
				coursePracticeHours:{
    				required:true
				},
				professionalName:{
    				required:true
				},
				professionalField:{
    				required:true
				},
				courseType:{
    				required:true
				}
				
			},
			messages : {
				courseName:{
    				required:"请输入课程名"
				},
				credit:{
    				required:"请输入课学分"
				},
				totalClassHours:{
    				required:"请输入总学时"
				},
				lectureHours:{
    				required:"请输入讲课学时"
				},
				experimentalHours:{
    				required:"请输入实验学时"
				},
				coursePracticeHours:{
    				required:"请输入时间学时"
				},
				professionalName:{
    				required:"请输入专业名称"
				},
				professionalField:{
    				required:"请输入专业方向"
				},
				courseType:{
    				required:"请输入课程类型"
				}
			},
			submitHandler : function() {
				var params = {};
				var datas = $("#courseForm").serializeArray();
				$(datas).each(function() {
					params[this.name] = $.trim(this.value);
				});
				console.log(datas);
				$.post(
					'addCourse', 
					params,
					function(data) {
						var status = data.status;
						if(status==true){
							$("#file_id").val(data.file_id);
							$("#courseNum").val(data.file_id);
							var upfile = $("#upfile").val();
							if(upfile!=null){
								$("#upfile").fileinput('upload');
								var a = $("#courseNum").val();
								console.log(a);
							}
							
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
				 basePath+'/course/selectAcademyList',
				 {},
				 function(data) {
					 console.log(data);
					 console.log(data.status);
					if(data.status==true){
						var info = data.msg;
						//console.log(info);
						$.each(info,function(name,value){
							$("#openCourseCollege").append("<option value = '"+value.academyId+"'>"+value.academy+"</option>")
						});
						$('#openCourseCollege').selectpicker('refresh');
      				     $('#openCourseCollege').selectpicker('render');
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

		
	}

};

var courseInsert = new CourseInsert();
$(document).ready(function() {
	courseInsert.init();
	courseInsert.bindEvent();
});

var CourseEdit = function() {
};
CourseEdit.prototype = {
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
				var val = $("#upfile").val();
				var a = $("#fileDiv").children().length;
				alert(a);
				if(a==0 && val==""){
					alert("请选择附件")
					return false;
				}
				var params = {};
				var datas = $("#courseForm").serializeArray();
				$(datas).each(function() {
					params[this.name] = $.trim(this.value);
				});
				$.post(
					'editCourse', 
					params,
					function(data) {
						var status = data.status;
						var msg = data.msg;
						if(status==true){
							$("#file_id").val(data.file_id);
							$("#courseNum").val(data.file_id);
							var upfile = $("#upfile").val();
							
							if(upfile!=""){
								$("#upfile").fileinput('upload');
								var a = $("#courseNum").val();
							}else {
								swal({
							        title: "操作提示！",
							        text: msg,
							        type: "success",
							        showCancelButton: false,
							        confirmButtonColor: "#f7a54a",
							      
							        confirmButtonText: "返回列表",
							        closeOnConfirm: false
							    }, function (confirm) {
							    	if(confirm){
							    		 window.location.href='courseMessage';
							    	}
							    });
							}
							
						}
					},
					'json'
				);
				
					
			}
		});
		$("#fileDiv").bind("click",function(event){
			event.preventDefault();
		});
		$("#fileDiv").click(function(){
			var ef = $("#editFlag").val();
			swal({
				title:"附件删除",
				text:"确定删除已上传附件?",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "确认",
				cancelButtonText: "取消",
				closeOnConfirm: true,
				closeOnCancel: false
				
			},function(confirm){
				if(confirm){
					$.post(
						'removeFile',
						{
							'courseNum':$("#editFlag").val()
						},function(data){
							var info = data.status;
							$("#courseNum").val($("#editFlag").val());
							window.location.href='courseUpdateView?courseNum=' + $("#editFlag").val();
						},
						"json"
							
					);
					
		    		/*window.location.href='removeFile?courseNum=' + $("#editFlag").val();*/
		    	}else{
		    		window.location.href='courseUpdateView?courseNum=' + $("#editFlag").val();
		    	}
			}
					
			);
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
		 var editFlag = $("#editFlag").val();
		 console.log(editFlag);
		 if(editFlag!=null){
			 $.post(
						basePath+'/course/getCourseDetail',
						{
							courseNum:editFlag
						},
						function(data) {
							if(data.status==true){
								var info = data.courseInfo;
								var file = data.fileCenter;
								console.log(info);
								$("#courseNum").val(info.courseNum);
								$("#courseName").val(info.courseName);
								$("#credit").val(info.credit);
								$("#totalClassHours").val(info.totalClassHours);
								$("#lectureHours").val(info.lectureHours);
								$("#experimentalHours").val(info.experimentalHours);
								$("#coursePracticeHours").val(info.coursePracticeHours);
								$("#examinationMode option").each(function(index,item){
									var a = $(item).val();
									if(a==info.examinationMode){
										$('#examinationMode').selectpicker('val',(info.examinationMode));
									}
								});
								$("#professionalName").val(info.professionalName);
								$("#professionalField").val(info.professionalField);
								$("#courseNature option").each(function(index,item){
									var a = $(item).val();
									if(a==info.courseNature){
										$('#courseNature').selectpicker('val',(info.courseNature));
									}
								});
								$("#courseType").val(info.courseType);
								$("#grade option").each(function(index,item){
									var a = $(item).val();
									if(a==info.grade){
										$('#grade').selectpicker('val',(info.grade));
									}
								});
								$("#openCourseCollege option").each(function(index,item){
									var a = $(item).val();
									if(a==info.openCourseCollege){
										$('#openCourseCollege').selectpicker('val',(info.openCourseCollege));
									}
								});
								
								if(file!=""){
									$("#hidDiv").show();
									$.each(file,function(name,value){
										$("#fileDiv").append("<span>"+value.fileName+ "</span>");
									});
									$("#showDiv").hide();
									console.log(editFlag);
									$("#fileDiv").append("<button>移除</button>");
									
								}							
							}
						},
						"json"
				);
		 };
		 
		 
		 

		
	}

};

var courseEdit = new CourseEdit();
$(document).ready(function() {
	courseEdit.init();
	courseEdit.bindEvent();
});

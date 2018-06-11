var CourseDetail = function() {
	
};
CourseDetail.prototype = {
		init:function(){
			var basePath = $("#basePath").val();
			var courseNum = $("#ids").val();
			
			function timeTransfer(date){
				  var date =  new Date(date);
				     var y = 1900+date.getYear();
				     var m = "0"+(date.getMonth()+1);
				     var d = "0"+date.getDate();
				     return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
			}
			$.post(
					basePath+'/course/getCourseDetail',
					{
						courseNum:courseNum
					},
					function(data) {
						if (data.status==true) {
							var info = data.courseInfo;
							var file = data.fileCenter;
							
							$.each(file, function(name, value) {
       							$("#upfile").append("<a href='fileDownLoad?newFileName="+value.newFileName+"&fileName="+value.fileName+"'>"+value.fileName+"</a></br>"); 
       						});
							
							console.log(info);
							$("#courseNum").html(info.courseNum);
							$("#courseName").html(info.courseName);
							$("#credit").html(info.credit);
							$("#totalClassHours").html(info.totalClassHours);
							$("#lectureHours").html(info.lectureHours);
							$("#experimentalHours").html(info.experimentalHours);
							$("#coursePracticeHours").html(info.coursePracticeHours);
							if (info.examinationMode=="0") {
								$("#examinationMode").html("考试");
							} else {
								$("#examinationMode").html("考查");
							}
							$("#professionalName").html(info.professionalName);
							$("#professionalField").html(info.professionalField);
							if (info.courseNature=="0") {
								$("#courseNature").html("必修");
							}else{
								$("#courseNature").html("选修");
							}
							$("#courseType").html(info.courseType);
							$("#grade").html(info.grade);
							$("#openCourseCollege").html(info.academy);
							$("#addUser").html(info.addUser);
							
							$("#addTime").html(timeTransfer(info.addTime));
							if (info.modifyUser!=null) {
								$("#modifyUser").html(info.modifyUser);
							} else {
								$("#modifyUser").html("无");
							}
							if (info.modifyTime!=null) {
								$("#modifyTime").html(timeTransfer(info.modifyTime));
							} else {
								$("#modifyTime").html("无");
							}
							
							
							
							
	
						}
					},
					"json"
			);
		}

};

var courseDetail = new CourseDetail();
$(document).ready(function() {
	courseDetail.init();
});
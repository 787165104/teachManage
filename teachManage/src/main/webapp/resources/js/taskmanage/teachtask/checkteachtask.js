var teachTaskDetail = function() {
};
teachTaskDetail.prototype = {
	bindEvent : function() {
		
	},
	init : function() {
		var basePath = $("#basePath").val();
		var id=$("#id").val();
		 $('.i-checks').iCheck({
             checkboxClass: 'icheckbox_square-green',
             radioClass: 'iradio_square-green',
         });
		 
		 $.post(
				 basePath+'/teachTask/getTeachTaskDetail',
				 {"id":id},
				 function(data) {
					if(data.status==true){
						var info = data.teachTask;
						$.each(info,function(name,value){
							$("#courseNum").val(value.courseNum);
							$("#openCourseCollege").val(value.openCourseCollege);
							$("#courseName").val(value.courseName);
							$("#courseNature").val(value.courseNature==0?"选修":"必修");
							$("#totalClassHours").val(value.totalClassHours);
							$("#lectureHours").val(value.lectureHours);
							$("#experimentalHours").val(value.experimentalHours);
                            $("#startWeak").val(value.startWeak);
                            $("#endWeak").val(value.endWeak);
							$("#campusArea").val(value.campusArea);
							$("#teachClass").val(value.teachClass);
							$("#jobNumber").val(value.jobNumber);
							$("#remark").val(value.remark);
							$("#grade").val(value.grade);
							$("#remark").val(value.remark);
							$("#openCourseCollege").val(value.openCourseCollege);
							$("#positionalTitle").val(value.positionalTitle);
						});
					}
				},
				"json"
		 );
	}

};

var teachTaskDetail = new teachTaskDetail();
$(document).ready(function() {
	teachTaskDetail.init();
	teachTaskDetail.bindEvent();
});

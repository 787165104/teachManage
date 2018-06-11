var CourseGroupDetail = function() {
	
};
CourseGroupDetail.prototype = {
		
		init:function(){
			var basePath = $("#basePath").val();
			var memberId = $("#ids").val();		
			$.post(
					basePath+'/courseGroupManage/getMemberCourseGroup',
					{
						"memberId":memberId
					},
					function(data) {
						if (data.status==true) {
							var info = data.courseGroup;
							console.log(info);
							$("#groupId").html(info.groupId);
							$("#groupName").html(info.groupName);
							$("#courseNum").html(info.courseNum);
							$("#groupHeaderId").html(info.groupHeaderId);
							$("#groupProject").html(info.groupProject);
							$("#projectResult").html(info.projectResult);

						}
					},
					"json"
			);
		}

};

var courseGroupDetail = new CourseGroupDetail();
$(document).ready(function() {
	courseGroupDetail.init();
});
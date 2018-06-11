var CourseGroupDetail = function() {
	
};
CourseGroupDetail.prototype = {
		init:function(){
			var basePath = $("#basePath").val();
			var groupId = $("#ids").val();
			
			function timeTransfer(date){
				  var date =  new Date(date);
				     var y = 1900+date.getYear();
				     var m = "0"+(date.getMonth()+1);
				     var d = "0"+date.getDate();
				     return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
			}
			

			$.post(
					basePath+'/courseGroupManage/getCourseGroupDetail',
					{
						"groupId":groupId
					},
					function(data) {
						if (data.status==true) {
							var info = data.courseGroupInfo;
							var groupMembers = data.groupMembers;
							console.log(groupMembers);
							$.each(groupMembers, function(name, value) {
       							$("#groupMemberId").append("<a href='"+basePath+'userInfo/userDetail?jobNumber='+value.memberId+"'>"+value.groupHeaderId+"</a>&nbsp"); 
       						});
							
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
var CourseGroupDetail = function() {
	
};
CourseGroupDetail.prototype = {
		bindEvent : function() {
			$("#saveBtn").click(function(){
				$("#editForm").submit();
			});
			
			var $form = $("#editForm");
			$("#editForm").validate({
				ignore: "",
				onclick : false,
				rules : {
					projectResult:{
	    				required:true
					}
					
				},
				messages : {
					projectResult:{
	    				required:"请填写"
					}
				},
				submitHandler : function() {
					var projectResult = $("#projectResult").val();
					var groupId = $("#groupId").text();
					var params = {"projectResult":projectResult,"groupId":groupId};
					$.post(
						'addHeaderProjectResult', 
						params,
						function(data) {
							var status = data.status;
							if(status==true){
								 swal({
								        title: "操作提示！",
								        text: "科研成果修改成功！",
								        type: "success",
								        showCancelButton: false,
								        confirmButtonColor: "#00CC99",
								        confirmButtonText: "确定",
								        closeOnConfirm: false
								    }, function (confirm) {
								    	if(confirm){
								    		 window.location.href = "myCourseGroup";
								    	}
								    });
							
								
							}
						},
						'json'
					);
					
						
				}
			});
			
		},	
		init:function(){
			var basePath = $("#basePath").val();
			var groupId = $("#idss").val();
			

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
       							$("#groupMemberId").append("<a href='"+basePath+'courseGroupManage/memberDetail?memberId='+value.memberId+"'>"+value.groupHeaderId+"</a>&nbsp"); 
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
	courseGroupDetail.bindEvent();
});
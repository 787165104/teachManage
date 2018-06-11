var UserInfoDetail = function() {

};
UserInfoDetail.prototype = {
		init:function(){
			var basePath = $("#basePath").val();
			var jobNumber = $("#userId").val();
			console.log("jobNumber is "+jobNumber);
			//时间格式转换
			function timestapToTime(timestamp) {
				var date = new Date(timestamp)
				Y = date.getFullYear() + '-';
		        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		        D = date.getDate();
		        return Y+M+D;
			}
			$.post(
					basePath+'/userInfo/findUserByJobNumber',
					{
						jobNumber:jobNumber
					},
					function(data) {
						if (data.status==true) {
							var info = data.userInfo;
							console.log(info);
                                $("#jobNumber").html(info.jobNumber);
                                $("#userName").html(info.userName);
                                $("#teachCourse").html(info.courseName);
                                $("#lastTeachCourse").append(info.courseName+' ');
                                if(info.sex == 0){
                                    $("#sex").html("女");
                                }else{
                                    $("#sex").html("男");
                                }
                                var imgPath = "http://119.27.167.110/";
                                var age = (new Date).getFullYear()-(new Date(info.birthday)).getFullYear();
                                $("#age").html(age);
                                $("#academy").html(info.academy);
                                $("#degree").html(info.degree);
                                $("#graduteSchool").html(info.graduteSchool);
                                $("#courseGroup").html(info.courseGroup);
                                $("#headImage").prop("src",imgPath+info.headImage);
                                $("#beginWorkDate").html(timestapToTime(info.beginWorkDate));
                                $("#researchArea").html(info.researchArea);
                                $("#teachCourse").html(info.teachCourse);
                                $("#lastTeachCourse").html(info.lastTeachCourse);
                                $("#intoSchoolDate").html(timestapToTime(info.intoSchoolDate));
                                $("#userEmail").html(info.userEmail);
                                $("#userPhone").html(info.userPhone);
                                $("#introduction").html(info.introduction);

							/*console.log(info.jobNumber);


							*/
							
						}
					},
					"json"
			);
		}

};

var userInfoDetail = new UserInfoDetail();
$(document).ready(function() {
	userInfoDetail.init();//初始化方法
});
var MaterialInsert = function() {
};
MaterialInsert.prototype = {
	bindEvent : function() {
		var basePath = $("#basePath").val();
		$("#saveBtn").click(function(){
			$("#materialForm").submit();
		});
		var $form = $("#materialForm");
		$("#materialForm").validate({
			ignore: "",
			onclick : false,
			rules : {
				materialName:{
    				required:true
				},
				author:{
    				required:true
				},
				press:{
    				required:true
				},
				orderNum:{
    				required:true
				},
				publishTime:{
    				required:true
				}
				
			},
			messages : {
				materialName:{
    				required:"请输入教材名称"
				},
				author:{
    				required:"请输入教材作者"
				},
				press:{
    				required:"请输入教材出版社"
				},
				orderNum:{
    				required:"请输入教材版次"
				},
				publishTime:{
    				required:"请输入教材出版时间"
				}
			},
			submitHandler : function() {
				//var opurl=$('#bookTypeId').val()=="" ? 'addBookType' : 'editBookType';
				var params = {
						"userPhone":$("#userPhone").val()
				};
				var datas = $("#materialForm").serializeArray();
				$(datas).each(function() {
					params[this.name] = $.trim(this.value);
				});
				console.log(datas);
				$.post(
					'addTeachMaterial', 
					params,
					function(data) {
						var status = data.status;
						if(status==true){
							//添加
							console.debug('开始添加');
							 swal({
							        title: "操作提示！",
							        text: "教材添加成功！",
							        type: "success",
							        showCancelButton: true,
							        confirmButtonColor: "#00CC99",
							        confirmButtonText: "返回列表",
							        cancelButtonText: "继续添加",
							        closeOnConfirm: false
							    }, function (confirm) {
							    	if(confirm){
							    		 window.location.href = "materialMessage";
							    	}else{
							    		 window.location.href = "addMaterialView";
							    	}
							    });
						}
					},
					'json'
				)
					
			}
		});
		$("#openCourseCollege,#useGrade").change(function(){
			var occ = $("#openCourseCollege").val();
			var ug =$("#useGrade").val();
			$('#courseNum option').remove();
			$('#courseNum option').empty();
			$.post(
					basePath+'/materialManage/selectCourseListByAcademyAndUseGrade',
					{
						'academyId':occ,
						'useGrade':ug
						
					},
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
					},
					"json"
			
			);
		});	
		$("#jobNum").change(function(){
			var jn = $("#jobNum").val();			
			$.post(
					basePath+'/userInfo/findUserByJobNumber',
					{
						'jobNumber':jn
						
					},
					function(data){
						var status = data.status;
						var userinfo = data.userInfo;
						console.log(userinfo.userPhone);
						if(status){
							$("#userPhone").val(userinfo.userPhone);
							
						};						
					},
					"json"
			
			);
		});		
		
	},
	
	init : function() {
		 $('.i-checks').iCheck({
             checkboxClass: 'icheckbox_square-green',
             radioClass: 'iradio_square-green',
         });
		 var basePath = $("#basePath").val();
		 $.post(
				 basePath+'/teachTask/selectCampusArea',
				 {},
				 function(data) {
					if(data.status==true){
						var info = data.msg;
						$.each(info,function(name,value){
							$("#campus").append("<option value = '"+value.campusarea+"'>"+value.campusarea+"</option>")
						});
						$('#campus').selectpicker('refresh');
      				     $('#campus').selectpicker('render');
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
							$("#useGrade").append("<option value = '"+value.grade+"'>"+value.grade+"</option>")
						});
						$('#useGrade').selectpicker('refresh');
      				     $('#useGrade').selectpicker('render');
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
	}

};

var materialInsert = new MaterialInsert();
$(document).ready(function() {
	materialInsert.init();
	materialInsert.bindEvent();
});

var MaterialEdit = function() {
};
MaterialEdit.prototype = {
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
				var params = {
						"userPhone":$("#userPhone").val()
				};
				var datas = $("#materialForm").serializeArray();
				$(datas).each(function() {
					params[this.name] = $.trim(this.value);
				});
				console.log(datas);
				$.post(
					'editTeachMaterial', 
					params,
					function(data) {
						var status = data.status;
						if(status==true){
							//添加
							 swal({
							        title: "操作提示！",
							        text: "教材修改成功！",
							        type: "success",
							        showCancelButton: false,
							        confirmButtonColor: "#00CC99",
							        confirmButtonText: "返回列表",
							        closeOnConfirm: false
							    }, function (confirm) {
							    	if(confirm){
							    		 window.location.href = "materialMessage";
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
					if(data.status==true){
						var info = data.teacher;
						$.each(info,function(name,value){
							$("#jobNum").append("<option value = '"+value.jobNumber+"'>"+value.userName+"</option>")
						});
						$('#jobNum').selectpicker('refresh');
      				     $('#jobNum').selectpicker('render');
      				   intBegin();
					}
				},
				"json"
		 );
		 function intBegin(){
			 var materialIdFlag = $("#materialId").val();
			 if(materialIdFlag!=null){
				 $.post(
						 basePath+'/materialManage/MaterialDetail',
						 {
							 "materialId":materialIdFlag
						 },
						 function(data) {
							if(data.status==true){
								var info = data.teachMaterial;
								console.log(info);
								$("#materialName").val(info.materialName);
								$("#author").val(info.author);
								$("#press").val(info.press);
								$("#orderNum").val(info.orderNum); 
								$("#publishTime").val(info.publishTime);
								$("#useClasses").val(info.useClasses);
								$("#isOptional option").each(function(index,item){
									var a = $(item).val();
									if(a==info.isOptional){
										$('#isOptional').selectpicker('val',(info.isOptional));
									}
								});
								$("#campus option").each(function(index,item){
									var a = $(item).val();
									if(a==info.campus){
										$('#campus').selectpicker('val',(info.campus));
									}
								});
								$("#jobNum option").each(function(index,item){
									var a = $(item).val();
									
									if(a==info.jobNum){
										$('#jobNum').selectpicker('val',(info.jobNum));
									}
								});
								$("#userPhone").val(info.userPhone);
								$("#isProBook option").each(function(index,item){
									var a = $(item).val();
									if(a==info.isProBook){
										$('#isProBook').selectpicker('val',(info.isProBook));
									}
								});
								$("#isEduBook option").each(function(index,item){
									var a = $(item).val();
									if(a==info.isEduBook){
										$('#isEduBook').selectpicker('val',(info.isEduBook));
									}
								});
								$("#isCouBook option").each(function(index,item){
									var a = $(item).val();
									if(a==info.isCouBook){
										$('#isCouBook').selectpicker('val',(info.isCouBook));
									}
								});
								$("#isEditBook option").each(function(index,item){
									var a = $(item).val();
									if(a==info.isEditBook){
										$('#isEditBook').selectpicker('val',(info.isEditBook));
									}
								});
								$("#remark").val(info.remark);
							}
						},
						"json"
				 
				 );
				 
			 }
		 }

	}

};

var materialEdit = new MaterialEdit();
$(document).ready(function() {
	materialEdit.init();
	materialEdit.bindEvent();
});

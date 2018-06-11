var MaterialDetail = function() {
	
};
MaterialDetail.prototype = {
		init:function(){
			var basePath = $("#basePath").val();
			var materialId = $("#ids").val();
			
			function timeTransfer(date){
				  var date =  new Date(date);
				     var y = 1900+date.getYear();
				     var m = "0"+(date.getMonth()+1);
				     var d = "0"+date.getDate();
				     return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
			}
			$.post(
					basePath+'/materialManage/getMaterialDetail',
					{
						'materialId':materialId
					},
					function(data) {
						if (data.status==true) {
							var info = data.teachMaterial;								
							console.log(info);
							$("#materialId").html(info.materialId);
							$("#materialName").html(info.materialName);
							$("#author").html(info.author);
							$("#press").html(info.press);
							$("#orderNum").html(info.orderNum);
							$("#courseNum").html(info.courseNum);
							$("#publishTime").html(info.publishTime);
							
							$("#useClasses").html(info.useClasses);
							$("#isOptional").html(info.isOptional);
							$("#campus").html(info.campus);
							$("#useGrade").html(info.useGrade);
							$("#jobNum").html(info.jobNum);
							$("#userPhone").html(info.userPhone);
							$("#isProBook").html(info.isProBook);
							
							$("#isEduBook").html(info.isEduBook);
							$("#isCouBook").html(info.isCouBook);
							$("#isEditBook").html(info.isEditBook);
							$("#remark").html(info.remark);
							$("#addUser").html(info.addUser);
							$("#addTime").html(timeTransfer(info.addTime));
							/*$("#modifyUser").html(info.modifyUser);
							
							$("#modifyTime").html(info.modifyTime);*/
							
							
							
							
							
	
						}
					},
					"json"
			);
		}

};

var materialDetail = new MaterialDetail();
$(document).ready(function() {
	materialDetail.init();
});
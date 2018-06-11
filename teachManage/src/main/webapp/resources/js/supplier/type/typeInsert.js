var TypeInsert = function() {
};
var baseInitFlag = false;
var blockInitFlag = false;
TypeInsert.prototype = {
	bindEvent : function() {
		var $form = $("#editForm");
		$("#editForm").validate({
			ignore: "",
			onclick : false,
			rules : {
				type_name:{
    				required:true
				}
			},
			messages : {
				type_name:{
    				required:"请输入类别名称"
				}
			},
			submitHandler : function() {
				var opurl=$('#type_id').val()=="" ? 'addSupplierType' : 'editSupplierType';
				
				var type_id = $("#type_id").val();
				var params = {};
						var datas = $("#editForm").serializeArray();
						$(datas).each(function() {
							params[this.name] = $.trim(this.value);
						});
						$.post(
							opurl, 
							params,
							function(data) {
								var status = data.status;
								if(status==true){
									if(type_id==""){
										//添加
										 swal({
										        title: "操作提示！",
										        text: "类别添加成功！",
										        type: "success",
										        showCancelButton: true,
										        confirmButtonColor: "#00CC99",
										        confirmButtonText: "返回列表",
										        cancelButtonText: "继续添加",
										        closeOnConfirm: false
										    }, function (confirm) {
										    	if(confirm){
										    		 window.location.href="typeList?isAdmin=" + $("#isAdmin").val();
										    	}else{
										    		 window.location.href="typeInsert?isAdmin=" + $("#isAdmin").val();
										    	}
										    });
									}else{
										//修改
										 swal({
										        title: "操作提示！",
										        text: "类别修改成功！",
										        type: "success",
										        showCancelButton: false,
										        confirmButtonColor: "#f7a54a",
										        confirmButtonText: "返回列表",
										        closeOnConfirm: false
										    }, function (confirm) {
										    	if(confirm){
										    		 window.location.href="typeList?isAdmin=" + $("#isAdmin").val();
										    	}
										    });
									}
								}else if(status==false){
									 swal(data.msg, "", "error");
								}
							});
					}
		});
		
	},
	
	init : function() {
		 $('.i-checks').iCheck({
             checkboxClass: 'icheckbox_square-green',
             radioClass: 'iradio_square-green',
         });
		 var basePath = $('#basePath').val();
		 //查询合同信息
		 var type_id = $("#type_id").val();
		 if(type_id!=""){
			 $(".breadcrumb li a")[3].innerText = "修改";
			 $.post(
					 basePath + '/supplierType/findSupplierTypeById',
						{
						 type_id:type_id
						},
						function(data){
							if(data.status==true){
							var info =  data.msg;
							$("#add_type_name").val(info.type_name);
							}else if(data.status==false){
								 swal("查询供应商类别失败", "", "error");
							}
							
						},
						"json"
				);
		 }
		
		
		
	}
	
	

};

var typeInsert = new TypeInsert();
$(document).ready(function() {
	typeInsert.init();
	typeInsert.bindEvent();
});

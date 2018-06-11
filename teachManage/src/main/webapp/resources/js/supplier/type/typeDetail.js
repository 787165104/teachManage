var TypeDetail = function() {
};
TypeDetail.prototype = {
	
	init : function() {
		 var basePath = $('#basePath').val();
		 var type_id = $("#type_id").val();
		 $.post(
				 basePath + '/supplierType/findSupplierTypeById',
					{
					 type_id:type_id
					},
					function(data){
						if(data.status==true){
						var info = data.msg;
							$("#xq_type_name").html(info.type_name);
						}else if(data.status==false){
							 swal("查询合同信息失败", "", "error");
						}
						
					},
					"json"
			);
	}

};

var typeDetail = new TypeDetail();
$(document).ready(function() {
	typeDetail.init();
});

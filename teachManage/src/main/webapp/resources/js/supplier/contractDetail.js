var ContractDetail = function() {
};
ContractDetail.prototype = {
	
	
	init : function() {
		 var basePath = $('#basePath').val();
		 var contract_id = $("#contract_id").val();
		
			$(document).on('click','.fileLook',function(){
				var file_name = $(this).parent().find("input[name='file_name']").val();
				var file_path =   $(this).parent().find("input[name='file_path']").val();
				var file_type =  $(this).parent().find("input[name='file_type']").val();
				
					$("#fname").html(file_name);
					$("#fpath").attr("src",file_path);
				
				
			});
			
			$(document).on('mouseover','.lookimg',function(){
				  if ($(this).attr("ISUP") != "1")
				        $(this).children(".lookimg_delBtn").eq(0).css("display", "block");;
			});
			
			$(document).on('mouseout','.lookimg',function(){
				 $(this).children(".lookimg_delBtn").eq(0).css("display", "none");;
			});
		 $.post(
				 basePath + '/supplier/findContractById',
					{
					 contract_id:contract_id
					},
					function(data){
						if(data.status==true){
						var info =  data.msg;
						var fileList = info.fileList;
						var fileDiv = "";
						
						for(var i=0;i<fileList.length;i++){
							var type = fileList[i].upload_type;
							var upload_path = fileList[i].upload_path;
							var look_div = "<span data-toggle='modal' data-target='#myModal' class='fileLook'>预览</span>" ;
							if(type == "pdf"){
								upload_path = basePath+"/resources/js/supplier/img/pdf.jpg";
								look_div = "<a  class='media' href='"+fileList[i].upload_path+"' target='_blank'><font color='red'>预览</font></a> "
									
							}
							fileDiv  += "<div class='lookimg' num='"+i+"'>" +
									"<img src='"+upload_path+"'>" +
									"<div class='lookimg_delBtn'>" +
									look_div+
									"<input type='hidden' name='file_id' value='"+fileList[i].file_id+"'/>"+
									"<input type='hidden' name='file_name' value='"+fileList[i].upload_name+"'/>"+
									"<input type='hidden' name='file_path' value='"+fileList[i].upload_path+"'/>"+
									"<input type='hidden' name='file_type' value='"+fileList[i].upload_type+"'/>"+
									"</div>"+
									"</div>";
						}
						if(fileDiv!=""){
							$("#hidDiv").show();
						}
						
						
						$("#div_imglook").append(fileDiv)
						$("#xq_contract_num").html(info.contract_num);
						$("#xq_contract_name").html(info.contract_name);
						$("#xq_supplier_name").html(info.supplier_name);
						$("#xq_remark").html(info.remark);
						$("#xq_contract_company").html(info.contract_company);
						/*if(info.contract_company=="1"){
							$("#xq_contract_company").html("上海公司");
						}else if(info.contract_company=="2"){
							$("#xq_contract_company").html("北京公司");
						}*/
						if(info.contract_type=="1"){
							$("#xq_contract_type").html("采购合同");
						}else if(info.contract_type=="2"){
							$("#xq_contract_type").html("服务合同");
						}
						if(info.payment_type=="1"){
							$("#xq_payment_type").html("无金额")
						}else if(info.payment_type=="2"){
							$("#xq_payment_type").html("收入")
						}else if(info.payment_type=="3"){
							$("#xq_payment_type").html("支出")
						}
						$("#xq_sign_time").html(info.sign_time);
						$("#xq_end_time").html(info.end_time);
						$("#xq_contract_money").html(info.contract_money);
						if(info.currency=="1"){
							$("#xq_currency").html("人民币");
						}else if(info.currency=="2"){
							$("#xq_currency").html("美元");
						}
						
						}else if(data.status==false){
							 swal("查询合同信息失败", "", "error");
						}
						
					},
					"json"
			);
		
		
		
	}
	
	

};
/*jQuery.validator.addMethod("isMobile", function(value,element) {
	var length = value.length;
	var mobile = /^0{0,1}(13[0-9]|15[0-9]|153|156|18[0-9])[0-9]{8}$/;
	var flag = this.optional(element) || mobile.test(value);
	return flag;

	}, "请填写正确联系电话!");*/


var contractDetail = new ContractDetail();
$(document).ready(function() {
	contractDetail.init();
});

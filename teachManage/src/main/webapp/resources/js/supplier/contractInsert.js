var ContractInsert = function() {
};
var delFileList=new Array();
var baseInitFlag = false;
var blockInitFlag = false;
ContractInsert.prototype = {
	bindEvent : function() {
		$(".iCheck-helper").click(function(){
			var pay = $(this).prev().val();
			if(pay=="2"){
				$("#payDiv").show();
			}else if(pay=="3"){
				$("#payDiv").show();
			}else{
				$("#payDiv").hide();
				$("#add_contract_money").val("");
				$("#add_currency").val("");
			}
			
			
		})
		
		$("#saveBtn").click(function(){
			if($("#add_contract_money").val()==""){
				$("#add_contract_money").val(0)
			}
			
			/*var pay = $("input[type='radio']:checked").val();
			alert(pay)
			if(pay=="1"){
				$("#add_contract_money").val(0);
				$("#add_currency").val("");
				$("#add_contract_money").rules("remove"); 
				$("#add_currency").rules("remove");
			}else if(pay=="2"){
				$("#add_contract_money").rules("remove");  
				 $("#add_contract_money").rules("add",{required:true,number:true,maxlength:11,check_money:true,messages:{required:"请输入合同金额",number:"请输入正确金额",maxlength:"合同金额在1-10个数字之间"}});  
				 $("#add_currency").rules("remove");
				 $("#add_currency").rules("add",{required:true,messages:{required:"请选择币种"}}); 
			}else if(pay=="3"){
				$("#add_contract_money").rules("remove");  
				 $("#add_contract_money").rules("add",{required:true,number:true,maxlength:11,check_money:true,messages:{required:"请输入合同金额",number:"请输入正确金额",maxlength:"合同金额在1-10个数字之间"}});  
				 $("#add_currency").rules("remove");
				 $("#add_currency").rules("add",{required:true,messages:{required:"请选择币种"}}); 
			}*/
		
			$("#editForm").submit();
		})
		
		var $form = $("#editForm");
		$("#editForm").validate({
			 
			onclick : false,
			rules : {
				contract_num:{
    				required:true,
    				maxlength:30,
    				check_contract_num:true
    			},
    			contract_name:{
    				required:true,
    				maxlength:30
    			},
    			supplier_id:{
    				required:true
    			},
    			contract_company:{
    				required:true
    			},
    			contract_type:{
    				required:true
    			},
    			sign_time:{
    				required:true
    			},
    			end_time:{
    				required:true
    			},
    			payment_type:{
    				required:true
    			},
    			contract_money:{
    				required:true,
    				number:true,
    				maxlength:11,
    				 min: 0.01,   
    				check_money:true
    			},
    			currency:{
    				required:true
    			},
    			remark:{
    				maxlength:300
    			}
			},
					
			messages : {
				contract_num:{
    				required:"请输入合同编号",
    				maxlength:"合同编号长度在1~30个字符之间"
    				
    			},
    			contract_name:{
    				required:"请输入合同名称",
    				maxlength:"合同名称在1~30个字符之间"
    			},
    			supplier_id:{
    				required:"请选择供应商"
    			},
    			contract_company:{
    				required:"请选择合同签署公司"
    			},
    			contract_type:{
    				required:"请选择合同类型"
    			},
    			sign_time:{
    				required:"请选择签订时期"
    			},
    			end_time:{
    				required:"请选择到期日期"
    			},
    			payment_type:{
    				required:"请选择支出类型"
    			},
    			contract_money:{
    				required:"请输入合同金额",
    				number:"请输入正确金额",
    				maxlength:"合同金额在1-10个数字之间",
    				 min: "输入最小值为0.01"
    			},
    			currency:{
    				required:"请选择币种",
    			},
    			remark:{
    				maxlength:"备注在1-300个字之间"
    			}
			},
			
			
					
			submitHandler : function() {
				var opurl=$('#contract_id').val()==""?'addContractInfo':'editContractInfo';
				
				var contract_id = $("#contract_id").val();
				var params = {};
						var datas = $("#editForm").serializeArray();
						$(datas).each(function() {
							params[this.name] = $.trim(this.value);
						});
						
	 
			 				var jsonStringRef=  JSON.stringify({"contract":params,"delFileList":delFileList});

						$.post(
							opurl, 
							{jsonStr:jsonStringRef},
							function(data) {
								var status = data.status;
								if(status==true){
										$("#file_id").val(data.msg)
										var upfile = $("#upfile").val();
										if(upfile!=""){//当有文件上传时再出发文件上传
											$('#upfile').fileinput('upload')
										}else{
											 var contract_id = $("#contract_id").val();
											 if(contract_id==""){
												 swal({
												        title: "操作提示！",
												        text: "合同信息添加成功!",
												        type: "success",
												        showCancelButton: true,
												        confirmButtonColor: "#00CC99",
												        confirmButtonText: "返回列表",
												        cancelButtonText: "继续添加",
												        closeOnConfirm: false
												    }, function (confirm) {
												    	if(confirm){
												    		 window.location.href='contractList?isAdmin=' + $("#isAdmin").val();
												    	}else{
												    		 window.location.href='contractInsert?isAdmin=' + $("#isAdmin").val();
												    	}
												    });
											 }else{
												//修改
												 swal({
												        title: "操作提示！",
												        text: "合同信息修改成功!",
												        type: "success",
												        showCancelButton: false,
												        confirmButtonColor: "#f7a54a",
												      
												        confirmButtonText: "返回列表",
												        closeOnConfirm: false
												    }, function (confirm) {
												    	if(confirm){
												    		 window.location.href='contractList?isAdmin=' + $("#isAdmin").val();
												    	}
												    });
											 }
										}
										
										
									
									
									
								}else if(status==false){
									 swal(data.msg, "", "error");
								}
							});
					}
		});
		
		
		
	},
	
	init : function() {
		//删除选中图片
		$(document).on('click','.fileDelete',function(){
			 $(".imgfile[num=" + $(this).parent().parent().attr("num") + "]").remove();//移除图片file
			    $(this).parent().parent().remove();//移除图片显示
			    //调用后台删除图片的方法
			    var  file_id= $(this).next().val();
			    delFileList.push(file_id);
//			    $.post(
//						 basePath + '/supplier/deleteContractFile',
//							{
//							file_id:file_id
//							},
//							function(data){
//								if(data.status==true){
//							
//								}
//							},
//							"json"
//					);
			    
			   
		});
		$(document).on('click','.fileLook',function(){
			var file_name = $(this).parent().find("input[name='file_name']").val();
			var file_path =   $(this).parent().find("input[name='file_path']").val();
			var file_type =  $(this).parent().find("input[name='file_type']").val();
			if(file_type=="pdf"){
				
			}else{
				$("#fname").html(file_name);
				$("#fpath").attr("src",file_path);
			}
			
			
		});
		
		$(document).on('mouseover','.lookimg',function(){
			  if ($(this).attr("ISUP") != "1")
			        $(this).children(".lookimg_delBtn").eq(0).css("display", "block");;
		});
		
		$(document).on('mouseout','.lookimg',function(){
			 $(this).children(".lookimg_delBtn").eq(0).css("display", "none");;
		});

		
		
		 var contract_id = $("#contract_id").val();
		 if(contract_id!=""){
			 $("#title").html("合同信息修改")
			  $("#ctitle").html("合同信息修改")
		 }
		$('#add_supplier_id').selectpicker({
	        'selectedText': 'cat'
	    });
		 $('.i-checks').iCheck({
             checkboxClass: 'icheckbox_square-green',
             radioClass: 'iradio_square-green',
         });
		 var basePath = $('#basePath').val();
		 //查询供应商信息
		 $.post(
				 basePath + '/supplier/querySupplierInfo',
					{
					
					},
					function(data){
						if(data.status==true){
						var info =  data.msg;
    						$.each(info, function(name, value) {
    							$("#add_supplier_id").append("<option value='"+value.supplier_id+"'>"+value.supplier_name+"</option>"); 
    						});
						 $('#add_supplier_id').selectpicker('refresh');
					     $('#add_supplier_id').selectpicker('render');
					     findContract();
						}
						
					},
					"json"
			);
		 //查询合同信息
		 function findContract(){
			 var contract_id = $("#contract_id").val();
			 if(contract_id!=""){
				 //清除默认选中的radio
				 $("input[name=payment_type][value=1]").parent().removeClass('checked');
				
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
											"&nbsp;&nbsp;&nbsp;<span class='fileDelete'>删除</span>" +
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
								$("#contract_id").val(info.contract_id);
								$("#add_contract_num").val(info.contract_num);
								$("#repeat_contract_num").val(info.contract_num)
								$("#add_contract_name").val(info.contract_name);
								$("#add_supplier_id").val(info.supplier_id);
								 $('#add_supplier_id').selectpicker('refresh');
								$("#add_contract_company").val(info.contract_company);
								$("#add_contract_type").val(info.contract_type);
								$("#add_sign_time").val(info.sign_time);
								$("#add_end_time").val(info.end_time);
								$("#add_contract_money").val(info.contract_money);
								$("#add_currency").val(info.currency);
								$("#remark").val(info.remark)
								
								
								var pay = info.payment_type;
								if(pay=="2"){
									$("#payDiv").show();
								}else if(pay=="3"){
									$("#payDiv").show();
								}else{
									$("#payDiv").hide();
								}
								
								$("input[name=payment_type][value="+pay+"]").attr("checked",true);
								$("input[name=payment_type][value="+pay+"]").parent().addClass('checked');
								/*var payment = document.getElementsByName("payment_type");
								for(var i=0;i<payment.length;i++){
									var val = payment[i].value;
									if(val==info.payment_type){
										payment[i].checked=true;
									}
								}*/
								}else if(data.status==false){
									 swal("查询合同信息失败", "", "error");
								}
								
							},
							"json"
					);
			 }
		 }
		
		
		
		
	}
	
	

};
//自定义validate验证输入的数字小数点位数不能大于两位
jQuery.validator.addMethod("check_money",function(value, element){
    var returnVal = true;
    inputZ=value;
    var ArrMen= inputZ.split(".");    //截取字符串
    if(ArrMen.length==2){
        if(ArrMen[1].length>2){    //判断小数点后面的字符串长度
            returnVal = false;
            return false;
        }
    }
    return returnVal;
},"小数点后最多为两位");         //验证错误信息



//合同编号重复验证
jQuery.validator.addMethod("check_contract_num", function(value, element) {
	var result = true;
	if($("#add_contract_num").val() == "" || $("#add_contract_num").val() != $("#repeat_contract_num").val()){
		$.ajax({
			type:"POST",
			url:"countContractNum",
			data:{"contract_num":value},
			dataType:"json",
			async:false,
			success:function(data){
				result = data; 
			}
		})
	}
	return result;
}, "合同编号重复");

var contractInsert = new ContractInsert();
$(document).ready(function() {
	contractInsert.init();
	contractInsert.bindEvent();
});

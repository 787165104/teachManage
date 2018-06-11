var ContractDetail = function() {
};
ContractDetail.prototype = {
	
	
	init : function() {
		 var basePath = $('#basePath').val();
		 $.post(
				 basePath + '/supplierMessage/findSupplierMessageById',
					{
					 supplier_id : $("#supplier_id").val()
					},
					function(data){
						if(data.status == true){
						var info = data.msg;
							$("#xq_supplier_num").text(dealNull(info.supplier_num));
							$("#xq_supplier_name").text(dealNull(info.supplier_name));
							$("#xq_supplier_purchas_address").text(dealNull(info.supplier_purchas_address));
							$("#xq_type_name").text(dealNull(info.type_name));
							$("#xq_supplier_contact").text(dealNull(info.supplier_contact));
							$("#xq_supplier_position").text(dealNull(info.supplier_position));
							$("#xq_supplier_phone").text(dealNull(info.supplier_phone));
							$("#xq_supplier_address").text(dealNull(info.supplier_address));
							$("#xq_supplier_mail").text(dealNull(info.supplier_mail));
							$("#xq_supplier_remark").text(dealNull(info.supplier_remark));
							$("#xq_supplier_tel").text(dealNull(info.supplier_tel));
							$("#xq_supplier_fax").text(dealNull(info.supplier_fax));
						}else if(data.status==false){
							CommonUtils.alertMsg("2","","查询合同信息失败！","");
						}
					},
					"json"
			);
	},

	initContract : function(){
		 var basePath = $('#basePath').val();
		 $.post(
				 basePath + '/supplierMessage/findSupplierContractById',
					{
					 supplier_id : $("#supplier_id").val()
					},
					function(data){
						if(data.status == true){
						var infos = data.contr;
						if(infos==""){
							$("#tishi").show();
						}else{
							$("#tishi").hide();
						}
						var isadmin=$("#isAdmin").val();
						for(var i=0;i<infos.length;i++){
							var contractType;
							var currency;
							if(infos[i].contract_type=='1'){
								contractType="采购合同";
							}else if(infos[i].contract_type=='2'){
								contractType="服务合同";
							}else{
								contractType="";
							};
							if(infos[i].currency=='1'){
								currency="人民币";
							}else if(infos[i].currency=='2'){
								currency="美元";
							}else{
								currency="";
							};
							var html='<div class="form-horizontal" style="border-bottom:1px solid #666;">'+
									'<input type="hidden" name="contract_id" value='+infos[i].contract_id+'>'+
                            		'<div class="form-group"><label class="col-sm-2 control-label">合同编号：</label>'+
                            		'<div class="col-sm-2">'+
                            		'<span  class="form-control" style="border: 0px;">'+infos[i].contract_num+'</span>'+
                            		'</div>'+
                            		'<label class="col-sm-2 control-label">合同名称：</label>'+
                            		'<div class="col-sm-2">'+
                            		'<span id="contract_name" class="form-control" style="border: 0px;">'+infos[i].contract_name+'</span>'+
                            		'</div>'+
                            		'<label class="col-sm-2 control-label">合同签订日期：</label>'+
                            		'<div class="col-sm-2">'+
                            		'<span id="sign_time" class="form-control" style="border: 0px;">'+infos[i].sign_time+'</span>'+
                            		'</div>'+
                            		'</div>'+
                            		'<div class="form-group"><label class="col-sm-2 control-label">合同金额：</label>'+
                            		'<div class="col-sm-2">'+
                            		'<span id="contract_money" class="form-control" style="border: 0px;">'+infos[i].contract_money+'</span>'+
                            		'</div>'+
                            		'<label class="col-sm-2 control-label">币种：</label>'+
                            		'<div class="col-sm-2">'+
                            		'<span id="currency" class="form-control" style="border: 0px;">'+currency+'</span>'+
                            		'</div>'+
                            		'<label class="col-sm-2 control-label">合同到期日期：</label>'+
                            		'<div class="col-sm-2">'+
                            		'<span id="end_time" class="form-control" style="border: 0px;">'+infos[i].end_time+'</span>'+
                            		'</div>'+
                            		'</div>'+
                            		'<div class="form-group"><label class="col-sm-2 control-label">合同类型：</label>'+
                            		'<div class="col-sm-2">'+
                            		'<span id="contract_type" class="form-control" style="border: 0px;">'+contractType+'</span>'+
                            		'</div>'+
                            		'<div class="col-sm-2 control-label">'+
                            		'<a href=\'../supplier/contractDetailView?contract_id='+infos[i].contract_id+'&isAdmin='+isadmin+'\' class="btn btn-primary" >查看合同存档</a>'+
                            		'</div>'+
                            		'</div>'+
                            		'</div>';
							$("#tab-3").children().prepend(html);
						}
						}else if(data.status==false){
							CommonUtils.alertMsg("2","","查询合同信息失败！","");
						}
					},
					"json"
			);

	},
	
	
	initQualified : function(){
		 var basePath = $('#basePath').val();
		 $.post(
				 basePath + '/supplierMessage/findSupplierQualifiedById',
					{
					 supplier_id : $("#supplier_id").val()
					},
					function(data){
						if(data.status == true){
						var infos = data.qual;
						if(infos==""){
							$("#qualifiedNote").show();
						}else{
							$("#qualifiedNote").hide();
						}
						var remark=data.qualifiedRemark;
						if(remark==null){
							remark="";
						}
						var imPath=data.path;
						for(var i=0;i<infos.length;i++){
							var qualfiles=infos[i].qualified_file.split(',');
							var updateNames=infos[i].qualified_file1.split(',');
							var html= '<div class="form-horizontal" style="border-bottom:1px solid #666;margin-top:10px;">'+
                            		  '<div class="form-group"><label class="col-sm-2 control-label">资质名称：</label>'+
                            		  '<div class="col-sm-2">'+
                            		  '<input readonly="true" class="form-control" style="border: 0px;background-color:white;" value='+infos[i].qualified_name+'>'+
                            		  '</div>'+
                            		  '<label class="col-sm-2 control-label">资质开始时间：</label>'+
                            		  '<div class="col-sm-2">'+
                            		  '<input readonly="true" class="form-control" style="border: 0px;background-color:white;" value='+infos[i].start_time+'>'+
                            		  '</div>'+
                            		  '<label class="col-sm-2 control-label">资质结束时间：</label>'+
                            		  '<div class="col-sm-2">'+
                            		  '<input readonly="true" class="form-control" style="border: 0px;background-color:white;" value='+infos[i].end_time+'>'+
                            		  '</div>'+
                            		  '</div>';
							
							if(qualfiles.length!=0){
								for(var n=0;n<qualfiles.length-1;n++){
									if(qualfiles[n]!=''&&qualfiles[n]!=null){
										html+='<div class="form-group"><label class="col-sm-2 control-label">资质复印件：</label>'+
                        		  		  '<div class="col-sm-2">'+
                        		          '<input readonly="true" class="form-control" style="border: 0px;background-color:white;" value='+updateNames[n]+'>'+
                        		          '</div>'+
                        		          '<button type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal" onclick="addImg(\''+imPath+qualfiles[n]+'\')">'+
                                          '查看'+
                                          '</button>'+
                        		          '</div>';
									}
									
								}
							}
							html+='</div>';
							$("#tab-2").children().prepend(html);
						}
						var bz='<div class="form-group"><label class="col-sm-2 control-label">备注：</label>'+
              		  		   '<div class="col-sm-4">'+
                      		  '<input readonly="true" class="form-control" style="border: 0px;background-color:white;" value='+remark+'>'+
              		  		   '</div>'+
              		  		   '</div>';

						$("#tab-2").children().find('.form-horizontal').last().prev().append(bz);
						
						}else if(data.status==false){
							CommonUtils.alertMsg("2","","查询资质信息失败！","");
						}
					},
					"json"
			);

	},
	
	initTable : function(){
		 var basePath = $('#basePath').val();
		 $("#table_list_1").jqGrid({
         	url: basePath + '/supplierMessage/selectMessageList',
             datatype: "json",
             postData : {},
             height: 300,
             autowidth: true,
             shrinkToFit: true,
             multiselect : true,
            // rownumbers: true, // 显示行号
             rowNum: 10,
             rowList: [1, 20, 30],
             colNames: ['修改时间','修改内容', '修改人'],
             colModel: [
                 {name: 'supplier_id', index: 'supplier_id', hidden:true},
                 {name: 'supplier_num', index: 'supplier_num', width: 90,align:"center"},
                 {name: 'supplier_name', index: 'supplier_name', width: 90,align:"center"},
                 {name: 'supplier_purchas_address', index: 'supplier_purchas_address', width: 100,align:"center"},
                 {name: 'type_name', index: 'type_name', width: 90,align:"center"},
                 {name: 'supplier_contact', index: 'supplier_contact', width: 90,align:"center"},
                 {name: 'supplier_position', index: 'supplier_position', width: 90,align:"center"},
                 {name: 'supplier_phone', index: 'supplier_phone', width: 90,align:"center"},
                 {name: 'supplier_address', index: 'supplier_address', width: 90,align:"center"},
                 {name: 'supplier_tel', index: 'supplier_tel', width: 90,align:"center"},
                 {name: 'userName', index: 'userName', width: 90,align:"center"},
                 {name: '' ,index:'',align: 'center' , width: 90,
 					formatter: function(cellValue, options, rowObject) {
 						var html = '';
 							var tkey = rowObject.supplier_id;
 							html = "<a href=\"messageDetailView?supplier_id="+tkey+"\"><font color='blue'>查看</font></a>"+
 								   "&nbsp;<a href=\"messageUpdateView?supplier_id="+tkey+"\"><font color='blue'>修改</font></a>"+
 								   "&nbsp;<a href=\"javascript:removeMethod('"+tkey+"',"+null+");\"><font color='blue'>删除</font></a>";
 						return html;
 					}
 		        }
                 
             ],
             pager: "#pager_list_1",
             viewrecords: true,
             hidegrid: false
         });
	}
};
/*jQuery.validator.addMethod("isMobile", function(value,element) {
	var length = value.length;
	var mobile = /^0{0,1}(13[0-9]|15[0-9]|153|156|18[0-9])[0-9]{8}$/;
	var flag = this.optional(element) || mobile.test(value);
	return flag;

	}, "请填写正确联系电话!");*/

function dealNull(a){
	if(a==null){
		a="";
	}
	return a;
}
function addImg(imgpath){
	$("#image").attr('src',imgpath);
}

var contractDetail = new ContractDetail();
$(document).ready(function() {
	contractDetail.init();
	contractDetail.initContract();
	contractDetail.initQualified();
});

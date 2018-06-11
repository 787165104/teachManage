var SupplierContract=function(){
};
SupplierContract.prototype={
		
		init:function(){
			
			var basePath = $('#basePath').val();
			
	            $("#table_list_1").jqGrid({
	            	 url: basePath + '/supplier/selectContractList',
	                datatype: "json",
	                postData : {'isAdmin' : $("#isAdmin").val()},
	                height: 300,
	                autowidth: true,
	                shrinkToFit: true,
	               multiselect: true,
	               // rownumbers: true, // 显示行号
	                rowNum: 10,
	                rowList: [10, 20, 30],
	                colNames: ['合同ID','合同编号', '合同名称', '供应商名称', '合同签署公司','合同到期日期','支出类型', '币种','合同金额','添加人', '添加日期','操作'],
	                colModel: [
	                    {name: 'contract_id', index: 'contract_id', hidden:true},
	                    {name: 'contract_num', index: 'contract_num', width: 90,align:"center"},
	                    {name: 'contract_name', index: 'contract_name', width: 90,align:"center"},
	                    {name: 'supplier_name', index: 'supplier_name', width: 100,align:"center"},
	                    /*{name: 'contract_company', index: 'contract_company', width: 90,align:"center",
	                    	formatter: function(cellValue, options, rowObject) {
	    							var val = rowObject.contract_company;
	    							if(val=="1"){
	    								return "上海公司"
	    							}else if(val=="2"){
	    								return "北京公司"
	    							}else{
	    								return "";
	    							}
	    					}	
	                    },*/
	                    {name: 'contract_company', index: 'contract_company', width: 100,align:"center"},
	                    {name: 'end_time', index: 'end_time', width: 90,align:"center"},
	                    {name: 'payment_type', index: 'payment_type', width: 90,align:"center",
	                    	formatter: function(cellValue, options, rowObject) {
    							var val = rowObject.payment_type;
    							if(val=="1"){
    								return "无金额"
    							}else if(val=="2"){
    								return "收入"
    							}else if(val=="3"){
    								return "支出";
    							}else{
    								return "";
    							}
	                    	}	
	                    },
	                   
	                    {name: 'currency', index: 'currency', width: 90,align:"center",
	                    	formatter: function(cellValue, options, rowObject) {
    							var val = rowObject.currency;
    							if(val=="1"){
    								return "人民币"
    							}else if(val=="2"){
    								return "美元";
    							}else{
    								return "";
    							}
	                    	}	
	                    },
	                    {name: 'contract_money', index: 'contract_money', width: 90,align:"center",
	                    	formatter: function(cellValue, options, rowObject) {
    							var val = rowObject.contract_money;
    							if(val=="0"){
    								return ""
    							}else if(val=="0.0"){
    								return "";
    							}else{
    								return val;
    							}
	                    	}
	                    },
	                    {name: 'add_user_name', index: 'add_user_name', width: 90,align:"center"},
	                    {name: 'add_time', index: 'add_time', width: 90,align:"center"},
	                   
	                    { name: '' ,index:'',align: 'center' , width: 100, cellattr: addCellAttr,
	    					formatter: function(cellValue, options, rowObject) {
	    						var html = "";
	    							var tkey = rowObject.contract_id;
	    							var deptLeader = $("#deptLeader").val();
	    							var LoginId = $("#LoginId").val();
	    							var href = "javascript:deleteContract('"+tkey+"','1')";
	    							html += '<div class="dropdown">';
    								html += '<a data-toggle="dropdown" class="dropdown-toggle" href="#"><span class="text-muted text-xs block">操作 <b class="caret"></b></span></a>';
    								html += '<ul class="dropdown-menu animated fadeInRight m-t-xs" style="margin-left: 5px;min-width: 70px;">';
									html += '<li><a href="contractDetailView?contract_id='+tkey+'&isAdmin='+$("#isAdmin").val()+'" >查看</a></li>';
									if(deptLeader == "true" || $("#isAdmin").val() == "yes"){	
    									html += '<li><a href="contractUpdateView?contract_id='+tkey+'&isAdmin='+$("#isAdmin").val()+'" >修改</a></li>';
										html += '<li><a href="'+href+'">删除</a></li>';
    								}else if(LoginId == rowObject.add_user){
										html += '<li><a href="contractUpdateView?contract_id='+tkey+'&isAdmin='+$("#isAdmin").val()+'" >修改</a></li>';
										html += '<li><a href="'+href+'">删除</a></li>';
    								}
									html += '</ul>';
									html += '</div>';
	    						return html;
	    					}
	    		        }
	    		       
	                    
	                ],
	                pager: "#pager_list_1",
	                viewrecords: true,
	                caption: "合同信息列表",
	                hidegrid: false
	            });

	            function addCellAttr(rowId, val, rawObject, cm, rdata) {  
	                return "style='overflow: visible;'";  
	            }
	            
	            $(window).bind('resize', function () {
	                var width = $('.jqGrid_wrapper').width();
	                $('#table_list_1').setGridWidth(width);
	            });
		},
		add:function(){
		
	        
		},
		
		bindEvent:function(){
		      //导出excel
		      $("#exportButton").click(function(){
		    	  var arr = "";
		    	  var ids = jQuery("#table_list_1").jqGrid('getGridParam', 'selarrrow');
		    	  if(ids.length > 0){
		    		  for(var i = 0; i < ids.length; i++){
						  //根据选中行id获取选中行数据
						  var rowData = $("#table_list_1").jqGrid('getRowData',ids[i]);
			    		  if(i == 0){
			    			  arr += rowData.contract_id;
			    		  }else{
			    			  arr += "," + rowData.contract_id; 
			    		  }
			    	  }
			    	  location.href = 'exportBatchContract?&ids=' + arr;
		    	  }else{
		    		  $("#exportForm").submit();
		    	  }
		    	  
		      })
		      //导入合同
		      $("#contractImport").click(function(){
		    	  location.href='contractImportView?isAdmin=' + $("#isAdmin").val();
		      })
		      
		      //修改 
		      $("#editContract").click(function(){
		    	  var ids=$("#table_list_1").jqGrid("getGridParam","selarrrow");
		    	  var contract_id = "";
		    	  if (!ids.length) {
		    		  swal("请选择记录", "", "warning");
						return false;
					} else if (ids.length > 1) {
						 swal("请选择单条记录", "", "warning");
						return false;
					} else if (ids.length == 1) {
						//获取选中行id
						 var rowid=$("#table_list_1").jqGrid("getGridParam","selrow");
						 //根据选中行id获取选中行数据
						 var rowData = $("#table_list_1").jqGrid('getRowData',rowid);
						contract_id = rowData.contract_id;
					}
		    	  window.location.href='contractUpdateView?contract_id='+contract_id + '&isAdmin=' + $("#isAdmin").val();
		    	 
		      })
		      
		      //批量删除
		      $("#deleteContracts").click(function(){
		    	  var ids=$("#table_list_1").jqGrid("getGridParam","selarrrow");
		    	  if(ids.length>0){
		    		  var contract_ids="";
		    		  for(var i=0;i<ids.length;i++){
		    			  if(contract_ids==""){
		    				  contract_ids = "'" + $("#table_list_1").jqGrid('getRowData',ids[i]).contract_id + "'";
		    			  }else{
		    				  contract_ids=contract_ids + "," + "'" + $("#table_list_1").jqGrid('getRowData',ids[i]).contract_id  + "'";
		    			  }
		    		  }
		    		  deleteContract(contract_ids);
		    	  }else{
		    		  swal("请选择记录", "", "warning");
		    	  }
		    	  
		      })
		      
		      
		        
		        //筛选条件重置
		      $("#reset").click(function(){
		    	  var inputObjs=$("#query input[type='text']"); 
		    	  for(var i=0;i<inputObjs.length;i++){ 
		    	  var inputObj = inputObjs[i]; 
		    	  inputObj.value=""; 
		    	  } 
		    	  var selectObjs = $("#query select"); 
		    	  for(var i=0;i<selectObjs.length;i++){ 
		    	  var selectObj = selectObjs[i]; 
		    	  selectObj.value=""; 
		    	  } 
		    	  
		      })
		      
		    
		      
		      //根据条件查询
		      $("#queryBtn").click(function(){
		    	  $("#table_list_1").jqGrid('setGridParam',{  
		    		    datatype:'json',
		    		    postData:{'supplier_name':$("#supplier_name").val(),
		    		    		  'contract_name':$("#contract_name").val(),
		    		    		  'add_user_name':$("#add_user_name").val(),
		    		    		  'contract_company':$("#contract_company").val(),
		    		    		  'contract_type':$("#contract_type").val(),
		    		    		  'payment_type':$("#payment_type").val(),
		    		    		  'dateFrom':$("#dateFrom").val(),
		    		    		  'dateTo':$("#dateTo").val()
		    		    },
		    		    page:1
		    		   }).trigger("reloadGrid");
		    	  
		      })
		      
		     
			
		}


};





function deleteContract(contract_id,flag){
	if(flag!=undefined){
		contract_id= "'"+contract_id+"'";
	}
	 swal({
	        title: "确定删除吗?",
	        text: "",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonColor: "#DD6B55",
	        confirmButtonText: "确定",
	        cancelButtonText: "取消",
	        closeOnConfirm: false
	    }, function (confirm) {
	    	if(confirm){
	    		deleteContractMethod(contract_id)
	    	}
	    });
}

function deleteContractMethod(contract_id){
	var basePath = $('#basePath').val();
	 $.post(
			 basePath + '/supplier/deleteContractById',
				{
				 contract_id:contract_id
				},
				function(data){
					
					
					if(data.status==true){
					var info =  data.msg;
					jQuery("#table_list_1").jqGrid('setGridParam', {
				         page : 1
				        }).trigger('reloadGrid');
					swal("删除成功!", "您选中的信息已删除", "success");
					}else if(data.status==false){
						swal("删除失败!", "您选中的信息未删除", "success");
					}
					
				},
				"json"
		);
}
$(document).ready(function(){
	var supplierContract = new SupplierContract();
	supplierContract.init();
	supplierContract.add();
	supplierContract.bindEvent();
	
});

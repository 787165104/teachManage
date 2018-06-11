var SupplierMessage=function(){
};
SupplierMessage.prototype={
		
		initMethod:function(){
			 $('.i-checks').iCheck({
                 checkboxClass: 'icheckbox_square-green',
                 radioClass: 'iradio_square-green',
             });
			 
			 var basePath = $('#basePath').val();
	            $("#table_list_1").jqGrid({
	            	url: basePath + '/supplierMessage/selectMessageList',
	                datatype: "json",
	                postData : {'isAdmin' : $("#isAdmin").val()},
	                height: 300,
	                autowidth: true,
	                shrinkToFit: true,
	                multiselect : true,
	               // rownumbers: true, // 显示行号
	                rowNum: 10,
	                rowList: [10, 20, 30],
	                colNames: ['ID','序号', '供应商名称', '地域', '类别','联系人', '职位', '移动电话', '单位地址','固定电话','上传人','操作'],
	                colModel: [
	                    {name: 'supplier_id', index: 'supplier_id', hidden:true},
	                    {name: 'supplier_num', index: 'supplier_num', width: 90,align:"center"},
	                    {name: 'supplier_name', index: 'supplier_name', width: 90,align:"center"},
	                    {name: 'supplier_purchas_address', index: 'supplier_purchas_address', width: 90,align:"center"},
	                    {name: 'type_name', index: 'type_name', width: 90,align:"center"},
	                    {name: 'supplier_contact', index: 'supplier_contact', width: 90,align:"center"},
	                    {name: 'supplier_position', index: 'supplier_position', width: 90,align:"center"},
	                    {name: 'supplier_phone', index: 'supplier_phone', width: 90,align:"center"},
	                    {name: 'supplier_address', index: 'supplier_address', width: 90,align:"center"},
	                    {name: 'supplier_tel', index: 'supplier_tel', width: 90,align:"center"},
	                    {name: 'userName', index: 'userName', width: 90,align:"center"},
	                    {name: '' ,index:'',align: 'center' , width: 90, cellattr: addCellAttr,
	    					formatter: function(cellValue, options, rowObject) {
	    						var html = '';
	    							var tkey = rowObject.supplier_id;
	    							var deptLeader = $("#deptLeader").val();
	    							var LoginId = $("#LoginId").val();
	    							var href = "javascript:removeMethod('"+tkey+"','remove')";
	    							html += '<div class="dropdown">';
    								html += '<a data-toggle="dropdown" class="dropdown-toggle" href="#"><span class="text-muted text-xs block">操作 <b class="caret"></b></span></a>';
    								html += '<ul class="dropdown-menu animated fadeInRight m-t-xs" style="margin-left: 5px;min-width: 70px;">';
									html += '<li><a href="messageDetailView?supplier_id='+tkey+'&isAdmin='+$("#isAdmin").val()+'" >查看</a></li>';
									if(deptLeader == "true" || $("#isAdmin").val() == "yes"){	
    									html += '<li><a href="messageUpdateView?supplier_id='+tkey+'&isAdmin='+$("#isAdmin").val()+'" >修改</a></li>';
										html += '<li><a href="'+href+'">删除</a></li>';
    								}else if(LoginId == rowObject.add_user){
										html += '<li><a href="messageUpdateView?supplier_id='+tkey+'&isAdmin='+$("#isAdmin").val()+'" >修改</a></li>';
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
	                caption: "供应商信息列表",
	                hidegrid: false
	            });
	            
	            function addCellAttr(rowId, val, rawObject, cm, rdata) {  
	                return "style='overflow: visible;'";  
	            }  

	            $(window).bind('resize', function () {
	                var width = $('.jqGrid_wrapper').width();
	                $('#table_list_1').setGridWidth(width);
	            });
	            
	            /**
	             * 获取类别 
	             */
	            $.post(basePath + 'supplierType/selectTypeList', function(data) {
	            	for(var i = 0; i < data.length; i++){
	            		$("[name='type_id']").append(("<option value='" + data[i].type_id + "'>" + data[i].type_name + "</option>"));
	            	}
	            });
	            
	            $("#city").citySelect({
		            nodata: "none",
		            required: false
		        });
	            
		},
		
		bindEvent:function(){
		      //导出excel
		      $("#exportButton").click(function(){
		    	  var arr = "";
		    	  var ids = jQuery("#table_list_1").jqGrid('getGridParam', 'selarrrow');
		    	  if(ids.length > 0){
		    		  for(var i = 0; i < ids.length; i++){
			    		  if(i == 0){
			    			  arr += ids[i];
			    		  }else{
			    			  arr += "," + ids[i]; 
			    		  }
			    	  }
			    	  
			    	  location.href = 'exportBatchMessage?ids=' + arr;
		    	  }else{
		    		  $("#exportForm").submit();
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
		    	  	var address=$("#address option:selected").val(); //获取地点的选中的项的值
					var province=$("#address_province option:selected").val(); //获取地点的选中的项的值
					var provinceandcity = "";
					if(province!=""){
						var provinceandcity = province;
						if(address!=""){
							provinceandcity=provinceandcity+"-"+address;
						}
					}
		    	  $("#table_list_1").jqGrid('setGridParam',{  
		    		    datatype:'json',
		    		    postData:{'supplier_name':$("#supplier_name").val(),
		    		    		  'type_id':$("#type_id").val(),
		    		    		  'supplier_purchas_address':provinceandcity,
		    		    		  'dateFrom':$("#dateFrom").val(),
		    		    		  'dateTo':$("#dateTo").val()
		    		    },
		    		    pager: '#pager_list_1'
		    		   }).trigger("reloadGrid");
		      })
		      
		      /**
		       * 添加
		       */
		      $("#addmodalButton").click(function(){
		    	  window.location.href="messageUpdateView?isAdmin=" + $("#isAdmin").val();
		      })
		      
		      /**
		       * 编辑
		       */
		      $("#editButton").click(function(){
		    	  var ids = jQuery("#table_list_1").jqGrid('getGridParam', 'selarrrow');
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
					}
		    	  window.location.href='messageUpdateView?supplier_id=' + rowData.supplier_id + '&isAdmin=' + $("#isAdmin").val();
		      })
		      
		      /**
		       * 批量删除
		       */
		      $("#removeButton").click(function(){
		    	  var arr = jQuery("#table_list_1").jqGrid('getGridParam', 'selarrrow');
		    	  if(arr.length == 0){
		    		  swal("请选择记录", "", "warning");
		    	  }else{
		    		  removeMethod(arr, "removeList");
		    	  }
		      })
		      
		      $("#importButton").click(function(){
		    	  location.href = 'importMessageHtml?isAdmin=' + $("#isAdmin").val();
		      })
		}
};


/**
 * 删除供应商
 */
var removeMethod = function(supplier_id, flag){
	var params = "";
	if(flag != "remove"){
		for (var i = 0; i < supplier_id.length; i++) {
			var idVal = supplier_id[i];
				params += idVal + ",";
	    }
	}else{
		params = supplier_id;
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
    		var basePath = $('#basePath').val();
    		 $.post(
    				 basePath + 'supplierMessage/deleteSupplierMessage',
    					{
    					 supplier_id : params
    					},
    					function(data){
    						if(data.status==true){
    						var info =  data.msg;
    						jQuery("#table_list_1").jqGrid('setGridParam', {
    					         page : 1
    					        }).trigger('reloadGrid');
    						swal("删除成功!", "您选中的信息已删除", "success");
    						}else if(data.status==false){
    							CommonUtils.alertMsg("2","",info,"");
    						}
    					},
    					"json"
    			);
    	}
    });
}

$(document).ready(function(){
	var supplierMessage = new SupplierMessage();
	supplierMessage.initMethod(); //分页查询供应商
	supplierMessage.bindEvent(); // 按钮事件
});

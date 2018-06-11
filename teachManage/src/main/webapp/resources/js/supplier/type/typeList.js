var SupplierType=function(){
};
SupplierType.prototype={
		
		init:function(){
			
			var basePath = $('#basePath').val();
			
	            $("#table_list_1").jqGrid({
	            	url: basePath + '/supplierType/selectTypePaging',
	                datatype: "json",
	                postData : {'isAdmin' : $("#isAdmin").val()},
	                height: 300,
	                autowidth: true,
	                shrinkToFit: true,
	                multiselect: true,
	               // rownumbers: true, // 显示行号
	                rowNum: 10,
	                rowList: [10, 20, 30],
	                colNames: ['类别ID','类别名称', '添加人', '添加日期', '操作'],
	                colModel: [
	                    {name: 'type_id', index: 'type_id', hidden:true},
	                    {name: 'type_name', index: 'type_name', width: 90,align:"center"},
	                    {name: 'userName', index: 'userName', width: 100,align:"center"},
	                    {name: 'add_time', index: 'add_time', width: 90,align:"center",
	                    	formatter: function(cellValue, options, rowObject) {
	    						return cellValue.replace(".0","");
	    					}
	                    },
	                    { name: '' ,index:'',align: 'center' , width: 90, cellattr: addCellAttr,
	    					formatter: function(cellValue, options, rowObject) {
	    						var html = "";
	    							var tkey = rowObject.type_id;
	    							var href = "javascript:removeMethod('"+tkey+"','remove')";
	    							html += '<div class="dropdown">';
    								html += '<a data-toggle="dropdown" class="dropdown-toggle" href="#"><span class="text-muted text-xs block">操作 <b class="caret"></b></span></a>';
    								html += '<ul class="dropdown-menu animated fadeInRight m-t-xs" style="margin-left: 70px;min-width: 70px;">';
									html += '<li><a href="typeDetailView?type_id='+tkey+'&isAdmin='+$("#isAdmin").val()+'" >查看</a></li>';
									html += '<li><a href="typeUpdateView?type_id='+tkey+'&isAdmin='+$("#isAdmin").val()+'" >修改</a></li>';
									html += '<li><a href="'+href+'">删除</a></li>';
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
		bindEvent:function(){
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
		    	  window.location.href="typeUpdateView?type_id=" + rowData.type_id + '&isAdmin=' + $("#isAdmin").val();
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
		    		    postData:{
		    		    	'type_name':$("#type_name").val()
		    		    },
		    		    page:1
		    		   }).trigger("reloadGrid");
		      })
		}
};


/**
 * 删除类别
 */
var removeMethod = function(type_id, flag){
	var params = "";
	if(flag != "remove"){
		for (var i = 0; i < type_id.length; i++) {
			var idVal = type_id[i];
				params += idVal + ",";
	    }
	}else{
		params = type_id;
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
    				 basePath + 'supplierType/deleteSupplierType',
    					{
    					 type_id : params
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
	var supplierType = new SupplierType();
	supplierType.init();
	supplierType.bindEvent();
	
});

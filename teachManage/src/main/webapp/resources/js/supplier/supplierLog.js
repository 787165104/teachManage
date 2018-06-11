var SupplierLog=function(){
};
SupplierLog.prototype={
		
		initMethod:function(){
			 $('.i-checks').iCheck({
                 checkboxClass: 'icheckbox_square-green',
                 radioClass: 'iradio_square-green',
             });
			 
			 var basePath = $('#basePath').val();
	            $("#table_list_1").jqGrid({
	            	url: basePath + '/supplierLog/selectLogList',
	                datatype: "json",
	                postData : {'isAdmin' : $("#isAdmin").val()},
	                height: 300,
	                autowidth: true,
	                shrinkToFit: true,
	               // rownumbers: true, // 显示行号
	                rowNum: 10,
	                rowList: [1, 20, 30],
	                colNames: ['操作用户', '操作内容', 'IP', '操作时间'],
	                colModel: [
	                    {name: 'userName', index: 'userName', width: 90,align:"center"},
	                    {name: 'sysoprtext', index: 'sysoprtext', width: 90,align:"center"},
	                    {name: 'ip', index: 'ip', width: 90,align:"center"},
	                    {name: 'add_time', index: 'add_time', width: 90,align:"center",
	                    	formatter: function(cellValue, options, rowObject) {
	    						return cellValue.replace(".0","");
	    					}
	                    }
	                ],
	                pager: "#pager_list_1",
	                viewrecords: true,
	                caption: "操作日志列表",
	                hidegrid: false
	            });

	          
	            $(window).bind('resize', function () {
	                var width = $('.jqGrid_wrapper').width();
	                $('#table_list_1').setGridWidth(width);
	            });
	            
		},
		bindEvent:function(){
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
		    		    postData:{'userName':$("#userName").val(),
		    		    		  'sysoprtext':$("#sysoprtext").val(),
		    		    		  'add_time':$("#add_time").val()
		    		    },
		    		    pager: '#pager_list_1'
		    		   }).trigger("reloadGrid");
		      })
		}
};




$(document).ready(function(){
	var supplierLog = new SupplierLog();
	supplierLog.initMethod(); //分页查询供应商
	supplierLog.bindEvent(); // 按钮事件
});

var MaterialList = function(){
	
};
MaterialList.prototype = {
		initMethod:function(){
			 $('.i-checks').iCheck({
                 checkboxClass: 'icheckbox_square-green',
                 radioClass: 'iradio_square-green',
             });
			 var basePath = $("#basePath").val();
			// console.log("111");
			 $("#table_list_1").jqGrid({
				 url:basePath +'materialManage/selectMaterialPaging',
				 datatype:"json",
				 height: 300,
	                autowidth: true,
	                shrinkToFit: true,
	                multiselect : true,
	               // rownumbers: true, // 显示行号
	                rowNum: 10,
	                rowList: [10, 20, 30],
	                colNames: ['ID','教材号','教材名称','课程名称','教材作者','教材版次','教材类型','出版时间','使用班级','添加人','添加时间','备注','操作'],
	                colModel: [
	                    {name: 'id', index: 'id',hidden:true},
	                    {name: 'materialId', index: 'materialId',width: 100,align:"center"},
	                    {name: 'materialName', index: 'materialName', width: 90,align:"center"},
	                    {name: 'courseNum', index: 'courseNum', width: 90,align:"center"},
	                    {name: 'author', index: 'author', width: 90,align:"center"},
	                    {name: 'orderNum', index: 'orderNum', width: 90,align:"center"},
	                    {name: 'isOptional', index: 'isOptional', width: 90,align:"center",
                    		formatter:function(cellValue,options,rowObject){
                    			if (cellValue=="1") {
                    				return "选修";
								} else{
									return "必修";
								}
                    		}},
	                    {name: 'publishTime', index: 'publishTime', width: 90,align:"center",
	                    	formatter: function(cellValue, options, rowObject){
	                    		  var date =  new Date(cellValue);
	                    		     var y = 1900+date.getYear();
	                    		     var m = "0"+(date.getMonth()+1);
	                    		     var d = "0"+date.getDate();
	                    		     return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
	                    	}},
	                    {name: 'useClasses', index: 'useClasses', width: 90,align:"center"},
	                    {name: 'addUser', index: 'addUser', width: 90,align:"center"},
	                    {name: 'addTime', index: 'addTime', width: 90,align:"center",
	                    	formatter: function(cellValue, options, rowObject){
	                    		  var date =  new Date(cellValue);
	                    		     var y = 1900+date.getYear();
	                    		     var m = "0"+(date.getMonth()+1);
	                    		     var d = "0"+date.getDate();
	                    		     return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
	                    	}},
	                    {name: 'remark', index: 'remark', width: 90,align:"center"},
	                    {name: '' ,index:'',align: 'center' , width: 90, cellattr: addCellAttr,
	    					formatter: function(cellValue, options, rowObject) {
	    						var html = '';
	    							var tkey = rowObject.materialId;
	    							var href = "javascript:removeMethod('"+tkey+"','remove')";
	    							html += '<div class="dropdown">';
 								html += '<a data-toggle="dropdown" class="dropdown-toggle" href="#"><span class="text-muted text-xs block">操作 <b class="caret"></b></span></a>';
 								html += '<ul class="dropdown-menu animated fadeInRight m-t-xs" style="margin-left: 55px;min-width: 70px;">';
 								html += '<li><a href="materialDetailView?materialId='+tkey+'" >查看</a></li>';
 								html += '<li><a href="teachMaterialUpdateView?materialId='+tkey+'&isAdmin='+$("#isAdmin").val()+'" >修改</a></li>';
									html += '<li><a href="'+href+'">删除</a></li>';
									html += '</ul>';
									html += '</div>';
	    							return html;
	    					}
	    		        }
	                    
	                ],
	                pager: "#pager_list_1",
	                viewrecords: true,
	                caption: "教材信息列表",
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
			 var basePath = $("#basePath").val();
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
		      
			$("#reset").click(function(){
				var inputObjs = $("#query input[type='text']");
				for(var i = 0;i<inputObjs.length;i++){
					var inputObj = inputObjs[i];
					inputObj.value="";
				}
				var selectObjs = $("#query select");
				for(var i=0;i<selectObjs.length;i++){
					var selectObj = selectObjs[i];
					selectObj.value = "";
				}
			});
			
			$("#queryBtn").click(function(){
				$("#table_list_1").jqGrid('setGridParam',{
					datatype:'json',
					postData:{
						'courseNum':$("#courseNum").val(),
						'materialName':$("#materialName").val(),
						'author':$("#author").val(),
						'orderNum':$("#orderNum").val(),
						'press':$("#press").val(),
						'isOptional':$("#isOptional").val(),
					},
					pager:'pager_list_1'
				}).trigger("reloadGrid");
			});
			$("#addButton").click(function(){
				window.location.href="addMaterialView";
			});
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
		    	  window.location.href='teachMaterialUpdateView?materialId=' + rowData.materialId;
		      })
			 $("#removeButton").click(function(){
		    	  var arr = jQuery("#table_list_1").jqGrid('getGridParam', 'selarrrow');
		    	  if(arr.length == 0){
		    		  swal("请选择记录", "", "warning");
		    	  }else{
		    		  removeMethod(arr, "removeList");
		    	  }
		      });
		}
};

/**
 * 删除读者信息
 */
var removeMethod = function(materialId, flag){
	var params = "";
	if(flag != "remove"){
		for (var i = 0; i < materialId.length; i++) {
			var idVal = materialId[i];
				params += idVal + ",";
	    }
	}else{
		params = materialId;
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
    				 basePath + 'materialManage/deleteMaterialInformation',
    					{
    					 "materialId" : params
    					},
    					function(data){
    						if(data.status == true){
    						var info =  data.msg;
    						jQuery("#table_list_1").jqGrid('setGridParam', {
    					         page : 1
    					        }).trigger('reloadGrid');
    						swal("删除成功!", "您选中的信息已删除", "success");
    						}else if(data.status == false){
    							CommonUtils.alertMsg("2","",info,"");
    						}
    					},
    					"json"
    			);
    	}
    });
}
$(document).ready(function(){
	var materialList= new MaterialList();
	materialList.initMethod();//初始化
	materialList.bindEvent();//按钮事件
});
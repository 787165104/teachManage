var UserInfo=function(){
};
UserInfo.prototype={
		initMethod:function(){
			var basePath = $('#basePath').val();
			console.log(basePath)
			//查询学院
			$.post(
					 basePath+'teachTask/selectAllAcademy',
					 {},
					 function(data) {
						 console.log(data);
						 console.log(data.status);
						if(data.status==true){
							var info = data.academy;
							$("#academy").append("<option value=''>请选择</option>")
							$.each(info,function(name,value){
								$("#academy").append("<option value = '"+value.academy+"'>"+value.academy+"</option>")
							});
//							$('#academy').selectpicker('refresh');
//	      				     $('#academy').selectpicker('render');
						}
					},
					"json"
			 );
			//查询职称
			$.post(
					basePath+'PositionaltitleController/selectPositionalTitleList',
					{},
					function(data) {
						console.log(data);
						console.log(data.status);
						if(data.status==true){
							var info = data.positionalTitle;
							$("#positionalTitle").append("<option value=''>请选择</option>")
							$.each(info,function(name,value){
								$("#positionalTitle").append("<option value = '"+value.positionalTitle+"'>"+value.positionalTitle+"</option>")
							});
						}
					},
					"json"
			);
			//分页
            $("#table_list_1").jqGrid({
            	url: basePath + 'userInfo/selectUserInfoPaging',
                datatype: "json",
                mtype: 'POST',
                postData : {},
                height: 300,
                autowidth: true,
                shrinkToFit: true,
                multiselect : true,
               // rownumbers: true, // 显示行号
                rowNum: 10,
                rowList: [10, 20, 30],
                colNames: ['ID','职工号','教师姓名','职称','学历','入校时间','所属学院','简介','操作'],
                colModel: [
                    {name: 'id', index: 'id', width: 90,hidden:true},
                    {name: 'jobNumber', index: 'jobNumber', width: 90,align:"center",'key':true},
                    {name: 'userName', index: 'userName', width: 90,align:"center"},
                    {name: 'positionalTitle', index: 'positionalTitle', width: 90,align:"center"},
                    {name: 'degree', index: 'degree', width: 90,align:"center"},
                    {name: 'intoSchoolDate', index: 'intoSchoolDate', width: 90,align:"center",
                    	formatter: function(cellValue, options, rowObject){
                    			var date =  new Date(cellValue);
                      		     Y = date.getFullYear() + '-';
                                 M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                                 D = date.getDate() + ' ';
                                 
                                 return Y+M+D;
                    	}
                    },
                    {name: 'academy', index: 'academy', width: 90,align:"center"},
                    {name: 'introduction', index: 'introduction', width: 90,align:"center"},
                    {name: '' ,index:'',align: 'center' , width: 90, cellattr: addCellAttr,
    					formatter: function(cellValue, options, rowObject) {
    						var html = '';
    							var tkey = rowObject.jobNumber;
    							var href = "javascript:removeMethod('"+tkey+"','remove')";
    							html += '<div class="dropdown">';
								html += '<a data-toggle="dropdown" class="dropdown-toggle" href="#"><span class="text-muted text-xs block">操作 <b class="caret"></b></span></a>';
								html += '<ul class="dropdown-menu animated fadeInRight m-t-xs" style="margin-left: 55px;min-width: 70px;">';
								html += '<li><a href="userDetail?jobNumber='+tkey+'&isAdmin='+$("#isAdmin").val()+'" >查看</a></li>';
								html += '<li><a href="updateView?jobNumber='+tkey+'&isAdmin='+$("#isAdmin").val()+'" >修改</a></li>';
								html += '<li><a href="'+href+'">删除</a></li>';
								html += '</ul>';
								html += '</div>';
    							return html;
    					}
    		        }
                    
                ],
                pager: "#pager_list_1",
                viewrecords: true,
                caption: "教师基础信息列表",
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
		 	  
		   });
		    //根据条件查询
		      $("#queryBtn").click(function(){
		    	  $("#table_list_1").jqGrid('setGridParam',{  
		    		    datatype:'json',
		    		    postData:{
		    		    		  'userName':$("#userName").val(),
		    		    		  'degree':$("#degree").val(),
		    		    		  'positionalTitle':$("#positionalTitle").val(),
		    		    		  'academy':$("#academy").val(),
		    		    		  'intoSchoolDate':$("#intoSchoolDate").val(),
		    		    },
		    		    page:1
		    		   }).trigger("reloadGrid");
		      });
		    // 新增
            $("#addButton").click(function(){
                window.location.href="addUserInfo";
            });
			// 编辑
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
                window.location.href='updateView?jobNumber=' + rowData.jobNumber + '&isAdmin=' + $("#isAdmin").val();
            });
            //删除
            $("#removeButton").click(function(){
                var arr = jQuery("#table_list_1").jqGrid('getGridParam', 'selarrrow');
                if(arr.length == 0){
                    swal("请选择记录", "", "warning");
                }else{
                    removeMethod(arr, "removeList");
                }
            });

		}
}
/**
 * 删除教师信息
 */
var removeMethod = function(jobNumber, flag){
    var params = "";
    debugger;
    if(flag != "remove"){
        for (var i = 0; i < jobNumber.length; i++) {
            var idVal = jobNumber[i];
            params += idVal + ",";
        }
    }else{
        params = jobNumber;
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
                basePath + 'userInfo/deleteUserInfo',
                {
                    "jobNumber" : params
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
	var userInfo = new UserInfo();
	userInfo.initMethod(); //初始化
	userInfo.bindEvent(); // 按钮事件
	
});

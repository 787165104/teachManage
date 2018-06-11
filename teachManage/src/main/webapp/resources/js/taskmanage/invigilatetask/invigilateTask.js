var TaskList = function(){

};
TaskList.prototype = {
    initMethod:function(){
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });
        var basePath = $("#basePath").val();
        // console.log("111");
        $("#table_list_1").jqGrid({
            url:basePath +'invigilateTask/selectInvigilateTask',
            datatype:"json",
            height: 300,
            autowidth: true,
            shrinkToFit: true,
            multiselect : true,
            // rownumbers: true, // 显示行号
            rowNum: 10,
            rowList: [10, 20, 30],
            colNames: ['id','课程名称','考试类型','主讲人','考试日期','考试地点','主监考人','备注','操作'],
            colModel: [
                {name: 'Id', index: 'Id', hidden:true},
                {name: 'courseNum', index: 'courseNum', width: 90,align:"center"},
                {name: 'examType', index: 'examType', width: 90,align:"center"},
                {name: 'jobNumber', index: 'jobNumber', width: 90,align:"center"},
                {name: 'examDate', index: 'examDate', width: 90,align:"center",
                    formatter: function(cellValue, options, rowObject){
                        var date =  new Date(cellValue);
                        Y = date.getFullYear() + '-';
                        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                        D = date.getDate() + ' ';
                        return Y+M+D;
                    }},
                {name: 'examAddress', index: 'examAddress', width: 90,align:"center"},
                {name: 'mainInvigilateTeacher', index: 'mainInvigilateTeacher', width: 90,align:"center"},
                {name: 'status', index: 'status', width: 90,align:"center",
                    formatter:function(cellValue,options,rowObject){
                        if (cellValue=="1") {
                            return "已发布";

                        } else{
                            return "未发布";
                        }
                    }},
                {name: '' ,index:'',align: 'center' , width: 90, cellattr: addCellAttr,
                    formatter: function(cellValue, options, rowObject) {
                        var html = '';
                        var tkey = rowObject.id;
                        var href = "javascript:removeMethod('"+tkey+"','remove')";
                        html += '<div class="dropdown">';
                        html += '<a data-toggle="dropdown" class="dropdown-toggle" href="#"><span class="text-muted text-xs block">操作 <b class="caret"></b></span></a>';
                        html += '<ul class="dropdown-menu animated fadeInRight m-t-xs" style="margin-left: 55px;min-width: 70px;">';
                        html += '<li><a href="checkTeachTask?id='+tkey+'&isAdmin='+$("#isAdmin").val()+'" >查看</a></li>';
                        html += '<li><a href="toUpdateTeachTask?id='+tkey+'&isAdmin='+$("#isAdmin").val()+'" >修改</a></li>';
                        html += '<li><a href="'+href+'">删除</a></li>';
                        html += '</ul>';
                        html += '</div>';
                        return html;
                    }
                }

            ],
            pager: "#pager_list_1",
            viewrecords: true,
            caption: "教学任务列表",
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
                location.href = 'exportTeachTask?ids=' + arr;
            }else{
                swal("请选择记录", "", "warning");
                return false;
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
                    'courseName':$("#courseName").val(),
                    'jobNumber':$("#jobNumber").val(),
                    'grade':$("#grade").val(),
                    'courseNature':$("#courseNature").val(),
                    'campusArea':$("#campusArea").val(),
                },
                pager:'pager_list_1'
            }).trigger("reloadGrid");
        });
        $("#addButton").click(function(){
            window.location.href="addTeachTask";
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
                var id=$("#table_list_1").jqGrid("getGridParam","selrow");
                //根据选中行id获取选中行数据
                var rowData = $("#table_list_1").jqGrid('getRowData',id);

            }
            window.location.href='toUpdateTeachTask?id=' + id + '&isAdmin=' + $("#isAdmin").val();
        })
        $("#removeButton").click(function(){
            var arr = jQuery("#table_list_1").jqGrid('getGridParam', 'selarrrow');
            if(arr.length == 0){
                swal("请选择记录", "", "warning");
            }else{
                removeMethod(arr, "removeList");
            }
        });
        /*$("#weChatPay").click(function() {
            $.post(
                    "https://api.mch.weixin.qq.com/pay/unifiedorder",
                    {

                    },
                    function() {

                    },
                    "json"

            );
        });*/
        $("#leadinButton").click(function(){
            $.post(
                basePath + '/bookReaderManage/studentLeadtoReader',
                {

                },
                function(data){
                    if(data.status == true){
                        if(data.count>0){
                            swal({
                                    title:"操作提示",
                                    text:"共有"+data.count+"条记录被导入,"+data.msg,
                                    type:"success",
                                    showCancelButton: false,
                                    confirmButtonColor: "#f7a54a",
                                    confirmButtonText: "返回列表",
                                    closeOnConfirm:false
                                },function(confirm){
                                    if (confirm) {
                                        window.location.href='readerList?isAdmin=' + $("#isAdmin").val();
                                    }
                                }

                            );
                        }else if(data.count==0){
                            swal({
                                    title:"操作提示",
                                    text:data.msg,
                                    type:"success",
                                    showCancelButton: false,
                                    confirmButtonColor: "#f7a54a",
                                    confirmButtonText: "确定",
                                    closeOnConfirm:false
                                },function(confirm){
                                    if (confirm) {
                                        window.location.href='readerList?isAdmin=' + $("#isAdmin").val();
                                    }
                                }

                            );
                        }

                    }
                },
                "json"
            );
        })
    }
};

/**
 * 删除教学任务
 */
var removeMethod = function(readerId, flag){
    var params = "";
    if(flag != "remove"){
        for (var i = 0; i < readerId.length; i++) {
            var idVal = readerId[i];
            params += idVal + ",";
        }
    }else{
        params = readerId;
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
                basePath + 'teachTask/deleteTeachTask',
                {
                    "readerId" : params
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
    var taskList= new TaskList();
    taskList.initMethod();//初始化
    taskList.bindEvent();//按钮事件
});
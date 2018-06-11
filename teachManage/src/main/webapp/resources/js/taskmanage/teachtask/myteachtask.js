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
            url:basePath +'teachTask/selectTeachTaskByjobNumber',
            datatype:"json",
            height: 300,
            autowidth: true,
            shrinkToFit: true,
            multiselect : true,
            // rownumbers: true, // 显示行号
            rowNum: 10,
            rowList: [10, 20, 30],
            colNames: ['id','课程代码','课程名称','总学时','理论学时','实验学时','课程性质','校区','教学班组成','任课教师','职称','年级','备注','操作'],
            colModel: [
                {name: 'Id', index: 'Id', hidden:true},
                {name: 'courseNum', index: 'courseNum', width: 90,align:"center"},
                {name: 'courseName', index: 'courseName', width: 90,align:"center"},
                {name: 'totalClassHours', index: 'totalClassHours', width: 90,align:"center"},
                {name: 'lectureHours', index: 'lectureHours', width: 90,align:"center"},
                {name: 'experimentalHours', index: 'experimentalHours', width: 90,align:"center"},
                {name: 'courseNature', index: 'courseNature', width: 90,align:"center",
                    formatter:function(cellValue,options,rowObject){
                        if (cellValue=="1") {
                            return "选修";
                        } else{
                            return "必修";
                        }
                    }},
                {name: 'campusArea', index: 'campusArea', width: 90,align:"center"},
                {name: 'teachClass', index: 'teachClass', width: 90,align:"center"},
                {name: 'jobNumber', index: 'jobNumber', width: 90,align:"center"},
                {name: 'positionalTitle', index: 'positionalTitle', width: 90,align:"center"},
                {name: 'grade', index: 'grade', width: 90,align:"center"},
                {name: 'remark', index: 'remark', width: 90,align:"center"},
                {name: '' ,index:'',align: 'center' , width: 90, cellattr: addCellAttr,
                    formatter: function(cellValue, options, rowObject) {
                        var html = '';
                        var tkey = rowObject.id;
                        var href = "javascript:removeMethod('"+tkey+"','remove')";
                        html += '<div class="dropdown">';
                        html += '<a data-toggle="dropdown" class="dropdown-toggle" href="#"><span class="text-muted text-xs block">操作 <b class="caret"></b></span></a>';
                        html += '<ul class="dropdown-menu animated fadeInRight m-t-xs" style="margin-left: 55px;min-width: 70px;">';
                        html += '<li><a href="checkTeachTask?id='+tkey+'&isAdmin='+$("#isAdmin").val()+'" >查看</a></li>';
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
                    'grade':$("#grade").val(),
                    'courseNature':$("#courseNature").val(),
                    'campusArea':$("#campusArea").val(),
                },
                pager:'pager_list_1'
            }).trigger("reloadGrid");
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

$(document).ready(function(){
    var materialList= new MaterialList();
    materialList.initMethod();//初始化
    materialList.bindEvent();//按钮事件
});
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", -10);
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<%@include file="/WEB-INF/views/base.jsp" %>
<!DOCTYPE html >
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>教师信息添加</title>
    <link href="${jsPath}/supplier/css/fileinput.css" media="all" rel="stylesheet" type="text/css"/>
    <link href="${res}/libs/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/css/bootstrap-select.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/animate.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/iCheck/custom.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/toastr/toastr.min.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/datapicker/bootstrap-datetimepicker.min.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/jQueryUI/jquery-ui-1.10.4.custom.min.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/supplierstyle.css" rel="stylesheet">
    <link href="${jsPath}/supplier/css/IMGUP.css" rel="stylesheet">
    <style>
        #alertmod_table_list_2 {
            top: 900px !important;
        }
    </style>
</head>
<body>
<input id="basePath" type="hidden" value="<%=basePath %>"/>
<div id="wrapper">
    <!-- 左侧菜单 -->
    <%@include file="/WEB-INF/views/public.jsp" %>

    <!-- 页面主题内容 -->
    <div id="page-wrapper" class="gray-bg">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2></h2>
                <ol class="breadcrumb">
                    <li><a href="#">人事信息管理</a></li>
                    <li><a href="<%=Path %>/userInfo/userList">教师信息管理</a></li>
                    <li><a href="javascript:viod(0)">添加</a></li>

                </ol>
            </div>
        </div>

        <div class="wrapper wrapper-content  animated fadeInRight">
            <!-- row开始 -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="tabs-container">
                        <ul class="nav nav-tabs">
                            <li class="active">
                                <a id="tab_one" data-toggle="tab" href="#tab-1">教师信息添加</a>
                            </li>
                        </ul>
                        <form id="userInfoForm" class="form-horizontal" method="post" novalidate="novalidate"
                              ENCTYPE="multipart/form-data">
                            <div class="tab-content">
                                <div id="tab-1" class="tab-pane active">
                                    <input type="hidden" name="jobNumber" id="jobNumber" value="${jobNumber}"/>
                                    <div class="panel-body">
                                        <div class="form-horizontal">
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">教师姓名:</label>
                                                <div class="col-sm-4">
                                                    <input id="userName" name="userName"
                                                           class="form-control" maxlength="100" type="text"
                                                           autocomplete="off">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">性别:</label>
                                                <div class="col-sm-4">
                                                    <label>
                                                        <input type="radio" name="sex" id="optionsRadios1" value="0"
                                                               checked>
                                                        男
                                                    </label>
                                                    <label>
                                                        <input type="radio" name="sex" id="optionsRadios2" value="1">
                                                        女
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">照片</label>
                                                <div class="col-sm-4">
                                                    <input id="headimg" name="headimg" type="file"
                                                           data-min-file-count="1">
                                                </div>
                                            </div>
                                            <%--<div class="form-group">
                                                <label class="col-sm-2 control-label">年龄:</label>
                                                <div class="col-sm-4">
                                                    <input id="age" name="age"
                                                           class="form-control" maxlength="100" type="text"
                                                           autocomplete="off">
                                                </div>
                                            </div>--%>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">所属学院:</label>
                                                <div class="col-sm-4">
                                                    <select class="form-control" id="academy" name="academy">
                                                        <option value="">请选择</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">学历</label>
                                                <div class="col-sm-4">
                                                    <select class="form-control" id="degree" name="degree">
                                                        <option value="">请选择</option>
                                                        <option value="专科">专科</option>
                                                        <option value="本科">本科</option>
                                                        <option value="硕士">硕士</option>
                                                        <option value="博士">博士</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">职称:</label>
                                                <div class="col-sm-4">
                                                    <select class="form-control" id="positionalTitle"
                                                            name="positionalTitle">
                                                        <option value="">请选择</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">教授课程:</label>
                                                <div class="col-sm-4">
                                                    <input id="teachCourse" name="teachCourse"
                                                           class="form-control" maxlength="100" type="text"
                                                           autocomplete="off">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">曾授课:</label>
                                                <div class="col-sm-4">
                                                    <input id="lastTeachCourse" name="lastTeachCourse"
                                                           class="form-control" maxlength="100" type="text"
                                                           autocomplete="off">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">研究方向:</label>
                                                <div class="col-sm-4">
                                                    <input id="researchArea" name="researchArea"
                                                           class="form-control" maxlength="100" type="text"
                                                           autocomplete="off">
                                                </div>

                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">毕业院校:</label>
                                                <div class="col-sm-4">
                                                    <input id="graduteSchool" name="graduteSchool"
                                                           class="form-control" maxlength="100" type="text"
                                                           autocomplete="off">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">所属课程组:</label>
                                                <div class="col-sm-4">
                                                    <input id="courseGroup" name="courseGroup"
                                                           class="form-control" maxlength="100" type="text"
                                                           autocomplete="off">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">参加工作时间:</label>
                                                <div class="col-sm-4">
                                                    <input id="beginWorkDate" name="beginWorkDate" type="text"
                                                           onclick="WdatePicker()" readonly="readonly"
                                                           class="form-control">
                                                </div>

                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">入校时间:</label>
                                                <div class="col-sm-4">
                                                    <input id="intoSchoolDate" name="intoSchoolDate" type="text"
                                                           onclick="WdatePicker()" readonly="readonly"
                                                           class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">邮箱:</label>
                                                <div class="col-sm-4">
                                                    <input id="userEmail" name="userEmail"
                                                           class="form-control" maxlength="100" type="text"
                                                           autocomplete="off">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">联系电话</label>
                                                <div class="col-sm-4">
                                                    <input id="userPhone" name="userPhone"
                                                           class="form-control" maxlength="100" type="text"
                                                           autocomplete="off">
                                                </div>
                                            </div>
                                            <div class="form-group" id="showDiv">
                                                <label class="col-sm-2 control-label">简介</label>
                                                <div class="col-sm-4">
                                                    <textarea id="introduction" name="introduction" class="form-control"
                                                              rows="5">
                                                    </textarea>
                                                </div>

                                            </div>
                                            <div class="form-group">
                                                <div class="col-sm-12" style="text-align: right;">
                                                    <button style="width: 100px;" onclick="history.go(-1)"
                                                            class="btn btn-warning" type="button">
                                                        <i class="fa fa-mail-forward"></i>&nbsp;&nbsp;返回
                                                    </button>
                                                    <button style="width: 100px;" class="btn btn-primary"
                                                            type="submit"><i class="fa fa-save"></i>&nbsp;&nbsp;保存
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            <!-- row结束 -->
        </div>

        <div class="footer">
            <div class="pull-right">
            </div>
            <div>
                <strong>Copyright</strong> teachManage Company &copy; 2017-2019
            </div>
        </div>
    </div>
</div>


<!-- Mainly scripts -->
<script src="${res}/libs/bootstrap/js/jquery-1.9.1.min.js"></script>
<script src="${res}/libs/bootstrap/js/bootstrap.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/js/bootstrap-select.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/js/i18n/defaults-zh_CN.js"></script>
<script src="${res}/libs/bootstrap/js/plugins/metisMenu/jquery.metisMenu.js"></script>
<script src="${res}/libs/bootstrap/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
<script src="${res}/libs/bootstrap/js/plugins/toastr/toastr.min.js"></script>
<script src="${res}/libs/bootstrap/js/plugins/sweetalert/sweetalert.min.js"></script>
<script src="${res}/libs/bootstrap/js/plugins/iCheck/icheck.min.js"></script>
<script src="${res}/libs/bootstrap/js/plugins/validate/jquery.validate.min.js"></script>
<!-- Peity -->
<script src="${res}/libs/bootstrap/js/plugins/peity/jquery.peity.min.js"></script>

<!-- jqGrid -->

<!-- Custom and plugin javascript -->
<script src="${res}/libs/bootstrap/js/sinspinia.js"></script>
<script src="${res}/libs/bootstrap/js/plugins/pace/pace.min.js"></script>
<script src="${res}/libs/bootstrap/js/plugins/jquery-ui/jquery-ui.min.js"></script>
<script src="${res}/libs/bootstrap/js/plugins/datapicker/bootstrap-datepicker.js"></script>
<script src="${jsPath}/supplier/My97/WdatePicker.js"></script>
<script src="${res}/libs/bootstrap/js/plugins/sweetalert/sweetalert.min.js"></script>
<script src="${jsPath}/supplier/js/fileinput.min.js" type="text/javascript"></script>
<script src="${jsPath}/user/userinfo/useradd.js"></script>
<script>var Path = "<%=path%>"</script>
<script>
    $("#headimg").fileinput({
        language: 'zh', //设置语言
        uploadUrl: Path + "/userInfo/uploadHeadImg", //上传的地址
        allowedFileExtensions: ['jpg', 'gif', 'png'],//接收的文件后缀
        //uploadExtraData:{"id": 1, "fileName":'123.mp3'},
        uploadAsync: false, //默认异步上传
        showCancel: false,
        showUpload: false, //是否显示上传按钮
        showRemove: true, //显示移除按钮
        showPreview: true, //是否显示预览
        showCaption: true,//是否显示标
        browseClass: "btn btn-primary", //按钮样式
        dropZoneEnabled: false,//是否显示拖拽区域
        //minImageWidth: 50, //图片的最小宽度
        //minImageHeight: 50,//图片的最小高度
        //maxImageWidth: 1000,//图片的最大宽度
        //maxImageHeight: 1000,//图片的最大高度
        //maxFileSize:0,//单位为kb，如果为0表示不限制文件大小
        //minFileCount: 0,
        maxFileCount: 1, //表示允许同时上传的最大文件个数
        enctype: 'multipart/form-data',
        validateInitialCount: true,
        previewFileIcon: "<iclass='glyphicon glyphicon-king'></i>",
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
        layoutTemplates: {
            actionUpload: "",
        },
        uploadExtraData: function (previewId, index) {
            //注意这里，传参是json格式,后台直接使用对象属性接收，比如employeeCode，我在RatingQuery 里面直接定义了employeeCode属性，然后最重要的也是
            //最容易忽略的，传递多个参数时，不要忘记里面大括号{}后面的分号，这里可以直接return {a:b}; 或者{a:b}都可以，但必须要有大括号包裹
            var data = {
                jobNumber: $("#jobNumber").val(),

            };
            return data;
        },
    }).on("filebatchuploadsuccess", function (event, data, previewId, index) {
        //添加
        var status = data.response.status;
        var msg = data.response.msg;

        if (status == false) {
            msg = "附件上传失败!";
        }
        var addflag = data.response.addflag;
        if (addflag == true) {
            swal({
                title: "操作提示！",
                text: "用户信息添加成功!" + msg,
                type: "success",
                showCancelButton: true,
                confirmButtonColor: "#00CC99",
                confirmButtonText: "返回列表",
                cancelButtonText: "继续添加",
                closeOnConfirm: false
            }, function (confirm) {
                if (confirm) {
                    window.location.href = 'userList';
                } else {
                    window.location.href = 'addUserInfo';
                }
            });
        } else {
            //修改
            swal({
                title: "操作提示！",
                text: "照片修改成功!" + msg,
                type: "success",
                showCancelButton: false,
                confirmButtonColor: "#f7a54a",

                confirmButtonText: "返回列表",
                closeOnConfirm: false
            }, function (confirm) {
                if (confirm) {
                    window.location.href = 'userList?isAdmin=' + $("#isAdmin").val();
                }
            });
        }
    });
</script>
</body>
</html>

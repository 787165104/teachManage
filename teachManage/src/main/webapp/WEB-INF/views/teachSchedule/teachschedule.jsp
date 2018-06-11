<%--
  Created by IntelliJ IDEA.
  User: yjh
  Date: 2018/5/12
  Time: 14:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", -10);
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<%@include file="/WEB-INF/views/base.jsp"%>
<!DOCTYPE html >
<html>
<head>
    <title>教学进度计划安排</title>
    <link href="${res}/libs/bootstrap/css/bootstrap.min.css"
          rel="stylesheet">
    <link href="${res}/libs/bootstrap/font-awesome/css/font-awesome.css"
          rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/animate.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/iCheck/custom.css"
          rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/toastr/toastr.min.css"
          rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/sweetalert/sweetalert.css"
          rel="stylesheet">
    <link
            href="${res}/libs/bootstrap/css/plugins/jQueryUI/jquery-ui-1.10.4.custom.min.css"
            rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/jqGrid/ui.jqgrid.css"
          rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/supplierstyle.css"
          rel="stylesheet">
    <link
            href="${res}/libs/bootstrap/css/plugins/datapicker/datepicker3.css"
            rel="stylesheet">
    <link href="${jsPath}/supplier/js/jquery.contextMenu.css">
    <style>
        /* Additional style to fix warning dialog position */
        #alertmod_table_list_2 {
            top: 900px !important;
        }
        .fileinput-button {
            position: relative;
            display: inline-block;
            overflow: hidden;
        }
        .fileinput-button input {
            position: absolute;
            left: 0px;
            top: 0px;
            opacity: 0;
            -ms-filter: 'alpha(opacity=0)';
        }
    </style>
</head>
<body>
<input id="basePath" type="hidden" value="<%=basePath%>" />
    <!-- 左侧菜单 -->
    <%@include file="/WEB-INF/views/public.jsp"%>
<div id="wrapper">
    <div id="page-wrapper" class="gray-bg">
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="col-lg-12" style="text-align: center">
                <h1>
                    <strong>河南科技大学教学进度计划</strong>
                </h1>
            </div>
        </div>
        <div class="row-fluid">
            <div class="col-lg-12" style="text-align: center">
                <h2>
                    <strong> 2017-2018  学年 第二学期</strong>
                </h2>
            </div>
        </div>
        <div class="col-lg-7 pull-right">
            <table class="table table-bordered" >

                <tbody>
                <tr>
                    <td rowspan="2">总学时</td>
                    <td rowspan="2">已完成学时</td>

                    <td colspan="6">本学期时数</td>
                </tr>
                <tr>


                    <td>合计</td>
                    <td>讲课</td>
                    <td>实验</td>
                    <td>习题</td>
                    <td>设计作业</td>
                    <td>考试</td>
                </tr>
                <tr class="success">
                    <td>64</td>
                    <td></td>
                    <td>64</td>
                    <td>45</td>
                    <td>14</td>
                    <td>5</td>
                    <td></td>
                    <td>笔试</td>
                </tr>
                <tr class="warning">
                    <td colspan="8"><span class="col-lg-8">上课地点：西苑7-503</span>     <span class="col-lg-4">批改作业次数：5</span></td>

                </tr>
                <tr class="info">
                    <td colspan="8"><span class="col-lg-8">答疑地点：西苑10-509</span>  <span class="col-lg-4">答疑时间：周一晚上19:30-20:30</span></td>

                </tr>
                </tbody>
            </table>
        </div>
        <div class="row-fluid">
            <div class="col-lg-12">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="col-lg-1">
                            周次
                        </th>
                        <th class="col-lg-1">
                            星期
                        </th>
                        <th class="col-lg-1">
                            节次
                        </th>
                        <th class="col-lg-2">
                            教学环节
                        </th>
                        <th class="col-lg-6">

                            内容
                        </th>
                        <th>
                            课程时数
                        </th>
                        <th>
                            备注
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            3
                        </td>
                        <td>
                            二
                        </td>
                        <td>
                           7-9
                        </td>
                        <td>
                           讲课
                        </td>
                        <td>
                            第一章 算法：算法基本概念、描述语言，算法设计基本方法和算法的复杂度分析
                        </td>
                        <td>
                           3
                        </td>
                        <td>

                        </td>
                    </tr>
                    <tr class="success">
                        <td>
                            3
                        </td>
                        <td>
                           四
                        </td>
                        <td>
                            1-2
                        </td>
                        <td>
                           讲课
                        </td>
                        <td>
                            第二章 基本数据结构及其运算：数据结构基本概念；线性表及其运算
                        </td>
                        <td>
                            2
                        </td>
                        <td>

                        </td>
                    </tr>
                    <tr class="error">
                        <td>
                            4
                        </td>
                        <td>
                            二
                        </td>
                        <td>
                            1-2
                        </td>
                        <td>
                           讲课
                        </td>
                        <td>
                            栈及其应用；队列及其应用；线性链表及其运算
                        </td>
                        <td>
                            3
                        </td>
                        <td>

                        </td>
                    </tr>
                    <tr class="error">
                        <td>
                            4
                        </td>
                        <td>
                           四
                        </td>
                        <td>
                            7-9
                        </td>
                        <td>
                            讲课
                        </td>
                        <td>
                            数组；树的基本概念、二叉树的、存储结构；二叉树的遍历
                        </td>
                        <td>
                            3
                        </td>
                        <td>

                        </td>
                    </tr>
                    <tr class="warning">
                        <td>
                            5
                        </td>
                        <td>
                            二
                        </td>
                        <td>
                            7-9
                        </td>
                        <td>
                            讲课
                        </td>
                        <td>
                            栈及其应用；队列及其应用；线性链表及其运算
                        </td>
                        <td>
                            3
                        </td>
                        <td>

                        </td>
                    </tr>
                    <tr class="info">
                        <td>
                            5
                        </td>
                        <td>
                           四
                        </td>
                        <td>
                           1-2
                        </td>
                        <td>
                            讲课
                        </td>
                        <td>
                            表达式的线性化；图；1、2章总结
                        </td>
                        <td>
                            2
                        </td>
                        <td>

                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="span4">
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
            </div>
            <div class="span6">
            </div>
        </div>

    </div>
    </div>
</div>
<!-- Mainly scripts -->
<script src="${res}/libs/bootstrap/js/jquery-1.9.1.min.js"></script>
<script src="${res}/libs/bootstrap/js/bootstrap.min.js"></script>
<!-- <script
    src="https://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/js/bootstrap-select.min.js"></script> -->
<!-- <script
    src="https://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/js/i18n/defaults-zh_CN.js"></script> -->
<script
        src="${res}/libs/bootstrap/js/plugins/metisMenu/jquery.metisMenu.js"></script>
<script
        src="${res}/libs/bootstrap/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
<script
        src="${res}/libs/bootstrap/js/plugins/validate/jquery.validate.min.js"></script>
<script src="${jsPath}/supplier/CommonUtils.js"></script>
<script src="${jsPath}/supplier/My97/WdatePicker.js"></script>
<%-- <script src="${jsPath}/staff/jquery.cityselect.js"></script> --%>
<%-- <script src="${jsPath}/staff/staffInsert.js"></script> --%>
<%-- <script src="${jsPath}/assets/register.js"></script> --%>

<script src="${res}/libs/bootstrap/js/plugins/toastr/toastr.min.js"></script>
<script
        src="${res}/libs/bootstrap/js/plugins/sweetalert/sweetalert.min.js"></script>
<script src="${res}/libs/bootstrap/js/plugins/iCheck/icheck.min.js"></script>
<!-- Peity -->
<script
        src="${res}/libs/bootstrap/js/plugins/peity/jquery.peity.min.js"></script>

<!-- jqGrid -->
<script src="${res}/plugins/jqGrid/js/jquery.jqGrid.min.js"></script>

<!-- Custom and plugin javascript -->
<script src="${res}/libs/bootstrap/js/sinspinia.js"></script>
<script src="${res}/libs/bootstrap/js/plugins/pace/pace.min.js"></script>
<script
        src="${res}/libs/bootstrap/js/plugins/jquery-ui/jquery-ui.min.js"></script>
<script
        src="${res}/libs/bootstrap/js/plugins/datapicker/bootstrap-datepicker.js"></script>
<script
        src="${res}/libs/bootstrap/js/plugins/sweetalert/sweetalert.min.js"></script>
<script
        src="${res}/plugins/bootstrap_datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
<script
        src="${res}/plugins/bootstrap_datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="${jsPath}/bms/bookreader/insert.js"></script>
<script
        src="https://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/js/bootstrap-select.min.js"></script>
<script
        src="https://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/js/i18n/defaults-zh_CN.js"></script>
<script src="${jsPath}/teachmanage/teachtask/checkteachtask.js"></script>
</body>
</html>

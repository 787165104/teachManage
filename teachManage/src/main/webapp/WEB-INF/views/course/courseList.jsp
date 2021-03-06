<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	response.setHeader("Pragma","No-cache");    
	response.setHeader("Cache-Control","no-cache");    
	response.setDateHeader("Expires", -10);  
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@include file="/WEB-INF/views/base.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>课程信息</title>
    <link href="${res}/libs/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/animate.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/iCheck/custom.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/toastr/toastr.min.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/jQueryUI/jquery-ui-1.10.4.custom.min.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/jqGrid/ui.jqgrid.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/supplierstyle.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
    <link href="${jsPath}/supplier/js/jquery.contextMenu.css">
    <style>
        /* Additional style to fix warning dialog position */
        #alertmod_table_list_2{
            top: 900px !important;
        }
    </style>
</head>
<body>
<input id="basePath" type="hidden" value="<%=basePath %>" />
<div id="wrapper">
	<!-- 左侧菜单 -->
	<%@include file="/WEB-INF/views/public.jsp"%>
	<!-- 页面主题内容 -->
	<div id="page-wrapper" class="gray-bg">
		<div class="row wrapper border-bottom white-bg page-heading">
			<div class="col-lg-10">
				<h2></h2> 
				<ol class="breadcrumb">
					<li><a href="#">资料信息管理</a></li>
					<li><a href="<%=path %>/course/courseMessage">课程信息</a></li>			
				</ol>
			</div>
		</div>
		<div class="wrapper wrapper-content  animated fadeInRight">
			<div class="row">
			    <!-- 筛选条件开始 -->
				<div id="query" class="ibox-content m-b-sm border-bottom">
				<form id="exportForm" action="exportMessage" method="post">
					<div class="row">
						<div class="col-sm-3">
							<div class="form-group">
							    <label class="control-label" for="courseNum">课程编号</label>
							    <input type="text" id="courseNum" name="courseNum" class="form-control">
							</div>
						</div>
						<div class="col-sm-3">
							<div class="form-group">
							    <label class="control-label" for="courseName">课程名称</label>
							    <input type="text" id="courseName" name="courseName" class="form-control">
							</div>
						</div>
						<div class="col-sm-3">
							<div class="form-group">
							    <label class="control-label" for="credit">学分</label>
							    <input type="text" id="credit" name="credit" class="form-control">
							</div>
						</div>
						<div class="col-sm-3">
							<div class="form-group">
							    <label class="control-label" for="grade">适用年级</label>
							    <select id="grade" name="grade" class="selectpicker show-tick form-control"  data-live-search="true">
                                		<option value="">请选择</option>
                                	</select>
							</div>
						</div>
						<div class="col-sm-3">
							<div class="form-group">
							    <label class="control-label" for="openCourseCollege">开课学院</label>
							    <select id="openCourseCollege" name="openCourseCollege" class="selectpicker show-tick form-control"  data-live-search="true">
                                		<option value="">请选择</option>
                                	</select>
							</div>
						</div>
						<div class="col-sm-3">
							<div class="form-group">
							    <label class="control-label" for="courseNature">是否选修</label>
							    <select id="courseNature" name="courseNature" class="selectpicker show-tick form-control"  data-live-search="true">
                                		<option value="">请选择</option>
                                		<option value="0">必修</option>
										<option value="1">选修</option>
                                	</select>
							</div>
						</div>
						<div class="col-sm-3">
							<div class="form-group">
								<label class="control-label" for="search">重置</label>
								<a id="reset" class="btn btn-w-m btn-success form-control"><i class="fa fa-refresh"></i>&nbsp;&nbsp;重置</a>
							</div>
						</div>
						<div class="col-sm-3">
							<div class="form-group">
								<label class="control-label" for="search">查询</label>
								<a id="queryBtn" class="btn btn-w-m btn-success form-control"><i class="fa fa-search"></i>&nbsp;&nbsp;查询</a>
							</div>
						</div>
					</div>
					</form>
				</div>
				<!-- 筛选条件结束 -->
			
				<!-- 分页开始 -->
				<div class="col-lg-12">
					<div class="ibox ">
						<div class="ibox-title">
							<button class="btn btn-primary" type="button" id="addButton"><i class="fa fa-plus"></i>&nbsp;新增</button>
							<button class="btn btn-info" type="button" id="editButton"><i class="fa fa-paste"></i>&nbsp; 修改</button>
							<button type="button" class="btn btn-danger" id="removeButton"><i class="fa fa-times"></i>&nbsp;删除</button>
							<button type="button" class="btn btn-warning" id="exportButton"><i class="fa fa-download"></i>&nbsp;导出</button>
						</div>
						<div class="ibox-content">
							<div class="jqGrid_wrapper">
								<table id="table_list_1"></table>
								<div id="pager_list_1"></div>
							</div>
						</div>
					</div>
				</div>
				<!-- 分页结束 -->
			</div>
		</div>
		<div class="footer">
			<div class="pull-right">
			   
			</div>
			<div>
				<strong>Copyright</strong> Example Company &copy; 2017-2019
			</div>
		</div>
	</div>
</div>

    <!-- Mainly scripts -->
    <script src="${res}/libs/bootstrap/js/jquery-1.9.1.min.js"></script>
    <script src="${res}/libs/bootstrap/js/bootstrap.min.js"></script>
    <script src="${res}/libs/bootstrap/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="${res}/libs/bootstrap/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
    <script src="${res}/libs/bootstrap/js/plugins/validate/jquery.validate.min.js"></script>
    
    <script src="${jsPath}/supplier/CommonUtils.js"></script>
    <script src="${jsPath}/supplier/My97/WdatePicker.js"></script>
    
    <script src="${res}/libs/bootstrap/js/plugins/toastr/toastr.min.js"></script>
    <script src="${res}/libs/bootstrap/js/plugins/sweetalert/sweetalert.min.js"></script>
 	<script src="${res}/libs/bootstrap/js/plugins/iCheck/icheck.min.js"></script>
    <!-- Peity -->
    <script src="${res}/libs/bootstrap/js/plugins/peity/jquery.peity.min.js"></script>

    <!-- jqGrid -->
    <script src="${res}/plugins/jqGrid/js/i18n/grid.locale-cn.js"></script>
    <script src="${res}/plugins/jqGrid/js/jquery.jqGrid.min.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="${res}/libs/bootstrap/js/sinspinia.js"></script>
    <script src="${res}/libs/bootstrap/js/plugins/pace/pace.min.js"></script> 
    <script src="${res}/libs/bootstrap/js/plugins/jquery-ui/jquery-ui.min.js"></script> 
	<script src="${res}/libs/bootstrap/js/plugins/datapicker/bootstrap-datepicker.js"></script>
	
	<script src="${jsPath}/teachmanage/course/list.js"></script>
</body>
</html>
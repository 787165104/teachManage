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
<!DOCTYPE html >
<html>

<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>课程组信息添加</title>
<link href="${res}/libs/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/css/bootstrap-select.css" rel="stylesheet">
     <link href="${jsPath}/supplier/css/fileinput.css" media="all" rel="stylesheet" type="text/css"/>
    <link href="${res}/libs/bootstrap/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/animate.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/iCheck/custom.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/toastr/toastr.min.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/jQueryUI/jquery-ui-1.10.4.custom.min.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/supplierstyle.css" rel="stylesheet">
     <link href="${jsPath}/supplier/css/IMGUP.css" rel="stylesheet">
    
    <style>
        /* Additional style to fix warning dialog position */
        #alertmod_table_list_2
            top: 900px !important;
        }
    </style>
</head>

<body>
	<input id="basePath" type="hidden" value="<%=basePath %>" />
	<input type="hidden" id="file_id" >	
	<input type="hidden" name="editFlag" id="editFlag" value="0" />
	<div id="wrapper">
		<!-- 左侧菜单 -->
		<%@include file="/WEB-INF/views/public.jsp"%>

		<!-- 页面主题内容 -->

		<div id="page-wrapper" class="gray-bg">

			<div class="row wrapper border-bottom white-bg page-heading">
				<div class="col-lg-10">
					<h2></h2>
					<ol class="breadcrumb">
						<li><a href="#">课程组管理</a></li>
						<li><a href="" class="add_Html" id="xc">修改课程组</a></li>
					</ol>
				</div>
			</div>

			<div class="wrapper wrapper-content  animated fadeInRight">
				<!-- rows -->
				<div class="row">
					<div class="col-lg-12">
						<div class="tabs-container">
							<ul class="nav nav-tabs">
								<li class="active"><a id="tab_one" data-toggle="tab"
									href="#tab-1">课程组信息</a></li>
							</ul>
							<form id="courseGroupForm" class="form-horizontal" method="post"
								novalidate="novalidate" ENCTYPE="multipart/form-data">
								<div class="tab-content">
									<div id="tab-1" class="tab-pane active">
										<input type="hidden" name="ids" id="ids"
											value="${groupId}" />
										<input type="hidden" name="groupId" id="groupId"
										value="${groupId}" />
										<div class="panel-body">
											<div class="form-horizontal">
												<div class="form-group">
														<label class="col-sm-2 control-label">所属课程:</label>
														<div class="col-sm-4">
															<select id="courseNum" name="courseNum"
																class="selectpicker show-tick form-control">
															</select>
														</div>
												</div>
											
												<div class="form-group">
													<label class="col-sm-2 control-label">课程组名称:</label>
													<div class="col-sm-4">
														<input id="groupName" name="groupName"
															class="form-control" maxlength="100" type="text"
															autocomplete="off">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">课程组组长:</label>
													<div class="col-sm-4">
														<select id="groupHeaderId" name="groupHeaderId"
															class="selectpicker show-tick form-control">
															<option value="">请选择</option>
														</select>
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">课程组成员:</label>
													<div class="col-sm-4">
														<select id="groupMemberId" name="groupMemberId"
															class="selectpicker bla bla bli" multiple data-live-search="true">
															<option value="">请选择</option>
														</select>
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">科研项目:</label>
													<div class="col-sm-4">
														<input id="groupProject" name="groupProject"
															class="form-control" maxlength="100" type="text"
															autocomplete="off">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">科研成果:</label>
													<div class="col-sm-4">
													<textarea rows="15" cols="60" id="projectResult" name="projectResult" class="form-control">
													</textarea>
														
													</div>
												</div>
												
												<div class="form-group">
													<div class="col-sm-12" style="text-align: right;">
														<button style="width: 100px;" onclick="history.go(-1)"
															class="btn btn-warning" type="button">
															<i class="fa fa-mail-forward"></i>&nbsp;&nbsp;返回
														</button>
														<button style="width: 100px;" id="saveBtn"
															class="insert btn btn-primary" type="button">
															<i class="fa fa-save"></i>&nbsp;&nbsp;保存
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
				<div class="pull-right"></div>
				<div>
					<strong>Copyright</strong> Example Company &copy; 2017-2019
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
	<script src="${res}/libs/bootstrap/js/plugins/validate/jquery.validate.min.js"></script>
	<script src="${jsPath}/supplier/CommonUtils.js"></script>
	<script src="${jsPath}/supplier/My97/WdatePicker.js"></script>

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
	<script
		src="https://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/js/bootstrap-select.min.js"></script>
	<script
		src="https://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/js/i18n/defaults-zh_CN.js"></script>
	<script src="${jsPath}/coursegroup/coursegroup/edit.js"></script>
	<script type="text/javascript">
	
	$('#publishTime').datetimepicker({
    	format: 'yyyy-mm-dd',
    	minView: 'month',
    	language:"zh-CN",
        //weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		//todayHighlight: 1,
		startView: 2,
		//forceParse: 0,
		//startDate:new Date(),
		 //showMeridian: 1
    });
	 $('#groupMemberId').selectpicker({
	        'selectedText': 'cat'
	    });
	</script>
	 
</body>
	<script type="text/javascript">
		$(function(){		   
			
		})
	
	</script>
</html>

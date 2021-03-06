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

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>教学任务详情</title>


<link
	href="https://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/css/bootstrap-select.css"
	rel="stylesheet">
<link href="${res}/libs/bootstrap/css/bootstrap.min.css"
	rel="stylesheet">
<link
	href="${res}/plugins/bootstrap_datetimepicker/css/bootstrap-datetimepicker.min.css"
	rel="stylesheet">
<link
	href="https://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/css/bootstrap-select.css"
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
<link href="${res}/libs/bootstrap/css/supplierstyle.css"
	rel="stylesheet">
<style>
/* Additional style to fix warning dialog position */
#alertmod_table_list_2 {
	top: 900px !important;

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

}
</style>
</head>

<body>
	<input id="basePath" type="hidden" value="<%=basePath%>" />
	<div id="wrapper">
		<!-- 左侧菜单 -->
		<%@include file="/WEB-INF/views/public.jsp"%>
		<!-- 页面主题内容 -->
		<div id="page-wrapper" class="gray-bg">

			<div class="row wrapper border-bottom white-bg page-heading">
				<div class="col-lg-10">
					<h2></h2>
					<ol class="breadcrumb">
						<li><a href="#">教学任务</a></li>
						<li><a href="#">教学任务详情</a></li>
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
									href="#tab-1">教学任务详情</a></li>
								<!-- 					            <li class=""><a id="tab_two" data-toggle="tab" href="#tab-2">领用人信息</a></li> -->
							</ul>
							<form id="addTeachTaskForm" class="form-horizontal" method="post"
								novalidate="novalidate">
								<div class="tab-content">
									<div id="tab-1" class="tab-pane active">
										<input type="hidden" name="id" id="id" value="${id}" />
										<div class="panel-body">
											<div class="form-horizontal">
												<div class="form-group">
													<label class="col-sm-2 control-label">课程代码:</label>
													<div class="col-sm-4">
														<input id="courseNum" name="courseNum"
															class="form-control" maxlength="100" type="text"
															autocomplete="off" readonly="readonly" value="">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">学院:</label>
													<div class="col-sm-4">
														
															<input id="openCourseCollege" name="openCourseCollege" class="form-control" maxlength="100"
																type="text" autocomplete="off" readonly="readonly"
																value="">
											
													</div>
													</div>
													<div class="form-group">
														<label class="col-sm-2 control-label">课程名称:</label>
														<div class="col-sm-4">
															
																<input id="courseName" name="courseName"
																	class="form-control" maxlength="100" type="text"
																	autocomplete="off" readonly="readonly" value="">
															

														</div>
													</div>
													<div class="form-group">
														<label class="col-sm-2 control-label">总学时:</label>
														<div class="col-sm-4">
															<input id="totalClassHours" name="totalClassHours"
																class="form-control" maxlength="100" type="text"
																autocomplete="off" readonly="readonly" value="">
														</div>
													</div>
													<div class="form-group">
														<label class="col-sm-2 control-label">理论学时:</label>
														<div class="col-sm-4">
															<input id="lectureHours" name="lectureHours"
																class="form-control" maxlength="100" type="text"
																autocomplete="off" readonly="readonly" value="">
														</div>
													</div>
													<div class="form-group">
														<label class="col-sm-2 control-label">实验学时:</label>
														<div class="col-sm-4">
															<input id="experimentalHours" name="experimentalHours"
																class="form-control" maxlength="100" type="text"
																autocomplete="off" readonly="readonly" value="">
														</div>
													</div>
													<div class="form-group">
														<label class="col-sm-2 control-label">起始周数:</label>
														<div class="col-sm-4">
															<input id="startWeak" name="startWeak"
																   class="form-control" maxlength="100" type="text"
																   autocomplete="off" readonly="readonly" value="">
														</div>
													</div>
													<div class="form-group">
														<label class="col-sm-2 control-label">结课周数:</label>
														<div class="col-sm-4">
															<input id="endWeak" name="endWeak"
																   class="form-control" maxlength="100" type="text"
																   autocomplete="off" readonly="readonly" value="">
														</div>
													</div>
													<div class="form-group">
														<label class="col-sm-2 control-label">校区:</label>
														<div class="col-sm-4">
															
																<input id="campusArea" name="campusArea"
																	class="form-control" maxlength="100" type="text"
																	autocomplete="off" readonly="readonly" value="">
															
														</div>
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">课程性质:</label>
													<div class="col-sm-4">

														<input id="courseNature" name="courseNature"
															class="form-control" maxlength="100" type="text"
															autocomplete="off" readonly="readonly" value="">
													</div>

												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">教学班组成:</label>
													<div class="col-sm-4">
														<input id="teachClass" name="teachClass"
															class="form-control" maxlength="100" type="text"
															autocomplete="off" readonly="readonly">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">年级:</label>
													<div class="col-sm-4">
														<input id="grade" name="grade" class="form-control"
															maxlength="100" type="text" autocomplete="off"
															readonly="readonly" value="">
													</div>
												</div>

											<div class="form-group">
												<label class="col-sm-2 control-label">任课教师:</label>
												<div class="col-sm-4">
													<input id="jobNumber" name="jobNumber" class="form-control"
														maxlength="100" type="text" autocomplete="off"
														readonly="readonly" value="">
												</div>
											</div>
											<div class="form-group">
												<label class="col-sm-2 control-label">任课教师职称:</label>
												<div class="col-sm-4">
													<input id="positionalTitle" name="positionalTitle" class="form-control"
														maxlength="100" type="text" autocomplete="off"
														readonly="readonly" value="">
												</div>
											</div>
											<div class="form-group">
												<label class="col-sm-2 control-label">备注:</label>
												<div class="col-sm-4">
													<input id="remark" name="remark" class="form-control"
														maxlength="100" type="text" autocomplete="off"
														readonly="readonly">
												</div>
											</div>

											<div class="form-group">
												<div class="col-sm-12" style="text-align: right;">
													<button style="width: 100px;" onclick="history.go(-1)"
														class="btn btn-warning" type="button">
														<i class="fa fa-mail-forward"></i>&nbsp;&nbsp;返回
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
	<script src="${jsPath}/taskmanage/teachtask/checkteachtask.js"></script>
	<script type="text/javascript">
		$('#add_entry_date').datetimepicker({
			format : 'yyyy-mm-dd',
			minView : 'month',
			language : "zh-CN",
			//weekStart: 1,
			todayBtn : 1,
			autoclose : 1,
		//todayHighlight: 1,
		//startView: 2,
		//forceParse: 0,
		//startDate:new Date(),
		//showMeridian: 1
		});
	</script>
</body>
<script type="text/javascript">
	$(function() {

	})
</script>
</html>

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

<title>教材信息修改</title>



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
<link href="https://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/css/bootstrap-select.css" rel="stylesheet">
<style>
/* Additional style to fix warning dialog position */
#alertmod_table_list_2
            top: 900px !important ; .fileinput-button {
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
						<li><a href="<%=Path %>/materialManage/materialMessage">教材信息</a></li>
						<li><a href="" class="add_Html" id="xc">修改教材</a></li>
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
									href="#tab-1">修改教材信息</a></li>
								<!-- 					            <li class=""><a id="tab_two" data-toggle="tab" href="#tab-2">领用人信息</a></li> -->
							</ul>
							<form id="materialForm" class="form-horizontal" method="post"
								novalidate="novalidate">
								<div class="tab-content">
									<div id="tab-1" class="tab-pane active">
										<input type="hidden" name="materialId" id="materialId"
											value="${materialId}" />
										<div class="panel-body">
											<div class="form-horizontal">
												<div class="form-group">
													<label class="col-sm-2 control-label">教材名称:<span
														style="color: red;">*</span></label>
													<div class="col-sm-4">
														<input id="materialName" name="materialName"
															class="form-control" maxlength="100" type="text"
															autocomplete="off">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">作者:<span
														style="color: red;">*</span></label>
													<div class="col-sm-4">
														<input id="author" name="author"
															class="form-control" maxlength="100" type="text"
															autocomplete="off">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">出版社:<span
														style="color: red;">*</span></label>
													<div class="col-sm-4">
														<input id="press" name="press"
															class="form-control" maxlength="100" type="text"
															autocomplete="off">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">版次:<span
														style="color: red;">*</span></label>
													<div class="col-sm-4">
														<input id="orderNum" name="orderNum"
															class="form-control" maxlength="100" type="text"
															autocomplete="off">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">出版时间:<span
														style="color: red;">*</span></label>
													<div class="col-sm-4">
														<input id="publishTime" name="publishTime"
															class="form-control" maxlength="100" type="text"
															autocomplete="off">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">使用班级:</label>
													<div class="col-sm-4">
														<input id="useClasses" name="useClasses"
															class="form-control" maxlength="100" type="text"
															autocomplete="off">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">是否选修:</label>
													<div class="col-sm-4">
														<select id="isOptional" name="isOptional" class="selectpicker show-tick form-control">
					                                		<option value="">请选择</option>
					                                		<option value="0">必修</option>
															<option value="1">选修</option>
					                                	</select>
													</div>
													
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">校区:</label>
													<div class="col-sm-4">
															<select id="campus" name="campus"
																class="selectpicker show-tick form-control">
																<option value="">请选择</option>
															</select>
														</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">授课教师:</label>
													<div class="col-sm-4">
														<select id="jobNum" name="jobNum"
															class="selectpicker show-tick form-control">
															<option value="">请选择</option>
														</select>
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">联系电话:</label>
													<div class="col-sm-4">
														<input id="userPhone" name="userPhone"
															class="form-control" maxlength="100" type="text"
															autocomplete="off" disabled="disabled">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">获得省部以上奖教材:</label>
													<div class="col-sm-4">
														<select id="isProBook" name="isProBook" class="selectpicker show-tick form-control">
					                                		<option value="">请选择</option>
					                                		<option value="1">是</option>
															<option value="0">否</option>
					                                	</select>
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">教育部面向21世纪教材:</label>
													<div class="col-sm-4">
														<select id="isEduBook" name="isEduBook" class="selectpicker show-tick form-control" >
					                                		<option value="">请选择</option>
					                                		<option value="1">是</option>
															<option value="0">否</option>
					                                	</select>
													</div>
												</div>	
												<div class="form-group">
													<label class="col-sm-2 control-label">国家级“十三五”规划教材:</label>
													<div class="col-sm-4">
														<select id="isCouBook" name="isCouBook" class="selectpicker show-tick form-control">
					                                		<option value="">请选择</option>
					                                		<option value="1">是</option>
															<option value="0">否</option>
					                                	</select>
													</div>
												</div>		
												<div class="form-group">
													<label class="col-sm-2 control-label">自编教材/外文原版教材:</label>
													<div class="col-sm-4">
														<select id="isEditBook" name="isEditBook" class="selectpicker show-tick form-control">
					                                		<option value="">请选择</option>
					                                		<option value="1">是</option>
															<option value="0">否</option>
					                                	</select>
													</div>
												</div>	
												<div class="form-group">
													<label class="col-sm-2 control-label">备注:</label>
													<div class="col-sm-4">
														<input id="remark" name="remark"
														class="form-control" maxlength="100" type="text"
														autocomplete="off"><span id="errorMsg"></span>
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
	<script src="https://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/js/bootstrap-select.min.js"></script>
    <script src="https://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/js/i18n/defaults-zh_CN.js"></script>
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
	<script src="${jsPath}/teachmanage/teachmaterial/edit.js"></script>
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
	</script>
</body>
	<script type="text/javascript">
		$(function(){
			
		})
	
	</script>
</html>

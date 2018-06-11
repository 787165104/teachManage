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

<title>课程信息添加</title>
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
	<input type="hidden" id="file_id">	
	<input type="hidden" name="editFlag" id="editFlag" value="${editFlag}" />
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
						<li><a href="<%=Path %>/course/courseMessage">课程信息</a></li>
						<li><a href="" class="add_Html" id="xc">修改课程信息</a></li>
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
									href="#tab-1">修改课程信息</a></li>
							</ul>
							<form id="courseForm" class="form-horizontal" method="post"
								novalidate="novalidate" ENCTYPE="multipart/form-data">
								<div class="tab-content">
									<div id="tab-1" class="tab-pane active">
										<input type="hidden" name="id" id="id"
											value="${id}" />
										<div class="panel-body">
											<div class="form-horizontal">
												<div class="form-group" style="display: none">
													<label class="col-sm-2 control-label">课程编号:</label>
													<div class="col-sm-4">
														<input id="courseNum" name="courseNum"
															class="form-control" maxlength="100" type="text"
															autocomplete="off">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">课程名称:</label>
													<div class="col-sm-4">
														<input id="courseName" name="courseName"
															class="form-control" maxlength="100" type="text"
															autocomplete="off">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">年级:</label>
													<div class="col-sm-4">
														<select id="grade" name="grade"
															class="selectpicker show-tick form-control">
															<option value="">请选择</option>
														</select>
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">学分:</label>
													<div class="col-sm-4">
														<input id="credit" name="credit"
															class="form-control" maxlength="100" type="text"
															autocomplete="off">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">总学时:</label>
													<div class="col-sm-4">
														<input id="totalClassHours" name="totalClassHours"
															class="form-control" maxlength="100" type="text"
															autocomplete="off">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">讲科学时:</label>
													<div class="col-sm-4">
														<input id="lectureHours" name="lectureHours"
															class="form-control" maxlength="100" type="text"
															autocomplete="off">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">实验学时:</label>
													<div class="col-sm-4">
														<input id="experimentalHours" name="experimentalHours"
															class="form-control" maxlength="100" type="text"
															autocomplete="off">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">课程实践学时:</label>
													<div class="col-sm-4">
														<input id="coursePracticeHours" name="coursePracticeHours"
															class="form-control" maxlength="100" type="text"
															autocomplete="off">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">考核方式:</label>
													<div class="col-sm-4">
														<select id="examinationMode" name="examinationMode" class="selectpicker show-tick form-control">
					                                		<option value="">请选择</option>
					                                		<option value="0">考试</option>
															<option value="1">考查</option>
					                                	</select>
													</div>
													
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">专业名称:</label>
													<div class="col-sm-4">
														<input id="professionalName" name="professionalName"
															class="form-control" maxlength="100" type="text"
															autocomplete="off">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">专业方向:</label>
													<div class="col-sm-4">
														<input id="professionalField" name="professionalField"
															class="form-control" maxlength="100" type="text"
															autocomplete="off">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">课程性质:</label>
													<div class="col-sm-4">
														<select id="courseNature" name="courseNature" class="selectpicker show-tick form-control">
					                                		<option value="">请选择</option>
					                                		<option value="0">必修</option>
															<option value="1">选修</option>
					                                	</select>
													</div>
													
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">课程类型:</label>
													<div class="col-sm-4">
														<input id="courseType" name="courseType"
															class="form-control" maxlength="100" type="text"
															autocomplete="off">
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-2 control-label">开课学院:</label>
													<div class="col-sm-4">
														<select id="openCourseCollege" name="openCourseCollege" class="selectpicker show-tick form-control">
					                                		<option value="">请选择</option>
					                                	</select>
													</div>
												</div>	
												<div id="hidDiv"class="form-group" style="display: none">
					                                 <label class="col-sm-2 control-label">已上传附件</label>
					                                <div id="fileDiv" class="col-sm-10" >
					                                	
								       				 </div>
					                                </div>
				                                 <div class="form-group" id="showDiv">
				                                 <label class="col-sm-2 control-label">上传附件(教学计划、大纲)</label>
				                                	
							           				<div class="col-sm-10">
							           				<input id="upfile" name="upfile" type="file" multiple data-min-file-count="1">
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
	<script src="${jsPath}/supplier/js/fileinput.min.js" type="text/javascript"></script>
	

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
	<script src="${jsPath}/taskmanage/invigilatetask/editInvigilateTask.js"></script>
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
	 <script>var Path = "<%=path%>"</script>
 <script>
    $("#upfile").fileinput({
        language: 'zh', //设置语言
        uploadUrl: Path + "/course/editCourseFile", //上传的地址
       allowedFileExtensions: ['doc','docx','txt','zip'],//接收的文件后缀
       //uploadExtraData:{"id": 1, "fileName":'123.mp3'},
        uploadAsync: false, //默认异步上传
        showCancel:false,
        showUpload:false, //是否显示上传按钮
        showRemove :true, //显示移除按钮
        showPreview :true, //是否显示预览
        showCaption:true,//是否显示标
        browseClass:"btn btn-primary", //按钮样式    
        dropZoneEnabled: false,//是否显示拖拽区域
       //minImageWidth: 50, //图片的最小宽度
       //minImageHeight: 50,//图片的最小高度
       //maxImageWidth: 1000,//图片的最大宽度
       //maxImageHeight: 1000,//图片的最大高度
        //maxFileSize:0,//单位为kb，如果为0表示不限制文件大小
       //minFileCount: 0,
        maxFileCount:3, //表示允许同时上传的最大文件个数
        enctype:'multipart/form-data',
       validateInitialCount:true,
        previewFileIcon: "<iclass='glyphicon glyphicon-king'></i>",
       msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
        layoutTemplates:{
    	   actionUpload:"",
       } ,
       uploadExtraData:function (previewId, index) {    
    	 //注意这里，传参是json格式,后台直接使用对象属性接收，比如employeeCode，我在RatingQuery 里面直接定义了employeeCode属性，然后最重要的也是
    	 //最容易忽略的，传递多个参数时，不要忘记里面大括号{}后面的分号，这里可以直接return {a:b}; 或者{a:b}都可以，但必须要有大括号包裹
                 var data = {
                		 courseNum :$("#courseNum").val(),
                 };
                 return data;
            },
   }).on("filebatchuploadsuccess", function (event, data, previewId, index){
	 //添加
	 var status = data.response.status;
	 var msg = data.response.msg;
	 
	 if(status==false){
		 msg = "附件上传失败!";
	 }
	 var editflag = data.response.editflag;
	 if(editflag==true){
		 swal({
		        title: "操作提示！",
		        text: "课程信息修改成功!"+msg,
		        type: "success",
		        showCancelButton: false,
		        confirmButtonColor: "#00CC99",
		        confirmButtonText: "返回列表",
		        //cancelButtonText: "继续添加",
		        closeOnConfirm: false
		    }, function (confirm) {
		    	if(confirm){
		    		 window.location.href='courseMessage';
		    	}
		    });
	 }else{
		//修改
		 swal({
		        title: "操作提示！",
		        text: "课程信息修改失败！"+msg,
		        type: "success",
		        showCancelButton: false,
		        confirmButtonColor: "#f7a54a",
		      
		        confirmButtonText: "返回列表",
		        closeOnConfirm: false
		    }, function (confirm) {
		    	if(confirm){
		    		 window.location.href='courseMessage';
		    	}
		    });
	 }
	
			
});
</script>
</body>
</html>

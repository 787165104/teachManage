<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", -10);
	String path = (String) request.getContextPath();
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

<title>首页</title>


<script src="${res}/libs/bootstrap/js/jquery-1.9.1.min.js"></script>
<script src="${res}/libs/bootstrap/js/bootstrap.min.js"></script>
<script src="${jsPath}/stamp/js/echarts.min.js" type="text/javascript"></script>

<script>
    var Path = "<%=path%>";
</script>

<link href="${res}/libs/bootstrap/css/bootstrap.min.css"
	rel="stylesheet">
<link href="${res}/libs/bootstrap/font-awesome/css/font-awesome.css"
	rel="stylesheet">
<link href="${res}/libs/bootstrap/css/supplierstyle.css"
	rel="stylesheet">
<style>
/* Additional style to fix warning dialog position */
#alertmod_table_list_2
top:900px !important;
}
</style>
    <script src="${res}/libs/bootstrap/js/jquery-1.9.1.min.js"></script>
        <script src="${res}/libs/bootstrap/js/bootstrap.min.js"></script>
     <script src="${jsPath}/stamp/js/locale/zh.js" type="text/javascript"></script>
     <script src="${jsPath}/stamp/themes/fa/theme.js" type="text/javascript"></script>
    <script>var Path = "<%=path%>"</script>
     
    <link href="${res}/libs/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/supplierstyle.css" rel="stylesheet">
    <style>
        /* Additional style to fix warning dialog position */
        #alertmod_table_list_2
            top: 900px !important;
        }
    </style>
    <script src="${res}/libs/bootstrap/js/jquery-1.9.1.min.js"></script>
        <script src="${res}/libs/bootstrap/js/bootstrap.min.js"></script>
   <script>var Path = "<%=path%>"</script>
     
    <link href="${res}/libs/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/supplierstyle.css" rel="stylesheet">
    <style>
        /* Additional style to fix warning dialog position */
        #alertmod_table_list_2
            top: 900px !important;
        }
    </style>
</head>

<body>

	<div id="wrapper">

		<!-- 左侧菜单 -->

		<%@include file="/WEB-INF/views/public.jsp"%>


		<!-- 页面主题内容 -->

		<div id="page-wrapper" class="gray-bg" >

			<div class="row wrapper border-bottom white-bg page-heading">
				<div class="col-lg-4">
					<h2></h2>
					<ol class="breadcrumb">
						<li><a href="">Home</a></li>

					</ol>
				</div>
				
			</div>

				<div >
					<h2 align="center" style="font-weight: bold;">教学管理系统</h2>
				</div>
			<div class="wrapper wrapper-content  animated fadeInRight" style="margin-top: 0px;padding-top: 0px;">
			    <span align="left" style="font-weight: bold;font-size:large;" id="tText">暂无数据</span>
				<div align="center">
					<img id="tImg" alt="没有数据" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512029705815&di=e584739c4ba9eb45a98b5653ee2166f4&imgtype=0&src=http%3A%2F%2Fmedia.giphy.com%2Fmedia%2Fa0g5I2b3COsmc%2Fgiphy-tumblr.gif">
				</div>
				<div class="container-fluid">
				<div class="row">
				    
					<div id="container" name="container" class="col-xs-6"
						style="width: 50%; height: 450px"></div>
					<div id="container2" name="container2" class="col-xs-6"
						style="width: 50%; height: 450px"></div>
				</div>
				</div>
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
	<script src="${res}/libs/bootstrap/js/bootstrap.min.js"></script>
	<script
		src="${res}/libs/bootstrap/js/plugins/metisMenu/jquery.metisMenu.js"></script>
	<script
		src="${res}/libs/bootstrap/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
	<script src="${res}/libs/bootstrap/js/plugins/toastr/toastr.min.js"></script>

	<script
		src="${res}/libs/bootstrap/js/plugins/sweetalert/sweetalert.min.js"></script>
	<script src="${res}/libs/bootstrap/js/plugins/iCheck/icheck.min.js"></script>
	<!-- Peity -->
	<script
		src="${res}/libs/bootstrap/js/plugins/peity/jquery.peity.min.js"></script>

	<!-- jqGrid -->
	<script src="${res}/plugins/jqGrid/js/i18n/grid.locale-cn.js"></script>
	<script src="${res}/plugins/jqGrid/js/jquery.jqGrid.min.js"></script>

    <script src="${res}/libs/bootstrap/js/plugins/sweetalert/sweetalert.min.js"></script>
 	<script src="${res}/libs/bootstrap/js/plugins/iCheck/icheck.min.js"></script>
 	<!-- Peity -->
    <script src="${res}/libs/bootstrap/js/plugins/peity/jquery.peity.min.js"></script>

    <!-- jqGrid -->
    <script src="${res}/plugins/jqGrid/js/i18n/grid.locale-cn.js"></script>
    <script src="${res}/plugins/jqGrid/js/jquery.jqGrid.min.js"></script>
	<!-- Custom and plugin javascript -->
	<script src="${res}/libs/bootstrap/js/sinspinia.js"></script>
</body>

</html>

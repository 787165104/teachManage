<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	response.setHeader("Pragma","No-cache");    
	response.setHeader("Cache-Control","no-cache");    
	response.setDateHeader("Expires", -10);
	String path = (String)request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@include file="/WEB-INF/views/base.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>登录</title>
	<link href="${res}/libs/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <style type="text/css">
    	body{
         background: url(${imgPath}/bgf.jpg);
        }
    </style>
</head>
<body>
<div class="container">
        <div class="row" style="padding-top: 250px">
            <div class="form-horizontal col-md-offset-4" id="login_form">
            <form role="form" action="logining" method="post" name="loginForm" id="loginForm">
                <h3 class="form-title" style="color: yellow">计算机系教学资料管理系统</h3>
                <div class="col-md-5">
	                <div class="form-group">
	                	<div class="input-group">
	                        <span class="input-group-addon" id="acc"><i class="fa fa-user fa-lg"></i></span>
	                        <input class="form-control required" type="text" placeholder="账号" required="required" id="loginId" value="${loginId }" name="loginId" aria-describedby="acc"/>
	                    </div> 
	                    <div id="haha"></div> 
	                </div>
	                <div class="form-group">
	                	<div class="input-group">
	                        <span class="input-group-addon" id="pass"><i class="fa fa-lock fa-lg"></i></span>
	                        <input class="form-control required" type="password" placeholder="密码" required="required" id="loginPwd" name="loginPwd" maxlength="20" aria-describedby="pass"/>
	                    </div> 
	                </div>
                    <div class="form-group">
                        <label class="checkbox" style="padding-left: 25px">
                            <input type="checkbox" name="sessionStatus" value="true"/>记住我
                        </label>
                    </div>
                    <div class="error"></div>
                    <c:if test="${!empty msg }">
						<div id="errorMsg" style="margin-top: 5px; text-align: right; color: red;"><label>${msg }</label></div>
					</c:if>
                    <div class="form-group col-md-offset-9">
                        <button type="submit" class="btn btn-success pull-right" name="submit">登录</button>
                    </div>
                </div>
               </form>
            </div>
        </div>
    </div>
    <script src="${res}/libs/bootstrap/js/jquery-1.9.1.min.js"></script>
	<script src="${res}/libs/bootstrap/js/bootstrap.min.js"></script>
    
</body>
</html>
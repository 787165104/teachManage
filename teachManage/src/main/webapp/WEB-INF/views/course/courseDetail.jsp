<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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

    <title>读者信息详情</title>

    
    
    <link href="${res}/libs/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/bootstrap-select/2.0.0-beta1/css/bootstrap-select.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/animate.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/iCheck/custom.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/toastr/toastr.min.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/plugins/jQueryUI/jquery-ui-1.10.4.custom.min.css" rel="stylesheet">
    <link href="${res}/libs/bootstrap/css/supplierstyle.css" rel="stylesheet">
         <link href="${jsPath}/supplier/css/IMGUP.css" rel="stylesheet">
    
    <style>
        
        #alertmod_table_list_2
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
						<li><a href="<%=Path %>/course/courseMessage">课程信息</a></li>
						<li><a href="" class="add_Html" id="xc">详情</a></li>
						
					</ol>
				</div>
            </div>
        <div class="wrapper wrapper-content  animated fadeInRight">
        <div class="row">
	        	<!-- row开始 -->
	           <div class="row">
                	<div class="col-lg-12">
	                    <div class="ibox float-e-margins">
	                        <div class="ibox-title">
	                            <h5>读者信息详情</h5>
	                        </div>
	                        <div class="ibox-content">
	                        	<form id="editForm" class="form-horizontal"  method="post" novalidate="novalidate">
	                        	<input type="hidden" name="ids" id="ids" value="${courseNum}">
	                        		<div class="form-group"><label class="col-sm-2 control-label">课程编号:</label>
	                                    <div class="col-sm-10">
	                                    <span id="courseNum" class="form-control" style="border: 0px;"></span>
	                                  	</div>
	                                </div>
	                                <div class="form-group"><label class="col-sm-2 control-label">课程名称:</label>
	                                    <div class="col-sm-10">
	                                    <span id="courseName" class="form-control" style="border: 0px;"></span>
	                                  	</div>
	                                </div>
	                                 <div class="form-group"><label class="col-sm-2 control-label">适用年级:</label>
	                                    <div class="col-sm-10">
	                                    <span id="grade" class="form-control" style="border: 0px;"></span>
	                                  	</div>
	                                </div>
		      
	                                <div class="form-group"><label class="col-sm-2 control-label">学分:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="credit" class="form-control" style="border: 0px;"></span>
	                                    </div>
	                                </div>
	                                
	                                <div class="form-group"><label class="col-sm-2 control-label">总学时:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="totalClassHours" class="form-control" style="border: 0px;"></span>
	                                    </div>
	                                </div>
	                                
	                                <div class="form-group"><label class="col-sm-2 control-label">讲科学时:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="lectureHours" class="form-control" style="border: 0px;"></span>
	                                    	
	                                    </div>
	                                </div>
	                                  <div class="form-group"><label class="col-sm-2 control-label">实验学时:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="experimentalHours" class="form-control" style="border: 0px;"></span>
	                                    	
	                                    </div>
	                                </div>
	                                
	                               
	                                
	                                <div class="form-group"><label class="col-sm-2 control-label">课程实践学时:</label>
	                                    <div class="col-sm-10">
	                                     <span id="coursePracticeHours" class="form-control" style="border: 0px;"></span>
	                                    </div>
	                                </div>
	                                
	                                <div class="form-group"><label class="col-sm-2 control-label">考核方式:</label>
	                                    <div class="col-sm-10">
	                                     <span id="examinationMode" class="form-control" style="border: 0px;"></span>
	                                    </div>
	                                </div>
	                                <div class="form-group"><label class="col-sm-2 control-label">专业名称:</label>
                                 	<div class="col-sm-10">
                                      	 <span id="professionalName" class="form-control" style="border: 0px;"></span>
                                    </div>
	                                </div>
	                                 <div class="form-group"><label class="col-sm-2 control-label">专业方向:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="professionalField" class="form-control" style="border: 0px;"></span>
	                                    	
	                                    </div>
	                                </div>
	                                
	                                <div class="form-group"><label class="col-sm-2 control-label">课程性质:</label>
	                                    <div class="col-sm-10">
	                                    	<span id="courseNature" class="form-control" style="border: 0px;"></span>
	                                    </div>
	                                </div>
	                                
	                                <div class="form-group"><label class="col-sm-2 control-label">课程类型:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="courseType" class="form-control" style="border: 0px;"></span>
	                                    	
	                                    </div>
	                                </div>
	                                <div class="form-group"><label class="col-sm-2 control-label">开课学院:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="openCourseCollege" class="form-control" style="border: 0px;"></span>
	                                    	
	                                    </div>
	                                </div>
	                                <div class="form-group"><label class="col-sm-2 control-label">附件下载(教学计划、教学大纲):</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="upfile" class="form-control" style="border: 0px;"></span>
	                                    	
	                                    </div>
	                                </div>
	                                <div class="form-group"><label class="col-sm-2 control-label">添加人:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="addUser" class="form-control" style="border: 0px;"></span>
	                                    	
	                                    </div>
	                                </div>
	                                <div class="form-group"><label class="col-sm-2 control-label">添加时间:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="addTime" class="form-control" style="border: 0px;"></span>
	                                    	
	                                    </div>
	                                </div>
	                                <div class="form-group"><label class="col-sm-2 control-label">修改人:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="modifyUser" class="form-control" style="border: 0px;"></span>
	                                    	
	                                    </div>
	                                </div>
	                                <div class="form-group"><label class="col-sm-2 control-label">修改时间:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="modifyTime" class="form-control" style="border: 0px;"></span>
	                                    	
	                                    </div>
	                                </div>
	                                
	                            </form> 
	                            	<div class="form-group" style="padding-top: inherit;">
	                                    <div class="col-sm-12" style="text-align: right">
	                                       <button id="returnBtn" style="width:100px;" onclick="history.go(-1)" class="btn btn-warning" ><i class="fa fa-mail-forward"></i>&nbsp;&nbsp;返回</button>
	                                    </div>
	                                </div>   
	                        </div>
	                    </div>
                	</div>
            	</div>
	            <!-- row结束 -->	
	             
                            		
	        </div>
          
        </div>
        <div class="footer">
            <div class="pull-right">
               
            </div>
            <div>
                <strong>Copyright</strong> BMS Company &copy; 2017-2019
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
    <!-- Peity -->
    <script src="${res}/libs/bootstrap/js/plugins/peity/jquery.peity.min.js"></script>

    <!-- jqGrid -->

    <!-- Custom and plugin javascript -->
    <script src="${res}/libs/bootstrap/js/sinspinia.js"></script>
    <script src="${res}/libs/bootstrap/js/plugins/pace/pace.min.js"></script> 
    <script src="${res}/libs/bootstrap/js/plugins/jquery-ui/jquery-ui.min.js"></script> 
	<script src="${res}/libs/bootstrap/js/plugins/datapicker/bootstrap-datepicker.js"></script>
	 <script src="${res}/libs/bootstrap/js/plugins/sweetalert/sweetalert.min.js"></script>
	<script src="${jsPath}/teachmanage/course/detail.js"></script>

</body>

</html>

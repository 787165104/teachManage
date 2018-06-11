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
						<li><a href="<%=path %>/materialManage/materialMessage">教材信息</a></li>
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
	                        	<input type="hidden" name="ids" id="ids" value="${materialId}">
	                        		<div class="form-group"><label class="col-sm-2 control-label">教材编号:</label>
	                                    <div class="col-sm-10">
	                                    <span id="materialId" class="form-control" style="border: 0px;"></span>
	                                  	</div>
	                                </div>
	                                <div class="form-group"><label class="col-sm-2 control-label">教材名称:</label>
	                                    <div class="col-sm-10">
	                                    <span id="materialName" class="form-control" style="border: 0px;"></span>
	                                  	</div>
	                                </div>
	                                 <div class="form-group"><label class="col-sm-2 control-label">作者:</label>
	                                    <div class="col-sm-10">
	                                    <span id="author" class="form-control" style="border: 0px;"></span>
	                                  	</div>
	                                </div>
		      
	                                <div class="form-group"><label class="col-sm-2 control-label">出版社:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="press" class="form-control" style="border: 0px;"></span>
	                                    </div>
	                                </div>
	                                
	                                <div class="form-group"><label class="col-sm-2 control-label">版次:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="orderNum" class="form-control" style="border: 0px;"></span>
	                                    </div>
	                                </div>
	                                <div class="form-group"><label class="col-sm-2 control-label">使用课程:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="courseNum" class="form-control" style="border: 0px;"></span>
	                                    	
	                                    </div>
	                                </div>
	                                <div class="form-group"><label class="col-sm-2 control-label">出版时间:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="publishTime" class="form-control" style="border: 0px;"></span>
	                                    	
	                                    </div>
	                                </div>
	                                  <div class="form-group"><label class="col-sm-2 control-label">使用班级:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="useClasses" class="form-control" style="border: 0px;"></span>
	                                    	
	                                    </div>
	                                </div>
	                                
	                               
	                                
	                                <div class="form-group"><label class="col-sm-2 control-label">是否选修:</label>
	                                    <div class="col-sm-10">
	                                     <span id="isOptional" class="form-control" style="border: 0px;"></span>
	                                    </div>
	                                </div>
	                                
	                                <div class="form-group"><label class="col-sm-2 control-label">使用校区:</label>
	                                    <div class="col-sm-10">
	                                     <span id="campus" class="form-control" style="border: 0px;"></span>
	                                    </div>
	                                </div>
	                                <div class="form-group"><label class="col-sm-2 control-label">使用年级:</label>
	                                    <div class="col-sm-10">
	                                     <span id="useGrade" class="form-control" style="border: 0px;"></span>
	                                    </div>
	                                </div>
	                                <div class="form-group"><label class="col-sm-2 control-label">授课教师:</label>
                                 	<div class="col-sm-10">
                                      	 <span id="jobNum" class="form-control" style="border: 0px;"></span>
                                    </div>
	                                </div>
	                                 <div class="form-group"><label class="col-sm-2 control-label">联系电话:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="userPhone" class="form-control" style="border: 0px;"></span>
	                                    	
	                                    </div>
	                                </div>
	                                
	                                <div class="form-group"><label class="col-sm-2 control-label">获得省部以上奖教材:</label>
	                                    <div class="col-sm-10">
	                                    	<span id="isProBook" class="form-control" style="border: 0px;"></span>
	                                    </div>
	                                </div>
	                                
	                                <div class="form-group"><label class="col-sm-2 control-label">教育部面向21世纪教材:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="isEduBook" class="form-control" style="border: 0px;"></span>
	                                    	
	                                    </div>
	                                </div>
	                                <div class="form-group"><label class="col-sm-2 control-label">国家级“十三五”规划教材:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="isCouBook" class="form-control" style="border: 0px;"></span>
	                                    	
	                                    </div>
	                                </div>
	                                <div class="form-group"><label class="col-sm-2 control-label">自编教材/外文原版教材:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="isEditBook" class="form-control" style="border: 0px;"></span>
	                                    	
	                                    </div>
	                                </div>
	                                <div class="form-group"><label class="col-sm-2 control-label">备注:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="remark" class="form-control" style="border: 0px;"></span>
	                                    	
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
	                                <!-- <div class="form-group"><label class="col-sm-2 control-label">修改人:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="modifyUser" class="form-control" style="border: 0px;"></span>
	                                    	
	                                    </div>
	                                </div>
	                                <div class="form-group"><label class="col-sm-2 control-label">修改时间:</label>
	                                    <div class="col-sm-10">
	                                    	 <span id="modifyTime" class="form-control" style="border: 0px;"></span>
	                                    	
	                                    </div>
	                                </div> -->
	                                
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
	<script src="${jsPath}/teachmanage/teachmaterial/detail.js"></script>

</body>

</html>

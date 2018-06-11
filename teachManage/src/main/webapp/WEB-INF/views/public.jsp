<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", -10);
    String Path = (String) request.getContextPath();
%>
<nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">
            <li class="nav-header">
                <div class="dropdown profile-element">
                    <a href="">
				    <span class="clear"> 
					    <span class="block m-t-xs"> 
					    	<strong class="font-bold">${USERINFO.userName}</strong>
					    </span>
				    </span>
                    </a>
                </div>
            </li>
            <li>
                <a href="#"><i class="fa fa-cog"></i> <span class="nav-label">人事信息管理</span> <span
                        class="fa arrow"></span></a>
                <ul class="nav nav-second-level collapse">
                    <li><a href="<%=Path %>/userInfo/userList">教师信息管理</a></li>
                    <li><a href="<%=Path %>">教师审批</a></li>
                    <li><a href="<%=Path %>">系统日志</a></li>
                    <li><a href="<%=Path %>">权限管理</a></li>
                </ul>
            </li>
            <li>
                <a href="<%=Path %>/courseGroupManage/courseGroupView"><i class="fa fa-cog"></i> <span class="nav-label">课程组管理</span></a>
            </li>
            <li>
                <a href="#"><i class="fa fa-cog"></i> <span class="nav-label">资料信息管理</span> <span
                        class="fa arrow"></span></a>
                <ul class="nav nav-second-level collapse">
                    <li><a href="<%=Path %>/materialManage/materialMessage">教材信息</a></li>
                    <li><a href="<%=Path %>/course/courseMessage">课程信息</a></li>
                </ul>
            </li>

            <li>
                <a href="<%=Path %>"><i class="fa fa-cog"></i> <span class="nav-label">教学计划</span><span
                        class="fa arrow"></span></a>
                <ul class="nav nav-second-level collapse">
                    <li><a href="<%=Path %>">教学进度管理</a></li>
                </ul>
            </li>
            <li>
                <a href="#"><i class="fa fa-cog"></i> <span class="nav-label">任务管理</span> <span class="fa arrow"></span></a>
                <ul class="nav nav-second-level collapse">
                    <li><a href="<%=Path %>/teachTask/teachTask">教学任务</a></li>
                    <li><a href="<%=Path %>/invigilateTask/invigilateTask">监考任务</a></li>
                </ul>
            </li>
            <li>
                <a href="#"><i class="fa fa-cog"></i> <span class="nav-label">个人中心</span> <span class="fa arrow"></span></a>
                <ul class="nav nav-second-level collapse">
                    <li><a href="<%=Path %>">修改个人资料</a></li>
                    <li><a href="<%=Path %>">我的申请</a></li>
                    <li><a href="<%=Path %>/teachTask/myTeachTask">我的教学任务</a></li>
                    <li><a href="<%=Path %>/teachSchedule/teachSchedule">我的教学计划</a></li>
                    <li><a href="<%=Path %>">我的课表</a></li>
                    <li><a href="<%=Path %>/courseGroupManage/myCourseGroup">我的课程组</a></li>
                    <li><a href="<%=Path %>/login/loginOut">退出登录</a></li>
                    <!-- <li><a href="#">操作日志</a></li> -->
                </ul>
            </li>
        </ul>
    </div>
</nav>
package com.teachManage.controller.login;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.teachManage.model.UserInfo;
import com.teachManage.service.login.LoginService;

@Controller
@RequestMapping("login")
public class LoginController {
	@Autowired
	private LoginService loginService;
	/**
	 * 跳转至登录页面
	 * @return
	 */
	@RequestMapping("toLoginIndex")
	public String toLoginIndex(HttpServletRequest request,HttpServletResponse response,
			HttpSession session){
		return "login";
	}
	
	@RequestMapping("logining")
	public String Login(HttpServletRequest request,HttpServletResponse response,
			HttpSession session,UserInfo userInfo){
		List<UserInfo> userInfoList = loginService.findUserInfo(userInfo);
		if(userInfoList!=null && userInfoList.size()>0){
			UserInfo userInformation = userInfoList.get(0);
			session.setAttribute("USERINFO", userInformation);
			return "home";
			
		}else{
			request.setAttribute("loginId", userInfo.getLoginId());
			request.setAttribute("msg", "用户名或密码错误！");
			return toLoginIndex(request,response,session);
		}
		
	}
	@RequestMapping("loginOut")
	public String loginOut(HttpServletRequest request,HttpServletResponse response,HttpSession session){
		Object Usersession = session.getAttribute("USERINFO");
		if(Usersession!=null){
			session.removeAttribute("USERINFO");
		}
		return "login";
	}
}

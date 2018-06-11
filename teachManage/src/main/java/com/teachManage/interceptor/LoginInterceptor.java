package com.teachManage.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.teachManage.model.UserInfo;

@Component
public class LoginInterceptor extends HandlerInterceptorAdapter{
	
	
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		HttpSession session = request.getSession();
		
		if(session != null){
			UserInfo sysUser = (UserInfo) session.getAttribute("USERINFO");
			
			if(sysUser == null){

				String path = request.getContextPath() + "/login/toLoginIndex";
				response.sendRedirect(path);
				
				return false;
			} else {
				
				return true;
			}
		} 
		return true;
	}
	
	
}

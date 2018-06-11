package com.teachManage.service.login;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teachManage.mapper.UserInfoMapper;
import com.teachManage.model.UserInfo;

@Service
public class LoginService {
	@Autowired
	private UserInfoMapper userInfoMapper;

	public List<UserInfo> findUserInfo(UserInfo userInfo) {
		return userInfoMapper.findUserInfo(userInfo);
	}
}

package com.teachManage.service.userinfo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teachManage.mapper.UserInfoMapper;
import com.teachManage.model.UserInfo;
import com.teachManage.util.PagingResult;

/**
 * 
* @ClassName: UserInfoService  
* @Description: 用户信息业务操作
* @author Yangjh 
* @date 2018年4月11日  
*
 */
@Service
public class UserInfoService {

	@Autowired
	private UserInfoMapper userInfoMapper;
	
	/**
	 * 
	 * @Title: selectAllTeacher  
	 * @Description: 查询全体教师
	 * @Author:Yangjh
	 * @Date:2018年4月12日
	 * @return List<UserInfo>     
	 * @throws
	 */
	public List<UserInfo> selectAllTeacher() {
		
		return userInfoMapper.findAllTeacher();
	}
	
	/**
	  * @Title: selectTeacherByJobNum
	　* @Description: 根据jobNumber查询教师信息
	  * @Author yangjh
	　* @Date 2018/4/20
	  * @return UserInfo
	　* @throws
	　*/
	public UserInfo selectTeacherByJobNum(String jobNumber) {
		return userInfoMapper.selectTeacherByJobNum(jobNumber);
	}
	
	/**
	 * 
	 * @Title: selectInformationPaging  
	 * @Description: 分页查询用户信息
	 * @Author:Yangjh
	 * @Date:2018年4月11日
	 * @return PagingResult<UserInfo>     
	 * @throws
	 */
	public PagingResult<UserInfo> selectUserInfoPaging(UserInfo userInfo, int pageIndex, int pageSize){
		int total = userInfoMapper.selectUserInfoCount(userInfo);
		
		List<UserInfo> list = userInfoMapper.selectUserInfoPaging(userInfo, pageIndex, pageSize);
		PagingResult<UserInfo> pageRs = new PagingResult<UserInfo>();
		pageRs.setRowTotal(total);
		pageRs.setData(list);
		return pageRs;
	}

	/**
	 *
	 * @Title: selectTeachCourseByJobNum
	 * @Description: 根据职工号用户信息
	 * @Author:Yangjh
	 * @Date:2018年4月11日
	 * @return List<UserInfo>
	 * @throws
	 */
	public  List<UserInfo> selectTeachCourseByJobNum(String jobNumber){
		return userInfoMapper.selectTeachCourseByJobNum(jobNumber);
	}

	/**
	 *
	 * @Title: insertUserInfo
	 * @Description: 添加用户信息
	 * @Author:Yangjh
	 * @Date:2018年4月11日
	 * @param userinfo
	 * @return boolean
	 */

	public boolean insertUserInfo(UserInfo userinfo){
		return userInfoMapper.insertUserInfo(userinfo) > 0 ? true : false;
	}
	/**
	 *
	 * @Title: deleteUserInfo
	 * @Description: 删除用户信息
	 * @Author:Yangjh
	 * @Date:2018年4月11日
	 * @param
	 * @return effort
	 */
    public boolean deleteUserInfo(List<String> list) {
		Integer effort = userInfoMapper.deleteUserInfo(list);
		System.out.println(effort);
		return effort>0?true:false;
	}

	public boolean insert(String headImgName,String jobNumber) {
    	Integer effort = userInfoMapper.insert(headImgName,jobNumber);
    	return effort>0?true:false;
	}

    public boolean updateUserInfo(UserInfo userInfo) {
		Integer effort = userInfoMapper.updateUserInfo(userInfo);
		return effort>0?true:false;
    }
}

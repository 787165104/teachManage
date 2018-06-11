package com.teachManage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.teachManage.model.UserInfo;

public interface UserInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insertSelective(UserInfo record);
   

    int updateByPrimaryKeySelective(UserInfo record);

    int updateByPrimaryKey(UserInfo record);

	List<UserInfo> findUserInfo(@Param("userInfo")UserInfo userInfo);
	/**
　　 * @Description: 查询所有教师
　　 * @param
　　 * @return UserInfo
　　 * @throws
　　 * @author yangjh
　　 * @date 2018/4/20 0020 20:59
　　 */
	List<UserInfo> findAllTeacher();
	
	/**
	 * 
	 * @Title: selectTeacherByJobNum  
	 * @Description: 根据职工号查询教师
	 * @Author:Yangjh
	 * @Date:2018年4月13日
	 * @return UserInfo     
	 * @throws
	 */
	UserInfo selectTeacherByJobNum(String jobNumber);
	
	/**
	 * 
	 * @Title: selectInformationPaging  
	 * @Description: 分页查询用户信息
	 * @Author:Yangjh
	 * @Date:2018年4月11日
	 * @return List<UserInfo>     
	 * @throws
	 */
	List<UserInfo> selectUserInfoPaging(@Param("userInfo")UserInfo userInfo, @Param("pageIndex")int pageIndex, @Param("pageSize")int pageSize);
	/**
	 * 
	 * @Title: selectUserInfoCount  
	 * @Description: 查询总条数
	 * @Author:Yangjh
	 * @Date:2018年4月11日
	 * @return Integer     
	 * @throws
	 */
	Integer selectUserInfoCount(@Param("userInfo")UserInfo userInfo);
	/**
	  * @Title:
	　* @Description: 查询教师教授课程
	  * @Author yangjh
	　* @Date 2018/4/20
	  * @return UserInfo
	　* @throws
	　*/
	List<UserInfo>  selectTeachCourseByJobNum(String jobNumber);
	/**
	  * @Title:addUserInfo
	　* @Description: 添加教师信息
	  * @Author yangjh
	　* @Date 2018/4/30
	  * @return boolean
	　* @throws
	　*/
	Integer insertUserInfo (@Param("userinfo") UserInfo userinfo);
	/**
	 * @Title:addUserInfo
	　* @Description: 修改教师信息
	 * @Author yangjh
	　* @Date 2018/4/30
	 * @return boolean
	　* @throws
	　*/
	Integer updateUserInfo(@Param("userInfo") UserInfo userInfo);
	/**
	  * @Title:getMaxJobNum
	　* @Description: 得到教师最大编号
	  * @Author yangjh
	　* @Date 2018/4/30
	  * @return ${return_type}
	　* @throws
	　*/
	String getMaxJobNum();
	/**
	 * @Title:deleteUserInfo
	　* @Description: 删除教师信息
	 * @Author yangjh
	　* @Date 2018/4/30
	 * @return boolean
	　* @throws
	　*/
    Integer deleteUserInfo(@Param("list")List<String> list);

	/**
	 *
	 * @Title:insert
	 * @Description: 上传用户头像
	 * @Author yangjh
	 * @Date 2018/5/1
	 * @param headImgName
	 * @return
	 */
	Integer insert(@Param("headimg") String headImgName,@Param("jobNumber") String jobNumber);
}
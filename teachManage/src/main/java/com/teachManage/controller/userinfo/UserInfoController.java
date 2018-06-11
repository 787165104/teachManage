package com.teachManage.controller.userinfo;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.teachManage.model.UserInfo;
import com.teachManage.service.userinfo.UserInfoService;
import com.teachManage.util.FtpUtils;
import com.teachManage.util.GetIdGenerator;
import com.teachManage.util.GridDataEntity;
import com.teachManage.util.PagingResult;
import com.teachManage.util.UUIDGenerator;

/**
 * 
* @ClassName: UserInfoController  
* @Description: 用户信息管理控制层
* @author Yangjh 
* @date 2018年4月13日  
*
 */
@Controller
@RequestMapping("userInfo")
public class UserInfoController {
	@Autowired
	private UserInfoService userInfoService;
	/**
	 * 
	 * @Title: toUserInfoList  
	 * @Description: 跳转用户列表
	 * @Author:Yangjh
	 * @Date:2018年4月11日
	 * @return String     
	 * @throws
	 */
	@RequestMapping("userList")
	public String toUserInfoList(){
		return "user/userinfo/userlist";
	}
	
	/**
	 * 
	 * @Title: toUserInfoDetail  
	 * @Description: 跳转用户详情
	 * @Author:Yangjh
	 * @Date:2018年4月13日
	 * @return String     
	 * @throws
	 */
	@RequestMapping("userDetail")	
	public String toUserInfoDetail(Model model, String jobNumber){
		model.addAttribute("jobNumber",jobNumber);
		return "user/userinfo/userdetail";
	}
	/**
	 *
	 * @Title: toAddUserInfo
	 * @Description: 跳转用户添加
	 * @Author:Yangjh
	 * @Date:2018年4月13日
	 * @return String
	 * @throws
	 */
	@RequestMapping("addUserInfo")
	public String toAddUserInfo(){
		return "user/userinfo/useradd";
	}

    @RequestMapping("updateView")
	public String updateUserInfo (Model model, String jobNumber){
        model.addAttribute("jobNumber",jobNumber);
        return "user/userinfo/useradd";
    }
	/**
	 * 
	 * @Title: selectAllTeacher  
	 * @Description: 查询全体教师
	 * @Author:Yangjh
	 * @Date:2018年4月12日
	 * @return List<UserInfo>     
	 * @throws
	 */
	@RequestMapping("selectAllTeacher")
	@ResponseBody
	public List<UserInfo> selectAllTeacher() {
		List<UserInfo> list = userInfoService.selectAllTeacher();
		return list;
	}
	/**
	 * 
	 * @Title: findUserDtilsViewById  
	 * @Description: 根据职工号查询教师信息
	 * @Author:Yangjh
	 * @Date:2018年4月13日
	 * @return Map<String,Object>     
	 * @throws
	 */
	@RequestMapping("findUserByJobNumber")
	@ResponseBody
	public Map<String,Object> findUserByJobNumber (String jobNumber){
		Map<String,Object> map = new HashMap<String, Object>();
		try{
			if(!"".equals(jobNumber) && jobNumber != null){
				UserInfo userInfo = userInfoService.selectTeacherByJobNum(jobNumber);
				map.put("status", true);
				map.put("msg", "查询教师详情信息成功");
				map.put("userInfo", userInfo);
			}else{
				map.put("status", false);
				map.put("msg", "查询教师详情信息失败");
			}
			
		} catch(Exception e){
			e.printStackTrace();
			map.put("status", false);
			map.put("msg", "查询教师详情信息失败");
		}
		return map;
		
	}
	
	/**
	 * 
	 * @Title: selectInformationPaging  
	 * @Description: 分页查询用户信息
	 * @Author:Yangjh
	 * @Date:2018年4月11日
	 * @return GridDataEntity<List<UserInfo>>     
	 * @throws
	 */
	@RequestMapping("selectUserInfoPaging")
	@ResponseBody
	public GridDataEntity<List<UserInfo>> selectUserInfoPaging(UserInfo userinfo, int rows, int page){
		GridDataEntity<List<UserInfo>> gde = new GridDataEntity<List<UserInfo>>();
		int startIndex = (page - 1) * rows;
		int endIndex = rows;
		PagingResult<UserInfo> pr = userInfoService.selectUserInfoPaging(userinfo, startIndex, endIndex);
		
		int count = pr.getRowTotal();
		gde.setRecords(count);
		gde.setTotal((int)(Math.ceil(gde.getRecords()/rows)));
		gde.setRows(pr.getData());
		gde.setPage(page);
		return gde;
		
	}
	/**
	 *
	 * @Title: selectTeachCourseByJobNum
	 * @Description: 查询某老师教过的课程信息
	 * @Author:Yangjh
	 * @Date:2018年4月30日
	 * @return map
	 * @throws
	 */
	@RequestMapping("selectTeachCourseByJobNum")
	@ResponseBody
	public Map<String,Object> selectTeachCourseByJobNum(String jobNumber){
		Map<String,Object> map = new HashMap<String, Object>();
		try{
			if(!"".equals(jobNumber) && jobNumber != null){
				List<UserInfo> userInfo = userInfoService.selectTeachCourseByJobNum(jobNumber);
				map.put("status", true);
				map.put("msg", "查询教师教授课程信息成功");
				map.put("userInfo", userInfo);
			}else{
				map.put("status", false);
				map.put("msg", "查询教师教授课程详情信息失败");
			}

		} catch(Exception e){
			e.printStackTrace();
			map.put("status", false);
			map.put("msg", "查询教师教授课程详情信息失败");
		}
		return map;
	}
	/**
	 *
	 * @Title: insertUserInfo
	 * @Description: 新增教师信息
	 * @Author:Yangjh
	 * @Date:2018年4月30日
	 * @return map
	 * @throws
	 */
    @RequestMapping("insertUserInfo")
    @ResponseBody
	public Map<String,Object> insertUserInfo(UserInfo userinfo, HttpSession session, String jobNumber){
	    Map<String,Object> map = new HashMap<String,Object>();
        Object userSession = session.getAttribute("USERINFO");
        try{
            if(userSession != null){
                UserInfo user = (UserInfo)userSession;
                userinfo.setAddUser(user.getUserName());
                userinfo.setLoginId(GetIdGenerator.getLoginId());
                userinfo.setLoginPwd(GetIdGenerator.getLoginId());
                userinfo.setJobNumber(GetIdGenerator.getLoginId());
                boolean flag = userInfoService.insertUserInfo(userinfo);
                if (flag==true) {
                    map.put("status",flag);
                    map.put("msg",userinfo.getJobNumber());
                } else {
                    map.put("status",flag);
                    map.put("msg","添加用户信息失败");
                }
            }

        }catch (Exception e){
        	e.printStackTrace();
			map.put("status",false);
			map.put("msg","添加用户信息失败");
        }
		return map;
    }

	/**
	 *
	 * @Title: uploadHeadImg
	 * @Description: 上传用户头像
	 * @Author:Yangjh
	 * @Date:2018年4月30日
	 * @param headimg
	 * @param userInfo
	 * @param session
	 * @return map
	 */
	@RequestMapping("uploadHeadImg")
	@ResponseBody
    public Map<String,Object> uploadHeadImg(@RequestParam("headimg") MultipartFile headimg, UserInfo userInfo, HttpSession session){
		Object userSession = session.getAttribute("USERINFO");
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if (userSession != null) {
				String fileName = headimg.getOriginalFilename().trim();
				String uuid = UUIDGenerator.uuid();
				String fileType = fileName.split("\\.")[1];
				String headImgName = uuid+"."+fileType;
				FtpUtils ftp = new FtpUtils();
				InputStream is = headimg.getInputStream();
				boolean fg = ftp.uploadFile(FtpUtils.USER_HEADIMG, headImgName, is);
				if (fg == true) {
					userInfoService.insert(headImgName,userInfo.getJobNumber());
					map.put("status", true);
					map.put("msg", "头像上传成功");
					map.put("addflag", true);
				} else {
					map.put("status", false);
					map.put("msg", "头像上传失败");
					map.put("addflag", false);
				}
			}
		}catch (Exception e){
			e.printStackTrace();
			map.put("status", false);
			map.put("msg", "系统异常！");
			map.put("addflag", false);
		}
    	return map;

	}
    /**
     *
     * @Title: editUserInfo
     * @Description: 编辑用户信息
     * @Author:Yangjh
     * @Date:2018年4月30日
     * @param userInfo
     * @param session
     * @return map
     */
    @RequestMapping("editUserInfo")
    @ResponseBody
    public Map<String,Object> editUserInfo(UserInfo userInfo,HttpSession session){
	    Map<String,Object> map = new HashMap<String,Object>();
        map.put("status", false);
        try{
            Object userSession = session.getAttribute("USERINFO");
            if(userSession != null){
                UserInfo userInfo1 = (UserInfo) userSession;
                userInfo.setModifyUser(userInfo1.getUserName());
                boolean flag = userInfoService.updateUserInfo(userInfo);
                if(flag == true){
                    map.put("status",true);
                    map.put("msg","编辑成功!");
                } else {
                    map.put("msg", "编辑失败!");
                }
            } else {
                map.put("msg", "编辑失败,系统异常!");
            }
        }catch (Exception e){
            e.printStackTrace();
            map.put("msg", "编辑失败!");
        }
	    return map;
    }
	/**
	 *
	 * @Title: deleteUserInfo
	 * @Description: 删除教师信息
	 * @Author:Yangjh
	 * @Date:2018年4月30日
	 * @return map
	 * @throws
	 */
	@RequestMapping("deleteUserInfo")
	@ResponseBody
	public Map<String,Object> deleteUserInfo(String jobNumber){
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("status", false);
		try {
			if (!"".equals(jobNumber) && jobNumber != null) {
				System.out.println(jobNumber);
 				String jobNumber1[] = jobNumber.split(",");
				List<String> list = new ArrayList<String>();
				for (String string : jobNumber1) {
					list.add(string);
				}
				if(list!=null){
					boolean flag = userInfoService.deleteUserInfo(list);
					System.out.println(flag);
					if(flag==true){
						map.put("status", true);
						map.put("msg", "用户信息删除成功");
					}else{
						map.put("msg", "用户信息删除失败");
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("msg", "用户信息删除失败");
		}
		return map;
	}
}

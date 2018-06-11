package com.teachManage.controller.coursegroup;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.teachManage.model.CourseGroupInfo;
import com.teachManage.model.CourseGroupMembers;
import com.teachManage.model.CourseInfo;
import com.teachManage.model.UserInfo;
import com.teachManage.service.coursegroup.CourseGroupService;
import com.teachManage.service.courseinfo.CourseInfoService;
import com.teachManage.util.GetIdGenerator;
import com.teachManage.util.GridDataEntity;
import com.teachManage.util.PagingResult;

@Controller
@RequestMapping("courseGroupManage")
public class CourseGroupController {
	
	@Autowired
	private CourseGroupService courseGroupService;
	
	@Autowired
	private CourseInfoService courseInfoService;
	
	@RequestMapping("courseGroupView")
	public String courseGroupView(){
		return "courseGroup/courseGroupList";
	}
	
	@RequestMapping("selectCourseGroupPaging")
	@ResponseBody
	public GridDataEntity<List<CourseGroupInfo>> selectCourseGroupPaging(CourseGroupInfo courseGroupInfo,int rows,int page){
		GridDataEntity<List<CourseGroupInfo>> gde = new GridDataEntity<List<CourseGroupInfo>>();
		int beginIndex = rows*(page-1);
		PagingResult<CourseGroupInfo> pr = courseGroupService.selectCourseGroupPaging(courseGroupInfo,beginIndex,rows);
		int count = pr.getRowTotal();//查询数据的总数
		gde.setRecords(count);
		gde.setTotal((int)(Math.ceil(gde.getRecords()/rows)));
		gde.setRows(pr.getData());
		gde.setPage(page);
		return gde;
	}
	
	@RequestMapping("addCourseGroupView")
	public String addCourseGroupView(){
		return "courseGroup/addCourseGroup";
	}
	
	@RequestMapping("addCourseGroup")
	@ResponseBody
	public Map<String,Object> addCourseGroup(HttpSession session,CourseGroupInfo courseGroupInfo){
		Map<String,Object> map = new HashMap<String,Object>();
		Object userSession = session.getAttribute("USERINFO");
		if(userSession!=null){
			UserInfo userInfo = (UserInfo)userSession;
			courseGroupInfo.setGroupId(GetIdGenerator.getCourseGroupId());
			courseGroupInfo.setDelFlag("0");
			courseGroupInfo.setAddUser(userInfo.getLoginId());
			boolean flag = courseGroupService.addCourseGroup(courseGroupInfo);
			String arr[] = courseGroupInfo.getGroupMemberId().split(",");
			List<CourseGroupMembers> list = new ArrayList<CourseGroupMembers>();
			for(int i=0;i<arr.length;i++){
				CourseGroupMembers groupMembers = new CourseGroupMembers();
				groupMembers.setGroupId(courseGroupInfo.getGroupId());
				groupMembers.setGroupName(courseGroupInfo.getGroupName());
				groupMembers.setGroupHeaderId(courseGroupInfo.getGroupHeaderId());
				groupMembers.setMemberId(arr[i]);
				groupMembers.setGroupProject(courseGroupInfo.getGroupProject());
				groupMembers.setProjectResult(courseGroupInfo.getProjectResult());
				groupMembers.setAddUser(userInfo.getLoginId());
				groupMembers.setDelFlag("0");
				list.add(groupMembers);
			}
			for (CourseGroupMembers courseGroupMembers : list) {
				boolean fg = courseGroupService.addCourseGroupMembers(courseGroupMembers);
				if(fg==false){
					map.put("status", false);
				}
			}
			if(flag==true){
				map.put("status", "true");
				map.put("msg", "课程组添加成功");
			}else{
				map.put("status", "false");
				map.put("msg", "课程组添加失败");
			}
		}
		return map;
	}
	@RequestMapping("selectCourseList")
	@ResponseBody
	public Map<String, Object> selectCourseList(){
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			
				List<CourseInfo> list = courseInfoService.selectCourseList();
				if (list!=null) {
					map.put("status", true);
					map.put("courseList", list);
				}else {
					map.put("status", false);
				}
			}
		 catch (Exception e) {
			map.put("status", false);
			e.printStackTrace();
		}
		return map;
	} 
	
	@RequestMapping("deleteCourseGroup")
	@ResponseBody
	public Map<String,Object> deleteCourseGroup(String groupId){
		Map<String, Object> map = new HashMap<String,Object>();
		String str[] = groupId.split(",");
		for (int i = 0; i < str.length; i++) {
			boolean flag = courseGroupService.deleteCourseGroup(str[i]);
			boolean fg = courseGroupService.deleteCourseGroupMem(str[i]);
			if(flag==false || fg ==false){
				map.put("status", false);
				map.put("msg", "选择的信息删除失败");
			}else{
				map.put("status", true);
				map.put("msg", "选择的信息删除成功");
			}
		}
		return map;
	}
	@RequestMapping("courseGroupDetailsView")
	public String courseGroupDetailsView(Model model,String groupId){
		model.addAttribute("groupId", groupId);
		return "courseGroup/courseGroupDetail";
	}
	@RequestMapping("getCourseGroupDetail")
	@ResponseBody
	public Map<String,Object> getCourseGroupDetail(String groupId,String editFlag){
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			if("0".equals(editFlag)){
				//此处调用的是修改的方法
				CourseGroupInfo courseGroupInfo = courseGroupService.getEditCourseGroupDetail(groupId);
				List<CourseGroupMembers> groupMembers = courseGroupService.getEditCourseGroupMemberDetail(groupId);
				map.put("status", true);
				if(courseGroupInfo!=null){
					map.put("courseGroupInfo", courseGroupInfo);
				}
				if(groupMembers!=null){
					map.put("groupMembers", groupMembers);
				}
			}else{
				CourseGroupInfo courseGroupInfo = courseGroupService.getCourseGroupDetail(groupId);
				List<CourseGroupMembers> groupMembers = courseGroupService.getCourseGroupMemberDetail(groupId);
				map.put("status", true);
				if(courseGroupInfo!=null){
					map.put("courseGroupInfo", courseGroupInfo);
				}
				if(groupMembers!=null){
					map.put("groupMembers", groupMembers);
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}
	@RequestMapping("myCourseGroup")
	public String myCourseGroup(HttpSession session,Model model){
		Object userSession = session.getAttribute("USERINFO");
		if(userSession!=null){
			UserInfo info = (UserInfo)userSession;
			model.addAttribute("loginId", info.getJobNumber());	
			List<CourseGroupMembers> groupMembers = courseGroupService.findManageGroup(info.getJobNumber());
			if(groupMembers.size()>0){
				CourseGroupMembers member = groupMembers.get(0);
				if(member!=null){
					model.addAttribute("groupId", member.getGroupId());
					return "courseGroup/manageCourseGroup";
				}else{
					return "courseGroup/myCourseGroup";
				}
			}else{
				return "courseGroup/myCourseGroup";
			}
			
			
		}else{
			model.addAttribute("loginId", null);
		}
		return null;
	}
	@RequestMapping("getMyCourseGroup")
	@ResponseBody
	public Map<String,Object> getMyCourseGroup(String loginId){
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			List<CourseGroupMembers> groupMembers = courseGroupService.getMyCourseGroup(loginId);
			map.put("status", true);
			map.put("courseGroup", groupMembers.get(0));		
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	} 
	@RequestMapping("addProjectResult")
	@ResponseBody
	public Map<String,Object> addProjectResult(HttpSession session,CourseGroupMembers members){
		Map<String,Object> map = new HashMap<String,Object>();
		/*try {*/
			Object userSession = session.getAttribute("USERINFO");
			if(userSession!=null){
				UserInfo info = (UserInfo)userSession;
				members.setModifyUser(info.getJobNumber());
				members.setMemberId(info.getJobNumber());
			}
			boolean flag = courseGroupService.addProjectResult(members);
			if(flag==true){
				map.put("status", true);
				map.put("msg", "科研成果添加成功");
			}else{
				map.put("status", false);
				map.put("msg", "科研成果添加失败");
			}
		/*} catch (Exception e) {
			e.printStackTrace();
			map.put("status", false);
			map.put("msg", "科研成果添加失败");
		}*/
		
		return map;
	}
	@RequestMapping("addHeaderProjectResult")
	@ResponseBody
	public Map<String,Object> addHeaderProjectResult(HttpSession session,CourseGroupInfo members){
		Map<String,Object> map = new HashMap<String,Object>();
		/*try {*/
			Object userSession = session.getAttribute("USERINFO");
			if(userSession!=null){
				UserInfo info = (UserInfo)userSession;
				members.setModifyUser(info.getJobNumber());
			}
			boolean flag = courseGroupService.addHeaderProjectResult(members);
			if(flag==true){
				map.put("status", true);
				map.put("msg", "科研成果添加成功");
			}else{
				map.put("status", false);
				map.put("msg", "科研成果添加失败");
			}
		/*} catch (Exception e) {
			e.printStackTrace();
			map.put("status", false);
			map.put("msg", "科研成果添加失败");
		}*/
		
		return map;
	}
	@RequestMapping("memberDetail")
	public String memberDetail(Model model,String memberId){
		model.addAttribute("memberId", memberId);
		return "courseGroup/memberCourseGroup";
	}
	
	@RequestMapping("getMemberCourseGroup")
	@ResponseBody
	public Map<String,Object> getMemberCourseGroup(String memberId){
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			List<CourseGroupMembers> groupMembers = courseGroupService.getMyCourseGroup(memberId);
			map.put("status", true);
			map.put("courseGroup", groupMembers.get(0));		
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	} 
	@RequestMapping("courseGroupUpdateView")
	public String courseGroupUpdateView(Model model,String groupId){
		model.addAttribute("groupId", groupId);
		return "courseGroup/editCourseGroup";
	}
	
	@RequestMapping("editCourseGroup")
	@ResponseBody
	public Map<String, Object> editCourseGroup(CourseGroupInfo groupInfo,HttpSession session){
		Map<String, Object> map = new HashMap<String, Object>();
		Object userSession = session.getAttribute("USERINFO");
		if(userSession!=null){
			UserInfo info = (UserInfo)userSession;
			groupInfo.setModifyUser(info.getJobNumber());
			boolean flag = courseGroupService.deleteGroupMembers(groupInfo.getGroupId()); 
			if (flag) {
				boolean fg = courseGroupService.updateCourseGroup(groupInfo);
				String arr[] = groupInfo.getGroupMemberId().split(",");
				List<CourseGroupMembers> list = new ArrayList<CourseGroupMembers>();
				for(int i=0;i<arr.length;i++){
					CourseGroupMembers groupMembers = new CourseGroupMembers();
					groupMembers.setGroupId(groupInfo.getGroupId());
					groupMembers.setGroupName(groupInfo.getGroupName());
					groupMembers.setGroupHeaderId(groupInfo.getGroupHeaderId());
					groupMembers.setMemberId(arr[i]);
					groupMembers.setGroupProject(groupInfo.getGroupProject());
					groupMembers.setProjectResult(groupInfo.getProjectResult());
					groupMembers.setAddUser(info.getLoginId());
					groupMembers.setModifyUser(info.getLoginId());
					groupMembers.setDelFlag("0");
					list.add(groupMembers);
				}
				for (CourseGroupMembers courseGroupMembers : list) {
					boolean flg = courseGroupService.addCourseGroupMembers(courseGroupMembers);
					if(flg==false){
						map.put("status", false);
					}
				}
			}
		}
		return map;
	}
}

package com.teachManage.controller.teachtask;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.teachManage.model.Academy;
import com.teachManage.model.Campus;
import com.teachManage.model.CourseInfo;
import com.teachManage.model.Grade;
import com.teachManage.model.TeachTask;
import com.teachManage.model.UserInfo;
import com.teachManage.service.academy.AcademyService;
import com.teachManage.service.campus.CampusService;
import com.teachManage.service.courseinfo.CourseInfoService;
import com.teachManage.service.grade.GradeService;
import com.teachManage.service.teachtask.TeachTaskService;
import com.teachManage.service.userinfo.UserInfoService;
import com.teachManage.util.ExportExcel;
import com.teachManage.util.GetIdGenerator;
import com.teachManage.util.GridDataEntity;
import com.teachManage.util.PagingResult;
import com.teachManage.util.UUIDGenerator;

@Controller
@RequestMapping("teachTask")
public class TeachTaskController {
@Resource
TeachTaskService teachTaskService;
@Resource
CampusService campusService;
@Resource
GradeService gradeService;
@Resource
UserInfoService userInfoService;
@Resource 
CourseInfoService courseInfoService;
@Resource
AcademyService academyService;

   /*
    * 跳转到教学任务页面
    * */
	@RequestMapping("teachTask")
    public String  teachTask(){
		return "teachtask/teachTask";
	}


    /*
     * 查询教学任务列表
     * 
     * */
	@RequestMapping("selectTeachTask")
	@ResponseBody
	public GridDataEntity<List<TeachTask>> selectTeachTask(TeachTask teachTask,int rows,int page){
		GridDataEntity<List<TeachTask>> gde=new GridDataEntity<List<TeachTask>>();
		int beginIndex = (page-1)*rows;
	    PagingResult<TeachTask> pr = teachTaskService.selectAllTeachTask(teachTask,beginIndex,rows);
	    int count = pr.getRowTotal();//查询数据的总数
		gde.setRecords(count);
		gde.setTotal((int)(Math.ceil(gde.getRecords()/rows)));
		gde.setRows(pr.getData());
		gde.setPage(page);
		return gde;
	}
	
	
    /**
     * 跳转到新增教学任务页面
     * */
	@RequestMapping("addTeachTask")
	public String  addTeachTask(){
		
		return "teachtask/addTeachTask";
	}

	/**
	 * 跳转到我的教学任务页面
	 * */
	@RequestMapping("myTeachTask")
	public String  myTeachTask(){

		return "teachtask/myTeachTask";
	}
	
	/**
	 * 添加教学任务
	 * 
	 * */
	@RequestMapping("insertTeachTask")
	@ResponseBody
	public Map<String, Object> insertTeachTask(TeachTask teachtask,HttpSession session){
		Map<String, Object> map = new HashMap<String, Object>();
		Object userSession = session.getAttribute("USERINFO");
		try {
			if(userSession!=null){
				UserInfo user=userInfoService.selectTeacherByJobNum(teachtask.getJobNumber());
				
				UserInfo userInfo = (UserInfo)userSession;
				Date now=new Date();
				SimpleDateFormat format_y = new
						SimpleDateFormat("yyyy");
				int nowYear = Integer.parseInt(format_y.format(now));
				Date bir=user.getBirthday();
				int birthdayYear = Integer.parseInt(format_y.format(bir));
				teachtask.setTeacherAge(nowYear-birthdayYear+"");
				teachtask.setTaskId(UUIDGenerator.uuid());
				teachtask.setAddUser(userInfo.getLoginId());
				teachtask.setDelFlag("0");
				teachtask.setMaterialId(GetIdGenerator.getTeachMaterialId(userInfo));
				teachtask.setPositionalTitle(userInfo.getDegree());
                if(teachtask.getCourseNature().equals("必修")){
					
					teachtask.setCourseNature("0");
				}
				else{
					teachtask.setCourseNature("1");
				}
				
				boolean flag = teachTaskService.addTeachTask(teachtask);
				if(flag==true){
					map.put("status", true);
					map.put("msg", "教学任务添加成功");
				}else {
					map.put("status", false);
					map.put("msg", "教学任务添加失败");
				}
			}else {
				map.put("status", false);
				map.put("msg", "教学任务添加失败");
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("status", false);
		}
		return map;
	}
	
	/**
	 * 查询校区列表
	 * */
	@RequestMapping("selectCampusArea")
	@ResponseBody
	public Map<String,Object> selectCampusArea(){
		Map<String,Object> map = new HashMap<String,Object>();
	
	try {
		List<Campus> list=campusService.selectAllCampus();
		if(list!=null){
			map.put("status", true);
			map.put("msg", list);
		}else{
			map.put("status", false);
		}
	} catch (Exception e) {
		map.put("status", false);
	}
	return map;
	}
	
	
	/**
	 * 查询所有年级
	 * */
	@RequestMapping("selectGrade")
	@ResponseBody
	public Map<String,Object> selectAllGrade(){
		Map<String,Object> map = new HashMap<String,Object>();
	
	try {
		List<Grade> list=gradeService.selectAllGrade();
		if(list!=null){
			map.put("status", true);
			map.put("grade", list);
		}else{
			map.put("status", false);
		}
	} catch (Exception e) {
		map.put("status", false);
	}
	return map;
	}
		

	/**
	 * 查询所有教师
	 * */
	@RequestMapping("selectTeacher")
	@ResponseBody
	public Map<String,Object> selectAllTeacher(){
		Map<String,Object> map = new HashMap<String,Object>();
	try {
		List<UserInfo> list=userInfoService.selectAllTeacher();
		if(list!=null){
			map.put("status", true);
			map.put("teacher", list);
		}else{
			map.put("status", false);
		}
	} catch (Exception e) {
		map.put("status", false);
	}
	return map;
	}
		
	
	/**
	 * 查询学院下的课程信息列表
	 * */
	@RequestMapping("findCourseByAcademyId")
	@ResponseBody
	public Map<String,Object> selectAllCourse(String academyId){
		Map<String,Object> map = new HashMap<String,Object>();
	if(academyId.isEmpty()){
			map.put("status", false);
			return map;
		}
	try {
		List<CourseInfo> list=courseInfoService.findCourseByAcademyId(academyId);
		if(list!=null){
			map.put("status", true);
			map.put("course", list);
		}else{
			map.put("status", false);
		}
	} catch (Exception e) {
		map.put("status", false);
	}
	return map;
	}
		
	/**
	 * 通过课程名称查询课程信息
	 * */
	@RequestMapping("findCourse")
	@ResponseBody
	public Map<String,Object> findCourse(String courseName){
	Map<String,Object> map = new HashMap<String,Object>();
	if(courseName.isEmpty()){
	map.put("status", false);
		return map;
	}
	try {
		List<CourseInfo> list=courseInfoService.findCourseByCourseName(courseName);
		if(list!=null){
			map.put("status", true);
			map.put("courseInfo", list);
		}else{
			map.put("status", false);
		}
	} catch (Exception e) {
		map.put("status", false);
	}
	 return map;
	}
	
	/**
	 * 查询所有学院
	 * */
	@RequestMapping("selectAllAcademy")	
	@ResponseBody
	public Map<String,Object> selectAllAcademy(){
	Map<String,Object> map = new HashMap<String,Object>();
	try {
		List<Academy> list=academyService.selectAllAcademy();
		if(list!=null){
			map.put("status", true);
			map.put("academy", list);
		}else{
			map.put("status", false);
		}
	} catch (Exception e) {
		map.put("status", false);
	}
	
	 return map;
	}
	
	/**
	 * 删除教学任务
	 * */
	@RequestMapping("deleteTeachTask")
	@ResponseBody
	public  Map<String,Object> deleteTeachTask(String readerId){
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("status", false);
		String arr[] = readerId.split(",");
		List<String> list = new ArrayList<>();
		for(int i = 0; i < arr.length; i++){
			list.add(arr[i]);
		}
		try {
			if(list != null){
				boolean flag = teachTaskService.deleteTeachTask(list);
				if(flag == true){
					map.put("status", true);
					map.put("msg", "删除成功!");
				}else{
					map.put("status", false);
					map.put("msg", "删除失败!");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("msg", "删除失败,系统异常!");
		}
		
		return map;
	}
	
	
	
    /**
     * 
     * 跳转到教学任务详情
     * */
	@RequestMapping("checkTeachTask")
	public  String checkTeachTask(String id,Model model){
		model.addAttribute("id",id);
		return "teachtask/teachTaskDetails";
	}
	
	/**
	 * 得到教学任务详情
	 * */
	@RequestMapping("getTeachTaskDetail")
	@ResponseBody
	public Map<String, Object> getTeachTaskDetail(String id){
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if(!"".equals(id) && id!=null){
				List<TeachTask> teachTask = teachTaskService.checkTeachTask(id);
				map.put("status", true);
				map.put("teachTask", teachTask);
			}else{
				map.put("status", false);
			}
		} catch (Exception e) {
			map.put("status", false);
		}
		return map;
	}
	
	/*
	 * 跳转到修改教学任务页面
	 * */
	@RequestMapping("toUpdateTeachTask")
	public  String updateTeachTask(String id,Model model){
		model.addAttribute("id",id);
		return "teachtask/updateTeachTask";
	}
	/*
	 * 跳转到教学任务
	 * */
	@RequestMapping("updateTeachTask")
	@ResponseBody
	public Map<String, Object> updateTeachTask(String id){
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if(!"".equals(id) && id!=null){
				List<TeachTask> teachTask = teachTaskService.checkTeachTask(id);
				List<CourseInfo> courseList=courseInfoService.findCourseByAcademy(teachTask.get(0).getOpenCourseCollege());
				map.put("status", true);
				map.put("teachTask", teachTask);
				map.put("courseList", courseList);
			}else{
				map.put("status", false);
			}
		} catch (Exception e) {
			map.put("status", false);
		}
		return map;
	}
	/*
	 * 修改教学任务
	 * */
	@RequestMapping("updateTeachTaskById")
	@ResponseBody
	public Map<String, Object> updateTeachTaskById(TeachTask teachtask,HttpSession session){
		Map<String, Object> map = new HashMap<String, Object>();
		Object userSession = session.getAttribute("USERINFO");
		try {
			if(userSession!=null){
				UserInfo user=userInfoService.selectTeacherByJobNum(teachtask.getJobNumber());
				
				UserInfo userInfo = (UserInfo)userSession;
				Date now=new Date();
				SimpleDateFormat format_y = new
						SimpleDateFormat("yyyy");
				int nowYear = Integer.parseInt(format_y.format(now));
				Date bir=user.getBirthday();
				int birthdayYear = Integer.parseInt(format_y.format(bir));
				teachtask.setTeacherAge(nowYear-birthdayYear+"");
				teachtask.setModifyUser(userInfo.getLoginId());
				teachtask.setMaterialId(GetIdGenerator.getTeachMaterialId(userInfo));
				teachtask.setPositionalTitle(userInfo.getDegree());
                if(teachtask.getCourseNature().equals("必修")){
					
					teachtask.setCourseNature("0");
				}
				else{
					teachtask.setCourseNature("1");
				}
				
				boolean flag = teachTaskService.updateTeachTask(teachtask);
				if(flag==true){
					map.put("status", true);
					map.put("msg", "教学任务修改成功");
				}else {
					map.put("status", false);
					map.put("msg", "教学任务修改失败");
				}
			}else {
				map.put("status", false);
				map.put("msg", "教学任务修改失败");
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("status", false);
		}
		return map;
	}
	/*
	 * 导出教学任务
	 * */
	@RequestMapping("exportTeachTask")
	public String exportService(String ids,HttpServletRequest request,
		HttpServletResponse response){
		
		try{
			System.out.println(ids);
			List<String> list = new ArrayList<String>();
			String[] arr = ids.split(",");
			for (int i = 0; i < arr.length; i++) {
				list.add(arr[i]);
			}
			
			List<Map<String, Object>> teachTaskList = teachTaskService.exportBatchTeachTask(list);
			ExportExcel.export(request, response, teachTaskList, getExcelHeader());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	private Map<String, String> getExcelHeader() {
		Map<String, String> m = new HashMap<String, String>();
		String biaoti = "教学任务表";
		String header = "课程代码,课程名称,课程性质,总学时,理论学时,实验学时,校区,教学班组成,任课教师,年龄,职称,备注,年级";
		String column = "courseNum,courseName,courseNature,"
				+ "totalClassHours,lectureHours,experimentalHours,campusArea,teachClass,jobNumber,teacherAge,positionalTitle,remark,grade";
		m.put("biaoti", biaoti);
		m.put("header", header);
		m.put("column", column);
		return m;
	}
	@RequestMapping("selectTeachTaskByjobNumber")
	@ResponseBody
	public GridDataEntity<List<TeachTask>> selectTeachTaskByjobNumber(TeachTask teachTask,HttpSession session,int rows,int page){
		GridDataEntity<List<TeachTask>> gde=new GridDataEntity<List<TeachTask>>();
		Object userSession = session.getAttribute("USERINFO");
		if(userSession!=null){
			UserInfo userInfo = (UserInfo)userSession;
			int beginIndex = (page-1)*rows;
			PagingResult<TeachTask> pr = teachTaskService.selectTeachTaskByjobNumber(userInfo.getJobNumber(),teachTask,beginIndex,rows);
			int count = pr.getRowTotal();//查询数据的总数
			gde.setRecords(count);
			gde.setTotal((int)(Math.ceil(gde.getRecords()/rows)));
			gde.setRows(pr.getData());
			gde.setPage(page);
			return gde;
		}
		return gde;
	}
}

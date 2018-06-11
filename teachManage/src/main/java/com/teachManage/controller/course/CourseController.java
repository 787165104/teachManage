package com.teachManage.controller.course;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.teachManage.model.Academy;
import com.teachManage.model.CourseInfo;
import com.teachManage.model.FileCenter;
import com.teachManage.model.UserInfo;
import com.teachManage.service.course.CourseService;
import com.teachManage.service.filecenter.FileCenterService;
import com.teachManage.util.ExportExcel;
import com.teachManage.util.FtpUtils;
import com.teachManage.util.GetIdGenerator;
import com.teachManage.util.GridDataEntity;
import com.teachManage.util.PagingResult;
import com.teachManage.util.UUIDGenerator;

@Controller
@RequestMapping("course")
public class CourseController {
	@Autowired
	private CourseService courseService;
	
	@Autowired
	private FileCenterService fileCenterService;
	/**
	 * 跳转至课程页面
	 * @return
	 */
	@RequestMapping("courseMessage")
	public String courseMessage(){
		return "course/courseList";
	}
	
	@RequestMapping("selectCoursePaging")
	@ResponseBody
	public GridDataEntity<List<CourseInfo>> selectCoursePaging(CourseInfo courseInfo,int rows,int page){
		GridDataEntity<List<CourseInfo>> gde = new GridDataEntity<List<CourseInfo>>();
		int beginIndex = rows*(page-1);
		PagingResult<CourseInfo> pr = courseService.selectCoursePaging(courseInfo,beginIndex,rows);
		int count = pr.getRowTotal();//查询数据的总数
		gde.setRecords(count);
		gde.setTotal((int)(Math.ceil(gde.getRecords()/rows)));
		gde.setRows(pr.getData());
		gde.setPage(page);
		return gde;
	}
	@RequestMapping("addCourseView")
	public String addCourseView(){
		return "course/addCourse";
	}
	/**
	 * ��ѯѧԺ�б�
	 * @return
	 */
	@RequestMapping("selectAcademyList")
	@ResponseBody
	public Map<String,Object> selectAcademyList(){
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			List<Academy> list = courseService.selectAcademyList();
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
	@RequestMapping("importCourseFile")
	@ResponseBody
	public Map<String,Object>  importCourseFile(@RequestParam("upfile")MultipartFile[] upfile,
			CourseInfo course, HttpSession session){
		Object userSession = session.getAttribute("USERINFO");
		Map<String, Object> map = new HashMap<String, Object>();
		List<FileCenter> fileList = new ArrayList<FileCenter>();
		try {
			if(userSession!=null){
				UserInfo userInfo = (UserInfo)userSession;
				for (int i = 0; i < upfile.length; i++) {
					String fileName = upfile[i].getOriginalFilename().trim();
					FileCenter fileCenter = new FileCenter();
					String uuid = UUIDGenerator.uuid();
					fileCenter.setFileRelateId(course.getCourseNum());
					fileCenter.setFileName(fileName);
					fileCenter.setFileId(uuid);
					//String fileType = upfile[i].getContentType().replace("application/", "");
					String fileType = fileName.split("\\.")[1];
					fileCenter.setFileType(fileType);
					String newFileName = uuid+"."+fileType;
					fileCenter.setNewFileName(newFileName);
					fileCenter.setFilePath(FtpUtils.FILE_PATH);
					fileCenter.setAddUserId(userInfo.getLoginId());
					fileCenter.setDelFlag("0");
					FtpUtils ftp = new FtpUtils();
					InputStream is = upfile[i].getInputStream();
					boolean fg = ftp.uploadFile(FtpUtils.FILE_PATH, newFileName, is);
					if(fg==true){
						fileList.add(fileCenter);
					}
				}	
				boolean status = false;
				if(fileList.size()>0){
					status = fileCenterService.insert(fileList);
				}
				if(status){
					map.put("status", true);
					map.put("msg", "文件上传成功");
					map.put("addflag", true);
				}else{
					map.put("status", false);
					map.put("msg", "文件上传失败");
					map.put("addflag", false);
				}
			}else{
				map.put("status", false);
				map.put("msg", "文件上传失败");
				map.put("addflag", false);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			map.put("status", false);
			map.put("msg", "系统异常！");
			map.put("addflag", false);
		}
			
				
			
		return map;
		
	}
	
	@RequestMapping("addCourse")
	@ResponseBody
	public Map<String,Object>  addCourse(
			CourseInfo course, HttpSession session){
		Map<String, Object> map = new HashMap<String, Object>();
		Object userSession = session.getAttribute("USERINFO");
		try {
			if(userSession!=null){
				UserInfo userInfo = (UserInfo)userSession;
				course.setAddUser(userInfo.getLoginId());
				course.setTeacherPlanNum(GetIdGenerator.getTeacherPlanNum(course.getOpenCourseCollege()));
				course.setCourseNum(GetIdGenerator.getCourseNum(course));
				boolean flag = courseService.insert(course);
				if(flag==true){
					map.put("status", true);
					map.put("msg", "课程信息添加成功");
					map.put("file_id", course.getCourseNum());
				}
				
			}else{
				map.put("status", false);
				map.put("msg", "课程信息添加失败");
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("status", false);
		}
		
		return map;
		
	}
	@RequestMapping("courseDetailsView")
	public String courseDetailsView(Model model,String courseNum){
		model.addAttribute("courseNum", courseNum);
		return "course/courseDetail";
	}
	@RequestMapping("getCourseDetail")
	@ResponseBody
	public Map<String, Object> getCourseDetail(String courseNum){
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if(!"".equals(courseNum) && courseNum!=null){
				CourseInfo courseInfo = courseService.getCourseDetail(courseNum);
				List<FileCenter> fileCenter = fileCenterService.getFileByCourseRelateId(courseNum);
				map.put("status", true);
				map.put("courseInfo", courseInfo);
				map.put("fileCenter", fileCenter);
			}else{
				map.put("status", false);
			}
		} catch (Exception e) {
			map.put("status", false);
		}
		return map;
	}
	/**
	 * 
	 * @param response
	 * @param newFileName 服务器上的名称
	 * @param fileName 指定的文件名
	 * @throws IOException 
	 */
	@RequestMapping("fileDownLoad")
	public void fileDownLoad(HttpServletResponse response,HttpServletRequest request,String fileName,String newFileName) throws IOException{
		OutputStream os = null;
		InputStream is = null;
		String name = new String(newFileName.getBytes("UTF-8"), "ISO-8859-1");
		response.setContentType("application/OCTET-STREAM;charset=UTF-8");
		response.setHeader("Content-Disposition", "attachment;filename="
				+ fileName);
		response.setCharacterEncoding("UTF-8");
		String path = request.getServletContext().getRealPath("/");
		System.out.println(path);
		FtpUtils ftp = new FtpUtils();
		ftp.downloadFile(FtpUtils.FILE_PATH, name, path);
		
		try {
			String localFile = path+"/"+newFileName;
			File file = new File(localFile);
			if(file.exists()){
				is = new FileInputStream(file);
				os =response.getOutputStream();
				int size = 0;
				byte[] buf = new byte[1024];
				while ((size = is.read(buf)) != -1) {
				os.write(buf,0,size);
				
				}
				
			}
			System.out.println(file.getName());	
			os.flush();
			os.close();
			is.close();
			if (file.exists()) {
				file.delete();
			}
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
	}
	@RequestMapping("deleteCourseInfo")
	@ResponseBody
	public Map<String,Object> deleteCourseInfo(String courseNum){
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("status", false);
		try {
			if (!"".equals(courseNum) && courseNum!=null) {
				String course[] = courseNum.split(",");
				List<String> list = new ArrayList<String>();
				for (String string : course) {
					list.add(string);
				}
				if(list!=null){
					boolean flag = courseService.deleteCourseInfo(list);
					boolean fg = courseService.deleteCourseFile(list);
					if(flag==true && fg == true){
						map.put("status", true);
						map.put("msg", "课程信息删除成功");
					}else{
						map.put("msg", "课程信息删除失败");
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("msg", "课程信息删除失败");
		}
		return map;
	}
	@RequestMapping("exportMessage")
	public String exportMessage(HttpServletRequest request,HttpServletResponse response,
			HttpSession session,CourseInfo courseInfo){
		try {
			List<Map<String, Object>> list = courseService.exportMessage(courseInfo);
			ExportExcel.export(request, response, list, getExcelHeader());
		} catch (Exception e) {
			
		}
		return null;
	}
	@RequestMapping("exportBatchMessage")
	public String exportBatchMessage(HttpServletRequest request,HttpServletResponse response,
			HttpSession session,String ids){
		List<String> courseNumList = new ArrayList<String>();
		String courseNum[] = ids.split(",");
		for (String str : courseNum) {
			courseNumList.add(str);
		}
		try {
			if(courseNumList!=null){
				List<Map<String, Object>> list = courseService.exportBatchMessage(courseNumList);
				ExportExcel.export(request, response, list, getExcelHeader());
			}
		} catch (Exception e) {
			
		}
		return null;
		
	}
	private Map<String, String> getExcelHeader(){
		Map<String, String> map = new HashMap<String,String>();
		String biaoti = "课程信息表";
		String header = "课程编号,课程名称,适用年级,学分,总学时,讲科学时,实验学时,课程实践学时,考核方式,课程性质,课程类型,专业名称,专业方向,开课学院";
		String column = "courseNum,courseName,grade,credit,totalClassHours,lectureHours,"
				+ "experimentalHours,coursePracticeHours,examinationMode,courseNature,courseType,professionalName,professionalField,openCourseCollege";
		map.put("biaoti", biaoti);
		map.put("header", header);
		map.put("column", column);
		return map;
	}
	@RequestMapping("courseUpdateView")
	public String courseUpdateView(Model model,String courseNum){
		model.addAttribute("editFlag", courseNum);
		return "course/editCourse";
	}
	@RequestMapping("removeFile")
	@ResponseBody
	public Map<String, Object> removeFile(String courseNum,HttpSession session){
		Map<String, Object> map = new HashMap<String, Object>();
		
		try {
			
				if(courseNum!="" && !"".equals(courseNum)){
					boolean flag = fileCenterService.deleteFileByRelateId(courseNum);
					if(flag){
						map.put("status", true);
						map.put("msg", "附件删除成功");
					}else{
						map.put("status", false);
						map.put("msg", "附件删除失败");
					}
				}
			
			
		} catch (Exception e) {
			map.put("status", false);
			map.put("msg", "系统异常");
		}
		return map;
	}
	@RequestMapping("editCourse")
	@ResponseBody
	public Map<String, Object> editCourse(HttpSession session,CourseInfo course){
		Map<String, Object> map = new HashMap<String,Object>();
		Object userSession = session.getAttribute("USERINFO");
		try {
			if(userSession!=null){
				UserInfo userInfo = (UserInfo)userSession;
				course.setModifyUser(userInfo.getLoginId());
				boolean flag = courseService.updateCourseInfo(course);
				if(flag){
					map.put("status", true);
					map.put("msg", "课程信息修改成功");
					map.put("file_id", course.getCourseNum());
				}else{
					map.put("status", false);
					map.put("msg", "课程信息修改失败");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("status", false);
			map.put("msg", "课程信息修改失败");
		}
		
		return map;
	}
	@RequestMapping("editCourseFile")
	@ResponseBody
	public Map<String,Object>  editCourseFile(@RequestParam("upfile")MultipartFile[] upfile,
			CourseInfo course, HttpSession session){
		Object userSession = session.getAttribute("USERINFO");
		Map<String, Object> map = new HashMap<String, Object>();
		List<FileCenter> fileList = new ArrayList<FileCenter>();
		try {
			if(userSession!=null){
				UserInfo userInfo = (UserInfo)userSession;
				for (int i = 0; i < upfile.length; i++) {
					String fileName = upfile[i].getOriginalFilename().trim();
					FileCenter fileCenter = new FileCenter();
					String uuid = UUIDGenerator.uuid();
					fileCenter.setFileRelateId(course.getCourseNum());
					fileCenter.setFileName(fileName);
					fileCenter.setFileId(uuid);
					//String fileType = upfile[i].getContentType().replace("application/", "");
					String fileType = fileName.split("\\.")[1];
					fileCenter.setFileType(fileType);
					String newFileName = uuid+"."+fileType;
					fileCenter.setNewFileName(newFileName);
					fileCenter.setFilePath(FtpUtils.FILE_PATH);
					fileCenter.setAddUserId(userInfo.getLoginId());
					fileCenter.setDelFlag("0");
					FtpUtils ftp = new FtpUtils();
					InputStream is = upfile[i].getInputStream();
					boolean fg = ftp.uploadFile(FtpUtils.FILE_PATH, newFileName, is);
					if(fg==true){
						fileList.add(fileCenter);
					}
				}	
				boolean status = false;
				if(fileList.size()>0){
					status = fileCenterService.insert(fileList);
				}
				if(status){
					map.put("status", true);
					map.put("msg", "文件上传成功");
					map.put("editflag", true);
				}else{
					map.put("status", false);
					map.put("msg", "文件上传失败");
					map.put("editflag", false);
				}
			}else{
				map.put("status", false);
				map.put("msg", "系统异常");
				map.put("editflag", false);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			map.put("status", false);
			map.put("msg", "系统异常！");
			map.put("editflag", false);
		}
			
				
			
		return map;
		
	}
}

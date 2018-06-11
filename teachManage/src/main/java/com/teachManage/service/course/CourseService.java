package com.teachManage.service.course;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teachManage.mapper.AcademyMapper;
import com.teachManage.mapper.CourseInfoMapper;
import com.teachManage.mapper.FileCenterMapper;
import com.teachManage.model.Academy;
import com.teachManage.model.CourseInfo;
import com.teachManage.util.PagingResult;

@Service
public class CourseService {
	@Autowired
	private CourseInfoMapper courseInfoMapper;
	
	@Autowired
	private AcademyMapper academyMapper;
	
	@Autowired
	private FileCenterMapper fileCenterMapper;

	public PagingResult<CourseInfo> selectCoursePaging(CourseInfo courseInfo, int beginIndex, int rows) {
		int total = courseInfoMapper.selectCoursePagingCount(courseInfo);
		List<CourseInfo> list = courseInfoMapper.selectCoursePaging(courseInfo,beginIndex,rows);
		PagingResult<CourseInfo> pagr = new PagingResult<>();
		pagr.setRowTotal(total);
		pagr.setData(list);
		return pagr;
	}

	public List<Academy> selectAcademyList() {
		return academyMapper.selectAcademyList();
	}

	public boolean insert(CourseInfo course) {
		Integer effortCount =  courseInfoMapper.insert(course);
		return effortCount > 0 ? true : false;
	}

	public CourseInfo getCourseDetail(String courseNum) {		
		return courseInfoMapper.getCourseDetail(courseNum);
	}

	public boolean deleteCourseInfo(List<String> list) {
		Integer effortCount = courseInfoMapper.deleteCourseInfo(list);
		return effortCount > 0 ? true : false;
	}

	public boolean deleteCourseFile(List<String> list) {
		Integer effortCount = fileCenterMapper.deleteCourseFile(list);
		return effortCount > 0 ? true : false;
	}

	public List<Map<String, Object>> exportMessage(CourseInfo courseInfo) {
		
		return courseInfoMapper.exportMessage(courseInfo);
	}

	public List<Map<String, Object>> exportBatchMessage(List<String> courseNumList) {
		return courseInfoMapper.exportBatchMessage(courseNumList);
	}

	public boolean updateCourseInfo(CourseInfo course) {
		Integer effortCount =  courseInfoMapper.updateCourseInfo(course);
		return effortCount > 0 ? true : false;
	}
}

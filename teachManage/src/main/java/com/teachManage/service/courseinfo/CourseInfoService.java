package com.teachManage.service.courseinfo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teachManage.mapper.CourseInfoMapper;
import com.teachManage.model.CourseInfo;

@Service
public class CourseInfoService {
	@Autowired
	CourseInfoMapper courseInfoMapper;

	public List<CourseInfo> findCourseByAcademyId(String academyId) {
		return courseInfoMapper.findCourseByAcademyId(academyId);
	}

	public List<CourseInfo> findCourseByCourseName(String courseName) {
		return courseInfoMapper.findCourseByCourseName(courseName);
	}

	public List<CourseInfo> findCourseByAcademy(String openCourseCollege) {
		return courseInfoMapper.findCourseByAcademy(openCourseCollege);
	}

	public List<CourseInfo> selectCourseList() {
		return courseInfoMapper.selectCourseList();
	}


}

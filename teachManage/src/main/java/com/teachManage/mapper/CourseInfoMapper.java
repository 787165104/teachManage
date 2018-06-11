package com.teachManage.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.teachManage.model.CourseInfo;

public interface CourseInfoMapper {
  
	int selectCoursePagingCount(@Param("courseInfo")CourseInfo courseInfo);

	List<CourseInfo> selectCoursePaging(@Param("courseInfo")CourseInfo courseInfo, @Param("beginIndex")int beginIndex, @Param("rows")int rows);

	Integer insert(CourseInfo course);

	List<CourseInfo> findCourseByCourseName(String courseName);

	Integer selectTeacherPlanNum(@Param("teacherPlanNum")String teacherPlanNum);

	String getMaxCourseNum(@Param("teacherPlanNum")String teacherPlanNum);

	List<CourseInfo> findCourseByAcademyId(@Param("academyId")String academyId);

	CourseInfo getCourseDetail(@Param("courseNum")String courseNum);

	Integer deleteCourseInfo(@Param("list")List<String> list);

	List<Map<String, Object>> exportMessage(@Param("courseInfo")CourseInfo courseInfo);

	List<Map<String, Object>> exportBatchMessage(@Param("courseNumList")List<String> courseNumList);

	Integer updateCourseInfo(CourseInfo course);

	List<CourseInfo> findCourseByAcademy(String openCourseCollege);
	/**
	 * 王路路使用
	 * @param academyId
	 * @return
	 */
	List<CourseInfo> selectCourseListByAcademy(@Param("academyId")String academyId,@Param("useGrade")String useGrade);

	List<CourseInfo> selectCourseList();



	
}
package com.teachManage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.teachManage.model.CourseGroupInfo;
import com.teachManage.model.CourseGroupMembers;

public interface CourseGroupInfoMapper {

	Integer selectCourseGroupPagingCount(@Param("courseGroupInfo")CourseGroupInfo courseGroupInfo);

	List<CourseGroupInfo> selectCourseGroupPaging(@Param("courseGroupInfo")CourseGroupInfo courseGroupInfo, 
			@Param("beginIndex")int beginIndex, @Param("rows")int rows);

	Integer addCourseGroup(CourseGroupInfo courseGroupInfo);

	String getMaxGroupId();

	Integer deleteCourseGroup(@Param("groupId")String groupId);

	CourseGroupInfo getCourseGroupDetail(String groupId);

	Integer addHeaderProjectResult(CourseGroupInfo members);

	CourseGroupInfo getEditCourseGroupDetail(String groupId);

	Integer updateCourseGroup(CourseGroupInfo groupInfo);

}
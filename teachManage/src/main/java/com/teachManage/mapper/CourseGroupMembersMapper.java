package com.teachManage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.teachManage.model.CourseGroupMembers;

public interface CourseGroupMembersMapper {

	Integer addCourseGroupMembers(CourseGroupMembers courseGroupMembers);

	Integer deleteCourseGroupMem(@Param("groupId")String groupId);

	List<CourseGroupMembers> getCourseGroupMemberDetail(String groupId);

	List<CourseGroupMembers> getMyCourseGroup(String loginId);

	Integer addProjectResult(CourseGroupMembers members);

	List<CourseGroupMembers> findManageGroup(String jobNumber);

	List<CourseGroupMembers> getEditCourseGroupMemberDetail(String groupId);

	Integer deleteGroupMembers(String groupId);

}

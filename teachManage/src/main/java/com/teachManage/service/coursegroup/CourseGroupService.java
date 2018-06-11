package com.teachManage.service.coursegroup;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teachManage.mapper.CourseGroupInfoMapper;
import com.teachManage.mapper.CourseGroupMembersMapper;
import com.teachManage.model.CourseGroupInfo;
import com.teachManage.model.CourseGroupMembers;
import com.teachManage.util.PagingResult;

@Service
public class CourseGroupService {
	
	@Autowired
	private CourseGroupInfoMapper courseGroupInfoMapper;
	
	@Autowired
	private CourseGroupMembersMapper groupMembersMapper;
	
	public PagingResult<CourseGroupInfo> selectCourseGroupPaging(CourseGroupInfo courseGroupInfo, int beginIndex, int rows) {
		int total = courseGroupInfoMapper.selectCourseGroupPagingCount(courseGroupInfo);
		List<CourseGroupInfo> list = courseGroupInfoMapper.selectCourseGroupPaging(courseGroupInfo,beginIndex,rows);
		PagingResult<CourseGroupInfo> pagr = new PagingResult<>();
		pagr.setRowTotal(total);
		pagr.setData(list);
		return pagr;
	}

	public boolean addCourseGroup(CourseGroupInfo courseGroupInfo) {
		Integer effortCount = courseGroupInfoMapper.addCourseGroup(courseGroupInfo);
		return effortCount>0?true:false;
	}

	public boolean addCourseGroupMembers(CourseGroupMembers courseGroupMembers) {
		Integer effort = groupMembersMapper.addCourseGroupMembers(courseGroupMembers);
		return effort>0?true:false;
	}

	public boolean deleteCourseGroup(String groupId) {
		Integer effort = courseGroupInfoMapper.deleteCourseGroup(groupId);
		return effort>0?true:false;
	}

	public boolean deleteCourseGroupMem(String groupId) {
		Integer effort = groupMembersMapper.deleteCourseGroupMem(groupId);
		return effort>0?true:false;
	}

	public CourseGroupInfo getCourseGroupDetail(String groupId) {
		return courseGroupInfoMapper.getCourseGroupDetail(groupId);
	}

	public List<CourseGroupMembers> getCourseGroupMemberDetail(String groupId) {
		return groupMembersMapper.getCourseGroupMemberDetail(groupId);
	}

	public List<CourseGroupMembers> getMyCourseGroup(String loginId) {
		return groupMembersMapper.getMyCourseGroup(loginId);
	}

	public boolean addProjectResult(CourseGroupMembers members) {
		Integer effort = groupMembersMapper.addProjectResult(members);
		return effort>0?true:false;
	}

	public List<CourseGroupMembers> findManageGroup(String jobNumber) {
		return groupMembersMapper.findManageGroup(jobNumber);
	}

	public boolean addHeaderProjectResult(CourseGroupInfo members) {
		Integer effort = courseGroupInfoMapper.addHeaderProjectResult(members);
		return effort>0?true:false;
	}

	public CourseGroupInfo getEditCourseGroupDetail(String groupId) {
		return courseGroupInfoMapper.getEditCourseGroupDetail(groupId);
	}

	public List<CourseGroupMembers> getEditCourseGroupMemberDetail(String groupId) {
		return groupMembersMapper.getEditCourseGroupMemberDetail(groupId);
	}

	public boolean deleteGroupMembers(String groupId) {
		Integer effort = groupMembersMapper.deleteGroupMembers(groupId);
		return effort>0?true:false;
	}

	public boolean updateCourseGroup(CourseGroupInfo groupInfo) {
		Integer effort = courseGroupInfoMapper.updateCourseGroup(groupInfo);
		return effort>0?true:false;
	}
}

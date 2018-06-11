package com.teachManage.model;

import java.util.Date;

public class CourseGroupInfo {
    private String id;

    private String groupId;
    
    private String groupName;

    private String groupHeaderId;
    
    private String courseNum;

    private String courseName;

    private String groupMemberId;//存储拼接字符串

    private String groupProject;

    private String projectResult;

    private String addUser;

    private Date addTime;

    private String modifyUser;

    private Date modifyTime;

    private String delFlag;

	

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public String getGroupHeaderId() {
		return groupHeaderId;
	}

	public void setGroupHeaderId(String groupHeaderId) {
		this.groupHeaderId = groupHeaderId;
	}

	public String getGroupMemberId() {
		return groupMemberId;
	}

	public void setGroupMemberId(String groupMemberId) {
		this.groupMemberId = groupMemberId;
	}

	public String getGroupProject() {
		return groupProject;
	}

	public void setGroupProject(String groupProject) {
		this.groupProject = groupProject;
	}

	public String getProjectResult() {
		return projectResult;
	}

	public void setProjectResult(String projectResult) {
		this.projectResult = projectResult;
	}

	public String getAddUser() {
		return addUser;
	}

	public void setAddUser(String addUser) {
		this.addUser = addUser;
	}

	public Date getAddTime() {
		return addTime;
	}

	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}

	public String getModifyUser() {
		return modifyUser;
	}

	public void setModifyUser(String modifyUser) {
		this.modifyUser = modifyUser;
	}

	public Date getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}

	public String getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(String delFlag) {
		this.delFlag = delFlag;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getCourseNum() {
		return courseNum;
	}

	public void setCourseNum(String courseNum) {
		this.courseNum = courseNum;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

   
}
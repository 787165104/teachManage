package com.teachManage.model;

import java.util.Date;

public class InvigilateTask {
    private Integer id;

    private String invigilateTaskId;

    private String courseNum;

    private String examType;

    private String jobNumber;

    private Date examDate;

	private Date startTime;

	private Date endTime;

    private String examAddress;

    private String examClass;

    private String invigilateTeacher;

    private String mainInvigilateTeacher;

    private String addUser;

    private Date addTime;

    private String modifyUser;

    private Date modifyTime;

	private String status;

    private String delFlag;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getInvigilateTaskId() {
		return invigilateTaskId;
	}

	public void setInvigilateTaskId(String invigilateTaskId) {
		this.invigilateTaskId = invigilateTaskId;
	}

	public String getCourseNum() {
		return courseNum;
	}

	public void setCourseNum(String courseNum) {
		this.courseNum = courseNum;
	}

	public String getExamType() {
		return examType;
	}

	public void setExamType(String examType) {
		this.examType = examType;
	}

	public String getJobNumber() {
		return jobNumber;
	}

	public void setJobNumber(String jobNumber) {
		this.jobNumber = jobNumber;
	}

	public Date getExamDate() {
		return examDate;
	}

	public void setExamDate(Date examDate) {
		this.examDate = examDate;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getExamAddress() {
		return examAddress;
	}

	public void setExamAddress(String examAddress) {
		this.examAddress = examAddress;
	}

	public String getExamClass() {
		return examClass;
	}

	public void setExamClass(String examClass) {
		this.examClass = examClass;
	}

	public String getInvigilateTeacher() {
		return invigilateTeacher;
	}

	public void setInvigilateTeacher(String invigilateTeacher) {
		this.invigilateTeacher = invigilateTeacher;
	}

	public String getMainInvigilateTeacher() {
		return mainInvigilateTeacher;
	}

	public void setMainInvigilateTeacher(String mainInvigilateTeacher) {
		this.mainInvigilateTeacher = mainInvigilateTeacher;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(String delFlag) {
		this.delFlag = delFlag;
	}

   
}
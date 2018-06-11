package com.teachManage.model;

import java.util.Date;

public class TeachTask {
    private Integer id;

    private String taskId;

    private String courseNum;

    private String materialId;

    private String courseNature;
    private String  courseName;
    private String openCourseCollege;
    private String totalClassHours;

    private String lectureHours;

    private String experimentalHours;

    private String startWeak;

    private String endWeak;

    private String coursePracticeHours;

    private String campusArea;

    private String teachClass;

    private String jobNumber;

    private String teacherAge;

    private String positionalTitle;

    private String remark;

    private String grade;

    private String addUser;

    private Date addTime;

    private String modifyUser;

    private Date modifyTime;

    private String delFlag;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getCourseNum() {
		return courseNum;
	}

	public void setCourseNum(String courseNum) {
		this.courseNum = courseNum;
	}

	public String getMaterialId() {
		return materialId;
	}

	public void setMaterialId(String materialId) {
		this.materialId = materialId;
	}

	public String getCourseNature() {
		return courseNature;
	}

	public void setCourseNature(String courseNature) {
		this.courseNature = courseNature;
	}

	public String getTotalClassHours() {
		return totalClassHours;
	}

	public void setTotalClassHours(String totalClassHours) {
		this.totalClassHours = totalClassHours;
	}

	public String getLectureHours() {
		return lectureHours;
	}

	public void setLectureHours(String lectureHours) {
		this.lectureHours = lectureHours;
	}

	public String getExperimentalHours() {
		return experimentalHours;
	}

	public void setExperimentalHours(String experimentalHours) {
		this.experimentalHours = experimentalHours;
	}

	public String getStartWeak() {
		return startWeak;
	}

	public void setStartWeak(String startWeak) {
		this.startWeak = startWeak;
	}

	public String getEndWeak() {
		return endWeak;
	}

	public void setEndWeak(String endWeak) {
		this.endWeak = endWeak;
	}

	public String getCoursePracticeHours() {
		return coursePracticeHours;
	}

	public void setCoursePracticeHours(String coursePracticeHours) {
		this.coursePracticeHours = coursePracticeHours;
	}

	public String getCampusArea() {
		return campusArea;
	}

	public void setCampusArea(String campusArea) {
		this.campusArea = campusArea;
	}

	public String getTeachClass() {
		return teachClass;
	}

	public void setTeachClass(String teachClass) {
		this.teachClass = teachClass;
	}

	public String getJobNumber() {
		return jobNumber;
	}

	public void setJobNumber(String jobNumber) {
		this.jobNumber = jobNumber;
	}

	public String getTeacherAge() {
		return teacherAge;
	}

	public void setTeacherAge(String teacherAge) {
		this.teacherAge = teacherAge;
	}

	public String getPositionalTitle() {
		return positionalTitle;
	}

	public void setPositionalTitle(String positionalTitle) {
		this.positionalTitle = positionalTitle;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
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

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getOpenCourseCollege() {
		return openCourseCollege;
	}

	public void setOpenCourseCollege(String openCourseCollege) {
		this.openCourseCollege = openCourseCollege;
	}

	@Override
	public String toString() {
		return "TeachTask [id=" + id + ", taskId=" + taskId + ", courseNum=" + courseNum + ", materialId=" + materialId
				+ ", courseNature=" + courseNature + ", courseName=" + courseName + ", openCourseCollege="
				+ openCourseCollege + ", totalClassHours=" + totalClassHours + ", lectureHours=" + lectureHours
				+ ", experimentalHours=" + experimentalHours +",startWeak="+startWeak+",endWeak="+endWeak+ ", coursePracticeHours=" + coursePracticeHours
				+ ", campusArea=" + campusArea + ", teachClass=" + teachClass + ", jobNumber=" + jobNumber
				+ ", teacherAge=" + teacherAge + ", positionalTitle=" + positionalTitle + ", remark=" + remark
				+ ", grade=" + grade + ", addUser=" + addUser + ", addTime=" + addTime + ", modifyUser=" + modifyUser
				+ ", modifyTime=" + modifyTime + ", delFlag=" + delFlag + "]";
	}


}
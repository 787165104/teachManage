package com.teachManage.model;

import java.util.Date;
import java.util.List;

public class CourseInfo {
    private String id;

    private String teacherPlanNum;

    private String courseNum;

    private String courseName;

    private String credit;

    private String totalClassHours;

    private String lectureHours;

    private String experimentalHours;

    private String coursePracticeHours;

    private String examinationMode;

    private String professionalName;

    private String professionalField;

    private String courseNature;

    private String courseType;

    private String openCourseCollege;

    private String addUser;

    private Date addTime;

    private String modifyUser;

    private Date modifyTime;

    private String delFlag;
    
    private List<FileCenter> fileList;
    
    private String grade;

    //无关字段
    private String academy;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTeacherPlanNum() {
		return teacherPlanNum;
	}

	public void setTeacherPlanNum(String teacherPlanNum) {
		this.teacherPlanNum = teacherPlanNum;
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

	public String getCredit() {
		return credit;
	}

	public void setCredit(String credit) {
		this.credit = credit;
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

	public String getCoursePracticeHours() {
		return coursePracticeHours;
	}

	public void setCoursePracticeHours(String coursePracticeHours) {
		this.coursePracticeHours = coursePracticeHours;
	}

	public String getExaminationMode() {
		return examinationMode;
	}

	public void setExaminationMode(String examinationMode) {
		this.examinationMode = examinationMode;
	}

	public String getProfessionalName() {
		return professionalName;
	}

	public void setProfessionalName(String professionalName) {
		this.professionalName = professionalName;
	}

	public String getProfessionalField() {
		return professionalField;
	}

	public void setProfessionalField(String professionalField) {
		this.professionalField = professionalField;
	}

	public String getCourseNature() {
		return courseNature;
	}

	public void setCourseNature(String courseNature) {
		this.courseNature = courseNature;
	}

	public String getCourseType() {
		return courseType;
	}

	public void setCourseType(String courseType) {
		this.courseType = courseType;
	}

	public String getOpenCourseCollege() {
		return openCourseCollege;
	}

	public void setOpenCourseCollege(String openCourseCollege) {
		this.openCourseCollege = openCourseCollege;
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

	public List<FileCenter> getFileList() {
		return fileList;
	}

	public void setFileList(List<FileCenter> fileList) {
		this.fileList = fileList;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getAcademy() {
		return academy;
	}

	public void setAcademy(String academy) {
		this.academy = academy;
	}

   
}
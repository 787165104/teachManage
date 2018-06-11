package com.teachManage.model;

import java.util.Date;

public class UserInfo {
    private Integer id;

    private String loginId;

    private String loginPwd;

    private String userName;

    private String IDCard;
    
    private String sex;

    private String userEmail;

    private String userPhone;

    private String jobNumber;

    private String positionalTitle;

    private String courseGroup;

    private String degree;

    private String academy;

    private String beginWorkDate;

    private Date birthday;

    private String graduteSchool;

    private String intoSchoolDate;

    private String introduction;

    private String researchArea;

    private String headImage;

    private String addTime;

    private String addUser;

    private String modifyTime;

    private String modifyUser;

    private String delFlag;
    
    //�޹��ֶ�
    private Boolean sessionStatus;
    //教授课程
    private String teachCourse;

	private String lastTeachCourse;

	public UserInfo() {

	}

	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}

	public String getLoginId() {
		return loginId;
	}

	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}

	public String getLoginPwd() {
		return loginPwd;
	}

	public void setLoginPwd(String loginPwd) {
		this.loginPwd = loginPwd;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getIDCard() {
		return IDCard;
	}

	public void setIDCard(String iDCard) {
		IDCard = iDCard;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserPhone() {
		return userPhone;
	}

	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}

	public String getJobNumber() {
		return jobNumber;
	}

	public void setJobNumber(String jobNumber) {
		this.jobNumber = jobNumber;
	}

	public String getPositionalTitle() {
		return positionalTitle;
	}

	public void setPositionalTitle(String positionalTitle) {
		this.positionalTitle = positionalTitle;
	}

	public String getCourseGroup() {
		return courseGroup;
	}

	public void setCourseGroup(String courseGroup) {
		this.courseGroup = courseGroup;
	}

	public String getDegree() {
		return degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}

	public String getAcademy() {
		return academy;
	}

	public void setAcademy(String academy) {
		this.academy = academy;
	}

	public String getBeginWorkDate() {
		return beginWorkDate;
	}

	public void setBeginWorkDate(String beginWorkDate) {
		this.beginWorkDate = beginWorkDate;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getGraduteSchool() {
		return graduteSchool;
	}

	public void setGraduteSchool(String graduteSchool) {
		this.graduteSchool = graduteSchool;
	}

	public String getIntoSchoolDate() {
		return intoSchoolDate;
	}

	public void setIntoSchoolDate(String intoSchoolDate) {
		this.intoSchoolDate = intoSchoolDate;
	}

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	public String getResearchArea() {
		return researchArea;
	}

	public void setResearchArea(String researchArea) {
		this.researchArea = researchArea;
	}

	public String getHeadImage() {
		return headImage;
	}

	public void setHeadImage(String headImage) {
		this.headImage = headImage;
	}

	public String getAddTime() {
		return addTime;
	}

	public void setAddTime(String addTime) {
		this.addTime = addTime;
	}

	public String getAddUser() {
		return addUser;
	}

	public void setAddUser(String addUser) {
		this.addUser = addUser;
	}

	public String getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(String modifyTime) {
		this.modifyTime = modifyTime;
	}

	public String getModifyUser() {
		return modifyUser;
	}

	public void setModifyUser(String modifyUser) {
		this.modifyUser = modifyUser;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(String delFlag) {
		this.delFlag = delFlag;
	}

	public Boolean getSessionStatus() {
		return sessionStatus;
	}

	public void setSessionStatus(Boolean sessionStatus) {
		this.sessionStatus = sessionStatus;
	}

	public String getTeachCourse() {
		return teachCourse;
	}

	public void setTeachCourse(String TeachCourse) {
		this.teachCourse = TeachCourse;
	}

	public String getLastTeachCourse() {
		return lastTeachCourse;
	}

	public void setLastTeachCourse(String lastTeachCourse) {
		this.lastTeachCourse = lastTeachCourse;
	}

}
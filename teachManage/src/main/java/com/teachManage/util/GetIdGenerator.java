package com.teachManage.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

import javax.annotation.PostConstruct;

import com.teachManage.mapper.UserInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.teachManage.model.CourseInfo;
import com.teachManage.model.UserInfo;
@Component
public class GetIdGenerator {
	@Autowired
	private static GetIdGenerator getIdGenerator;

	private GetNotStaticFun getNotStaticFun;
	@Autowired
	public void setGetNotStaticFun(GetNotStaticFun getNotStaticFun) {
		this.getNotStaticFun = getNotStaticFun;
	}
	 	@PostConstruct  
	    public void init() {  
		 	getIdGenerator = this;  
		 	getIdGenerator.getNotStaticFun = this.getNotStaticFun;  
	  
	    }  
	public synchronized static String uuid(){
		String uuid = UUID.randomUUID().toString();
		return uuid.replaceAll("-", "");
	}
	
	public synchronized static String getTeachMaterialId(UserInfo userInfo){
		Long date = Calendar.getInstance().getTimeInMillis();
		String b = userInfo.getLoginId();
		String TMID = date.toString()+b;
		return TMID;
	}
	public synchronized static String getTeacherPlanNum(String college){
		String year = GetIdGenerator.getCurrentYear();
		String month = GetIdGenerator.getCurrentMonth();
		long a = Long.parseLong(month);
		String teachPlan;
		if(a>0 && a<7){
			teachPlan = year+"02"+college;
		}else{
			teachPlan = year+"01"+college;
		}
		return teachPlan;
	}
	public static String getCourseNum(CourseInfo course){
		String courseNum = course.getTeacherPlanNum();
		System.out.println(getIdGenerator.getNotStaticFun);
		Integer effort = getIdGenerator.getNotStaticFun.selectTeacherPlanNum(courseNum);
		boolean flag = effort >0 ? true : false;
		if(flag==false){
			courseNum = courseNum+"0001";
		}else{
			String courseNumMax = getIdGenerator.getNotStaticFun.getMaxCourseNum(course.getTeacherPlanNum());
			long courseNum1 = Long.parseLong(courseNumMax)+1;
			courseNum = (courseNum1+"").trim();
		}
		
		return courseNum;
	}
	
	/**
	 * 获取当前年
	 * @return
	 */
	public static String getCurrentYear(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
        Date date = new Date();
        return sdf.format(date);
	}
	/**
	 * 获取当前月
	 * @return
	 */
	public static String getCurrentMonth(){
       Calendar date = Calendar.getInstance();
       int a = date.get(Calendar.MONTH);
       String c = "";
       if(a >0 && a< 9){
    	    c = "0" + a;
       }else{
    	   c = ""+ a;
       }
       return c;
   }
   public static String getLoginId(){
	String jobNumber = getIdGenerator.getNotStaticFun.getMaxJobNum();
	if (jobNumber != null && jobNumber !=" "){
	    long newJobNumber = Long.parseLong(jobNumber)+1;
	    jobNumber = (newJobNumber+"").trim();
	}else{
		jobNumber = "0001";
	}
	return jobNumber;
   }
   
   public static String getCourseGroupId(){
		String courseGroupId = getIdGenerator.getNotStaticFun.getMaxGroupId();
		if (courseGroupId != null && courseGroupId !=" "){
		    long newJobNumber = Long.parseLong(courseGroupId)+1;
		    courseGroupId = (newJobNumber+"").trim();
		}else{
			courseGroupId = "0001";
		}
		return courseGroupId;
	   }
}

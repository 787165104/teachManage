package com.teachManage.util;

import com.teachManage.mapper.UserInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teachManage.mapper.CourseGroupInfoMapper;
import com.teachManage.mapper.CourseInfoMapper;

@Service
public class GetNotStaticFun {
    @Autowired
    private CourseInfoMapper courseInfoMapper;
    @Autowired
    private UserInfoMapper userInfoMapper;
    @Autowired
    private CourseGroupInfoMapper groupInfoMapper;

    public Integer selectTeacherPlanNum(String TeachPlanNum) {
        Integer effort = courseInfoMapper.selectTeacherPlanNum(TeachPlanNum);
        return effort;
    }

    public String getMaxCourseNum(String param) {
        return courseInfoMapper.getMaxCourseNum(param);
    }

    public String getMaxJobNum() {
        return userInfoMapper.getMaxJobNum();
    }

	public String getMaxGroupId() {
		
		return groupInfoMapper.getMaxGroupId();
	}
}

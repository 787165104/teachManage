package com.teachManage.service.grade;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teachManage.mapper.GradeMapper;
import com.teachManage.model.Grade;

@Service
public class GradeService {
@Autowired
GradeMapper gradeMapper;
	
public List<Grade> selectAllGrade(){
	
	List<Grade> list=gradeMapper.selectAllGrade();
	return list;
	
}
	
}

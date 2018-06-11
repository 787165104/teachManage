package com.teachManage.service.academy;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teachManage.mapper.AcademyMapper;
import com.teachManage.model.Academy;

@Service
public class AcademyService {
@Autowired
AcademyMapper academyMapper;
	
public List<Academy> selectAllAcademy(){
	
	
	
	return academyMapper.selectAcademyList();
}

}

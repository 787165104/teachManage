package com.teachManage.service.campus;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teachManage.mapper.CampusMapper;
import com.teachManage.model.Campus;

@Service
public class CampusService {
	
	@Autowired
	CampusMapper campusMapper;

	public List<Campus> selectAllCampus() {
		// TODO Auto-generated method stub
		return campusMapper.selectAll();
	}
	
	
	

}

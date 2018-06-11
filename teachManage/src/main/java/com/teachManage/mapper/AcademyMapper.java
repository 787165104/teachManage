package com.teachManage.mapper;

import java.util.List;

import com.teachManage.model.Academy;

public interface AcademyMapper {
	/**
	 * 
	 * @Title: selectAcademyList  
	 * @Description: 查询学院列表
	 * @Author:Wangll
	 * @Date:2018年4月10日
	 * @return List<Academy>     
	 * @throws
	 */
	List<Academy> selectAcademyList();
}
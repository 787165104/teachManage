package com.teachManage.mapper;

import java.util.List;

import com.teachManage.model.PositionalTitle;

public interface PositionalTitleMapper {
	/**
	 * 
	 * @Title: selectPositionalTitleList  
	 * @Description: 查询所有职称
	 * @Author:Yangjh
	 * @Date:2018年4月12日
	 * @return List<PositionalTitle>     
	 * @throws
	 */
	public List<PositionalTitle> selectPositionalTitleList();
}

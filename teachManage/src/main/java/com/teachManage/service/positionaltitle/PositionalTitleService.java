package com.teachManage.service.positionaltitle;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teachManage.mapper.PositionalTitleMapper;
import com.teachManage.model.PositionalTitle;

@Service
public class PositionalTitleService {

	@Autowired
	private PositionalTitleMapper positionalTitleMapper;

	/**
	 * 
	 * @Title: selectPositionalTitleList 
	 * @Description: 查询所有职称 
	 * @Author: Yangjh 
	 * @Date: 2018年4月12日 
	 * @return
	 * List<PositionalTitle> 
	 * @throws
	 */
	public List<PositionalTitle> selectPositionalTitleList() {
		return positionalTitleMapper.selectPositionalTitleList();
	}
}

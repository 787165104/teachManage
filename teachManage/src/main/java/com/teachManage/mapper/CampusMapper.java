package com.teachManage.mapper;

import java.util.List;

import com.teachManage.model.Campus;

public interface CampusMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Campus record);

    int insertSelective(Campus record);

    Campus selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Campus record);

    int updateByPrimaryKey(Campus record);

	List<Campus> selectAll();
}
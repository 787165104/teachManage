package com.teachManage.mapper;

import com.teachManage.model.PracticalTeach;

public interface PracticalTeachMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(PracticalTeach record);

    int insertSelective(PracticalTeach record);

    PracticalTeach selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PracticalTeach record);

    int updateByPrimaryKey(PracticalTeach record);
}
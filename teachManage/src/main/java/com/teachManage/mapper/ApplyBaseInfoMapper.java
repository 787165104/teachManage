package com.teachManage.mapper;

import com.teachManage.model.ApplyBaseInfo;

public interface ApplyBaseInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ApplyBaseInfo record);

    int insertSelective(ApplyBaseInfo record);

    ApplyBaseInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ApplyBaseInfo record);

    int updateByPrimaryKey(ApplyBaseInfo record);
}
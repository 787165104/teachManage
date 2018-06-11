package com.teachManage.mapper;

import java.util.List;

import com.teachManage.model.Grade;

public interface GradeMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Grade record);

    int insertSelective(Grade record);

    Grade selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Grade record);

    int updateByPrimaryKey(Grade record);

	List<Grade> selectAllGrade();
}
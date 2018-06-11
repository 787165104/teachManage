package com.teachManage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.teachManage.model.FileCenter;

public interface FileCenterMapper {

	Integer insert(List<FileCenter> fileList);

	List<FileCenter> getFileByCourseRelateId(@Param("fileRelateId")String fileRelateId);

	Integer deleteCourseFile(@Param("list")List<String> list);

	Integer deleteFileByRelateId(@Param("courseNum")String courseNum);
  
}
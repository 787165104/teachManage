package com.teachManage.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.teachManage.model.TeachTask;

public interface TeachTaskMapper {
   
    List<TeachTask> selectAllTeachTask(@Param("teachTask")TeachTask teachTask,@Param("beginIndex")int beginIndex, @Param("rows")int rows);

    boolean addTeachTask(TeachTask teachask);

    int selectTeachTaskCount(@Param("teachTask")TeachTask teachTask);

    boolean deleteTeachTask(List<String> list);

    List<TeachTask> checkTeachTask(@Param("id")String id);

    boolean updateTeachTask(@Param("teachTask")TeachTask teachtask);

    List<Map<String, Object>> exportTeachTask(@Param("list")List list);

    List<TeachTask> selectTeachTaskByjobNumber(@Param("jobNumber") String jobNumber,@Param("teachTask")TeachTask teachTask,@Param("beginIndex")int beginIndex, @Param("rows")int rows);
	
}
package com.teachManage.mapper;

import com.teachManage.model.InvigilateTask;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface InvigilateTaskMapper {

    boolean addInvigilateTask(InvigilateTask invigilateTask);

    boolean deleteInvigilateTask(List<String> list);

    List<InvigilateTask> checkInvigilateTask(@Param("id")String id);

    boolean updateTeachTask(@Param("invigilateTask")InvigilateTask invigilateTask);

    List<Map<String,Object>> exportTeachTask(List<String> list);

    int selectInvigilateTaskCount(@Param("invigilateTask")InvigilateTask invigilateTask);

    List<InvigilateTask> selectInvigilateByjobNumber(@Param("jobNumber")String jobNumber, @Param("invigilateTask")InvigilateTask invigilateTask, @Param("beginIndex")int beginIndex, @Param("rows")int rows);

    List<InvigilateTask> selectAllInvigilateTask(@Param("invigilateTask")InvigilateTask invigilateTask, @Param("beginIndex")int beginIndex, @Param("rows")int rows);
}
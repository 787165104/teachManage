package com.teachManage.service.teachtask;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teachManage.mapper.TeachTaskMapper;
import com.teachManage.model.TeachTask;
import com.teachManage.util.PagingResult;

@Service
public class TeachTaskService {
@Autowired
private TeachTaskMapper teachTaskMapper;
	

  public PagingResult<TeachTask> selectAllTeachTask(TeachTask teachTask, int beginIndex, int rows){
	    int count=teachTaskMapper.selectTeachTaskCount(teachTask);
	    List<TeachTask> list=teachTaskMapper.selectAllTeachTask(teachTask,beginIndex,rows);
	    PagingResult<TeachTask> pgrt = new PagingResult<TeachTask>();
		pgrt.setRowTotal(count);
		pgrt.setData(list);
	    return pgrt;
  }


public boolean addTeachTask(TeachTask teachask) {
	// TODO Auto-generated method stub
	return teachTaskMapper.addTeachTask(teachask);
}


public boolean deleteTeachTask(List<String> list) {
	// TODO Auto-generated method stub
	return teachTaskMapper.deleteTeachTask(list);
}


public List<TeachTask> checkTeachTask(String readerId) {
	// TODO Auto-generated method stub
	return teachTaskMapper.checkTeachTask(readerId);
}


public boolean updateTeachTask(TeachTask teachtask) {
	// TODO Auto-generated method stub
	return teachTaskMapper.updateTeachTask(teachtask);
}


public List<Map<String, Object>> exportBatchTeachTask(List list) {
	// TODO Auto-generated method stub
	
	
	return teachTaskMapper.exportTeachTask(list);
}

public PagingResult<TeachTask> selectTeachTaskByjobNumber(String jobNumber, TeachTask teachTask, int beginIndex, int rows){
	int count=teachTaskMapper.selectTeachTaskCount(teachTask);
	List<TeachTask> list=teachTaskMapper.selectTeachTaskByjobNumber(jobNumber,teachTask,beginIndex,rows);
	PagingResult<TeachTask> pgrt = new PagingResult<TeachTask>();
	pgrt.setRowTotal(count);
	pgrt.setData(list);
	return pgrt;
}
}

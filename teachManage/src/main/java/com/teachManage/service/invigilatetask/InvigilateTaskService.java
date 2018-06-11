package com.teachManage.service.invigilatetask;

import com.teachManage.mapper.InvigilateTaskMapper;
import com.teachManage.model.InvigilateTask;
import com.teachManage.util.PagingResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
@Service
public class InvigilateTaskService {

    @Autowired
    InvigilateTaskMapper invigilateTaskMapper;

    public PagingResult<InvigilateTask> selectAllInvigilateTask(InvigilateTask invigilateTask, int beginIndex, int rows) {
        int count=invigilateTaskMapper.selectInvigilateTaskCount(invigilateTask);
        List<InvigilateTask> list=invigilateTaskMapper.selectAllInvigilateTask(invigilateTask,beginIndex,rows);
        PagingResult<InvigilateTask> pgrt = new PagingResult<InvigilateTask>();
        pgrt.setRowTotal(count);
        pgrt.setData(list);
        return pgrt;
    }

    public boolean addInvigilateTask(InvigilateTask invigilateTask) {
        return invigilateTaskMapper.addInvigilateTask(invigilateTask);
    }

    public boolean deleteInvigilateTask(List<String> list) {
        return invigilateTaskMapper.deleteInvigilateTask(list);
    }

    public List<InvigilateTask> checkInvigilateTask(String readerId) {
        return invigilateTaskMapper.checkInvigilateTask(readerId);
    }

    public boolean updateInvigilateTask(InvigilateTask invigilateTask) {
        return invigilateTaskMapper.updateTeachTask(invigilateTask);
    }

    public List<Map<String,Object>> exportBatchInvigilateTask(List<String> list) {
        return invigilateTaskMapper.exportTeachTask(list);
    }

    public PagingResult<InvigilateTask> selectInvigilateTaskByjobNumber(String jobNumber, InvigilateTask invigilateTask, int beginIndex, int rows) {
        int count=invigilateTaskMapper.selectInvigilateTaskCount(invigilateTask);
        List<InvigilateTask> list=invigilateTaskMapper.selectInvigilateByjobNumber(jobNumber,invigilateTask,beginIndex,rows);
        PagingResult<InvigilateTask> pgrt = new PagingResult<InvigilateTask>();
        pgrt.setRowTotal(count);
        pgrt.setData(list);
        return pgrt;
    }
}

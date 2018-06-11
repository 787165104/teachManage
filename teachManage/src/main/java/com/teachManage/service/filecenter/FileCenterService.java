package com.teachManage.service.filecenter;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teachManage.mapper.FileCenterMapper;
import com.teachManage.model.FileCenter;

@Service
public class FileCenterService {
	@Autowired
	private FileCenterMapper fileCenterMapper;

	public boolean insert(List<FileCenter> fileList) {
		Integer effort = fileCenterMapper.insert(fileList);
		return effort > 0 ? true : false;
	}

	public List<FileCenter> getFileByCourseRelateId(String fileRelateId) {
		List<FileCenter> list = fileCenterMapper.getFileByCourseRelateId(fileRelateId);
		return list;
	}

	public boolean deleteFileByRelateId(String courseNum) {
		Integer effort = fileCenterMapper.deleteFileByRelateId(courseNum);
		return effort>0 ? true:false;
	}

	

}

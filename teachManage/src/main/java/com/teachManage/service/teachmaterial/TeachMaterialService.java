package com.teachManage.service.teachmaterial;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teachManage.mapper.CourseInfoMapper;
import com.teachManage.mapper.TeachMaterialMapper;
import com.teachManage.model.CourseInfo;
import com.teachManage.model.TeachMaterial;
import com.teachManage.util.PagingResult;

@Service
public class TeachMaterialService {

	@Autowired
	private TeachMaterialMapper teachMaterialMapper;
	
	@Autowired
	private CourseInfoMapper courseInfoMapper;

	public PagingResult<TeachMaterial> selectMaterialPaging(TeachMaterial teachMaterial, int beginIndex, int rows) {
		int total = teachMaterialMapper.selectMaterialCount(teachMaterial);
		List<TeachMaterial> list = teachMaterialMapper.selectMaterialPaging(teachMaterial,beginIndex,rows);
		PagingResult<TeachMaterial> pgrt = new PagingResult<TeachMaterial>();
		pgrt.setRowTotal(total);
		pgrt.setData(list);
		return pgrt;
	}

	public boolean addTeachMaterial(TeachMaterial material) {
		return teachMaterialMapper.addTeachMaterial(material);
	}

	public List<CourseInfo> selectCourseListByAcademy(String academyId,String useGrade) {
		return courseInfoMapper.selectCourseListByAcademy(academyId,useGrade);
	}

	public boolean deleteMaterial(List<String> list) {
		Integer effort = teachMaterialMapper.deleteMaterial(list);
		return effort>0?true:false;
	}

	public TeachMaterial getMaterialById(String materialId) {
		return teachMaterialMapper.getMaterialById(materialId);
	}

	public TeachMaterial materialDetail(String materialId) {
		return teachMaterialMapper.materialDetail(materialId);
	}

	public boolean editTeachMaterial(TeachMaterial material) {
		Integer effort = teachMaterialMapper.editTeachMaterial(material);
		return effort>0?true:false;
	}

	public List<Map<String, Object>> exportBatchMessage(List<String> materialList) {
		
		return teachMaterialMapper.exportBatchMessage(materialList);
	}

	public List<Map<String, Object>> exportMessage(TeachMaterial teachMaterial) {

		return teachMaterialMapper.exportMessage(teachMaterial);
	}
	
}

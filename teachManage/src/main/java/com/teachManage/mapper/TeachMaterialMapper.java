package com.teachManage.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.teachManage.model.TeachMaterial;

public interface TeachMaterialMapper {

    /**
     * 查询符合条件的记录总数
     * @param teachMaterial
     * @return
     */
	int selectMaterialCount(@Param("teachMaterial")TeachMaterial teachMaterial);
	/**
	 * 
	 * @param teachMaterial
	 * @param beginIndex
	 * @param rows
	 * @return
	 */
	List<TeachMaterial> selectMaterialPaging(@Param("teachMaterial")TeachMaterial teachMaterial, 
			@Param("beginIndex")int beginIndex, @Param("rows")int rows);
	/**
	 * 添加教材信息
	 * @param material
	 * @return
	 */
	boolean addTeachMaterial(TeachMaterial material);
	/**
	 * 删除教材信息
	 * @param list
	 * @return
	 */
	Integer deleteMaterial(@Param("list")List<String> list);
	/**
	 * 根据教材id获取教材的详细信息,查询内容经过转化
	 * @param materialId
	 * @return
	 */
	TeachMaterial getMaterialById(@Param("materialId")String materialId);
	/**
	 * 根据教材id获取教材的详细信息，查询内容未经过转化
	 * @param materialId
	 * @return
	 */
	TeachMaterial materialDetail(@Param("materialId")String materialId);
	/**
	 * 修改教材信息
	 * @param material
	 * @return
	 */
	Integer editTeachMaterial(TeachMaterial material);
	/**
	 * 选择导出
	 * @param materialList
	 * @return
	 */
	List<Map<String, Object>> exportBatchMessage(@Param("materialList")List<String> materialList);
	/**
	 * 按照查询条件导出
	 * @param teachMaterial
	 * @return
	 */
	List<Map<String, Object>> exportMessage(@Param("teachMaterial")TeachMaterial teachMaterial);
}
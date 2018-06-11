package com.teachManage.controller.teachmaterial;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.teachManage.model.CourseInfo;
import com.teachManage.model.TeachMaterial;
import com.teachManage.model.UserInfo;
import com.teachManage.service.teachmaterial.TeachMaterialService;
import com.teachManage.util.ExportExcel;
import com.teachManage.util.GetIdGenerator;
import com.teachManage.util.GridDataEntity;
import com.teachManage.util.PagingResult;

@Controller
@RequestMapping("materialManage")
public class TeachMaterialController {
	@Autowired
	private TeachMaterialService teachMaterialService;
	@RequestMapping("materialMessage")
	public String materialMessage(){
		return "teachMaterial/materialMessage";
	}
	/**
	 * 查询已添加教材列表
	 */
	@RequestMapping("selectMaterialPaging")
	@ResponseBody
	public GridDataEntity<List<TeachMaterial>> selectMaterialPaging(TeachMaterial teachMaterial,int rows,int page){
		GridDataEntity<List<TeachMaterial>> gde = new GridDataEntity<List<TeachMaterial>>();
		int beginIndex = (page-1)*rows;
		PagingResult<TeachMaterial> pr = teachMaterialService.selectMaterialPaging(teachMaterial,beginIndex,rows);
		int count = pr.getRowTotal();//查询数据的总数
		gde.setRecords(count);
		gde.setTotal((int)(Math.ceil(gde.getRecords()/rows)));
		gde.setRows(pr.getData());
		gde.setPage(page);
		return gde;
	}
	
	@RequestMapping("addMaterialView")
	public String addMaterialView(){
		return "teachMaterial/addMaterial";
	}
	@RequestMapping("addTeachMaterial")
	@ResponseBody
	public Map<String, Object> addTeachMaterial(HttpSession session,TeachMaterial material){
		Map<String, Object> map = new HashMap<String, Object>();
		Object userSession = session.getAttribute("USERINFO");
		try {
			if(userSession!=null){
				UserInfo userInfo = (UserInfo)userSession;
				material.setAddUser(userInfo.getLoginId());
				material.setDelFlag("0");
				material.setMaterialId(GetIdGenerator.getTeachMaterialId(userInfo));
				boolean flag = teachMaterialService.addTeachMaterial(material);
				if(flag==true){
					map.put("status", true);
					map.put("msg", "教材添加成功");
				}else {
					map.put("status", false);
					map.put("msg", "教材添加失败");
				}
			}else {
				map.put("status", false);
				map.put("msg", "教材添加失败");
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("status", false);
		}
		return map;
		
	}
	@RequestMapping("selectCourseListByAcademyAndUseGrade")
	@ResponseBody
	public Map<String, Object> selectCourseListByAcademy(String academyId,String useGrade){
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if(!"".equals(academyId) || !"".equals(useGrade)){
				List<CourseInfo> list = teachMaterialService.selectCourseListByAcademy(academyId,useGrade);
				if (list!=null) {
					map.put("status", true);
					map.put("courseList", list);
				}else {
					map.put("status", false);
				}
			}else{
				map.put("status", false);
			}
		} catch (Exception e) {
			map.put("status", false);
			e.printStackTrace();
		}
		return map;
	}
	@RequestMapping("deleteMaterialInformation")
	@ResponseBody
	public Map<String,Object> deleteMaterialInformation(String materialId){
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("status", false);
		try {
			if (!"".equals(materialId) && materialId!=null) {
				String material[] = materialId.split(",");
				List<String> list = new ArrayList<String>();
				for (String string : material) {
					list.add(string);
				}
				if(list!=null){
					boolean flag = teachMaterialService.deleteMaterial(list);
					if(flag==true){
						map.put("status", true);
						map.put("msg", "课程信息删除成功");
					}else{
						map.put("msg", "课程信息删除失败");
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("msg", "课程信息删除失败");
		}
		return map;
	}
	@RequestMapping("materialDetailView")
	public String materialDetailView(String materialId,Model model){
		model.addAttribute("materialId", materialId);
		return "teachMaterial/materialDetail";
	}
	/**
	 * 查看信息所用，获取值已经经过转化，例子：0已经转变为"是"
	 * @param materialId
	 * @return
	 */
	@RequestMapping("getMaterialDetail")
	@ResponseBody
	public Map<String, Object> getMaterialDetail(String materialId){
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if(!"".equals(materialId) && materialId!=null){
				TeachMaterial teachMaterial = teachMaterialService.getMaterialById(materialId);
				map.put("status", true);
				map.put("teachMaterial", teachMaterial);
			}else{
				map.put("status", false);
			}
		} catch (Exception e) {
			map.put("status", false);
			e.printStackTrace();
		}
		
		return map;
		
	}
	@RequestMapping("MaterialDetail")
	@ResponseBody
	public Map<String, Object> materialDetail(String materialId){
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if(!"".equals(materialId) && materialId!=null){
				TeachMaterial teachMaterial = teachMaterialService.materialDetail(materialId);
				map.put("status", true);
				map.put("teachMaterial", teachMaterial);
			}else{
				map.put("status", false);
			}
		} catch (Exception e) {
			map.put("status", false);
			e.printStackTrace();
		}
		
		return map;
		
	}
	@RequestMapping("teachMaterialUpdateView")
	public String teachMaterialUpdateView(Model model,String materialId){
		model.addAttribute("materialId", materialId);
		return "teachMaterial/editMaterial";
	}
	@RequestMapping("editTeachMaterial")
	@ResponseBody
	public Map<String, Object> editTeachMaterial(HttpSession session,TeachMaterial material){
		Map<String, Object> map = new HashMap<String,Object>();
		Object userSession = session.getAttribute("USERINFO");
		try {
			if(userSession!=null){
				UserInfo userInfo = (UserInfo)userSession;
				material.setModifyUser(userInfo.getLoginId());
				boolean flag = teachMaterialService.editTeachMaterial(material);
				if(flag){
					map.put("status", true);
					map.put("msg", "教材信息修改成功");
				}else{
					map.put("status", false);
					map.put("msg", "教材信息修改失败");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}
	/**
	 * 
	 * 选择导出功能
	 */
	@RequestMapping("exportBatchMessage")
	public String exportBatchMessage(HttpServletRequest request,HttpServletResponse response,
			HttpSession session,String ids){
		List<String> materialIdList = new ArrayList<String>();
		String material[] = ids.split(",");
		for (String str : material) {
			materialIdList.add(str);
		}
		try {
			if(materialIdList!=null){
				List<Map<String, Object>> list = teachMaterialService.exportBatchMessage(materialIdList);
				ExportExcel.export(request, response, list, getExcelHeader());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 按照查询条件进行导出功能
	 * @return
	 */
	@RequestMapping("exportMessage")
	public String exportMessage(HttpServletRequest request,HttpServletResponse response,TeachMaterial teachMaterial){
		try {
			List<Map<String,Object>> list = teachMaterialService.exportMessage(teachMaterial);
			ExportExcel.export(request, response, list, getExcelHeader());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	private Map<String, String> getExcelHeader() {
		Map<String, String> map = new HashMap<String,String>();
		String biaoti = "教材信息表";
		String header = "教材编号,教材名称,课程名称,教材作者,版次,教材类型,出版时间,使用班级,授课教师,教师电话,是否省部级以上获奖教材,是否教育部面向21世纪课程教材,是否国家五年规划教材,是否是自编教材、外文原版教材,备注";
		String column = "materialId,materialName,courseNum,author,orderNum,isOptional,"
				+ "publishTime,useClasses,jobNum,userPhone,isProBook,isEduBook,isCouBook,isEditBook,remark";
		map.put("biaoti", biaoti);
		map.put("header", header);
		map.put("column", column);
		return map;
	}
}

package com.teachManage.controller.positionaltitle;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.teachManage.model.PositionalTitle;
import com.teachManage.service.positionaltitle.PositionalTitleService;

@Controller
@RequestMapping("PositionaltitleController")
public class PositionaltitleController {

	@Autowired
	private PositionalTitleService positionalTitleService;
	/**
	 * 
	 * @Title: selectPositionalTitleList  
	 * @Description: 查询所有职称
	 * @Author:Yangjh
	 * @Date:2018年4月12日
	 * @return List<PositionalTitle>     
	 * @throws
	 */
	@RequestMapping("selectPositionalTitleList")
	@ResponseBody
	public Map<String, Object> selectPositionalTitleList() {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			List<PositionalTitle> list = positionalTitleService.selectPositionalTitleList();
			if (list != null) {
				map.put("status", true);
				map.put("msg", "职称查询成功");
				map.put("positionalTitle", list);
			} else {
				map.put("status", false);
				map.put("msg", "职称查询失败");
			}
		} catch (Exception e) {
			map.put("status", false);
			map.put("msg", "职称查询失败");
		}

		return map;
	}
}

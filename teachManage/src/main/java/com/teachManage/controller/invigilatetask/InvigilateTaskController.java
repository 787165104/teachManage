package com.teachManage.controller.invigilatetask;

import com.teachManage.model.*;
import com.teachManage.service.academy.AcademyService;
import com.teachManage.service.campus.CampusService;
import com.teachManage.service.courseinfo.CourseInfoService;
import com.teachManage.service.grade.GradeService;
import com.teachManage.service.invigilatetask.InvigilateTaskService;
import com.teachManage.service.teachtask.TeachTaskService;
import com.teachManage.service.userinfo.UserInfoService;
import com.teachManage.util.ExportExcel;
import com.teachManage.util.GridDataEntity;
import com.teachManage.util.PagingResult;
import com.teachManage.util.UUIDGenerator;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.*;

@Controller
@RequestMapping("invigilateTask")
public class InvigilateTaskController {
    @Resource
    InvigilateTaskService invigilateTaskService;
    @Resource
    CampusService campusService;
    @Resource
    GradeService gradeService;
    @Resource
    UserInfoService userInfoService;
    @Resource
    CourseInfoService courseInfoService;
    @Resource
    AcademyService academyService;
    @Resource
    TeachTaskService teachTaskService;
    /*
     * 跳转到教学任务页面
     * */
    @RequestMapping("invigilateTask")
    public String  invigilateTask(){
        return "invigilatetask/invigilateTask";
    }


    /*
     * 查询教学任务列表
     *
     * */
    @RequestMapping("selectInvigilateTask")
    @ResponseBody
    public GridDataEntity<List<InvigilateTask>> selectTeachTask(InvigilateTask invigilateTask, int rows, int page){
        GridDataEntity<List<InvigilateTask>> gde=new GridDataEntity<List<InvigilateTask>>();
        int beginIndex = (page-1)*rows;
        PagingResult<InvigilateTask> pr = invigilateTaskService.selectAllInvigilateTask(invigilateTask,beginIndex,rows);
        int count = pr.getRowTotal();//查询数据的总数
        gde.setRecords(count);
        gde.setTotal((int)(Math.ceil(gde.getRecords()/rows)));
        gde.setRows(pr.getData());
        gde.setPage(page);
        return gde;
    }


    /**
     * 跳转到新增教学任务页面
     * */
    @RequestMapping("addInvigilateTask")
    public String  addInvigilateTask(){

        return "invigilatetask/editInvigilateTask";
    }

    /**
     * 跳转到我的教学任务页面
     * */
    @RequestMapping("myInvigilateTask")
    public String  myInvigilateTask(){

        return "invigilatetask/myInvigilateTask";
    }

    /**
     * 添加教学任务
     *
     * */
    @RequestMapping("insertInvigilateTask")
    @ResponseBody
    public Map<String, Object> insertInvigilateTask(InvigilateTask invigilateTask,HttpSession session){
        Map<String, Object> map = new HashMap<String, Object>();
        Object userSession = session.getAttribute("USERINFO");
        try {
            if(userSession!=null){
                UserInfo user=userInfoService.selectTeacherByJobNum(invigilateTask.getJobNumber());

                UserInfo userInfo = (UserInfo)userSession;
                invigilateTask.setInvigilateTaskId(UUIDGenerator.uuid());
                invigilateTask.setAddUser(userInfo.getLoginId());
                invigilateTask.setDelFlag("0");
                boolean flag = invigilateTaskService.addInvigilateTask(invigilateTask);
                if(flag==true){
                    map.put("status", true);
                    map.put("msg", "教学任务添加成功");
                }else {
                    map.put("status", false);
                    map.put("msg", "教学任务添加失败");
                }
            }else {
                map.put("status", false);
                map.put("msg", "教学任务添加失败");
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("status", false);
        }
        return map;
    }

    /**
     * 查询校区列表
     * */
    @RequestMapping("selectCampusArea")
    @ResponseBody
    public Map<String,Object> selectCampusArea(){
        Map<String,Object> map = new HashMap<String,Object>();

        try {
            List<Campus> list=campusService.selectAllCampus();
            if(list!=null){
                map.put("status", true);
                map.put("msg", list);
            }else{
                map.put("status", false);
            }
        } catch (Exception e) {
            map.put("status", false);
        }
        return map;
    }


    /**
     * 查询所有年级
     * */
    @RequestMapping("selectGrade")
    @ResponseBody
    public Map<String,Object> selectAllGrade(){
        Map<String,Object> map = new HashMap<String,Object>();

        try {
            List<Grade> list=gradeService.selectAllGrade();
            if(list!=null){
                map.put("status", true);
                map.put("grade", list);
            }else{
                map.put("status", false);
            }
        } catch (Exception e) {
            map.put("status", false);
        }
        return map;
    }


    /**
     * 查询所有教师
     * */
    @RequestMapping("selectTeacher")
    @ResponseBody
    public Map<String,Object> selectAllTeacher(){
        Map<String,Object> map = new HashMap<String,Object>();
        try {
            List<UserInfo> list=userInfoService.selectAllTeacher();
            if(list!=null){
                map.put("status", true);
                map.put("teacher", list);
            }else{
                map.put("status", false);
            }
        } catch (Exception e) {
            map.put("status", false);
        }
        return map;
    }


    /**
     * 查询学院下的课程信息列表
     * */
    @RequestMapping("findCourseByAcademyId")
    @ResponseBody
    public Map<String,Object> selectAllCourse(String academyId){
        Map<String,Object> map = new HashMap<String,Object>();
        if(academyId.isEmpty()){
            map.put("status", false);
            return map;
        }
        try {
            List<CourseInfo> list=courseInfoService.findCourseByAcademyId(academyId);
            if(list!=null){
                map.put("status", true);
                map.put("course", list);
            }else{
                map.put("status", false);
            }
        } catch (Exception e) {
            map.put("status", false);
        }
        return map;
    }

    /**
     * 通过课程名称查询课程信息
     * */
    @RequestMapping("findCourse")
    @ResponseBody
    public Map<String,Object> findCourse(String courseName){
        Map<String,Object> map = new HashMap<String,Object>();
        if(courseName.isEmpty()){
            map.put("status", false);
            return map;
        }
        try {
            List<CourseInfo> list=courseInfoService.findCourseByCourseName(courseName);
            if(list!=null){
                map.put("status", true);
                map.put("courseInfo", list);
            }else{
                map.put("status", false);
            }
        } catch (Exception e) {
            map.put("status", false);
        }
        return map;
    }

    /**
     * 查询所有学院
     * */
    @RequestMapping("selectAllAcademy")
    @ResponseBody
    public Map<String,Object> selectAllAcademy(){
        Map<String,Object> map = new HashMap<String,Object>();
        try {
            List<Academy> list=academyService.selectAllAcademy();
            if(list!=null){
                map.put("status", true);
                map.put("academy", list);
            }else{
                map.put("status", false);
            }
        } catch (Exception e) {
            map.put("status", false);
        }

        return map;
    }

    /**
     * 删除教学任务
     * */
    @RequestMapping("deleteInvigilateTask")
    @ResponseBody
    public  Map<String,Object> deleteInvigilateTask(String readerId){
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("status", false);
        String arr[] = readerId.split(",");
        List<String> list = new ArrayList<>();
        for(int i = 0; i < arr.length; i++){
            list.add(arr[i]);
        }
        try {
            if(list != null){
                boolean flag = invigilateTaskService.deleteInvigilateTask(list);
                if(flag == true){
                    map.put("status", true);
                    map.put("msg", "删除成功!");
                }else{
                    map.put("status", false);
                    map.put("msg", "删除失败!");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("msg", "删除失败,系统异常!");
        }

        return map;
    }



    /**
     *
     * 跳转到教学任务详情
     * */
    @RequestMapping("checkInvigilateTask")
    public  String checkInvigilateTask(String id,Model model){
        model.addAttribute("id",id);
        return "invigilatetask/invigilateTaskDetail";
    }

    /**
     * 得到教学任务详情
     * */
    @RequestMapping("getInvigilateTaskDetail")
    @ResponseBody
    public Map<String, Object> getInvigilateTaskDetail(String id){
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            if(!"".equals(id) && id!=null){
                List<InvigilateTask> teachTask = invigilateTaskService.checkInvigilateTask(id);
                map.put("status", true);
                map.put("teachTask", teachTask);
            }else{
                map.put("status", false);
            }
        } catch (Exception e) {
            map.put("status", false);
        }
        return map;
    }

    /*
     * 跳转到修改教学任务页面
     * */
    @RequestMapping("toUpdateInvigilateTask")
    public  String updateInvigilateTask(String id,Model model){
        model.addAttribute("id",id);
        return "invigilatetask/updateInvigilateTask";
    }
    /*
     * 跳转到教学任务
     * */
    @RequestMapping("updateInvigilateTask")
    @ResponseBody
    public Map<String, Object> updateTeachTask(String id){
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            if(!"".equals(id) && id!=null){
                List<TeachTask> teachTask = teachTaskService.checkTeachTask(id);
                List<InvigilateTask> invigilateTask = invigilateTaskService.checkInvigilateTask(id);
                List<CourseInfo> courseList=courseInfoService.findCourseByAcademy(teachTask.get(0).getOpenCourseCollege());
                map.put("status", true);
                map.put("invigilateTask", invigilateTask);
                map.put("courseList", courseList);
            }else{
                map.put("status", false);
            }
        } catch (Exception e) {
            map.put("status", false);
        }
        return map;
    }
    /*
     * 修改教学任务
     * */
    @RequestMapping("updateinvigilateTaskById")
    @ResponseBody
    public Map<String, Object> updateTeachTaskById(InvigilateTask invigilateTask,HttpSession session){
        Map<String, Object> map = new HashMap<String, Object>();
        Object userSession = session.getAttribute("USERINFO");
        try {
            if(userSession!=null){
                UserInfo user=userInfoService.selectTeacherByJobNum(invigilateTask.getJobNumber());

                UserInfo userInfo = (UserInfo)userSession;
                invigilateTask.setModifyUser(userInfo.getLoginId());
                boolean flag = invigilateTaskService.updateInvigilateTask(invigilateTask);
                if(flag==true){
                    map.put("status", true);
                    map.put("msg", "教学任务修改成功");
                }else {
                    map.put("status", false);
                    map.put("msg", "教学任务修改失败");
                }
            }else {
                map.put("status", false);
                map.put("msg", "教学任务修改失败");
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("status", false);
        }
        return map;
    }
    /*
     * 导出教学任务
     * */
    @RequestMapping("exportInvigilateTask")
    public String exportService(String ids,HttpServletRequest request,
                                HttpServletResponse response){

        try{
            System.out.println(ids);
            List<String> list = new ArrayList<String>();
            String[] arr = ids.split(",");
            for (int i = 0; i < arr.length; i++) {
                list.add(arr[i]);
            }

            List<Map<String, Object>> invigilateTaskList = invigilateTaskService.exportBatchInvigilateTask(list);
            ExportExcel.export(request, response, invigilateTaskList, getExcelHeader());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


    private Map<String, String> getExcelHeader() {
        Map<String, String> m = new HashMap<String, String>();
        String biaoti = "教学任务表";
        String header = "课程代码,课程名称,课程性质,总学时,理论学时,实验学时,校区,教学班组成,任课教师,年龄,职称,备注,年级";
        String column = "courseNum,courseName,courseNature,"
                + "totalClassHours,lectureHours,experimentalHours,campusArea,teachClass,jobNumber,teacherAge,positionalTitle,remark,grade";
        m.put("biaoti", biaoti);
        m.put("header", header);
        m.put("column", column);
        return m;
    }
    @RequestMapping("selectInvigilateTaskByjobNumber")
    @ResponseBody
    public GridDataEntity<List<InvigilateTask>> selectTeachTaskByjobNumber(InvigilateTask invigilateTask,HttpSession session,int rows,int page){
        GridDataEntity<List<InvigilateTask>> gde=new GridDataEntity<List<InvigilateTask>>();
        Object userSession = session.getAttribute("USERINFO");
        if(userSession!=null){
            UserInfo userInfo = (UserInfo)userSession;
            int beginIndex = (page-1)*rows;
            PagingResult<InvigilateTask> pr = invigilateTaskService.selectInvigilateTaskByjobNumber(userInfo.getJobNumber(),invigilateTask,beginIndex,rows);
            int count = pr.getRowTotal();//查询数据的总数
            gde.setRecords(count);
            gde.setTotal((int)(Math.ceil(gde.getRecords()/rows)));
            gde.setRows(pr.getData());
            gde.setPage(page);
            return gde;
        }
        return gde;
    }
}

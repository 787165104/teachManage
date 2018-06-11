var UserInfoInsert = function () {
};
UserInfoInsert.prototype = {
    init : function () {
        var basePath = $('#basePath').val();
        $.post(
            basePath+'/teachTask/selectAllAcademy',
            {},
            function(data) {
                console.log(data);
                console.log(data.status);
                if(data.status==true){
                    var info = data.academy;
                    $.each(info,function(name,value){
                        $("#academy").append("<option value = "+value.academy+">"+value.academy+"</option>")
                    });
                    $('#academy').selectpicker('refresh');
                    $('#academy').selectpicker('render');
                }
            },"json"
        );
        //查询职称
        $.post(
            basePath+'PositionaltitleController/selectPositionalTitleList',
            {},
            function(data) {
                console.log(data);
                console.log(data.status);
                if(data.status==true){
                    var info = data.positionalTitle;
                    $.each(info,function(name,value){
                        $("#positionalTitle").append("<option value = "+value.positionalTitle+">"+value.positionalTitle+"</option>")
                    });
                    $('#positionalTitle').selectpicker('refresh');
                    $('#positionalTitle').selectpicker('render');
                }
            },"json"
        );
        $(document).on("click",'.fileDelete',function () {
            S("#.imgfile").remove();//移除图片file
            //移除图片显示
            $(this).parent().parent().remove();

            var file_id= $(this).next().val();
            // 获取fileArr值
            var fileArr = $("#fileArr").val();
            if(fileArr == ""){
                $("#fileArr").val(file_id);
            }else{
                $("#fileArr").val(fileArr + "," + file_id);
            }
        });
    },
    bindEvent : function () {

        var basePath = $("#basePath").val()
        var $form = $("#userInfoForm");
        console.log($("#jobNumber").val());
            $("#userInfoForm").validate({
                ignore : "",
                onclick:false,
                rules : {
                    userName: {
                        required: true
                    },
                    age: {
                        required:true,
                        digits:true
                    },
                    academy:{
                        required:true
                    },
                    degree:{
                        required:true
                    },
                    positionalTitle:{
                        required:true
                    },
                    userEmail:{
                        required:true,
                        email:true
                    }

                },
                messages:{
                    userName: {
                        required: "请输入姓名"
                    },
                    age: {
                        required:"请输入年龄",
                        required:"请输入整数"
                    },
                    academy:{
                        required:"请选择学院"
                    },
                    degree:{
                        required:"请选择学位"
                    },
                    positionalTitle:{
                        required:"请选择职称"
                    },
                    userEmail:{
                        required:"请输入邮箱",
                        email:"请输入正确的格式"
                    }
                },
                submitHandler : function() {
                    var opurl = $("#jobNumber").val()=="" ? 'insertUserInfo' : 'editUserInfo';
                    var jobNumber = $("#jobNumber").val();
                    console.log(jobNumber);
                    var params = {};
                    var datas = $("#userInfoForm").serializeArray();
                    console.log(datas);
                    $(datas).each(function() {
                        params[this.name] = $.trim(this.value);
                    });
                    $.post(
                        opurl,
                        params,
                        function (data) {
                            var status = data.status;
                            console.log(data);
                            if (status == true){
                                $("#jobNumber").val(data.msg)
                                var headimg = $("#headimg").val();
                                if(headimg != null){
                                    $('#headimg').fileinput('upload');
                                } else{
                                    if (jobNumber == "") {
                                        //添加
                                        swal({
                                            title:"操作提示",
                                            text:"用户信息添加成功！",
                                            type: "success",
                                            showCancelButton:true,
                                            confirmButtonColor:"#00CC99",
                                            confirmButtonText: "返回列表",
                                            cancelButtonText: "继续添加",
                                            closeOnConfirm: false
                                        },function (confirm) {
                                            if(confirm){
                                                window.location.href = "userList?isAdmin="+$("#isAdmin").val();
                                            }else{
                                                window.location.href = "addUserInfo?isAdmin="+$("#isAdmin").val();
                                            }
                                        });
                                    }else {
                                        //修改
                                        swal({
                                            title: "操作提示！",
                                            text: "用户信息修改成功！",
                                            type: "success",
                                            showCancelButton: false,
                                            confirmButtonColor: "#f7a54a",
                                            confirmButtonText: "返回列表",
                                            closeOnConfirm: false
                                        }, function (confirm) {
                                            if(confirm){
                                                window.location.href="userList?isAdmin=" + $("#isAdmin").val();
                                            }
                                        });
                                    }
                                }
                            }else if (status == false) {
                                swal(data.msg,"","error");
                            }
                        },
                        "json"
                        );

                }

            });

        var jobNumber = $("#jobNumber").val();
        if(jobNumber != ""){
            debugger;
            $('#degree').selectpicker('refresh');
            $('#degree').selectpicker('render');
            $("h5").text("教师信息修改");
            $(".breadcrumb li a")[2].innerText = "修改";
            $("#tab_one").empty;
            $("#tab_one").text("教师信息修改")
            $.post(
                basePath+"/userInfo/findUserByJobNumber",
                {
                    "jobNumber":jobNumber
                },
                function (data) {
                    console.log(data);
                    if(data.status == true) {
                        var info = data.userInfo;
                        console.log(info);
                        $("#userName").val(info.userName);
                        if(info.sex == 0){
                        	$("#optionsRadios1").attr("checked",true);
                        	$("#optionsRadios2").attr("checked",false);
                        }else{
                        	$("#optionsRadios1").attr("checked",false);
                        	$("#optionsRadios2").attr("checked",true);
                        }
                        $("#teachCourse").val(info.teachCourse);
                        $("#lastTeachCourse").val(info.lastTeachCourse);
                        $("#degree").val(info.degree);
                        $("#graduteSchool").val(info.graduteSchool);
                        $("#courseGroup").val(info.courseGroup);
                        $("#beginWorkDate").val((info.beginWorkDate).substring(0,10));
                        $("#researchArea").val(info.researchArea);
                        $('#positionalTitle').val(info.positionalTitle);
                        $('#academy').val(info.academy);
                        $("#intoSchoolDate").val((info.intoSchoolDate).substring(0,10));
                        $("#userEmail").val(info.userEmail);
                        $("#userPhone").val(info.userPhone);
                        $("#introduction").val(info.introduction);
                        $('#positionalTitle').selectpicker('refresh');
                        $('#positionalTitle').selectpicker('render');
                        $('#academy').selectpicker('refresh');
                        $('#academy').selectpicker('render');
                        $('#degree').selectpicker('refresh');
                        $('#degree').selectpicker('render');
                    }
                },"json"
            );
        }
    }
}
var userInfoInsert = new UserInfoInsert();
$(document).ready(function() {
    userInfoInsert.init();
    userInfoInsert.bindEvent();
});
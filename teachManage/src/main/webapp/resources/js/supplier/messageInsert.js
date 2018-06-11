var MessageInsert = function() {
};
var baseInitFlag = false;
var blockInitFlag = false;
var tt=true;
//资产集合信息
var qualifiedList=new Array();
//资产图片信息
var imgList=new Array();
var fileList=new Array();
var delFileList=new Array();
MessageInsert.prototype = {
	bindEvent : function() {
		var $form = $("#editForm");
		var supplier_id = $("#supplier_id").val();
				// 供应商重复验证
				jQuery.validator.addMethod("supplier_name", function(value, element) {
					var result = true;
					if($("#add_supplier_name").val() == "" || $("#add_supplier_name").val() != $("#repeat_supplier_name").val()){
						$.ajax({
							type:"POST",
							url:"selectSupplierNameCount",
							data:{"supplier_name":value},
							dataType:"json",
							async:false,
							success:function(data){
								result = data; 
							}
						})
					}
					return result;
				}, "供应商名称重复");
		
	// 手机号码验证
		jQuery.validator.addMethod("supplier_phone", function(value, element) {  
		    var length = value.length;  
		    var regPhone = /^0{0,1}(1[3-9])[0-9]{9}$/;  
		    return this.optional(element) || ( length == 11 && regPhone.test( value ) );    
		}, "请正确填写手机号码");
		// 电话号码验证
		jQuery.validator.addMethod("supplier_tel", function(value, element) {
			var tel = /^0\d{2,3}-\d{5,9}|0\d{2,3}-\d{5,9}$/; //电话号码格式010-12345678
			return this.optional(element) || (tel.test(value));
		}, "请正确填写电话号码,例：010-1234567");
		
 	
		// Email验证
		jQuery.validator.addMethod("supplier_mail", function(value, element) {
			var tel = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ ; //电话号码格式010-12345678
			return this.optional(element) || (tel.test(value));
		}, "请输入有效的电子邮件地址");
		$(".insert").click(function(){
			 $("#add_supplier_name").rules("remove");

			 $("#editForm").submit();
		 
		})
		
		
		$("#editForm").validate({
			ignore: "",
			onclick : false,
			rules : {
				supplier_name:{
    				required:true,
    				supplier_name:true
    			},
    			supplier_contact:{
    				required:true
    			},
    			type_id:{
    				required:true
    			},
    			supplier_phone:{
    				required:true,
    				supplier_phone:true
    			},
    			supplier_tel:{
    				supplier_tel:true
    			},
    			supplier_mail:{
    				supplier_mail: true
    			}
			},
			
			messages : {
				supplier_name:{
    				required:"请输入供应商名称 "
    			},
    			supplier_contact:{
    				required:"请输入联系人"
    			},
    			type_id:{
    				required:"请选择类别"
    			},
    			supplier_phone:{
    				required:"请输入移动电话"
    			}
			},
			invalidHandler: function(form, validator) {
				if(validator.errorMap.supplier_name || validator.errorMap.supplier_contact || 
				   validator.errorMap.type_id || validator.errorMap.supplier_phone){
					$("#tab_one").click();
					return false;
				}
				 
		        
		    },
			submitHandler : function() {
				
 				var opurl = $('#supplier_id').val() == "" ? 'addSupplierMessage' : 'editSupplierMessage';
				var supplier_id = $("#supplier_id").val();
				var address=$("#address option:selected").val(); //获取地点的选中的项的值
				var province=$("#address_province option:selected").val(); //获取地点的选中的项的值
				var provinceandcity = province+"-"+address;
				var params = {supplier_purchas_address:provinceandcity};
				var datas = $("#editForm").serializeArray();
				$(datas).each(function() {
					params[this.name] = $.trim(this.value);
				});
				var flag= setQualifiedList();
				if(flag==false){
					return;
				}
				var remark=$("#qualified_remark").val();
					params.qualified_remark=remark;
 				var jsonStringRef=  JSON.stringify({"message":params,"qualifiedList":qualifiedList,"fileList":fileList,"delFileList":delFileList});
 						$.post( 
							opurl, 
							{jsonStr:jsonStringRef},
							function(data) {
								var status = data.status;
								
								if(status==true ){
								  status=uploadImgs();
									if(status==true){
										if(supplier_id==""){
											//添加
											 swal({
											        title: "添加提示！",
											        text: "供应商信息添加成功！",
											        type: "success",
											        showCancelButton: true,
											        confirmButtonColor: "#00CC99",
											        confirmButtonText: "返回列表",
											        cancelButtonText: "继续添加",
											        closeOnConfirm: false
											    }, function (confirm) {
											    	if(confirm){
											    		 window.location.href="messageList?isAdmin=" + $("#isAdmin").val();
											    	}else{
											    		 window.location.href="messageInsert?isAdmin=" + $("#isAdmin").val();
											    	}
											    });
										}else{
 											 swal({
											        title: "操作提示！",
											        text: "供应商信息修改成功！",
											        type: "success",
											        showCancelButton: false,
											        confirmButtonColor: "#00CC99",
											        confirmButtonText: "返回列表",
											        closeOnConfirm: false
											    }, function (confirm) {
											    	if(confirm){
											    		 window.location.href="messageList?isAdmin=" + $("#isAdmin").val();
											    	}
											    });
											
										}
									}}else if(status==false){
										 swal(data.msg, "", "error");
								
								
									}
							});
					}
		});
		
		
		
	},
	
	init : function() {
		 var basePath = $('#basePath').val();
	   	 /**
           * 获取类别 
           */
          $.ajax({
        	  type:"POST",
        	  url:basePath + 'supplierType/selectTypeList',
        	  dataType:"json",
        	  async : false,
        	  success:function(data){
        		  for(var i = 0; i < data.length; i++){
        			$("[name='type_id']").append(("<option value='" + data[i].type_id + "'>" + data[i].type_name + "</option>"));
                  }
        	  }
          })
          
          $("#city").citySelect({
				            nodata: "none",
				            required: false
				        });
		 //查询合同信息
		 var supplier_id = $("#supplier_id").val();
         if(supplier_id == ""){
           /**
   	  	   * 生成序号
   	  	   */
   	   	  $.post('generatorNum', function(data) {
   	       	$("#add_supplier_num").val(data);
   	   	  }); 
   	   	  //初始化资产列表
   		addCol();

         }
		 if(supplier_id!=""){
			 $(".breadcrumb li a")[2].innerText = "修改";
			 /**
			  * 查看供应商
			  */
			 $.ajax({
				 type:"POST",
	        	  url:basePath + '/supplierMessage/findSupplierMessageById',
	        	  data:{supplier_id : supplier_id},
	        	  dataType:"json",
	        	  async : false,
	        	  success:function(data){
	        		  if(data.status == true){
	 						var info = data.msg;
	 						/*console.log(info);*/
	 						$("#supplier_id").val(info.supplier_id);
							$("#add_supplier_num").val(info.supplier_num);
							$("#repeat_supplier_name").val(info.supplier_name);
							$("#add_supplier_name").val(info.supplier_name);
							$("#add_type_id").val(info.type_id);
							$("#add_supplier_contact").val(info.supplier_contact);
							$("#add_supplier_position").val(info.supplier_position);
							$("#add_supplier_phone").val(info.supplier_phone);
							$("#add_supplier_address").val(info.supplier_address);
							$("#add_supplier_mail").val(info.supplier_mail);
							$("#add_supplier_tel").val(info.supplier_tel);
							$("#add_supplier_fax").val(info.supplier_fax);
							$("#add_supplier_remark").val(info.supplier_remark);
							$("#qualified_remark").val(info.qualified_remark);
							var str = info.supplier_purchas_address;
							/*var str = $("#add_supplier_purchas_address").val(info.supplier_purchas_address);*/
							var strs= new Array();
							/*console.log(str);*/
							strs=str.split("-");
							/*console.log(strs);*/
							
							$("#city").citySelect({prov:strs[0], city:strs[1]});
						}else if(data.status==false){
							CommonUtils.alertMsg("2","","查询合同信息失败！","");
						}
	        	  }
			 })
			 
			 	 $.ajax({
				 type:"POST",
	        	  url:"findQualifiedList",
	        	  data:{supplier_id : $("#supplier_id").val()},
	        	  dataType:"json",
	        	  async : false,
	           	  success:function(data){
	        		  if(data.status == true){
	 						var qualifiedlist = data.list;
	 						var path=data.path;
 	 						 var colList=$("#divCols").children();
	 						
	 						 for(var i=0;i<qualifiedlist.length;i++){
	 							 var text=$("#divColText").clone(true)[0] ;
	 							 text.setAttribute("style", "");
	 							 
	 						 	var group1=$(text).children()[0];
	 						 	var group2=$(text).children()[1];
	 						 	  $($(group1).children("div")[0]).children()[0].value=qualifiedlist[i].qualified_name;
	 						 	 $($(group1).children("div")[1]).children()[0].value=qualifiedlist[i].start_time;
 	 				 
	 						 	 $($(group1).children("div")[2]).children()[0].value=qualifiedlist[i].end_time;
	 						 	 
	 						 
	 						 	var imgSpan=$($($(group2).children("div")[0]).children("span")[0]);
	 						 	var qualified_id=qualifiedlist[i].qualified_id;
	 						 	$(group1).find("input[type=hidden]").val(qualified_id);

	 						 	var fileList=qualifiedlist[i].fileList;
	 						 	
	 						 	
	 							for(var j=0;j<fileList.length;j++){
					      				 console.log(fileList[j]);
						      			 var  img="<span><img  class='opimg' imgType='"+fileList[j].upload_type+"' file_id='"+fileList[j].file_id+"'  src='"+path+fileList[j].upload_path+"'  /><span class='opspan' onclick='delImg(this)'>删除</span> </span>";
						      			 $(imgSpan).append(img);
	 							}
	 							 var html='<div class="col-sm-12" align="center" style="padding:20px;">'+
	 							'<span style="text-align: center; cursor: pointer;padding: 8px;/* border: solid; */border: 1px solid #000;border-color: rgb(128, 128, 128);" onclick="delColText(this)" >删除本条资质</span>'+
	 							'</div>';
	 							 var num=$("#divCols").children().length;
	 							 if(num!='0'){
	 								 $(text).children().last().append(html);
	 							 }
 	 						     $("#divCols").append(text);
//	 						     
//	 							 var html=text.innerHTML.replace(/startTime/g,"startTime_"+no);
//	 						 	 html=html.replace(/endTime/g,"endTime_"+no);
//	 						 	text.innerHTML=html; 
	 						 	 
	 						 	 
 
	 						 
	 						 
	 					 	 }
	 						
 						}else if(data.status==false){
							CommonUtils.alertMsg("2","","查询资质信息失败！","");
						}
	        	  }
			 })
			 
		 }
	}
};
var messageInsert = new MessageInsert();
$(document).ready(function() {
	messageInsert.init();
	messageInsert.bindEvent();
 });

//打开文件选择对话框
  function getInput(thi)  {
	
   

    var CRE_FILE = document.createElement("input");//动态创建
    
    	CRE_FILE.setAttribute("type", "file");
    	CRE_FILE.setAttribute("multiple", "multiple");
    	CRE_FILE.setAttribute("class", "typeFile");
    	CRE_FILE.setAttribute("style", "display:none");
    	//CRE_FILE.addEventListener(onchange,function(){ choiceImgs(CRE_FILE); }) ;
            $(thi).after(CRE_FILE);
            
   
   
    return $(CRE_FILE).click();//打开对象选择框
} 
//  //动态验证
//  $(document).on( "onfocus" ,".textRequired",function(){
//	  alert("111");
//  })
  
//多图片选择
  $(document).on( "change" ,".typeFile",function(){
		var fileInput=this;
 	var files=fileInput.files;
 	
	 if (files && files.length>0) {
		 	var length=files.length;

		 	var oldlength= $($($(fileInput).parent()).children()[0]).children().length;
		 	if(length+oldlength>3){
		 		alert("每个资质信息最多只能上传三张");
		 		return;
		  	}
		 	for(var i=0;i < length; i++){
		  		var checkType=(files[i].type).split('/')[1];
		 		
		 		if(checkType!="jpg"&&checkType!="jpeg"&&checkType!="png"){
		 			
		 			alert("只能上传图片")
		 			return;
		 		}
		 	}
		 	 
				for (var i = 0; i < files.length; i++) {
				
				var file=files[i];
					var      reader = new FileReader();
					
//			    	      //获取文件属性
		    	      var type = "." + (file.type).split('/')[1];
		    	 
		    	       var name = file.name;
		    	       var size = file.size;
		    	       reader.readAsDataURL(file);
			       //监听事件onload会自动触发
			       reader.onload = function(e)  
			       { 

			       var  img="<span><img  class='opimg' imgName='"+name+"' imgType='"+type+"' src='"+e.target.result+"'  /><span class='opspan' onclick='delImg(this)'>删除</span> </span>";
		 	       $($(fileInput).parent().children()[0]).append(img);

			       
			       }; 
			      
			}
	 } 


})
//删除图片
function delImg(thi){
 		var file_id=$($(thi).prev()). attr("file_id");
 
			if(typeof(file_id)!="undefined"){
//				 $.ajax({
//				 type:"POST",
//	        	  url:"delFile",
//	        	  data:{file_id : file_id},
//	        	  dataType:"json",
//	        	  async : true,
//	        	  success:function(data){
// 				      	 
//			      }
//			 })
				delFileList.push(file_id);
			}
	$(thi).parent().remove();
}
//动态增加列
 function  addCol(){
 	 
	 var text=$("#divColText").clone(true)[0] ;
	  text .setAttribute("style", "");
	  var group1=$(text).children()[0];
   var qualified_name=$($(group1).children("div")[0]).children()[0];
   var html='<div class="col-sm-12" align="center" style="padding:20px;">'+
			'<span style="text-align: center; cursor: pointer;padding: 8px;/* border: solid; */border: 1px solid #000;border-color: rgb(128, 128, 128);" onclick="delColText(this)" >删除本条资质</span>'+
			'</div>';
   var num=$("#divCols").children().length;
   if(num!='0'){
	   $(text).children().last().append(html);
   }

 
 	 $("#divCols").append(text);
 	 
  } 
//删除动态列
 function delColText(thi){
	 var qualified_id=$(thi).parent().parent().parent().find("input[type=hidden]").val();
	 if(qualified_id!="undefined"){
		 $.ajax({
				type:"POST",
				url:"deleteQualified",
				data:{"qualified_id":qualified_id},
				dataType:"json",
				async:false,
				success:function(data){
					result = data; 
				}
			})
	 }
	 $(thi).parent().parent().parent().remove();
	 
	 
 }

 // 设置 qualifiedList
 function setQualifiedList(){
	 
	 var colList=$("#divCols").children();
	 
	 for(var i=0;i<colList.length;i++){
	 	var colDiv=colList[i];
	 	var group1=$(colDiv).children()[0];
	 	var group2=$(colDiv).children()[1];
	 	 var qualified_name=$($(group1).children("div")[0]).children()[0].value;
	 	 var start_time=$($(group1).children("div")[1]).children()[0].value;
	 	var end_time=$($(group1).children("div")[2]).children()[0].value;

	 	
	 	
	 		if(qualified_name==""){
	 			
 	 			 var   name_input= $($(group1).children("div")[0]).children()[0];
  	 			 $(name_input).next()[0].style.display = 'block';
 	 			$("#tab_two").click();
 	 			 return  false;
 	 		}
	 		if(start_time==""){
	 			 var   start_time_input= $($(group1).children("div")[1]).children()[0];
	 			 $(start_time_input).next()[0].style.display = 'block';
	 			$("#tab_two").click();
	 			 return  false;
	 		}
	 		if(end_time==""){
	 			 var   end_time_input= $($(group1).children("div")[2]).children()[0];
	 			 $(end_time_input).next()[0].style.display = 'block';
	 			$("#tab_two").click();
	 			 return  false;
	 		}
	 		
	 		 if(formatDate(start_time)>formatDate(end_time)){
	 			$($(group1).children("div")[2]).children()[0].nextSibling.nextSibling.nextSibling.nextSibling.style.display = 'block';
 	 			$("#tab_two").click();
	 			 return  false;
	 		 }
	 	
	 	
	 	
	 	var imgs=$($($(group2).children("div")[0]).children("span")[0]).children();
	var qualified_id= 	$(group1).find("input[type=hidden]").val();
	var supplier_id ="";
 		if(qualified_id==""){
		    qualified_id=generateUUID();
		    supplier_id ="";
		}else{
			supplier_id=$("#supplier_id").val();
		}
	
	 	var qualified={
				"qualified_id" :qualified_id,
				"qualified_name" :qualified_name,
				"start_time" : start_time,
				"end_time" :end_time,
				"qualified_file" : "",
				"qualified_file1" : "",
				"qualified_file2" : "",
				"add_time" : "",
				"add_user" : "",
				"modify_time" :"",
				"modify_user" : "",
				"del_flag" : "",
				"remarks" : $("#qualified_remark").val(),
				"supplier_id" : supplier_id
 			}
	 		
//	 	 
//	 	
	 	
	 		for(var j=0;j<imgs.length;j++){
	 			
	 			 var  old_file_id=$($(imgs[j]).children()[0]).attr("file_id");
	 				  
	 				
	 			if(typeof(old_file_id)=="undefined"){
	 				 var file_id=generateUUID();
	 	 	 		var   src=$(imgs[j]).children()[0].src;
	 	 	 		var imgType=$($(imgs[j]).children()[0]).attr("imgType");
	 	 	 		var uploadName=$($(imgs[j]).children()[0]).attr("imgName");
	 	 	 		 
	  	 	 		var img={"src":src,"imgType":imgType,"name":file_id};
	 	 	 		var supplierFile={id:"",file_id:file_id,upload_name:uploadName,upload_type:imgType,upload_path:file_id+imgType,qualified_id:qualified_id,add_time:"",del_flag:""};
	 	 	 		
	 	 	 		fileList.push(supplierFile);
	 	 	 		imgList.push(img);
	 			}
	 			
	 			
	 		}
	    
	 	   //资产集合插入
	 	  qualifiedList.push(qualified);
 	 	   
 
	 	
 	 }
	 return  true;
	 
 } 

   //获得唯一标示
 function generateUUID() {
	 var d = new Date().getTime();
	 var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	   var r = (d + Math.random()*16)%16 | 0;
	   d = Math.floor(d/16);
	   return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	 });
	 return uuid;
	 };
function uploadImgs(){
	var status=true;
	for(var i=0;i<imgList.length;i++){
		
		var src=imgList[i].src;
		var imgType=imgList[i].imgType;
		var name=imgList[i].name;
		 startUpload(src,imgType,name);
	
	}
	
	return true;
	
	
}
//开始上传
function startUpload(src,imgType,name){
	 $.ajax({
		 type:"POST",
    	  url: 'upload',
    	  data:{src :src,imgType:imgType,name:name},
    	  dataType:"json",
    	  async : false,
    	  success:function(data){
      		  return data.status;
    	  }
	 })
	 
}

//验证资质信息
function check(thi){
 
    if(thi.value==""){
	  $(thi).next()[0].style.display = 'block';  
     }else{
     $(thi).next()[0].style.display = 'none';  
     }
    
 }

function formatDate(dateStr){
  	if(dateStr != undefined){
  		var saveDate  = new Date(Date.parse(dateStr.replace(/-/g, "/")));
		 return saveDate.getTime();
  	}
	
}
 
 

 

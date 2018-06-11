
//功能模块管理
$(function () {

    /*
    //添加
    $("#btnAdd").click(function () {
        $("#Add").modal("show");

    });


    //编辑
    $("#btnEdit").click(function () {
        var select = $("#hid_SelectRow_Key").val();
        if (select == "" || select == null) {
            message("选择一条数据进行编辑！", 2);
            return false;
        }
    });


    //删除
    $("#btnDelete").click(function () {
        var select = $("#hid_SelectRow_Key").val();
        if (select == "" || select == null) {
            message("选择一条数据进行编辑！", 2);
            return false;
        }
        swal({
            title: "删除菜单【" + $("#hid_SelectMenuName").val() + "】？",
            text: "注意：菜单删除后子菜单也会删除!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: false
        }, function () {
            swal("删除成功!", "信息删除成功", "success");

        });
    });

    */

    //复选框CSS
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });



    var config = {
        '.chosen-select': {},
        '.chosen-select-deselect': { allow_single_deselect: true },
        '.chosen-select-no-single': { disable_search_threshold: 10 },
        '.chosen-select-no-results': { no_results_text: 'Oops, nothing found!' },
        '.chosen-select-width': { width: "95%" }
    }

    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }
    
    $("#menu_tree_body").delegate('.Meunbut', 'click', function(){
    	var $tr = $("#menu_tree_body").find("tr");
    	var $this = $(this);
    	var menuId = $this.attr("menuId");
    	//赋值  ，是否有子菜单
    	$tr.each(function(){
    		var className = $(this).attr("class");
    		var idName = $(this).attr("id").substring("forRemove".length);
    		var $son = $("#menu_tree_body").find(".table_"+idName);
    		if($son.length > 0) 
    			$(this).find("span.Meunbut").attr("hasSon", true);
    		else
    			$(this).find("span.Meunbut").attr("hasSon", false);
    	});
    	
    	var hasSon = $this.attr("hasSon");
    	if(hasSon == 'false')
    		return;
    	
    	var icon = $this.children().attr("class");
    	if (icon == "fa fa-minus-square") {
    		$this.children().attr("class", "fa fa-plus-square")
        } else {
        	$this.children().attr("class", "fa fa-minus-square")
        }
    	
    	$("#MenuTable .table_" + menuId).fadeToggle();
    	$("#MenuTable .table_" + menuId).each(function (i, v) {
            var menuid = $(v).find("span.Meunbut").attr("menuid");
            var hasChild = $(v).find("span.Meunbut").attr("hasSon");
            if(hasChild == 'true')
            	$(v).find("span.Meunbut").find("i").attr("class", "fa fa-plus-square");
            $("#MenuTable .table_" + menuid).hide();
            
            
            $("#MenuTable .table_" + menuid).each(function(m, k){
            	var mid = $(k).find("span.Meunbut").attr("menuid");
            	var hasChild = $(k).find("span.Meunbut").attr("hasSon");
            	if(hasChild == 'true')
                	$(k).find("span.Meunbut").find("i").attr("class", "fa fa-plus-square");
            	$("#MenuTable .table_" + mid).hide();
            })
            
        });
    })
    
    //菜单位置调整 --上移
    $("#menu_tree_body").delegate('.moveUp', 'click', function(){
    	var menuId = $(this).attr("menuId");
    	var olevel = $(this).attr("level");
    	var $tr = $("#menu_tree_body").find("#forRemove"+menuId);
    	var className = $tr.attr("class");
    	var $trList = $("#menu_tree_body").find("."+className);
    	for( var i = 0; i < $trList.length; i++ ) {
    		var $trRow = $trList.eq(i);
    		var trRowId = $trRow.attr("id");
    		trRowId = trRowId.substring("forRemove".length);
    		if(trRowId == menuId && i == 0) {
    			CommonUtils.toastMsg(3, "已经是第一个了", 2);
    			return;
    		}	
    	}
    	//可以移动
    	$.ajax({
			type : 'POST',
			async : false,
			url : basePath + 'sysMenu/moveUp',
			data : {'menuId' : menuId },
			dataType : 'html',
			success : function(data){
				CommonUtils.toastMsg(0, "操作成功", 2);	
				$("#menu_tree_body").html(data);
//				if(olevel == '2') {
					$("#menu_tree_body").find("span.Meunbut").each(function(){
						var menuId = $(this).attr("menuid");
						var level = $(this).attr("level");
						if(level == '2' && menuId != currentMenu) {
							$(this).click();
						}
					});
//				}
			}
		})
    });
    
    //moveDown 将 moveDonw 转换成 moveUp
    $("#menu_tree_body").delegate('.moveDown', 'click', function(){
    	var menuId = $(this).attr("menuId");
    	var olevel = $(this).attr("level");
    	var $tr = $("#menu_tree_body").find("#forRemove"+menuId);
    	var className = $tr.attr("class");
    	var $trList = $("#menu_tree_body").find("."+className);
    	var last = $trList.length - 1;
    	var next = 0;
    	for( var i = 0; i < $trList.length; i++ ) {
    		var $trRow = $trList.eq(i);
    		var trRowId = $trRow.attr("id");
    		trRowId = trRowId.substring("forRemove".length);
    		if(trRowId == menuId && i == last) {
    			CommonUtils.toastMsg(3, "已经是最后一个了", 2);
    			return;
    		}
    		//可以移动 ，找到 target  菜单
    		if(trRowId == menuId && i != last) {
    			next = i + 1;
    			break;
    		}
    	}
    	var $trNext = $trList.eq(next);
    	var nextMenuId = $trNext.attr("id").substring("forRemove".length);
    	//可以移动
    	$.ajax({
			type : 'POST',
			async : false,
			url : basePath + 'sysMenu/moveUp',
			data : {'menuId' : nextMenuId },
			dataType : 'html',
			success : function(data){
				CommonUtils.toastMsg(0, "操作成功", 2);	
				$("#menu_tree_body").html(data);
//				if(olevel == '2') {
					$("#menu_tree_body").find("span.Meunbut").each(function(){
						var menuId = $(this).attr("menuid");
						var level = $(this).attr("level");
						if(level == '2' && menuId != currentMenu) {
							$(this).click();
						}
					});
//				}
			}
		})
    });
    
});




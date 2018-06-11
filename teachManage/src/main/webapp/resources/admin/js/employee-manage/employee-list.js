var employee_list = {
		reloadUserGrid : function(){}
};

$(function(){
	
	var jqGridId = 'grid-table';
	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";
	
	//resize to fit page size
    //var parent_column = $(grid_selector).closest('[class*="col-"]');
	$(window).on('resize.jqGrid', function () {
		var parent_width = $(grid_selector).closest('.tab-pane').width();
		var parent_height = $(grid_selector).closest('.tab-pane').height();

		$(grid_selector).jqGrid( 'setGridWidth', parent_width );
		$(grid_selector).jqGrid( 'setGridHeight', parent_height - 150);
	});
	//and also set width when tab pane becomes visible
	$('#myTab a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		if($(e.target).attr('href') == '#list') {
			var parent_width = $(grid_selector).closest('.tab-pane').width();
			var parent_height = $(grid_selector).closest('.tab-pane').height();
			$(grid_selector).jqGrid( 'setGridWidth', parent_width );
			$(grid_selector).jqGrid( 'setGridHeight', parent_height - 150);
		}
	});

	var userGird = jQuery(grid_selector).jqGrid({
		url: ParentUrl + '/usermanage/userInfoList',
        mtype: "post",
        postData : {},
        datatype: "json",
		height: 250,
		colNames : ["登录名", "员工号", "姓名", "手机号", "邮箱", "工作地点", "操作"],
		colModel:[
			{ name: 'loginId' ,align: 'center', key : true, sortable : false},
            { name: 'employeNo' ,align: 'center', sortable : false},
            { name: 'userName' ,align: 'center', sortable : false},
            { name: 'userPhone' ,align: 'center', sortable : false},
            { name: 'userEmail' ,align: 'center', sortable : false},
            { name: 'workplace' ,align: 'center', sortable : false},
            { name: 'loginId' ,align: 'center', sortable : false,
				formatter: function(cellValue, options, rowObject) {
	    		   
	    		    	var html = '<a class="ac_op model_edit ace-icon fa fa-pencil-square-o" mId="' + cellValue + '" href="javascript:void(0);" style="color: #2a8bcb;"></a>';
	    		   		html += '&nbsp;&nbsp;<a class="ac_op model_delete ace-icon fa fa-trash-o" mId="'+cellValue+'" href="#" style="color: #d3413b;"></a>';
	    		   
	    		   		return html;
	    	   		}
			}
		], 
		viewrecords : true,
		rowNum:20,
		rowList:[20,30,40],
		pager : pager_selector,
		rownumbers: true,
		rownumWidth: 30, // the width of the row numbers columns
		multiselect: false,
        ondblClickRow : function (id) {
			if(id){
                $('a[href="#edit"]').parent().show();
                $('a[href="#edit"]').tab('show');

                var loginId = id;

                initEditPanel(loginId);
			}
        },
		loadComplete : function() {
			var table = this;
			setTimeout(function(){
				updatePagerIcons(table);
			}, 0);
		}
		//caption: "jqGrid with inline editing"
	});
	
	//replace icons with FontAwesome icons like above
	function updatePagerIcons(table) {
		var replacement = 
		{
			'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
			'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
			'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
			'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
		};
		$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
			var icon = $(this);
			var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
			
			if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
		})
	}

	$('a[href="#edit"]').on('hidden.bs.tab', function(){
		$(this).parent().hide();
	});

	// 单个编辑用户
	$('#gbox_' + jqGridId).on('click', '.model_edit', function(){
		$('a[href="#edit"]').parent().show();
		$('a[href="#edit"]').tab('show');

        var loginId = $(this).attr('mId');

        initEditPanel(loginId);
	});

	// 单个删除用户
	$('#gbox_' + jqGridId).on('click', '.model_delete', function(){

		var loginId = $(this).attr('mId');
		
		zeroModal.confirm({
			title : '删除确认',
			content : '确认删除选中的用户信息吗?',
			contentDetail : '该操作将从服务器中删除该数据,谨慎操作!',
			okFn : function(){
				
				var zeroModal_deleteUser = zeroModal.loading(4);
				
				$.ajax({
					url : ParentUrl + '/usermanage/deleteUserInfo',
					type : 'post',
					data : {loginId : loginId},
					success : function(rs){
						if(rs.status){
							successMsg('操作提示',rs.msg, zeroModal_deleteUser);
							userGird.jqGrid('delRowData',loginId);
						} else {
							errorMsg('操作提示', rs.msg, zeroModal_deleteUser);
						}
					},
					error : function(){
						errorMsg('操作提示', '系统异常或网络原因,用户删除失败!', zeroModal_deleteUser);
					}
				});
			}
		});
	});
	
	$(window).triggerHandler('resize.jqGrid');//trigger window resize to make the grid get the correct size
	
	employee_list.reloadUserGrid = function(deptId, val, deptName, showTab, noParam){
		if(!noParam){
            var userPhone = val;
            var userName = val;
            var employeNo = val;

            userGird.jqGrid('setGridParam',{
                datatype:'json',
                postData:{'department' : deptId, 'userPhone' : userPhone, 'userName' : userName, 'employeNo' : employeNo},
                page:1
            }).trigger("reloadGrid");

            $('#user-search-input').val(val);
            $('span','#deptSelected').eq(0).html(deptName);
            // $('#deptSelected').append('<li><span class="label label-sm label-primary arrowed arrowed-right">Info</span></li>');
		} else {
            userGird.trigger("reloadGrid");
		}

		if(showTab){
            $('a[href="#list"]').tab('show');
		}

	};
	
	$('#user-search-input').keydown(function(e){
		if(e.keyCode == 13){
		   var val = $(this).val();
		   employee_list.reloadUserGrid('', val);
		   
		   $('span','#deptSelected').eq(0).html('所有部门');
		}
	});
	
	$('#user-search-input').focus(function(){
		$(this).width(300);
	});
	
	$('#user-search-input').blur(function(){
		$(this).width(152);
	});
});

var company_list = {
		reloadGrid : function(){}
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

	var companyGird = jQuery(grid_selector).jqGrid({
		url: ParentUrl + '/company/list',
        mtype: "post",
        postData : {},
        datatype: "json",
		height: 250,
		colNames : ["", "公司全称", "显示名称", "英文全称", "所在地", "行业描述", "管理员账号", "操作"],
		colModel:[
			{name : 'companyId', key: true, hidden : true},
			{ name: 'companyFullName' ,align: 'center', sortable : false},
            { name: 'companyName' ,align: 'center', sortable : false},
            { name: 'companyFullNameEn' ,align: 'left', sortable : false},
            { name: 'address' ,align: 'center', sortable : false},
            { name: 'industryId' ,align: 'left', sortable : false},
            { name: 'adminUser' ,align: 'left', sortable : false},
            { name: 'companyId' ,align: 'center', sortable : false,
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

                var companyId = id;
                initCompanyEditPanel(companyId);
			}
        },
		loadComplete : function() {
            var table = this;
            setTimeout(function () {
                updatePagerIcons(table);
            }, 0);
        },
        loadError : function () {
            errorMsg('操作提示', '无法获取应用程序数据', '','注：因系统异常或网络原因');
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

	// 单个编辑公司
	$('#gbox_' + jqGridId).on('click', '.model_edit', function(){
		$('a[href="#edit"]').parent().show();
		$('a[href="#edit"]').tab('show');

        var companyId = $(this).attr('mId');
        initCompanyEditPanel(companyId);
	});

	// 单个删除公司
	$('#gbox_' + jqGridId).on('click', '.model_delete', function(){

		var companyId = $(this).attr('mId');
		zeroModal.confirm({
			title : '删除确认',
			content : '确认删除选中的公司信息吗?',
			contentDetail : '注：该操作将删除关联的部门、用户、应用信息,谨慎操作!',
			okFn : function(){
				
				var zeroModal_deleteUser = zeroModal.loading(4);
				
				$.ajax({
					url : ParentUrl + '/company/delete',
					type : 'post',
					data : {companyId : companyId},
					success : function(rs){
						if(rs.status){
							successMsg('操作提示',rs.msg, zeroModal_deleteUser);
                            companyGird.jqGrid('delRowData',companyId);
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

    company_list.reloadGrid = function(val, noParam, showTab){
    	if(!noParam){
            var companyName = val || '';

            companyGird.jqGrid('setGridParam',{
                datatype:'json',
                postData:{'companyName' : companyName},
                page:1
            }).trigger("reloadGrid");

            $('#company-search-input').val(val);
		} else {
            companyGird.trigger("reloadGrid");
		}

		if(showTab){
            $('a[href="#list"]').tab('show');
		}

	};

    $('#company-search-input').keydown(function(e){
        if(e.keyCode == 13){
            var val = $(this).val();
            company_list.reloadGrid(val);
        }
    });
	
	$('#company-search-input').focus(function(){
		$(this).width(300);
	});
	
	$('#company-search-input').blur(function(){
		$(this).width(152);
	});
});

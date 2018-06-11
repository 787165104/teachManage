var application_list = {
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

	var appGird = jQuery(grid_selector).jqGrid({
		url: ParentUrl + '/appinfomanage/appInfoList',
        mtype: "post",
        postData : {},
        datatype: "json",
		height: 250,
		colNames : ["", "应用名称", "应用URL", "部署分类","应用分类", "小程序URL", "应用图标", "是否同步", "是否widget", "操作"],
		colModel:[
			{name : 'appId', key: true, hidden : true},
			{ name: 'appName' ,align: 'center', sortable : false},
            { name: 'appUrl' ,align: 'center', sortable : false},
            { name: 'deployType' ,align: 'center', sortable : false, formatter : function (cellValue, options, rowObject) {
                    if(cellValue == 1) {
                        return '<span class="label label-success label-white middle">页面类</span>';
                    } else if(cellValue == 2) {
                        return '<span class="label label-info label-white middle">流程类</span>';
                    } else if(cellValue == 3) {
                        return '<span class="label label-purple label-white middle">Docker类</span>';
                    }
                }
            },
            { name: 'appType' ,align: 'left', sortable : false, formatter : function (cellValue, options, rowObject) {
					if(cellValue == 0) {
						return '<span class="label label-white middle">应用程序</span>';
					} else if(cellValue == 1) {
						return '<span class="label label-success label-white middle">小程序应用</span>';
					} else if(cellValue == 2) {
						return '<span class="label label-info label-white middle">小程序页面</span>';
					} else if(cellValue == 3) {
						return '<span class="label label-purple label-white middle">PC不显示</span>';
					}
                }
            },
            { name: 'littelAppUrl' ,align: 'center', sortable : false},
            { name: 'appIcon' ,align: 'left', sortable : false, formatter : function (cellValue, options, rowObject) {
                    var strHtml = '<i class="' + cellValue + '"></i>&nbsp;' + cellValue;
                    return strHtml;
                }},
            { name: 'addUser' ,align: 'center', sortable : false,
				formatter : function(cellValue, options, rowObject){
                    if(cellValue == true){
                        return '<i class="icon-ok" style="color: green;"></i>';
                    } else {
                        return '<i class="icon-remove" style="color: red;"></i>';
                    }
                }},
			{ name: 'widget' ,align: 'center', sortable : false,
                formatter : function(cellValue, options, rowObject){
                    if(cellValue == true){
                        return '<i class="icon-ok" style="color: green;"></i>';
                    } else {
                        return '<i class="icon-remove" style="color: red;"></i>';
                    }
                }},
            { name: 'appId' ,align: 'center', sortable : false,
				formatter: function(cellValue, options, rowObject) {
	    		   
            		var html = '<a class="ac_op model_edit ace-icon fa fa-pencil-square-o" mId="' + cellValue + '" href="javascript:void(0);" style="color: #2a8bcb;" title="编辑"></a>';
                    html += '&nbsp;&nbsp;<a class="ac_op model_store ace-icon fa fa-shopping-bag" mId="' + cellValue + '" href="#" style="color: #ff892a;" title="商城"></a>';
            		html += '&nbsp;&nbsp;<a class="ac_op model_delete ace-icon fa fa-trash-o" mId="' +cellValue + '" href="#" style="color: #d3413b;" title="删除"></a>';
	    		   
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

                var appId = id;

                initAppEditPanel(appId);
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

	// 单个编辑
	$('#gbox_' + jqGridId).on('click', '.model_edit', function(){
		$('a[href="#edit"]').parent().show();
		$('a[href="#edit"]').tab('show');

        var appId = $(this).attr('mId');

        initAppEditPanel(appId);
	});

    // 商城信息
    $('#gbox_' + jqGridId).on('click', '.model_store', function(){
        $('a[href="#store"]').parent().show();
        $('a[href="#store"]').tab('show');

        var appId = $(this).attr('mId');

        initStorePanel(appId);
    });

	// 单个删除
	$('#gbox_' + jqGridId).on('click', '.model_delete', function(){

		var appId = $(this).attr('mId');
		
		zeroModal.confirm({
			title : '删除确认',
			content : '确认删除选中的应用信息吗?',
			contentDetail : '该操作将从服务器中删除该数据,谨慎操作!',
			okFn : function(){
				
				var zeroModal_deleteUser = zeroModal.loading(4);
				
				$.ajax({
					url : ParentUrl + '/appinfomanage/delete',
					type : 'post',
					data : {appId : appId, superAdmin : true},
					success : function(rs){
						if(rs.status){
							successMsg('操作提示',rs.msg, zeroModal_deleteUser);
                            appGird.jqGrid('delRowData',appId);
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

    application_list.reloadGrid = function(val, appType, deployType, showTab, noParam){
    	if(!noParam){
            var appName = val;
            var appUrl = val;

            var deployType = deployType || 0;

            appGird.jqGrid('setGridParam',{
                datatype:'json',
                postData:{'appName' : appName, 'appUrl' : appUrl, 'appType' : appType, 'deployType' : deployType},
                page:1
            }).trigger("reloadGrid");

            $('#app-search-input').val(val);
		} else {
            appGird.trigger("reloadGrid");
		}


		if(showTab){
            $('a[href="#list"]').tab('show');
		}

	};

    $('#app-search-input').keydown(function(e){
        if(e.keyCode == 13){
            var val = $(this).val();
            application_list.reloadGrid(val, 0);
        }
    });
	
	$('#app-search-input').focus(function(){
		$(this).width(300);
	});
	
	$('#app-search-input').blur(function(){
		$(this).width(152);
	});

	$('a', '#appTypeSelecte').click(function () {
		var p = $(this).parent();
		var text = $(this).text();

		$('.active', '#appTypeSelecte').removeClass('active');
		$('a.blue > i', '#appTypeSelecte').addClass('invisible');
		$('a.blue', '#appTypeSelecte').removeClass('blue');

		$('button.btn > font', '#appTypeSelecte').html(text);

		p.addClass('active');
		$(this).addClass('blue');
		$('.invisible', this).removeClass('invisible');

		var appType = parseInt($(this).attr('data-appType'));

        application_list.reloadGrid('', appType);
    });

    $('a', '#deployTypeSelecte').click(function () {
        var p = $(this).parent();
        var text = $(this).text();

        $('.active', '#deployTypeSelecte').removeClass('active');
        $('a.blue > i', '#deployTypeSelecte').addClass('invisible');
        $('a.blue', '#deployTypeSelecte').removeClass('blue');

        $('button.btn > font', '#deployTypeSelecte').html(text);

        p.addClass('active');
        $(this).addClass('blue');
        $('.invisible', this).removeClass('invisible');

        var deployType = parseInt($(this).attr('data-deployType'));

        application_list.reloadGrid('', 0, deployType);
    });
});

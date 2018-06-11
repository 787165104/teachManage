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
		colNames : ["", "应用名称", "应用URL", "应用分类", "小程序URL", "应用图标", "是否同步", "是否widget", "操作"],
		colModel:[
			{name : 'appId', key: true, hidden : true},
			{ name: 'appName' ,align: 'center', sortable : false},
            { name: 'appUrl' ,align: 'center', sortable : false},
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

            		var fromSource = rowObject.fromSource;
            		var html = '<a class="ac_op model_edit ace-icon fa fa-pencil-square-o" mId="' + cellValue + '" href="javascript:void(0);" style="color: #2a8bcb;"></a>';
            		html += '&nbsp;&nbsp;<a class="ac_op model_delete ace-icon fa fa-trash-o" mId="'+cellValue+'" href="#" style="color: #d3413b;" fromSource="'+ fromSource +'"></a>';
	    		   
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

	// 单个编辑应用
	$('#gbox_' + jqGridId).on('click', '.model_edit', function(){
		$('a[href="#edit"]').parent().show();
		$('a[href="#edit"]').tab('show');

        var appId = $(this).attr('mId');

        initAppEditPanel(appId);
	});

	// 单个删除应用
	$('#gbox_' + jqGridId).on('click', '.model_delete', function(){

		var appId = $(this).attr('mId');
		var fromSource = $(this).attr('fromSource');

		var contentDetail = '注：该操作将从服务器中删除该数据,谨慎操作!';
		if(fromSource == '1'){
            contentDetail = '注：该是商品应用,删除后可在商城重新添加!';
		}

		zeroModal.confirm({
			title : '删除确认',
			content : '确认删除选中的用户信息吗?',
			contentDetail : contentDetail,
			okFn : function(){
				
				var zeroModal_deleteUser = zeroModal.loading(4);
				
				$.ajax({
					url : ParentUrl + '/appinfomanage/delete',
					type : 'post',
					data : {appId : appId, superAdmin : false},
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

    application_list.reloadGrid = function(val, appType, showTab, noParam){
    	if(!noParam){
            var appName = val;
            var appUrl = val;

            appGird.jqGrid('setGridParam',{
                datatype:'json',
                postData:{'appName' : appName, 'appUrl' : appUrl, 'appType' : appType},
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
		$('a.blue > i').addClass('invisible');
		$('a.blue', '#appTypeSelecte').removeClass('blue');

		$('button.btn > font', '#appTypeSelecte').html(text);

		p.addClass('active');
		$(this).addClass('blue');
		$('.invisible', this).removeClass('invisible');

		var appType = parseInt($(this).attr('data-appType'));

        application_list.reloadGrid('', appType);
    });
});

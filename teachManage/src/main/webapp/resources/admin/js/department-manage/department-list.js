var department_list = {
		reloadGrid : function(){}
};

$(function(){
	
	var jqGridId = 'grid-table';
	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";
	
	//resize to fit page size
    //var parent_column = $(grid_selector).closest('[class*="col-"]');
	$(window).on('resize.jqGrid', function () {
		var parent_width = $(grid_selector).closest('.widget-body').width();
		var parent_height = $(grid_selector).closest('.widget-body').height();
		$(grid_selector).jqGrid( 'setGridWidth', parent_width - 10);
		$(grid_selector).jqGrid( 'setGridHeight', parent_height - 120);
	});
	//and also set width when tab pane becomes visible
	$('#myTab a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		if($(e.target).attr('href') == '#list') {
			var parent_width = $(grid_selector).closest('.widget-body').width();
			var parent_height = $(grid_selector).closest('.widget-body').height();
			$(grid_selector).jqGrid( 'setGridWidth', parent_width - 10);
			$(grid_selector).jqGrid( 'setGridHeight', parent_height - 120);
		}
	});

	var deptGird = jQuery(grid_selector).jqGrid({
        "url": ParentUrl + "/deptInfo/getDeptInfoTreeData",
        mtype: "post",
        postData : {},
        datatype: "json",
        height: 250,
        "colModel":[
            {
                "name":"deptId",
                "index":"deptId",
                "sorttype":"string",
                "key":true,
                "hidden":true
            },{
                "name":"deptName",
                "index":"deptName",
                sortable : false,
                "sorttype":"string",
                "label":"部门",
                "width":200
            },{
                "name":"deptLeaderName",
                "index":"deptLeaderName",
                sortable : false,
                "sorttype":"string",
                "label":"部门负责人",
                "align":"left",
                "width":70
            },{
                "name":"costCenter",
                "index":"costCenter",
                sortable : false,
                "sorttype":"string",
                "label":"成本中心",
                "align":"left",
                "width":70
            },{
                "name":"parentDeptId",
                "hidden":true
            },
            { name: 'deptId' ,label: '操作', align: 'center', sortable : false, width: 70,
                formatter: function(cellValue, options, rowObject) {
                    var parentDeptId = rowObject.parentDeptId;

                    if(parentDeptId != '0'){
                        var html = '<a class="ac_op model_edit ace-icon fa fa-pencil-square-o" mId="' + cellValue + '" href="javascript:void(0);" style="color: #2a8bcb;"></a>';
                        html += '&nbsp;&nbsp;<a class="ac_op model_delete ace-icon fa fa-trash-o" mId="'+cellValue+'" href="#" style="color: #d3413b;"></a>';
                        return html;
                    } else {
                        return '';
                    }
                }
            }
        ],
        viewrecords : true,
        rowNum : 1000,
        //rowList : [20,30,40],
        //pager : pager_selector,
        rownumbers : false,
        rownumWidth : 30, // the width of the row numbers columns
        multiselect : false,

        treeGrid:true,
        ExpandColumn : "deptName",
        treedatatype : "json",
        treeGridModel : "adjacency",
        loadonce : true,
        treeReader: {
            parent_id_field : "parentDeptId",
            level_field : "level",
            leaf_field : "leaf",
            expanded_field : "expanded",
            loaded : "loaded"
            //icon_field : "icon"
        },
        onSelectRow : function(ids){

            var row = deptGird.jqGrid('getRowData', ids);

            if(row){
                var pDeptName = row.deptName;
                var level = parseInt(row.level) + 1;

                $('input[name="parentDeptId"]', '#addDeptForm').val(ids);
                $('input[name="parentDeptName"]', '#addDeptForm').val(pDeptName);
                $('input[name="level"]', '#addDeptForm').val(level);

                deptGird.attr('data-selId', ids);
            }

        },
        ondblClickRow : function (id) {

            var row = deptGird.jqGrid('getRowData', id);

            if(row.parentDeptId != '0'){
                $('a[href="#edit"]').parent().show();
                $('a[href="#edit"]').tab('show');

                var deptId = id;

                initDeptEditPanel(deptId);
            } else {
                $('a[href="#add"]').parent().show();
                $('a[href="#add"]').tab('show');
            }
        },
        loadComplete : function () {

            var id = deptGird.attr('data-selId');

            if(!id) {
                var ids = deptGird.jqGrid('getDataIDs');
                if(ids.length){
                    id = ids[0];
                }
            }

            if(id){
                deptGird.jqGrid('setSelection', id);
            }
        },
        loadError : function () {
            errorMsg('操作提示', '无法获取应用程序数据', '','注：因系统异常或网络原因');
        }
		//caption: "jqGrid with inline editing"
	});

    $('a[href="#edit"]').on('hidden.bs.tab', function(){
        $(this).parent().hide();
    });

    // 单个编辑
    $('#gbox_' + jqGridId).on('click', '.model_edit', function(){

        $('a[href="#edit"]').parent().show();
        $('a[href="#edit"]').tab('show');

        var deptId = $(this).attr('mId');

        initDeptEditPanel(deptId);

    });

    // 单个删除
    $('#gbox_' + jqGridId).on('click', '.model_delete', function(){

        var deptId = $(this).attr('mId');

        var childSelector = 'td[title="' + deptId + '"][aria-describedby="grid-table_parentDeptId"]';
        if($(childSelector, deptGird).length){
            errorMsg('操作提示', "不可删除该部门", null, "注：该部门下存在子部门信息,不可进行删除操作");
            return ;
        }

        zeroModal.confirm({
            title : '删除确认',
            content : '确认删除选中的部门信息吗?',
            contentDetail : '该操作将从服务器中删除该数据,谨慎操作!',
            okFn : function(){

                var zeroModal_delete = zeroModal.loading(4);

                $.ajax({
                    url : ParentUrl + '/deptInfo/delDeptInfo',
                    type : 'post',
                    data : {deptId : deptId},
                    success : function(rs){
                        if(rs.status){
                            successMsg('操作提示',rs.msg, zeroModal_delete);
                            deptGird.jqGrid('delRowData',deptId);
                        } else {
                            errorMsg('操作提示', rs.msg, zeroModal_delete);
                        }
                    },
                    error : function(){
                        errorMsg('操作提示', '系统异常或网络原因,用户删除失败!', zeroModal_delete);
                    }
                });
            }
        });
    });

	$(window).triggerHandler('resize.jqGrid');//trigger window resize to make the grid get the correct size


    department_list.reloadGrid = function(val) {

        deptGird.jqGrid('setGridParam',{
            datatype:'json',
            postData:{deptName : val},
            page:1
        }).trigger("reloadGrid");
    };

    $('#department-search-input').keydown(function(e){
        if(e.keyCode == 13){
            var val = $(this).val();
            department_list.reloadGrid(val);
        }
    });

    $('#department-search-input').focus(function(){
        $(this).width(300);
    });

    $('#department-search-input').blur(function(){
        $(this).width(152);
    });

});
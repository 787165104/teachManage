function selectUser(multiselect){

    var url =  '/oneportal/usermanage/userInfoList';
    if(!multiselect){
        var postData = {};
        showUserList(url, postData, function (row) {
            if(row){

                var loginId = row.loginId;
                var userName = row.userName;

                jQuery('#assigneeField').val(loginId);
                jQuery('#assigneeField').focus();
                jQuery('#assigneeField').change();
            }
        }, multiselect);
	} else {
        var postData = {};
        showUserList(url, postData, function (rowIds) {
            if(rowIds){

            	var val = jQuery('#userField').val();
            	if(val){
            		rowIds = val + ',' + rowIds;
				}
                jQuery('#userField').val(rowIds);
                jQuery('#userField').focus();
                jQuery('#userField').change();
            }
        }, multiselect);
	}
}

function showUserList(url, postData, callback, multiselect) {
    var body = jQuery('body');
    var defaultOverflow = body.css('overflow');
    body.css('overflow', 'hidden');

    var jqGridId = 'my_user_list';
    var gridPagingId = 'my_user_list_paging';
    var jqGridWarrperId = 'my_user_list_warrper';

    var strHtml = '<div id="'+ jqGridWarrperId +'" style="margin-bottom: 2px;">' +
        '<div class="breadcrumbs" id="breadcrumbs">' +
        '<ul id="deptSelected" class="breadcrumb">' +
        '<li>' +
        '<i class="ace-icon fa fa-home home-icon"></i>' +
        '<span>所有部门</span>' +
        '</li>' +
        '</ul>' +
        '<div class="nav-search" id="nav-search">' +
        '<span class="input-icon">' +
        '<input type="text" placeholder="姓名/手机号/员工号" class="nav-search-input" id="user-search-input" autocomplete="off">' +
        '<i class="ace-icon fa fa-search nav-search-icon"></i>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<table id="' + jqGridId + '"></table>' +
        '<div id="' + gridPagingId + '"></div>';

    zeroModal.show({
        title: '选择用户',
        content : strHtml,
        width: '1000px',
        height: '90%',
        ok : true,
        okFn : function(opt){
            var jqGrid = jQuery('#' + jqGridId);

            if(!multiselect){
                var rowId = jqGrid.jqGrid('getGridParam','selrow');
                var row;

                if(rowId){
                    row = jqGrid.jqGrid('getRowData', rowId);
                }
                if (typeof callback === 'function') { callback(row, opt); }
			} else {

                var rowIds = jqGrid.jqGrid('getGridParam','selarrrow');
                if (typeof callback === 'function') { callback(rowIds, opt); }
			}
            //return false;
        },
        onClosed : function(){
            body.css('overflow', defaultOverflow);
        },
        onComplete : function(){

            var jqGrid = jQuery('#' + jqGridId);
            jqGrid.jqGrid({
                caption: "",
                url: url,
                mtype: "post",
                postData : postData,
                datatype: "json",
                colNames: ["登录名", "员工号", "姓名", "手机号", "部门"],
                colModel: [
                    { name: 'loginId' ,align: 'center', key : true},
                    { name: 'employeNo' ,align: 'center'},
                    { name: 'userName' ,align: 'center' },
                    { name: 'userPhone' ,align: 'center' },
                    { name: 'deptName' ,align: 'center' }
                ],
                viewrecords: true,
                multiselect: multiselect,
                rownumbers: true,
                autowidth: true,
                height: "200",
                rowNum: 10,
                rownumbers: true, // 显示行号
                rownumWidth: 30, // the width of the row numbers columns
                pager: '#' + gridPagingId,//分页控件的id
                subGrid: false,//是否启用子表格
                onSelectRow : function(ids){

                },
                loadComplete : function() {
                    var table = this;
                    setTimeout(function(){
                        updatePagerIcons(table);
                    }, 0);
                }
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
                jQuery('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
                    var icon = jQuery(this);
                    var jQueryclass = jQuery.trim(icon.attr('class').replace('ui-icon', ''));

                    if(jQueryclass in replacement) icon.attr('class', 'ui-icon '+replacement[jQueryclass]);
                })
            }
            jqGrid.setGridHeight(jQuery('#' + jqGridWarrperId).parent().height() - 141);

            jQuery('#' + jqGridWarrperId).on('keydown', '#user-search-input', function (e) {
                if(e.keyCode == 13){
                    var val = jQuery(this).val();

                    var userPhone = val;
                    var userName = val;
                    var employeNo = val;

                    jqGrid.jqGrid('setGridParam',{
                        datatype:'json',
                        postData:{'department' : '', 'userPhone' : userPhone, 'userName' : userName, 'employeNo' : employeNo},
                        page:1
                    }).trigger("reloadGrid");
                }
            });

            jQuery('#' + jqGridWarrperId).on('focus', '#user-search-input', function(){
                jQuery(this).width(300);
            });

            jQuery('#' + jqGridWarrperId).on('blur', '#user-search-input',function(){
                jQuery(this).width(152);
            });

        }
    });

    return jqGridId;
}


function selectDept() {
    var url =  '/oneportal/deptInfo/getDeptInfoTreeData';
    var postData = {};
    showDepartmentList(url, postData, function (rowId) {

		jQuery('#groupField').val(rowId);
        jQuery('#groupField').focus();
        jQuery('#groupField').change();
    });
}

function showDepartmentList(url, postData, callback) {
    var body = jQuery('body');
    var defaultOverflow = body.css('overflow');
    body.css('overflow', 'hidden');

    var jqGridId = 'my_dept_list';
    var gridPagingId = 'my_dept_list_paging';
    var jqGridWarrperId = 'my_dept_list_warrper';

    var strHtml = '<div id="'+ jqGridWarrperId +'" style="margin-bottom: 2px;">' +
        '<div class="breadcrumbs" id="breadcrumbs">' +
        '<ul id="deptSelected" class="breadcrumb">' +
        '<li>' +
        '<i class="ace-icon fa fa-home home-icon"></i>' +
        '<span>所有部门</span>' +
        '</li>' +
        '</ul>' +
        '<div class="nav-search" id="nav-search">' +
        '<span class="input-icon">' +
        '<input type="text" placeholder="部门名称" class="nav-search-input" id="dept-search-input" autocomplete="off">' +
        '<i class="ace-icon fa fa-search nav-search-icon"></i>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<table id="' + jqGridId + '"></table>' +
        '<div id="' + gridPagingId + '"></div>';

    zeroModal.show({
        title: '选择部门',
        content : strHtml,
        width: '600px',
        height: '90%',
        ok : true,
        okFn : function(opt){
            var jqGrid = jQuery('#' + jqGridId);

            var rowId = jqGrid.jqGrid('getGridParam','selrow');
            var row;

            if(rowId){
            	row = jqGrid.jqGrid('getRowData', rowId);
            }
            if (typeof callback === 'function') { callback(rowId, opt); }
            //return false;
        },
        onClosed : function(){
            body.css('overflow', defaultOverflow);
        },
        onComplete : function(){

            var jqGrid = jQuery('#' + jqGridId);
            jqGrid.jqGrid({
                caption: "",
                url: url,
                mtype: "post",
                postData : postData,
                datatype: "json",
                colModel: [
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
                    }
                ],
                viewrecords : true,
                rowNum : 1000,
                //rowList : [20,30,40],
                //pager : pager_selector,
                rownumbers : false,
                rownumWidth : 30, // the width of the row numbers columns
                multiselect : false,
                autowidth: true,

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

                }
            });

            jqGrid.setGridHeight(jQuery('#' + jqGridWarrperId).parent().height() - 101);
            //jqGrid.setGridWidth(jQuery('#' + jqGridWarrperId).parent().width() - 10);

            jQuery('#' + jqGridWarrperId).on('keydown', '#dept-search-input', function (e) {
                if(e.keyCode == 13){
                    var val = jQuery(this).val();

                    jqGrid.jqGrid('setGridParam',{
                        datatype:'json',
                        postData:{deptName : val},
                        page:1
                    }).trigger("reloadGrid");
                }
            });

            jQuery('#' + jqGridWarrperId).on('focus', '#dept-search-input', function(){
                jQuery(this).width(300);
            });

            jQuery('#' + jqGridWarrperId).on('blur', '#dept-search-input',function(){
                jQuery(this).width(152);
            });

        }
    });

    return jqGridId;
}
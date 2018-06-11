function successMsg(title, msg, loadModelId, msgDetail, okFn, onClosed){
	
	if(loadModelId){
		zeroModal.close(loadModelId);
	}
	
	zeroModal.success({
		title : title,
		content : msg,
		contentDetail : msgDetail,
		okFn :okFn,
		onClosed : onClosed
	});
};

function errorMsg(title, msg, loadModelId, msgDetail, okFn, onClosed){
	
	if(loadModelId){
		zeroModal.close(loadModelId);
	}
	
	zeroModal.error({
		title : title,
		content : msg,
		contentDetail : msgDetail,
		okFn : okFn,
		onClosed : onClosed
	});
};


/**
 * 显示部门信息
 * @param dDeptId 禁用指定部门节点
 * @param rDeptId 根节点
 * @param cDeptId 当前选中的父节点
 */
function showDeptInfoTree(callback, cDeptId, dDeptId, rDeptId){
    var body = $('body');
    var defaultOverflow = body.css('overflow');
    body.css('overflow', 'hidden');

    var id = 'my_dept_info_tree';
    var strHtml = '<div style="width: 100%; height: 100%; overflow: auto;"><ul id="' + id + '"></ul></div>'
    var selectableTree;

    zeroModal.show({
        title: '选择部门信息',
        content : strHtml,
        width: '600px',
        height: '90%',
        ok : true,
        okFn : function(){

            var treePanel = $('#' + id);
            var deptId = treePanel.attr('data-deptId');
            var deptName = treePanel.attr('data-deptName');
            var level = treePanel.attr('data-level');

			callback({deptId : deptId, deptName : deptName , level : level});
        },
        onClosed : function(){
            body.css('overflow', defaultOverflow);
        },
        onComplete : function(){
            var treePanel = $('#' + id);

            $.ajax({
                url :  ParentUrl + '/deptInfo/getDeptInfoList',
                type : 'post',
                data : {},
                success : function(rs) {
                    if(rs.length){

                        var defaultData = transformToTreeFormat(rs, cDeptId, 2);
                        selectableTree = createDeptTree(defaultData, treePanel, function(e, data){
                            var deptId = data.deptId;
                            var deptName = data.deptName;
                            var level = data.level;

                            treePanel.attr('data-deptId', deptId);
                            treePanel.attr('data-deptName', deptName);
                            treePanel.attr('data-level', level);
						});

                        if(cDeptId){

                        }

                        // 禁用选择指定节点
                        if(dDeptId) {

                        }
                    }
                },
                error : function(rs) {

                }
            })
        }
    });
};

function createDeptTree(treeDataSource, panelId, fnSelected) {

    return $(panelId).ace_tree({

        dataSource: function (options, callback) {
            var $data = null
            if (!("text" in options) && !("type" in options)) {
                $data = treeDataSource; //the root tree
                callback({data: $data});
                return;
            }
            else if ("type" in options && options.type == "folder") {
                if ("additionalParameters" in options && "children" in options.additionalParameters) {
                    $data = options.additionalParameters.children || {};
                }
                else {
                    $data = {}//no data
                }
            }

            if ($data != null) {
                callback({data: $data});
            }
        },
        loadingHTML: '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>',
        'open-icon': 'ace-icon fa fa-folder-open',
        'close-icon': 'ace-icon fa fa-folder',
        'selectable': true,
        multiSelect: false,
        'selected-icon': null,
        'unselected-icon': null,
        'folderSelect': true,
        'selected': fnSelected
    });
};

// 将数据转换为树形结构
var transformToTreeFormat = function (sNodes, selId, selLevel) {
    if (!sNodes) {
        return [];
    }

    var i, l,
        key = 'deptId',
        name = 'deptName',
        type = 'item',
        parentKey = 'parentDeptId',
        param = 'additionalParameters',
        childKey = 'children';

    var r = [];
    var tmpMap = [];
    for (i = 0, l = sNodes.length; i < l; i++) {
        tmpMap[sNodes[i][key]] = sNodes[i];
        sNodes[i].type = type;
        //sNodes[i]['icon-class'] = 'red';
        sNodes[i].text = '<i class="ace-icon fa fa-file-text"></i>&nbsp;' + sNodes[i][name];
        sNodes[i][param] = {};

        if (selId && selId == sNodes[i][key]) {
            sNodes[i][param]['item-selected'] = true;
        }
    }

    for (i = 0, l = sNodes.length; i < l; i++) {

        if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {

            /*if(!tmpMap[sNodes[i][parentKey]][childKey]) {
                tmpMap[sNodes[i][parentKey]][childKey] = [];
            }
            tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);*/

            if (!tmpMap[sNodes[i][parentKey]][param][childKey]) {
                tmpMap[sNodes[i][parentKey]][param][childKey] = [];
            }
            tmpMap[sNodes[i][parentKey]][param][childKey].push(sNodes[i]);

            tmpMap[sNodes[i][parentKey]].type = 'folder';
            tmpMap[sNodes[i][parentKey]].text = tmpMap[sNodes[i][parentKey]][name];

        } else {
            r.push(sNodes[i]);
        }
    }

    if (selLevel) {
        expandNode(r, selLevel);
    }

    //r = r[0][param][childKey];

    return r;
};

function expandNode(sNodes, level) {
    var key = 'deptId',
        name = 'deptName',
        type = 'item',
        parentKey = 'parentDeptId',
        param = 'additionalParameters',
        childKey = 'children';

    if (level) {

        for (var i = 0; i < sNodes.length; i++) {
            var childNodes = sNodes[i][param][childKey];

            if (childNodes && childNodes.length) {
                sNodes[i][param]['item-expand'] = true;

                level--;
                expandNode(childNodes, level);
            }
        }
    }
};

/**
 * 显示用户列表
 * @param url
 * @param postData
 * @param callback
 * @returns {String}
 */
function showUserList(url, postData, callback) {
    var body = $('body');
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
            var jqGrid = $('#' + jqGridId);
            var rowId = jqGrid.jqGrid('getGridParam','selrow');
            var row;

            if(rowId){
                row = jqGrid.jqGrid('getRowData', rowId);
            }
            if (typeof callback === 'function') { callback(row, opt); }

            //return false;
        },
        onClosed : function(){
            body.css('overflow', defaultOverflow);
        },
        onComplete : function(){

            var jqGrid = $('#' + jqGridId);
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
                multiselect: false,
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
                $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
                    var icon = $(this);
                    var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

                    if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
                })
            }
            jqGrid.setGridHeight($('#' + jqGridWarrperId).parent().height() - 141);

            $('#' + jqGridWarrperId).on('keydown', '#user-search-input', function (e) {
                if(e.keyCode == 13){
                    var val = $(this).val();

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

            $('#' + jqGridWarrperId).on('focus', '#user-search-input', function(){
                $(this).width(300);
            });

            $('#' + jqGridWarrperId).on('blur', '#user-search-input',function(){
                $(this).width(152);
            });

        }
    });

    return jqGridId;
}

/**
 * 显示应用图标列表
 * @param callback
 */
function showIconList(callback) {
    var body = $('body');
    var defaultOverflow = body.css('overflow');
    body.css('overflow', 'hidden');

    var id = 'my_icon_list';
    var strHtml = '<section><div style="width: 100%; height: 100%; overflow: auto;"><ul id="' + id + '" class="the-icons"></ul></div></section>';

    var zeroModel_Id = zeroModal.show({
        title: '选择应用图标<em style="color: red;">(双击选择)</em>',
        content : strHtml,
        width: '1000px',
        height: '90%',
        ok : false,
        cancel : true,
        okFn : function(){

        },
        onClosed : function(){
            body.css('overflow', defaultOverflow);
        },
        onComplete : function(){
            for(var i in iconDataSoucre) {
                var iconClass = iconDataSoucre[i];
                var $item = $('<li><i class="' + iconClass + '"></i> '+ iconClass +'</li>');

                $('#' + id).append($item);
            }

            $('li', '#' + id).dblclick(function () {
               var iconClass = $('i', this).attr('class');
               if(callback){
                   callback(iconClass);
               }

               zeroModal.close(zeroModel_Id);
            });
        }
    });
};

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
var app_category_list = {
		reloadGrid : function(){}
};

$(function(){});

function showCategoryList(url, postData, callback) {
    var body = $('body');
    var defaultOverflow = body.css('overflow');
    body.css('overflow', 'hidden');

    var jqGridId = 'grid-category-table';
    var jqGridWarrperId = 'category_nav_warrper';

    var strHtml = '<div id="'+ jqGridWarrperId +'" style="margin-bottom: 2px;">' +
					'<div class="breadcrumbs" id="breadcrumbs">' +
					'<div class="nav-search" id="nav-search">' +
					'<span class="input-icon">' +
					'<input type="text" placeholder="类型名称" class="nav-search-input" id="category-search-input" autocomplete="off">' +
					'<i class="ace-icon fa fa-search nav-search-icon"></i>' +
					'</span>' +
					'</div>' +
					'</div>' +
				  '</div>' +
				  '<table id="' + jqGridId + '"></table>';

    zeroModal.show({
        title: '选择分类',
        content : strHtml,
        width: '700px',
        height: '500px',
        ok : true,
        okFn : function(opt){
            var jqGrid = $('#' + jqGridId);
            var rowId = jqGrid.jqGrid('getGridParam','selrow');
            var row;

            if(rowId){
                row = jqGrid.jqGrid('getRowData', rowId);
                row.appCategoryId = rowId;
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
                url: url,
                mtype: "post",
                postData : {},
                datatype: "json",
                height: 250,
                colNames : ["", "分类名称", "操作"],
                colModel:[
                    {name : 'appCategoryId', key: true, hidden : true},
                    { name: 'appCategoryName' ,align: 'center', sortable : false},
                    { name: 'appCategoryId' ,align: 'center', sortable : false, width: '40%',
                        formatter: function(cellValue, options, rowObject) {
                            var html = '<a class="ac_op model_delete ace-icon fa fa-trash-o" mId="'+cellValue+'" href="#" style="color: #d3413b;"></a>';
                            return html;
                        }
                    }
                ],
                viewrecords: true,
                rowNum: 9999,
                autowidth: true,
                rownumbers: true,
                rownumWidth: 30, // the width of the row numbers columns
                multiselect: false,
                ondblClickRow : function (id) {
                    var row = jqGrid.jqGrid('getRowData', id);
                    var appCategoryName = row.appCategoryName;

                    $('#txtCategoryName').val(appCategoryName);
                    $('#txtCategoryName').attr('data-id', id);

                    $('#btnEditCategory').removeAttr('disabled');
                    $('#btnAddCategory').attr('disabled', 'disabled');
                },
                loadComplete : function() {
                    var table = this;
                    setTimeout(function () { }, 0);
                },
                loadError : function () {
                    errorMsg('操作提示', '无法获取应用分类数据', '','注：因系统异常或网络原因');
                },
                caption: '<div class="input-group" style="width: 60%">' +
                			'<span class="input-group-btn">' +
							'<button disabled="disabled" id="btnEditCategory" type="button" class="btn btn-info btn-sm">' +
							'<span class="ace-icon fa fa-pencil-square-o icon-on-right bigger-110"></span>' +
							'</button>' +
							'</span>' +
							'<input type="text" id="txtCategoryName" class="form-control" placeholder="edit/add category">' +
							'<span class="input-group-btn">' +
							'<button id="btnAddCategory" type="button" class="btn btn-success btn-sm">' +
							'<span class="ace-icon fa fa-plus icon-on-right bigger-110"></span>' +
							'</button>' +
							'</span>' +
						  '</div>'
            });

            jqGrid.setGridHeight($('#' + jqGridWarrperId).parent().height() - 141);

            $('.ui-jqgrid-titlebar', '#gbox_' + jqGridId).css({'height': '45px', 'backgroundColor' : '#dee7f5'});
            $('.ui-jqgrid-title', '#gbox_' + jqGridId).css({height: '45px', margin: '0px', padding: '5px'});
            $('.ui-icon-circle-triangle-n', '#gbox_' + jqGridId).css({lineHeight: '30px'});

            // 单个删除
            $('#gbox_' + jqGridId).on('click', '.model_delete', function(){

                var appCategoryId = $(this).attr('mId');

                zeroModal.confirm({
                    title : '删除确认',
                    content : '确认删除选中的分类信息吗?',
                    contentDetail : '该操作将从服务器中删除该数据,谨慎操作!',
                    okFn : function(){

                        var zeroModal_deleteUser = zeroModal.loading(4);

                        $.ajax({
                            url : ParentUrl + '/appCategory/delete',
                            type : 'post',
                            data : {appCategoryId : appCategoryId},
                            success : function(rs){
                                if(rs.status){
                                    successMsg('操作提示',rs.msg, zeroModal_deleteUser);
                                    jqGrid.jqGrid('delRowData',appCategoryId);
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

            app_category_list.reloadGrid = function(val, onParam){

                if(!onParam){
                    jqGrid.jqGrid('setGridParam',{
                        datatype:'json',
                        postData:{'appCategoryName' : val},
                        page:1
                    }).trigger("reloadGrid");

                    $('#category-search-input').val(val);
                } else {
                    jqGrid.trigger("reloadGrid");
                }
            };

            $('#category-search-input').keydown(function(e){
                if(e.keyCode == 13){
                    var val = $(this).val();
                    app_category_list.reloadGrid(val);
                }
            });

            $('#category-search-input').focus(function(){ $(this).width(300); });
            $('#category-search-input').blur(function(){ $(this).width(152); });

            $('#txtCategoryName').keyup(function (e) {
               var val = $(this).val();
               if(!val) {
                   $('#btnEditCategory').attr('disabled', 'disabled');
                   $('#btnAddCategory').removeAttr('disabled');
               } else {
                   $(this).removeAttr('style');
               }
            });

            $('#btnEditCategory').click(function () {

                var val = $('#txtCategoryName').val();
                if(val){

                    var zeroModal_loadModelId = zeroModal.loading(4);
                    var appCategoryId = $('#txtCategoryName').attr('data-id');
                    $.ajax({
                        url : ParentUrl + '/appCategory/edit',
                        type : 'post',
                        data : {appCategoryId : appCategoryId, appCategoryName : val},
                        success : function (rs) {
                            if(rs.status){
                                $('#txtCategoryName').val('');
                                $('#btnEditCategory').attr('disabled', 'disabled');
                                $('#btnAddCategory').removeAttr('disabled');

                                app_category_list.reloadGrid('', true);

                                zeroModal.close(zeroModal_loadModelId);
                            } else {
                                errorMsg('操作提示', rs.msg, zeroModal_loadModelId, rs.msgDetail);
                            }
                        },
                        error : function () {
                            errorMsg('操作提示', 'app分类信息编辑失败', zeroModal_loadModelId, '注：系统异常或网络原因!');
                        }
                    });
                } else {
                    $('#txtCategoryName').css('backgroundColor', 'rgba(245, 153, 66, 0.5)');
                }
            });

            $('#btnAddCategory').click(function () {

                var val = $('#txtCategoryName').val();
                if(val) {
                    var zeroModal_loadModelId = zeroModal.loading(4);
                    $.ajax({
                        url : ParentUrl + '/appCategory/create',
                        type : 'post',
                        data : { appCategoryName : val },
                        success : function (rs) {
                            if(rs.status){
                                $('#txtCategoryName').val('');
                                app_category_list.reloadGrid('');
                                zeroModal.close(zeroModal_loadModelId);
                            } else {
                                errorMsg('操作提示', rs.msg, zeroModal_loadModelId, rs.msgDetail);
                            }
                        },
                        error : function () {
                            errorMsg('操作提示', 'app分类信息添加失败', zeroModal_loadModelId, '注：系统异常或网络原因!');
                        }
                    });
                } else {
                    $('#txtCategoryName').css('backgroundColor', 'rgba(245, 153, 66, 0.5)');
                }
            });
        }
    });

    return jqGridId;
}
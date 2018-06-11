$(function () {
    $.ajax({
        url: ParentUrl + '/deptInfo/getDeptInfoList',
        type: 'post',
        success: function (rs) {
            var dept_tree_data = transformToTreeFormat(rs, null, 2);
            createDeptTree(dept_tree_data, '#deptTree', function (e, data) {

                var deptId = data.deptId;
                var deptName = data.deptName;

                var parentDeptId = data.parentDeptId;
                if(parentDeptId != '0'){
                    employee_list.reloadUserGrid(deptId, '', deptName, true);
                } else {
                    employee_list.reloadUserGrid('', '', deptName, true);
                }
            });

            setAddUserDefaultDeptInfo(dept_tree_data[0]);
        }
    });
});

// var dept_tree_data;
// var dept_dataSource = function(options, callback){
// 	var $data = null
// 	if(!("text" in options) && !("type" in options)){
// 		$data = dept_tree_data; //the root tree
// 		callback({ data: $data });
// 		return;
// 	}
// 	else if("type" in options && options.type == "folder") {
// 		if("additionalParameters" in options && "children" in options.additionalParameters){
// 			$data = options.additionalParameters.children || {};
// 		}
// 		else{
// 			$data = {}//no data
// 		}
// 	}
//
// 	if($data != null){
// 		callback({ data: $data });
// 	}
// }
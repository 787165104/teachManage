$(function () {

    Dropzone.autoDiscover = false;
    var myDropzone = new Dropzone("#dropzone", {
        paramName: "userImportFile", // The name that will be used to transfer the file
        maxFilesize: 10, // MB

        addRemoveLinks: true,
        dictDefaultMessage:
            '<span class="bigger-150 bolder"><i class="ace-icon fa fa-caret-right red"></i> Drop files</span> to upload \
            <span class="smaller-80 grey">(or click)</span> <br /> \
            <i class="upload-icon ace-icon fa fa-cloud-upload blue fa-3x"></i>'
        ,
        dictResponseError: 'Error while uploading file!',

        //change the previewTemplate to use Bootstrap progress bars
        previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>"

    });

    // Hide the total progress bar when nothing's uploading anymore
    myDropzone.on("queuecomplete", function (progress) {
        //var zeroModal_deleteUser = zeroModal.loading(4);
    });

    myDropzone.on("success", function (e, data) {
        var loadModelId = zeroModal.loading(4);
        if (data.error) {
            errorMsg('操作提示', data.error, loadModelId, '', function () {
                myDropzone.removeAllFiles(true);
            }, function () {
                myDropzone.removeAllFiles(true);
            });

        } else {

            beginImportUser(loadModelId, myDropzone);

        }
    });
});

var timer;

function showImportResult(loadModelId, myDropzone, rs) {

    if (loadModelId) {
        zeroModal.close(loadModelId);
    }

    var strHtml = '<div class="widget-box">' +
        '<div class="widget-body">' +
        '<div class="widget-main">' +
        '<div class="clearfix">' +
        '<div class="grid4">' +
        '<span class="grey">' +
        '<i class="ace-icon fa fa-user-circle fa-2x blue"></i>' +
        '&nbsp; 总共' +
        '</span>' +
        '<h4 class="bigger pull-right">' + rs.total + '</h4>' +
        '</div>' +
        '<div class="grid4">' +
        '<span class="grey">' +
        '<i class="ace-icon fa fa-check-circle-o fa-2x green"></i>' +
        '&nbsp; 成功' +
        '</span>' +
        '<h4 class="bigger pull-right">' + rs.success + '</h4>' +
        '</div>' +
        '<div class="grid4">' +
        '<span class="grey">' +
        '<i class="ace-icon fa fa-times-circle-o fa-2x red"></i>' +
        '&nbsp; 失败' +
        '</span>' +
        '<h4 class="bigger pull-right">' + rs.fail + '</h4>' +
        '</div>' +
        '<div class="grid4">' +
        '<span class="grey">' +
        '<i class="ace-icon fa fa-warning fa-2x yellow"></i>' +
        '&nbsp; 已存在' +
        '</span>' +
        '<h4 class="bigger pull-right">' + rs.has + '</h4>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

    zeroModal.show({
        title: '导入信息',
        content: strHtml,
        width: '650px',
        height: '200px',
        ok: true,
        okFn: function () {
            myDropzone.removeAllFiles(true);
        },
        closed: function () {
            myDropzone.removeAllFiles(true);
        }
    });
};

function beginImportUser(loadModelId, myDropzone) {
    var count = 0;
    var $span = $('<span style="display: block;width: 250px;text-align: center;font-size: 9em;color: #aaa;margin-top: -120px;">0</span>');
    $('div[zero-unique-loading="' + loadModelId +'"]').append($span);

    if (!timer) {
        count = 0;

        $.ajax({
            url: ParentUrl + '/usermanage/importUserInfo',
            type: 'post',
            data: {},
            success: function (rs) {
                if (timer) {
                    clearInterval(timer);
                    timer = null;
                    zeroModal.close(loadModelId);
                }

                showImportResult(loadModelId,myDropzone,rs);

            },
            error: function (rs) {
                if (timer) {
                    clearInterval(timer);
                    timer = null;
                }
            }
        });

        timer = setInterval(function () {

            $.ajax({
                url: ParentUrl + '/usermanage/getImportIndex',
                type: 'post',
                data: {},
                success: function (rs) {
                    count = rs;
                },
                error: function (rs) {
                    count = 0;
                }
            });

            $span.html(count);
        }, 10);
    }
}
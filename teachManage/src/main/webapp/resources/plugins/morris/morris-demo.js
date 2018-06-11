$(function() {
	var basePath = $('#basePath').val();
	var datas=new Array();
	$.ajaxSettings.async = false; 
	$.post(
			 basePath + '/assets/queryIndexs',
				{
				
				},
				function(data){
					if(data.status==true){
						var info=data.msg;
						datas=info;
					}
					
				},
				"json"
		);
	Morris.Line({
        element: 'morris-line-chart',
        data: [{ y: datas[0].months, a: datas[0].totals, b: datas[0].lycs },
            { y: datas[1].months, a: datas[1].totals, b: datas[1].lycs },
            { y: datas[2].months, a: datas[2].totals, b: datas[2].lycs },
            { y: datas[3].months, a: datas[3].totals, b: datas[3].lycs },
            { y: datas[4].months, a: datas[4].totals, b: datas[4].lycs },
            { y: datas[5].months, a: datas[5].totals, b: datas[5].lycs },
            { y: datas[6].months, a: datas[6].totals, b: datas[6].lycs },
            { y: datas[7].months, a: datas[7].totals, b: datas[7].lycs },
            { y: datas[8].months, a: datas[8].totals, b: datas[8].lycs },
            { y: datas[9].months, a: datas[9].totals, b: datas[9].lycs },
            { y: datas[10].months, a: datas[10].totals, b: datas[10].lycs },
            { y: datas[11].months, a: datas[11].totals, b: datas[11].lycs }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['当月已报废个数', '当月资产领用次数'],
        hideHover: 'auto',
        resize: true,
        lineColors: ['#54cdb4','#1ab394'],
    });

});

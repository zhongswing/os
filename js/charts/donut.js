
$(function () {

	var top3 = donut_data.top3;
	var data = [];
	var series = 3;
	for (var i = 0; i < series; i++) {
		data[i] = { label: top3[i].Host.substring(0,10)+'..', data: Math.random(100) };
	}

	$($('.stat-value')[0]).html(donut_data.totio);
	$($('.stat-value')[1]).html(donut_data.totnr);
	$($('.stat-value')[2]).html(donut_data.toti);
	$($('.stat-value')[3]).html(donut_data.uptime);

	$.plot($("#donut-chart"), data, {
		colors: ["#F90", "#222", "#777", "#AAA"],
		series: {
			pie: { 
				innerRadius: 0.5,
				show: true
		  }
		}
	});

});

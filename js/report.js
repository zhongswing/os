
$(function () {
	var host = 'http://125.39.155.220:81';
	var date = window.location.pathname.split('/').slice(3);
	var url = host+'/data/'+date.join('/') + '/list.js';

	console.log('getting', url);
	head.js(url, function () {
		var childs = reports_data.child;
		if (childs) {
			for (var i = 0; i < childs.length; i++) {
				var href = '/inner/reports/' + childs[i].path;
				$('#report-list').append(
					$('<a class="btn">').html(childs[i].title)
					.attr('href', href)
				);
			}
		}
		var graphs = reports_data.graph;
		if (graphs) {
			var doms = $('.report-graph');
			for (var i = 0; i < doms.length && i < graphs.length; i++) {
				var dom = $(doms[i]);
				dom.find('h3').html(graphs[i].title);
				var iframe = dom.find('iframe');
				var btn_list = dom.find('.btn-list');
				var subgraph = graphs[i].subgraph;
				for (var j = 0; j < subgraph.length; j++) {
					(function (sg, iframe) { 
						btn_list.append(
								$('<a class="btn">')
								.html(sg.title).attr('src', host+sg.href)
								.click(function () {
									console.log(iframe, $(this).attr('src'));
									iframe.attr('src', $(this).attr('src'));
								})
						);
					})(subgraph[j], iframe);
				}
				iframe.attr('src', host + subgraph[0].href);
			}
		}
	});
})


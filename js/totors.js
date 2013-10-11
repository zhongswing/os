
function totors_init() {

	var set_form_err_field = function (form, o) {
		form.find('[name^="err_"]').each(function () {
			var html = o[$(this).attr('name')];
			if (html)
				$(this).html(html);
		})
	};

	var poststart = function (form) {
		form.find('[name^="err_"]').each(function () {
			$(this).html('');
		});
	};

	var postdone = function (form, ret) {
		var r = Object();
		ret = ret.replace(/[\n\r]/g, '');
		var arr = ret.split('&');
		for (var i = 0; i < arr.length; i++) {
			var a = arr[i].split('=');
			if (a.length != 2)
				continue;
			r[a[0]] = a[1];
		}
		switch (r.op) {
		case 'err_field':
			set_form_err_field(form, r);
			break;
		case 'ok':
			alert(r.msg);
			window.location.reload();
			break;
		case 'okjmp':
			alert(r.msg);
			window.location.href = r.path;
			break;
		case 'jmp':
			window.location.href = r.path;
			break;
		case 'err':
			break;
		default:	
			window.location.reload();
			break;
		}
	};

	$('form').each(function () {
		var form = $(this);
		if (form.attr('method') == 'post') {
			form.on('submit', function (e) {
				var data = form.serialize();
				e.preventDefault();
				poststart(form);
				$.post('?', data, function (ret) {
					postdone(form, ret);
				})
			});
		}
	});
}

$(document).ready(function () {
	totors_init();
});


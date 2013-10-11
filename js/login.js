$(document).ready(function(){
	return;
	$('.signinclick').hide();

	$('.signin').click(function(){	
		if ($(".drop").is(':hidden')) {
			$(".drop").slideDown().animate({height:'300px'},{queue:false, duration:600, easing: 'easeOutBounce'}),
		$('#link').removeClass('signin').addClass('signinclick');
		}
		else {
			$('.drop').slideUp(),
		$('#link').removeClass('signinclick').addClass('signin');
		}
	return false;
	});
	$('.drop').click(function(e) {
		e.stopPropagation();
	});
	$(document).click(function() {
		$('.drop').fadeOut('fast'),
		$('#link').removeClass('signinclick').addClass('signin');
	});

	var btn = $('#login-btn');
	btn.click(function (e) {
		var form = btn.closest('form');
		e.preventDefault();
		$('#err_username').html('');
		$('#err_password').html('');
		$.post('/', form.serialize(), function (ret) {
			ret = ret.replace(/[\r\n]/g, '');
			var o = Object();
			var arr = ret.split('&');
			for (var i = 0; i < arr.length; i++) {
				var a = arr[i].split('=');
				o[a[0]] = a[1];
			}
			if (o.op == 'err_field') {
				if (o.err_username) {
					$('#err_username').html(o.err_username);
				}
				if (o.err_password) {
					$('#err_password').html(o.err_password);
				}
			} else {
				window.location.reload();
			}
		});
	});
});


/* частичный оверрайд main.js, остальные в main-old.js */
$(document).ready(function () {

	// fancybox inits
	$('.fancybox:not([disabled],.disabled)').fancybox({
		closeExisting: true
	});

	$(document).on('click', '.fancybox-cancel', function (e) {
		$.fancybox.close();
		e.preventDefault();
	});

	$(document).on('click', '.preview-button', function (e) {
		var $self = $(this);
		$.fancybox({
			type: 'ajax',
			href: $self.attr('data-href'),
		});
		e.preventDefault();
	});

	// scroll to top
	var $scrollUpDown = $(".footer__scroll-up");
	$scrollUpDown.click(function () {
		$("body, html").animate({
			scrollTop: 0
		}, 200);
	});
	$(window).scroll(function () {
		scrTop = window.pageYOffset;
		if (scrTop > 250) {
			$scrollUpDown.fadeIn();
		} else {
			$scrollUpDown.fadeOut();
		}
	});
});
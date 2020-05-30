$(document).ready(function () {
	initOwl();
	// Wrap around nav & dots
	$('.main-carousel>.owl-carousel').find('.owl-nav, .owl-dots').not('.disabled').wrapAll('<div class="main-carousel__controls"></div>');
});
// Init carouseles
initOwl();
// Wrap around nav & dots on main carousel
$('.main-carousel>.owl-carousel').find('.owl-nav, .owl-dots').not('.disabled').wrapAll('<div class="main-carousel__controls"></div>');

// nav mobile
const navOpen = document.querySelector('.nav__hamburger'),
	navClose = document.querySelector('.nav-mobile__close'),
	mobileNavContainer = document.querySelector('.nav-mobile'),
	html = document.querySelector('html');

navOpen.onclick = function () {
	mobileNavContainer.classList.add('nav-mobile_active');
	html.classList.toggle('overlay-mobile-menu');
}
navClose.onclick = function () {
	mobileNavContainer.classList.remove('nav-mobile_active');
	html.classList.toggle('overlay-mobile-menu');
}

// close nav mobile by outside click
document.onclick = function (e) {
	if (e.target.classList.contains('overlay-mobile-menu')) {
		mobileNavContainer.classList.remove('nav-mobile_active');
		html.classList.toggle('overlay-mobile-menu');
	}
}
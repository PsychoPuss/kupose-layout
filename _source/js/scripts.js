//** init carouseles */
initOwl();
// Wrap around nav & dots on main carousel
$('.main-carousel>.owl-carousel').find('.owl-nav, .owl-dots').not('.disabled').wrapAll('<div class="main-carousel__controls"></div>');

//** init masonry */
initMasonry();
// $('.catalog__items').masonry({
// 	itemSelector: '.product',
// 	columnWidth: '.grid-sizer',
// 	horizontalOrder: true,
// 	percentPosition: true,
// 	stagger: 5,
// });

//** toggle filter on mobiles */
const btnFilter = document.querySelector('.filter__show-button .btn'),
	filterContainer = document.getElementById('catalog-filter-wrapper');
// slideDown = element => element.style.height = `${element.scrollHeight}px`,
// slideUp = element => element.style.height = 0,

if (btnFilter) {
	btnFilter.onclick = function () {
		this.classList.toggle('filter-opened');
		if (this.classList.contains('filter-opened')) {
			filterContainer.style.height = filterContainer.scrollHeight + 'px';
			// slideDown(filterContainer);
		} else {
			filterContainer.style.height = 0;
			// slideUp(filterContainer);
		}
	};
}


//** nav mobile */
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
function closeNavMobile(e) {
	if (e.target.classList.contains('overlay-mobile-menu')) {
		mobileNavContainer.classList.remove('nav-mobile_active');
		html.classList.toggle('overlay-mobile-menu');
	}
}

//** init top search form (show/hide) */
const searchIcon = document.querySelector('.search-form .form-button_search'),
	searchForm = document.querySelector('.search-form'),
	searchInput = document.querySelector('.form-input_search'),
	searchSvg = document.querySelector('.svg-icon__search');

searchIcon.addEventListener('click', initSearch);

function initSearch(e) {
	e.stopPropagation();
	if (searchForm.classList.contains('search-form_closed')) {
		e.preventDefault();
		searchInput.focus();
		searchForm.classList.toggle('search-form_closed');
		searchSvg.classList.toggle('svg-icon-white');
	} else if (searchInput.value.trim() == '') {
		e.preventDefault();
		searchInput.blur();
		searchForm.classList.toggle('search-form_closed');
		searchSvg.classList.toggle('svg-icon-white');
	}
}

// close search by outside click
function closeSearch(e) {
	if (document.querySelector('.search-form').contains(e.target) === false) {
		searchInput.blur();
		searchForm.classList.add('search-form_closed');
		searchSvg.classList.add('svg-icon-white');
	}
}















document.onclick = function (e) {
	closeSearch(e);
	closeNavMobile(e);
}
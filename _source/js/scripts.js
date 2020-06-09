//** init carouseles */
initOwl();
// Wrap around nav & dots on main carousel
$('.main-carousel>.owl-carousel').find('.owl-nav, .owl-dots').not('.disabled').wrapAll('<div class="main-carousel__controls"></div>');


//** init masonry */
initMasonry();


//** init fancybox */
initFancybox();


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


//** switcher toggle */
let switcherOption = document.querySelectorAll('.cert-switcher__option');

for (let i = 0; i < switcherOption.length; i++) {
	let self = switcherOption[i];
	self.addEventListener('click', toggleSwitcher);
}

function toggleSwitcher() {
	let switcherActive = document.querySelector('.switcher-selected');
	if (!this.classList.contains('switcher-selected')) {
		switcherActive.classList.remove('switcher-selected');
		this.classList.toggle('switcher-selected');
	}
}


//** tabs toggle */
let tabTriggers = document.querySelectorAll('.tabs-triggers__item'),
	tabContents = document.querySelectorAll('.tabs-content__item');

for (let i = 0; i < tabTriggers.length; i++) {
	let self = tabTriggers[i];
	self.addEventListener('click', toggleTab);
}

function toggleTab(e) {
	e.preventDefault();
	const id = e.target.getAttribute('href').replace('#', '');
	for (let i = 0; i < tabTriggers.length; i++) {
		tabTriggers[i].classList.remove('tabs-triggers__item_active');
	}
	for (let i = 0; i < tabContents.length; i++) {
		tabContents[i].classList.remove('tabs-content__item_active');
	}
	e.target.classList.add('tabs-triggers__item_active');
	document.getElementById(id).classList.add('tabs-content__item_active');
}

document.querySelector('.tabs-triggers__item').click();


//** product gallery images toggle */
const mainImage = document.querySelector('.main-img-preview'),
	mainImageBg = document.querySelector('.product__preview-main-link'),
	imgPreviews = document.querySelectorAll('.img-preview'),
	linkPreviews = document.querySelectorAll('.img-preview-link');

for (let i = 0; i < linkPreviews.length; i++) {
	let self = linkPreviews[i];
	self.addEventListener('click', togglePreview);
}

function togglePreview(e) {
	e.preventDefault();
	const image = e.target.parentNode.getAttribute('href'),
		index = e.target.parentNode.dataset.index;

	for (let i = 0; i < imgPreviews.length; i++) {
		imgPreviews[i].classList.remove('img-preview_active');
	}
	e.target.classList.add('img-preview_active');

	mainImage.setAttribute('src', image);
	mainImageBg.style.backgroundImage = 'url(' + image + ')';
	mainImageBg.dataset.fancyboxIndex = index;
}


//** whole document onclick */
document.onclick = function (e) {
	closeSearch(e);
	closeNavMobile(e);
}
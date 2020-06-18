//** init carouseles */
initOwl();
// Wrap around nav & dots on main carousel
$('.main-carousel>.owl-carousel').find('.owl-nav, .owl-dots').not('.disabled').wrapAll('<div class="main-carousel__controls"></div>');


//** init masonry */
initMasonry();


//** init fancybox */
initFancybox();


//** init datepicker */
initDatepicker()


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
		document.getElementById('search-dropdown').innerHTML = '';
	}
}


//** switcher toggle */

// TODO
// карточка товара; надо установить сессию через аякс и прочитать ее в корзине
let switcherOptionProd = document.querySelectorAll('.product__cert-type .switcher__option');

for (let i = 0; i < switcherOptionProd.length; i++) {
	let self = switcherOptionProd[i];
	self.addEventListener('click', toggleSwitcherProd);
}

function toggleSwitcherProd() {
	let switcherActive = document.querySelector('.switcher-selected');
	if (!this.classList.contains('switcher-selected')) {
		switcherActive.classList.remove('switcher-selected');
		this.classList.toggle('switcher-selected');
	}
}

// выбор времени; заполнить значение в hidden
let switcherOptionTime = document.querySelectorAll('.activate__time .switcher__option');

for (let i = 0; i < switcherOptionTime.length; i++) {
	let self = switcherOptionTime[i];
	self.addEventListener('click', toggleSwitcherTime);
}

function toggleSwitcherTime() {
	let switcherTime = document.querySelector('.activate__time .switcher-selected'),
		switcherCartPage = document.querySelector('input[name=time]'),
		switcherActivatePage = document.querySelector('input[name=ORDER_PROP_14]');

	if (switcherCartPage)
		switcherCartPage.value = this.textContent;

	if (switcherActivatePage)
		switcherActivatePage.value = this.textContent;

	if (!this.classList.contains('switcher-selected')) {
		switcherTime.classList.remove('switcher-selected');
		this.classList.toggle('switcher-selected');
	}
}

// список товаров в корзине; могут быть несколько товаров, переключать у обоих; уточнить по показу фансибокса
let switcherOptionCart = document.querySelectorAll('.cart__cert-type .switcher__option');

for (let i = 0; i < switcherOptionCart.length; i++) {
	let self = switcherOptionCart[i];
	self.addEventListener('click', toggleSwitcherCart);
}

function toggleSwitcherCart(e) {
	let switchers = document.querySelectorAll('.cart__cert-type .switcher__option'),
		switchersActive = document.querySelectorAll('.cart__cert-type .switcher-selected'),
		chooseLink = document.querySelectorAll('.cart__cert-type .choose-pack'),
		selects = document.querySelectorAll('.item-type-select-hide');

	for (let i = 0; i < chooseLink.length; i++) {
		let self = chooseLink[i];
		if (e.target.dataset.type == '1') {
			self.textContent = 'Выберите дизайн сертификата';
		} else {
			self.textContent = 'Выберите дизайн конверта';
		}
	}

	for (let i = 0; i < switchersActive.length; i++) {
		let self = switchersActive[i];
		self.classList.remove('switcher-selected');
	}

	for (let i = 0; i < switchers.length; i++) {
		let self = switchers[i];
		if (self.dataset.type == e.target.dataset.type) {
			self.classList.add('switcher-selected');
		}
	}

	// установим всем старым селектам выбранную опцию
	for (let i = 0; i < selects.length; i++) {
		let self = selects[i];
		self.value = e.target.dataset.type;

		// и передадим в старый jquery
		$(self).change();
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

if (tabTriggers.length > 0) {
	document.querySelector('.tabs-triggers__item').click()
};


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


//** accordion */
let accordion = document.querySelectorAll('.btn_accordion');

for (let i = 0; i < accordion.length; i++) {
	let self = accordion[i];
	self.addEventListener('click', toggleAccordion);
}

function toggleAccordion(e) {
	e.preventDefault();
	this.classList.toggle('btn_accordion-active');
	var content = this.nextElementSibling;
	if (content.style.maxHeight) {
		content.style.maxHeight = null;
	} else {
		content.style.maxHeight = content.scrollHeight + "px";
	}
}


//** whole document onclick */
document.onclick = function (e) {
	closeSearch(e);
	closeNavMobile(e);
}
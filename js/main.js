

/* Carousel init */
let breakpoints = {
	xs: 320,
	sm: 425,
	md: 768,
	lg: 1024,
	xl: 1180
}

function initOwl() {
	let $mainSlider = $('.main-carousel>.owl-carousel');
	let $whomSlider = $('.for-whom__carousel>.owl-carousel');
	let $productSlider = $('.product__carousel>.owl-carousel');
	let $activateSlider = $('.activate__carousel>.owl-carousel');

	if ($mainSlider.length) {
		let itemLength = $mainSlider.find('.main-carousel__item').length,
			params = {
				items: 1,
				autoplay: true,
				margin: 10,
				navText: ['пред.', 'след.'],
			};
		if (itemLength > 1) {
			params['loop'] = true;
			params['nav'] = true;
		} else {
			params['loop'] = false;
			params['dots'] = false;
		}
		$mainSlider.owlCarousel(params);
	}

	if ($whomSlider.length) {
		let itemLength = $whomSlider.find('.for-whom__carousel-item').length,
			params = {
				margin: 40,
				loop: false,
				dots: false,
				nav: true,
				navContainer: '.owl-custom-nav-block',
				autoWidth: true,
				items: 1,
				navText: [],
			};
		$whomSlider.owlCarousel(params);
	}

	if ($productSlider.length) {
		let itemLength = $productSlider.find('.product__carousel-item').length,
			params = {
				margin: 0,
				loop: false,
				dots: false,
				nav: true,
				navContainer: '.owl-custom-nav-block',
				autoWidth: true,
				items: 1,
				navText: [],
			};
		$productSlider.owlCarousel(params);
	}

	if ($activateSlider.length) {
		let itemLength = $activateSlider.find('.activate__carousel-item').length,
			params = {
				margin: 0,
				loop: false,
				dots: false,
				nav: true,
				navContainer: '.owl-custom-nav-block',
				autoWidth: true,
				items: 1,
				navText: [],
			};
		$activateSlider.owlCarousel(params);
	}
}
/* Masonry init */
function initMasonry() {
	let elem_kit = document.querySelector('.catalog__items_kit');
	if (elem_kit) {
		new Masonry(elem_kit, {
			itemSelector: '.catalog__items_kit .products_kit',
			columnWidth: '.catalog__items_kit .grid-sizer',
			horizontalOrder: true,
			percentPosition: true,
			stagger: 5,
		});
	}

	let elem_product = document.querySelector('.catalog__items_product');
	if (elem_product) {
		new Masonry(elem_product, {
			itemSelector: '.catalog__items_product .products_cat',
			columnWidth: '.catalog__items_product .grid-sizer',
			horizontalOrder: true,
			percentPosition: true,
			stagger: 5,
		});
	}
}
/* Fancybox init */
function initFancybox() {
	$('[data-fancybox="gallery"]').fancybox({
		protect: true,
		buttons: ["zoom", "slideShow", "fullScreen", "thumbs", "close"]
	});
}
/* Datepicker init */
function initDatepicker() {
	let date_now = new Date();
	date_now.setDate(date_now.getDate() + 1);

	$('.form-input_date').datepicker({
		minDate: date_now
	})
}
/* DOMContentLoaded */
document.addEventListener("DOMContentLoaded", function (event) {
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = "max"; //Для MobileFirst поменять на min

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) {
				return -1
			} else {
				return 1
			} //Для MobileFirst поменять
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) {
				return 1
			} else {
				return -1
			}
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());
let isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};
let body = document.querySelector('body');
if (isMobile.any()) {
	body.classList.add('touch');
} else {
	body.classList.add('mouse');
}
//** init carouseles */
initOwl();
// Wrap around nav & dots on main carousel
$('.main-carousel>.owl-carousel').find('.owl-nav, .owl-dots').not('.disabled').wrapAll('<div class="main-carousel__controls"></div>');


//** init masonry */
initMasonry();


//** init fancybox */
initFancybox();


//** init datepicker */
initDatepicker();

const freeshipping = 10000;

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
	searchSvg = document.querySelector('.svg-icon__search'),
	searchDropdown = document.getElementById('search-dropdown');

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
		if (searchDropdown) {
			searchDropdown.innerHTML = '';
		}
	}
}


//** catalog sort show/hide */
// const sortBox = document.querySelector('.catalog__sort-box');

function toggleCatalogSort(e) {
	const sortContainer = document.querySelector('.catalog__sort-select');
	if (sortContainer) {
		if (document.querySelector('.catalog__sort-box-active').contains(e.target) === true) {
			sortContainer.classList.toggle('catalog__sort-select_active');
		}
	}
}
// close sort by outside click
function closeCatalogSort(e) {
	const sortContainer = document.querySelector('.catalog__sort-select');
	if (sortContainer) {
		if (document.querySelector('.catalog__sort-box').contains(e.target) === false) {
			sortContainer.classList.remove('catalog__sort-select_active');
		}
	}
}

//** product card additional items price toggle */
let checkboxRecommends = document.querySelectorAll('.product__recommends-list input');

for (let i = 0; i < checkboxRecommends.length; i++) {
	let self = checkboxRecommends[i];
	self.addEventListener('change', toggleRecommends);
}

function toggleRecommends(e) {

	let switcherActive = document.querySelector('.switcher-selected'),
		dopElements = document.querySelectorAll('.product__recommends-list input:checked'),
		dopPrice = Number(0);

	for (let i = 0; i < dopElements.length; i++) {
		dopPrice += Number(dopElements[i].dataset.price);
	}

	let currentPriceBlock = document.querySelector('.price_card'),
		currentPrice = currentPriceBlock.dataset.price,
		shipping = switcherActive.dataset.shipping;

	if (currentPrice >= freeshipping) {
		shipping = 0;
	}
	currentPriceBlock.innerText = (Number(currentPrice) + Number(shipping) + Number(dopPrice)).toString().replace(/(?!^)(?=(\d{3})+(?=\.|$))/gm, ' ') + ' руб.';
}



//** switcher toggle */

// карточка товара; устанавливается тип сертификата и читается в корзине
let switcherOptionProd = document.querySelectorAll('.product__cert-type .switcher__option'),
	arrayElem = [];

for (let i = 0; i < switcherOptionProd.length; i++) {
	let self = switcherOptionProd[i];
	arrayElem.push(switcherOptionProd[i]);
	self.addEventListener('click', toggleSwitcherProd);
}

function toggleSwitcherProd(e) {
	setCookie('cert-type', arrayElem.indexOf(e.target));
	let switcherActive = document.querySelector('.switcher-selected'),
		dopElements = document.querySelectorAll('.product__recommends-list input:checked'),
		dopPrice = Number(0);

	for (let i = 0; i < dopElements.length; i++) {
		dopPrice += Number(dopElements[i].dataset.price);
	}

	if (!this.classList.contains('switcher-selected')) {
		switcherActive.classList.remove('switcher-selected');
		this.classList.toggle('switcher-selected');
	}

	let currentPriceBlock = document.querySelector('.price_card'),
		currentPrice = currentPriceBlock.dataset.price,
		shipping = e.target.dataset.shipping;

	if (currentPrice >= freeshipping) {
		shipping = 0;
	}
	currentPriceBlock.innerText = (Number(currentPrice) + Number(shipping) + Number(dopPrice)).toString().replace(/(?!^)(?=(\d{3})+(?=\.|$))/gm, ' ') + ' руб.';
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

// список товаров в корзине; могут быть несколько товаров, переключать у обоих
let switcherOptionCart = document.querySelectorAll('.cart__cert-type .switcher__option'),
	indexType = getCookie('cert-type') ? getCookie('cert-type') : 0,
	switcherProduct = document.querySelectorAll('.cart__cert-type .switcher_cert-type'),
	selects = document.querySelectorAll('.item-type-select-hide');

for (let i = 0; i < switcherOptionCart.length; i++) {
	let self = switcherOptionCart[i];
	self.addEventListener('click', toggleSwitcherCart);
}

for (let i = 0; i < switcherProduct.length; i++) {
	let switcher = switcherProduct[i].querySelectorAll('.switcher__option');
	for (let j = 0; j < switcher.length; j++) {
		if (j == indexType) {
			switcher[j].classList.toggle('switcher-selected');
			setCookie('selectType', switcher[j].dataset.type);
		}
	}
	selects[i].value = getCookie('selectType');
}


function toggleSwitcherCart(e) {
	setCookie('cert-type', e.target.dataset.type - 1);
	let switchers = document.querySelectorAll('.cart__cert-type .switcher__option'),
		switchersActive = document.querySelectorAll('.cart__cert-type .switcher-selected'),
		chooseLink = document.querySelectorAll('.cart__cert-type .choose-pack');

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
	mainVideo = document.querySelector('.product__preview-video'),
	imgPreviews = document.querySelectorAll('.img-preview'),
	linkPreviews = document.querySelectorAll('.img-preview-link'),
	videolinkPreviews = document.querySelectorAll('.img-preview-link_video');

for (let i = 0; i < linkPreviews.length; i++) {
	let self = linkPreviews[i];
	self.addEventListener('click', togglePreview);
}

for (let i = 0; i < videolinkPreviews.length; i++) {
	let self = videolinkPreviews[i];
	self.addEventListener('click', togglePreview);
}

function togglePreview(e) {
	e.preventDefault();
	const source = e.target.parentNode.getAttribute('href'),
		index = e.target.parentNode.dataset.index;

	for (let i = 0; i < imgPreviews.length; i++) {
		imgPreviews[i].classList.remove('img-preview_active');
	}

	if (e.target.closest('a').classList.contains('img-preview-link_video')) {
		e.target.closest('a').querySelector('.img-preview').classList.add('img-preview_active');
		let iframe = e.target.closest('a').querySelector('iframe');
		mainImageBg.style.display = 'none';
		mainVideo.style.display = 'block';
		mainVideo.innerHTML = iframe.outerHTML;
	} else {
		e.target.classList.add('img-preview_active');
		mainVideo.style.display = 'none';
		if (mainVideo.querySelector('iframe')) {
			mainVideo.querySelector('iframe').setAttribute('src', '');
		}
		mainImageBg.style.display = 'block';
		mainImage.setAttribute('src', source);
		mainImageBg.style.backgroundImage = 'url(' + source + ')';
		mainImageBg.dataset.fancyboxIndex = index;
	}
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
	toggleCatalogSort(e);
	closeCatalogSort(e);
}
});
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
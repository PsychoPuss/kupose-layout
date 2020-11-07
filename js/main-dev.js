

/* Carousel init */
let breakpoints = {
  xs: 320,
  sm: 425,
  md: 768,
  lg: 1024,
  xl: 1180,
};

function initOwl() {
  let $mainSlider = $(".main-carousel>.owl-carousel");
  let $whomSlider = $(".for-whom__carousel>.owl-carousel");
  let $productSlider = $(".product__carousel>.owl-carousel");
  let $activateSlider = $(".activate__carousel>.owl-carousel");
  let $packSlider = $(".packs__carousel>.owl-carousel");

  if ($mainSlider.length) {
    let itemLength = $mainSlider.find(".main-carousel__item").length,
      params = {
        items: 1,
        autoplay: true,
        autoplayTimeout: 10000,
        margin: 10,
        navText: ["пред.", "след."],
      };
    if (itemLength > 1) {
      params["loop"] = true;
      params["nav"] = true;
    } else {
      params["loop"] = false;
      params["dots"] = false;
    }
    $mainSlider.owlCarousel(params);
  }

  if ($whomSlider.length) {
    let itemLength = $whomSlider.find(".for-whom__carousel-item").length,
      params = {
        margin: 40,
        loop: false,
        dots: false,
        nav: true,
        navContainer: ".owl-custom-nav-block",
        autoWidth: true,
        items: 1,
        navText: [],
      };
    $whomSlider.owlCarousel(params);
  }

  if ($productSlider.length) {
    let itemLength = $productSlider.find(".product__carousel-item").length,
      params = {
        margin: 0,
        loop: false,
        dots: false,
        nav: true,
        navContainer: ".owl-custom-nav-block",
        autoWidth: true,
        items: 1,
        navText: [],
      };
    $productSlider.owlCarousel(params);
  }

  if ($activateSlider.length) {
    let itemLength = $activateSlider.find(".activate__carousel-item").length,
      params = {
        margin: 0,
        loop: false,
        dots: false,
        nav: true,
        navContainer: ".owl-custom-nav-block",
        autoWidth: true,
        items: 1,
        navText: [],
      };
    $activateSlider.owlCarousel(params);
  }

  if ($packSlider.length) {
    let itemLength = $packSlider.find(".pack__carousel-item").length,
      params = {
        margin: 30,
        loop: false,
        dots: false,
        nav: false,
        navContainer: ".owl-custom-nav-block",
        autoWidth: true,
        items: 3,
        navText: [],
      };
    $packSlider.owlCarousel(params);
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
  date_now.setDate(date_now.getDate());

  $(".form-input_date").datepicker({
    minDate: date_now,
  });
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
$(".main-carousel>.owl-carousel").find(".owl-nav, .owl-dots").not(".disabled").wrapAll('<div class="main-carousel__controls"></div>');

//** init masonry */
initMasonry();

//** init fancybox */
initFancybox();

//** init datepicker */
initDatepicker();

const freeshipping = delivery_free_from; // from scripts.js

//** toggle filter on mobiles */
const btnFilter = document.querySelector(".filter__show-button .btn"),
  filterContainer = document.getElementById("catalog-filter-wrapper");
// slideDown = element => element.style.height = `${element.scrollHeight}px`,
// slideUp = element => element.style.height = 0,

if (btnFilter) {
  btnFilter.onclick = function () {
    this.classList.toggle("filter-opened");
    if (this.classList.contains("filter-opened")) {
      filterContainer.style.height = filterContainer.scrollHeight + "px";
      // slideDown(filterContainer);
    } else {
      filterContainer.style.height = 0;
      // slideUp(filterContainer);
    }
  };
}

//** nav mobile */
const navOpen = document.querySelector(".nav__hamburger"),
  navClose = document.querySelector(".nav-mobile__close"),
  mobileNavContainer = document.querySelector(".nav-mobile"),
  html = document.querySelector("html");

navOpen.onclick = function () {
  mobileNavContainer.classList.add("nav-mobile_active");
  html.classList.toggle("overlay-mobile-menu");
};
navClose.onclick = function () {
  mobileNavContainer.classList.remove("nav-mobile_active");
  html.classList.toggle("overlay-mobile-menu");
};

// close nav mobile by outside click
function closeNavMobile(e) {
  if (e.target.classList.contains("overlay-mobile-menu")) {
    mobileNavContainer.classList.remove("nav-mobile_active");
    html.classList.toggle("overlay-mobile-menu");
  }
}

//** init top search form (show/hide) */
const searchIcon = document.querySelector(".search-form .form-button_search"),
  searchForm = document.querySelector(".search-form"),
  searchInput = document.querySelector(".form-input_search"),
  searchSvg = document.querySelector(".svg-icon__search"),
  searchDropdown = document.getElementById("search-dropdown");

searchIcon.addEventListener("click", initSearch);

function initSearch(e) {
  e.stopPropagation();
  if (searchForm.classList.contains("search-form_closed")) {
    e.preventDefault();
    searchInput.focus();
    searchForm.classList.toggle("search-form_closed");
    searchSvg.classList.toggle("svg-icon-white");
  } else if (searchInput.value.trim() == "") {
    e.preventDefault();
    searchInput.blur();
    searchForm.classList.toggle("search-form_closed");
    searchSvg.classList.toggle("svg-icon-white");
  }
}

// close search by outside click
function closeSearch(e) {
  if (document.querySelector(".search-form").contains(e.target) === false) {
    searchInput.blur();
    searchForm.classList.add("search-form_closed");
    searchSvg.classList.add("svg-icon-white");
    if (searchDropdown) {
      searchDropdown.innerHTML = "";
    }
  }
}

//** catalog sort show/hide */
// const sortBox = document.querySelector('.catalog__sort-box');

function toggleCatalogSort(e) {
  const sortContainer = document.querySelector(".catalog__sort-select");
  if (sortContainer) {
    if (document.querySelector(".catalog__sort-box-active").contains(e.target) === true) {
      sortContainer.classList.toggle("catalog__sort-select_active");
    }
  }
}
// close sort by outside click
function closeCatalogSort(e) {
  const sortContainer = document.querySelector(".catalog__sort-select");
  if (sortContainer) {
    if (document.querySelector(".catalog__sort-box").contains(e.target) === false) {
      sortContainer.classList.remove("catalog__sort-select_active");
    }
  }
}

//** product card additional items price toggle */
let checkboxRecommends = document.querySelectorAll(".product__recommends-list input");

for (let i = 0; i < checkboxRecommends.length; i++) {
  let self = checkboxRecommends[i];
  self.addEventListener("change", toggleRecommends);
}

function toggleRecommends(e) {
  let switcherActive = document.querySelector(".switcher-selected"),
    dopElements = document.querySelectorAll(".product__recommends-list input:checked"),
    dopPrice = Number(0),
    packPrice = Number(0);

  for (let i = 0; i < dopElements.length; i++) {
    dopPrice += Number(dopElements[i].dataset.price);
  }

  let currentPriceBlock = document.querySelector(".price_card"),
    currentPrice = currentPriceBlock.dataset.price,
    shipping = 0;
  // shipping = switcherActive.dataset.shipping;

  if (currentPrice >= freeshipping) {
    shipping = 0;
  }

  // if (getCookie("cert-type") == 1) {
  //   packPrice = pack_price_static; // from scripts.js
  // }

  currentPriceBlock.innerText =
    (Number(currentPrice) + Number(shipping) + Number(packPrice) + Number(dopPrice)).toString().replace(/(?!^)(?=(\d{3})+(?=\.|$))/gm, " ") + " руб.";
}

//** switcher toggle */

// карточка товара; устанавливается тип сертификата и читается в корзине
let switcherOptionProd = document.querySelectorAll(".product__cert-type .switcher__option"),
  arrayElem = [];

for (let i = 0; i < switcherOptionProd.length; i++) {
  let self = switcherOptionProd[i];
  arrayElem.push(switcherOptionProd[i]);
  self.addEventListener("click", toggleSwitcherProd);
}

function toggleSwitcherProd(e) {
  setCookie("cert-type", arrayElem.indexOf(e.target));
  let switcherActive = document.querySelector(".switcher-selected"),
    dopElements = document.querySelectorAll(".product__recommends-list input:checked"),
    dopPrice = Number(0),
    packPrice = Number(0);

  for (let i = 0; i < dopElements.length; i++) {
    dopPrice += Number(dopElements[i].dataset.price);
  }

  if (!this.classList.contains("switcher-selected")) {
    switcherActive.classList.remove("switcher-selected");
    this.classList.toggle("switcher-selected");
  }

  let currentPriceBlock = document.querySelector(".price_card"),
    currentPrice = currentPriceBlock.dataset.price,
    shipping = e.target.dataset.shipping;

  if (currentPrice >= freeshipping) {
    shipping = 0;
  }

  // if (getCookie("cert-type") == 1) {
  //   packPrice = pack_price_static; // from scripts.js
  // }

  currentPriceBlock.innerText =
    (Number(currentPrice) + Number(shipping) + Number(packPrice) + Number(dopPrice)).toString().replace(/(?!^)(?=(\d{3})+(?=\.|$))/gm, " ") + " руб.";
}

// выбор времени; заполнить значение в hidden
let switcherOptionTime = document.querySelectorAll(".activate__time .switcher__option");

for (let i = 0; i < switcherOptionTime.length; i++) {
  let self = switcherOptionTime[i];
  self.addEventListener("click", toggleSwitcherTime);
}

function toggleSwitcherTime() {
  let switcherTime = document.querySelector(".activate__time .switcher-selected"),
    switcherCartPage = document.querySelector("input[name=time]"),
    switcherActivatePage = document.querySelector("input[name=ORDER_PROP_14]");

  if (switcherCartPage) switcherCartPage.value = this.textContent;

  if (switcherActivatePage) switcherActivatePage.value = this.textContent;

  if (!this.classList.contains("switcher-selected")) {
    switcherTime.classList.remove("switcher-selected");
    this.classList.toggle("switcher-selected");
  }
}

// список товаров в корзине; могут быть несколько товаров, переключать у обоих
let switcherOptionCart = document.querySelectorAll(".cart__cert-type .switcher__option"),
  indexType = getCookie("cert-type") ? getCookie("cert-type") : 0,
  switcherProduct = document.querySelectorAll(".cart__cert-type .switcher_cert-type"),
  selects = document.querySelectorAll(".item-type-select-hide");

for (let i = 0; i < switcherOptionCart.length; i++) {
  let self = switcherOptionCart[i];
  self.addEventListener("click", toggleSwitcherCart);
}

for (let i = 0; i < switcherProduct.length; i++) {
  let switcher = switcherProduct[i].querySelectorAll(".switcher__option");
  for (let j = 0; j < switcher.length; j++) {
    if (j == indexType) {
      switcher[j].classList.toggle("switcher-selected");
      setCookie("selectType", switcher[j].dataset.type);
    }
  }
  selects[i].value = getCookie("selectType");
}

function toggleSwitcherCart(e) {
  let switcherClicked = e.target.closest(".switcher__option"),
    switchers = document.querySelectorAll(".cart__cert-type .switcher__option"),
    switchersActive = document.querySelectorAll(".cart__cert-type .switcher-selected"),
    chooseLink = document.querySelectorAll(".cart__cert-type .choose-pack span");

  setCookie("cert-type", switcherClicked.dataset.type - 1);

  for (let i = 0; i < chooseLink.length; i++) {
    let self = chooseLink[i];
    if (switcherClicked.dataset.type == "1") {
      self.textContent = "Выберите дизайн сертификата";
    } else if (switcherClicked.dataset.type == "2") {
      self.textContent = "Выберите дизайн конверта";
    } else {
      self.textContent = "Выберите дизайн коробки";
    }
  }

  for (let i = 0; i < switchersActive.length; i++) {
    let self = switchersActive[i];
    self.classList.remove("switcher-selected");
  }

  for (let i = 0; i < switchers.length; i++) {
    let self = switchers[i];
    if (self.dataset.type == switcherClicked.dataset.type) {
      self.classList.add("switcher-selected");
    }
  }

  // установим всем старым селектам выбранную опцию
  for (let i = 0; i < selects.length; i++) {
    let self = selects[i];
    self.value = switcherClicked.dataset.type;

    // и передадим в старый jquery
    $(self).change();
  }
}

//** tabs toggle */
let tabTriggers = document.querySelectorAll(".tabs-triggers__item"),
  tabContents = document.querySelectorAll(".tabs-content__item");

for (let i = 0; i < tabTriggers.length; i++) {
  let self = tabTriggers[i];
  self.addEventListener("click", toggleTab);
}

function toggleTab(e) {
  e.preventDefault();
  const id = e.target.getAttribute("href").replace("#", "");
  for (let i = 0; i < tabTriggers.length; i++) {
    tabTriggers[i].classList.remove("tabs-triggers__item_active");
  }
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("tabs-content__item_active");
  }
  e.target.classList.add("tabs-triggers__item_active");
  document.getElementById(id).classList.add("tabs-content__item_active");
}

if (tabTriggers.length > 0) {
  document.querySelector(".tabs-triggers__item").click();
}

//** product gallery images toggle */
const mainImage = document.querySelector(".main-img-preview"),
  mainImageBg = document.querySelector(".product__preview-main-link"),
  mainVideo = document.querySelector(".product__preview-video"),
  imgPreviews = document.querySelectorAll(".img-preview"),
  linkPreviews = document.querySelectorAll(".img-preview-link"),
  videolinkPreviews = document.querySelectorAll(".img-preview-link_video");

for (let i = 0; i < linkPreviews.length; i++) {
  let self = linkPreviews[i];
  self.addEventListener("click", togglePreview);
}

for (let i = 0; i < videolinkPreviews.length; i++) {
  let self = videolinkPreviews[i];
  self.addEventListener("click", togglePreview);
}

function togglePreview(e) {
  e.preventDefault();
  const source = e.target.parentNode.getAttribute("href"),
    index = e.target.parentNode.dataset.index;

  for (let i = 0; i < imgPreviews.length; i++) {
    imgPreviews[i].classList.remove("img-preview_active");
  }

  if (e.target.closest("a").classList.contains("img-preview-link_video")) {
    e.target.closest("a").querySelector(".img-preview").classList.add("img-preview_active");
    let iframe = e.target.closest("a").querySelector("iframe");
    mainImageBg.style.display = "none";
    mainVideo.style.display = "block";
    mainVideo.innerHTML = iframe.outerHTML;
  } else {
    e.target.classList.add("img-preview_active");
    mainVideo.style.display = "none";
    if (mainVideo.querySelector("iframe")) {
      mainVideo.querySelector("iframe").setAttribute("src", "");
    }
    mainImageBg.style.display = "block";
    mainImage.setAttribute("src", source);
    mainImageBg.style.backgroundImage = "url(" + source + ")";
    mainImageBg.dataset.fancyboxIndex = index;
  }
}

//** accordion */
let accordion = document.querySelectorAll(".btn_accordion");

for (let i = 0; i < accordion.length; i++) {
  let self = accordion[i];
  self.addEventListener("click", toggleAccordion);
}

function toggleAccordion(e) {
  e.preventDefault();
  this.classList.toggle("btn_accordion-active");
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
};

});
/* old main.js перенесены некоторые стили, остальные в main-old.js */
$(document).ready(function () {
  // fancybox inits
  $(".fancybox:not([disabled],.disabled)").fancybox({
    closeExisting: true,
  });

  $(document).on("click", ".fancybox-cancel", function (e) {
    $.fancybox.close();
    e.preventDefault();
  });

  $(document).on("click", ".preview-button", function (e) {
    var $self = $(this);
    $.fancybox({
      type: "ajax",
      href: $self.attr("data-href"),
    });
    e.preventDefault();
  });

  // scroll to top
  var $scrollUpDown = $(".footer__scroll-up");
  $scrollUpDown.click(function () {
    $("body, html").animate(
      {
        scrollTop: 0,
      },
      200
    );
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

/* old common (site.js) */
/* function updateAdd2Basket() {
	$('.add2cart span').html(NL_ADD_TO_BASKET_BUTTON);
	$('.add2cart').attr('href', 'javascript:;');
	$('.add2cart').removeClass('in_basket');
	if ($('.add2cart').length > 0 && $('.basket_products div').length > 0) {
		$('.basket_products div').each(function () {
			var productId = $(this).attr('data-product-id');
			$('.add2cart[data-product-id=' + productId + '] span').html(NL_ADD_TO_BASKET);
			$('.add2cart[data-product-id=' + productId + ']').attr('href', NL_ADD_TO_BASKET_URL);
			$('.add2cart[data-product-id=' + productId + ']').addClass('in_basket');
		});
	}
}

if (window.frameCacheVars !== undefined) {
	BX.addCustomEvent("onFrameDataReceived", function (json) {
		console.log('bx_personal_menu .dropdown-pane');
		// $('#bx_personal_menu .dropdown-pane').foundation();

		// loadLiked();
		// updateAdd2Basket();
		// updateAdd2Liked();
		// updateAdd2Compare();
		// if (!!BX.UserConsent) {
		// 	BX.UserConsent.loadFromForms();
		// }
	});
} else {
	$(document).ready(function () {
		// loadLiked();
		// updateAdd2Basket();
		// updateAdd2Liked();
		// updateAdd2Compare();
	});
} */

/* old cart (/bitlate_sport/js/scripts.js)*/
$(document).ready(function () {
  $("body").on("click", ".js-main-view", function () {
    var elem = $(this),
      val = elem.data("view-code"),
      block = ".catalog-reload",
      reload = true;

    $(".js-main-view").removeClass("selected");
    elem.addClass("selected");

    if (!$(elem).hasClass("ajax-loading")) {
      $(elem).addClass("ajax-loading");
    } else {
      return false;
    }
    showFilterLoading();

    $.ajax({
      type: "GET",
      url: "/?view=" + val,
      success: function (data) {
        $(data).find(block).replaceAll($(block));
        $(block).foundation();
        initSelect(block + " select");
        hideFilterLoading();

        if ($(".products-flex-grid").length > 0) {
          if (reload !== true) {
            $(".products-flex-grid").isotope("reloadItems");
          }
          productGridOptions["masonry"]["columnWidth"] = 295;
          $(".products-flex-grid").isotope(productGridOptions);
        }
        if ($(".product-list-item .dropdown-pane").length > 0) {
          $(".product-list-item .dropdown-pane").foundation();
        }
        $(elem).removeClass("ajax-loading");
        updateAdd2Basket();
        initTimer();
      },
    });

    return false;
  });

  //$(".js-main-view-2").trigger("click");

  // Оформление заказа
  $("body").on("click", ".js-btn-order", function () {
    var btn = $(this);

    if (btn.data("new") && btn.data("new") == "1") {
      var form = btn.closest("form"),
        form_wrap = form.find(".cart_form_wrap_" + pack_main_type),
        name = $.trim(form_wrap.find("input[name=ORDER_PROP_1]").val()),
        phone = $.trim(form_wrap.find("input[name=ORDER_PROP_3]").val()),
        email = $.trim(form_wrap.find("input[name=ORDER_PROP_2]").val()),
        pay = form.find("input[name=PAY_SYSTEM_ID]:checked").val(),
        ur_name = $.trim(form.find("input[name=ORDER_PROP_19]").val()),
        ur_inn = $.trim(form.find("input[name=ORDER_PROP_20]").val());

      form_wrap.find("input[name=ORDER_PROP_1]").removeClass("error");
      form_wrap.find("input[name=ORDER_PROP_2]").removeClass("error");
      form_wrap.find("input[name=ORDER_PROP_3]").removeClass("error");
      form.find("input[name=ORDER_PROP_19]").removeClass("error");
      form.find("input[name=ORDER_PROP_20]").removeClass("error");

      $("input[name=ORDER_PROP_24]").val("");

      if (!form.find("input[name=checkbox_accept]").prop("checked")) {
        alert("Необходимо согласиться с условиями Положения о защите персональных данных и Договора публичной оферты.");
        return false;
      }

      if (name.length < 2) {
        form_wrap.find("input[name=ORDER_PROP_1]").addClass("error").focus();
        return false;
      }
      if (phone.length < 10) {
        form_wrap.find("input[name=ORDER_PROP_3]").addClass("error").focus();
        return false;
      }
      if (email.length < 5) {
        form_wrap.find("input[name=ORDER_PROP_2]").addClass("error").focus();
        return false;
      }

      if (pack_main_type == "1") {
        var buyer = form_wrap.find("input[name=ORDER_PROP_10]:checked").val(),
          email_send = $.trim(form_wrap.find("input[name=ORDER_PROP_7]").val()),
          name_who_is_get = $.trim(form_wrap.find("input[name=ORDER_PROP_13]").val()),
          when_send = form_wrap.find("input[name=ORDER_PROP_11]:checked").val(),
          when_send_date = $.trim(form_wrap.find("input[name=ORDER_PROP_12]").val());

        form_wrap.find("input[name=ORDER_PROP_7]").removeClass("error");
        form_wrap.find("input[name=ORDER_PROP_12]").removeClass("error");
        form_wrap.find("input[name=ORDER_PROP_13]").removeClass("error");

        if (buyer == "V_2") {
          if (email_send.length < 5) {
            form_wrap.find("input[name=ORDER_PROP_7]").addClass("error").focus();
            return false;
          }
          if (name_who_is_get.length < 2) {
            form_wrap.find("input[name=ORDER_PROP_13]").addClass("error").focus();
            return false;
          }
        }

        if (when_send == "V_2") {
          if (when_send_date.length < 10) {
            form_wrap.find("input[name=ORDER_PROP_12]").addClass("error").focus();
            return false;
          }
        }

        if (buyer == "V_1") {
          $("input[name=ORDER_PROP_14]").val("");
          $("input[name=ORDER_PROP_7]").val("");
          $("input[name=ORDER_PROP_13]").val("");
          $("input[name=ORDER_PROP_12]").val("");
        }
      } else {
        var address = "",
          address_city = $.trim(form_wrap.find(".address_city").val()),
          address_street = $.trim(form_wrap.find(".address_street").val()),
          address_house = $.trim(form_wrap.find(".address_house").val()),
          address_corpus = $.trim(form_wrap.find(".address_corpus").val()),
          address_apart = $.trim(form_wrap.find(".address_apart").val()),
          address_comment = $.trim(form_wrap.find(".address_comment").val());

        form_wrap.find(".address_city").removeClass("error");
        form_wrap.find(".address_street").removeClass("error");
        form_wrap.find(".address_house").removeClass("error");

        if (address_city.length < 2) {
          form_wrap.find(".address_city").addClass("error").focus();
          return false;
        }
        if (address_street.length < 2) {
          form_wrap.find(".address_street").addClass("error").focus();
          return false;
        }
        if (address_house.length < 1) {
          form_wrap.find(".address_house").addClass("error").focus();
          return false;
        }

        address = address_city + ", " + address_street + ", д. " + address_house;
        if (address_corpus) {
          address += ", кор. " + address_corpus;
        }
        if (address_apart) {
          address += ", кв. " + address_apart;
        }
        if (address_comment) {
          address += ", Примечание: " + address_comment;
        }

        form_wrap.find("input[name=ORDER_PROP_5]").val(address);
      }

      if (pay == "10") {
        if (ur_name.length < 5) {
          form.find("input[name=ORDER_PROP_19]").addClass("error").focus();
          return false;
        }
        if (ur_inn.length < 5) {
          form.find("input[name=ORDER_PROP_20]").addClass("error").focus();
          return false;
        }
      } else {
        $("input[name=ORDER_PROP_19]").val("");
        $("input[name=ORDER_PROP_20]").val("");
      }

      if (pack_main_type == "1") {
        $(".cart_form_wrap_2").remove();
      } else {
        $(".cart_form_wrap_1").remove();
      }

      if (Object.keys(pack_selected).length) {
        var add_to_cart = {};
        var pack_selected_simple = {};
        var order_pack_text = "";

        for (item in pack_selected) {
          var cnt = parseInt($(".cart-product-item[data-product-id=" + item + "] .product-count .input-group-field").val());
          if (add_to_cart[pack_selected[item]["id"]]) {
            add_to_cart[pack_selected[item]["id"]] = add_to_cart[pack_selected[item]["id"]] + cnt;
          } else {
            add_to_cart[pack_selected[item]["id"]] = cnt;
          }

          pack_selected_simple[item] = pack_selected[item]["id"];

          var item_name = $.trim($(".cart-product-item[data-product-id=" + item + "] .cart-product-item-name").text());
          if (order_pack_text) order_pack_text += ", ";
          order_pack_text += item_name + ": " + pack_selected[item]["name"];
        }

        //order_pack_text = str_replace('"', "'", order_pack_text);
        //order_pack_text = str_replace('&', '%26', order_pack_text);
        $("input[name=ORDER_PROP_24]").val(order_pack_text);

        $.ajax({
          type: "POST",
          data: "items=" + JSON.stringify(add_to_cart) + "&pack_selected_simple=" + JSON.stringify(pack_selected_simple),
          url: "/scripts/add_to_cart_packs.php",
          success: function (data) {
            submitForm("Y");
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
          },
        });
      } else {
        submitForm("Y");
      }
    } else {
      var type = btn.data("type"),
        form = btn.closest("form"),
        name = $.trim(form.find("input[name=ORDER_PROP_1]").val()),
        phone = $.trim(form.find("input[name=ORDER_PROP_3]").val()),
        email = $.trim(form.find("input[name=ORDER_PROP_2]").val()),
        address = $.trim(form.find("input[name=ORDER_PROP_5]").val()),
        email_send = $.trim(form.find("input[name=ORDER_PROP_7]").val()),
        delivery = form.find("input[name=DELIVERY_ID]:checked").val(),
        pay = form.find("input[name=PAY_SYSTEM_ID]:checked").val(),
        buyer = form.find("input[name=ORDER_PROP_10]:checked").val(),
        when_send = form.find("input[name=ORDER_PROP_11]:checked").val(),
        when_send_date = $.trim(form.find("input[name=ORDER_PROP_12]").val()),
        name_who_is_get = $.trim(form.find("input[name=ORDER_PROP_13]").val()),
        product_id = $.trim(form.find("input[name=product_id]").val()),
        price_id = $.trim(form.find("input[name=price_id]").val()),
        dop_items = $.trim(form.find("input[name=dop_items]").val()),
        ur_name = $.trim(form.find("input[name=ORDER_PROP_19]").val()),
        ur_inn = $.trim(form.find("input[name=ORDER_PROP_20]").val());

      form.find("input[name=ORDER_PROP_1]").removeClass("error");
      form.find("input[name=ORDER_PROP_2]").removeClass("error");
      form.find("input[name=ORDER_PROP_3]").removeClass("error");
      form.find("input[name=ORDER_PROP_5]").removeClass("error");
      form.find("input[name=ORDER_PROP_7]").removeClass("error");
      form.find("input[name=ORDER_PROP_12]").removeClass("error");

      if (name.length < 2) {
        form.find("input[name=ORDER_PROP_1]").addClass("error").focus();
        return false;
      }
      if (phone.length < 10) {
        form.find("input[name=ORDER_PROP_3]").addClass("error").focus();
        return false;
      }
      if (email.length < 5) {
        form.find("input[name=ORDER_PROP_2]").addClass("error").focus();
        return false;
      }

      if (delivery == "10") {
        if (address.length < 5) {
          form.find("input[name=ORDER_PROP_5]").addClass("error").focus();
          return false;
        }
      }

      if (buyer == "V_2") {
        if (email_send.length < 5) {
          form.find("input[name=ORDER_PROP_7]").addClass("error").focus();
          return false;
        }
        if (name_who_is_get.length < 2) {
          form.find("input[name=ORDER_PROP_13]").addClass("error").focus();
          return false;
        }
      }

      if (when_send == "V_2") {
        if (when_send_date.length < 10) {
          form.find("input[name=ORDER_PROP_12]").addClass("error").focus();
          return false;
        }
      }

      if (!form.find("input[name=checkbox_accept]").prop("checked")) {
        alert("Необходимо согласиться с условиями Положения о защите персональных данных и Договора публичной оферты.");
        return false;
      }

      if (buyer == "V_1") {
        $("input[name=ORDER_PROP_14]").val("");
        $("input[name=ORDER_PROP_7]").val("");
        $("input[name=ORDER_PROP_13]").val("");
        $("input[name=ORDER_PROP_12]").val("");
      }

      if (delivery == "11") {
        $("input[name=ORDER_PROP_5]").val("");
      }

      if (pay == "10") {
        if (ur_name.length < 5) {
          form.find("input[name=ORDER_PROP_19]").addClass("error").focus();
          return false;
        }
        if (ur_inn.length < 5) {
          form.find("input[name=ORDER_PROP_20]").addClass("error").focus();
          return false;
        }
      } else {
        $("input[name=ORDER_PROP_19]").val("");
        $("input[name=ORDER_PROP_20]").val("");
      }

      if (type == "popup") {
        if (product_id) {
          $.ajax({
            type: "POST",
            data: "product_id=" + product_id + "&price_id=" + price_id,
            url: "/scripts/add_to_cart.php",
            success: function (data) {
              if (dop_items) {
                dop_items = dop_items.split(",");
                dop_items = JSON.stringify(dop_items);

                $.ajax({
                  type: "POST",
                  data: "target=add&pid=" + product_id + "&items=" + dop_items,
                  url: "/scripts/dop_items.php",
                  success: function (data) {
                    form.submit();
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(errorThrown);
                  },
                });
              } else {
                form.submit();
              }
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.log(textStatus);
              console.log(errorThrown);
            },
          });
        }
      } else {
        submitForm("Y");
      }
    }

    return false;
  });

  $("body").on("change", ".cart-order-block input[name=DELIVERY_ID]", function () {
    var delivery_value = $(".cart-order-block input[name=DELIVERY_ID]:checked").val();
    var pay_value = $(".cart-order-block input[name=PAY_SYSTEM_ID]:checked").val();

    if (delivery_value == "11" && pay_value == "11") {
      $('.cart-order-block input[name=PAY_SYSTEM_ID][value="12"]').closest("label").trigger("click");
    }
    if (delivery_value == "11") {
      $('.cart-order-block input[name=PAY_SYSTEM_ID][value="11"]').attr("disabled", "disabled");
    } else {
      $('.cart-order-block input[name=PAY_SYSTEM_ID][value="11"]').removeAttr("disabled");
    }

    update_cart_delivery();
  });

  $("body").on("change", ".cart-order-block input[name=PAY_SYSTEM_ID]", function () {
    var pay_value = $(".cart-order-block input[name=PAY_SYSTEM_ID]:checked").val();

    if (pay_value == "10") {
      $(".cart-order-block .field-block-req").show();
    } else {
      $(".cart-order-block .field-block-req").hide();
    }

    if (pay_value == "12") {
      $(".js-btn-order").text("Подтвердить и оплатить");
      $(".js-order-confirm-text").html(
        'Нажимая на кнопку "Подтвердить и оплатить", я даю свое согласие на обработку персональных данных в соответствии с указанными условиями в <a href="/company/pd.php" target="_blank">Положении о защите персональных данных</a> и подтверждаю, что ознакомлен и согласен с условиями <a href="/company/oferta.php" target="_blank">Договора Публичной оферты.</a>'
      );
    } else {
      $(".js-btn-order").text("Оформить заказ");
      $(".js-order-confirm-text").html(
        'Нажимая на кнопку "Оформить заказ", я даю свое согласие на обработку персональных данных в соответствии с указанными условиями в <a href="/company/pd.php" target="_blank">Положении о защите персональных данных</a> и подтверждаю, что ознакомлен и согласен с условиями <a href="/company/oferta.php" target="_blank">Договора Публичной оферты.</a>'
      );
    }
  });

  $("body").on("change", ".cart-order-block input[name=ORDER_PROP_10]", function () {
    var WHO_IS_GET = $(".cart-order-block input[name=ORDER_PROP_10]:checked").val();

    if (WHO_IS_GET == "V_2") {
      $(".cart-order-block .field-block-whos").show();
    } else {
      $(".cart-order-block .field-block-whos").hide();
    }
  });

  $("body").on("change", ".cart-order-block input[name=ORDER_PROP_11]", function () {
    var WHEN_IS_GET = $(".cart-order-block input[name=ORDER_PROP_11]:checked").val();

    if (WHEN_IS_GET == "V_2") {
      $(".cart-order-block .field-block-when").show();
    } else {
      $(".cart-order-block .field-block-when").hide();
    }
  });
  // Оформление заказа

  // Оформление быстрого заказа
  $("body").on("click", ".js-btn-order-fast", function () {
    var btn = $(this),
      form = btn.closest("form"),
      phone = $.trim(form.find("input[name=phone]").val()),
      product_id = $.trim(form.find("input[name=product_id]").val()),
      price_id = $.trim(form.find("input[name=price_id]").val());

    if (phone.length < 10) {
      form.find("input[name=phone]").addClass("error").focus();
      return false;
    }

    if (!form.find("input[name=checkbox_accept]").prop("checked")) {
      alert("Необходимо согласиться с условиями Положения о защите персональных данных.");
      return false;
    }

    $("#buy-to-click-fast .fancybox-block-caption").hide();
    form.find(".fast-order-form").hide();
    form.find(".fast-order-result").show();

    $.ajax({
      type: "POST",
      data: "product_id=" + product_id + "&price_id=" + price_id + "&phone=" + phone,
      url: "/scripts/fast_order.php",
      success: function (data) {},
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
        console.log(errorThrown);
      },
    });

    return false;
  });
  // Оформление быстрого заказа

  // Каталог на главной
  $("body").on("change", ".a-catalog-sorting select", function () {
    var elem = $(this),
      val = elem.val(),
      block = ".catalog-reload",
      reload = true;

    if (!$(elem).hasClass("ajax-loading")) {
      $(elem).addClass("ajax-loading");
    } else {
      return false;
    }
    showFilterLoading();

    $.ajax({
      type: "GET",
      url: "/?category=" + val,
      success: function (data) {
        $(data).find(block).replaceAll($(block));
        $(block).foundation();
        initSelect(block + " select");
        hideFilterLoading();

        if ($(".products-flex-grid").length > 0) {
          if (reload !== true) {
            $(".products-flex-grid").isotope("reloadItems");
          }
          $(".products-flex-grid").isotope(productGridOptions);
        }
        if ($(".product-list-item .dropdown-pane").length > 0) {
          $(".product-list-item .dropdown-pane").foundation();
        }
        $(elem).removeClass("ajax-loading");
        updateAdd2Basket();
        initTimer();
      },
    });

    return false;
  });
  // Каталог на главной

  // Активация купона
  $("body").on("click", ".activate_wrap .btn-hidden", function () {
    $(this).closest(".item_block").find(".text-hidden").toggleClass("open");
    return false;
  });

  $("body").on("click", ".activate_wrap .choose_btn", function () {
    if (!$(this).hasClass("choosen")) {
      $(".activate_wrap .choose_btn").removeClass("choosen").text("Выбрать");
      $(this).addClass("choosen").text("Выбрано");
      $(".form_contact_wrap").show();
    }

    return false;
  });

  $("body").on("click", ".choose_date_btn", function () {
    $(".activate_date_field_wrap").show();
    $(this).hide();

    return false;
  });

  $("body").on("click", ".activate_button_start", function () {
    var btn = $(this),
      form = btn.closest("form"),
      coupon = $.trim(form.find("input[name=coupon_number]").val());

    if (coupon.length == 14) {
      $.ajax({
        type: "POST",
        data: "target=check&coupon=" + coupon,
        url: "/scripts/activate.php",
        dataType: "json",
        success: function (data) {
          if (data[0] == "1") {
            $(".items_wrap_elements").html(data[1]);
            $(".items_wrap").show();
            $(".form_contact_wrap input[name=coupon]").val(coupon);
          } else {
            alert(data[1]);
            $(".items_wrap, .form_contact_wrap").hide();
          }
        },
      });
    } else {
      $(".items_wrap, .form_contact_wrap").hide();
    }

    return false;
  });

  $("body").on("click", ".activate_button_final", function () {
    var btn = $(this),
      form = btn.closest("form"),
      coupon = $.trim(form.find("input[name=coupon]").val()),
      name = $.trim(form.find("input[name=name]").val()),
      phone = $.trim(form.find("input[name=phone]").val()),
      email = $.trim(form.find("input[name=email]").val()),
      comment = $.trim(form.find("textarea[name=comment]").val()),
      date = $.trim(form.find("input[name=date]").val()),
      time = $.trim(form.find("input[name=time]").val());

    var item_id = $(".items_wrap .choose_btn.choosen").closest(".item_block").data("id");

    if (!form.find("input[name=checkbox_rules]").prop("checked")) {
      alert("Для активации сертификата необходимо согласиться с условиями сервиса.");
      return false;
    }

    if (!coupon.length) {
      alert("Ошибка активации. Обновите страницу и попробуйте снова.");
      return false;
    }

    if (!name.length) {
      alert("Укажите ФИО");
      return false;
    }
    if (!phone.length) {
      alert("Укажите телефон");
      return false;
    }
    if (!email.length) {
      alert("Укажите E-mail");
      return false;
    }

    $.ajax({
      type: "POST",
      data:
        "target=activate&coupon=" +
        coupon +
        "&name=" +
        name +
        "&phone=" +
        phone +
        "&email=" +
        email +
        "&comment=" +
        comment +
        "&date=" +
        date +
        "&item_id=" +
        item_id +
        "&time=" +
        time,
      url: "/scripts/activate.php",
      success: function (data) {
        $(".activate_wrap").hide();
        $(".activate_success").show();

        $("html, body").animate(
          {
            scrollTop: 0,
          },
          0,
          function () {}
        );
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
        console.log(errorThrown);
      },
    });

    return false;
  });
  // Активация купона

  // Повторить заказ
  $("body").on("click", ".order-repeat-button", function () {
    var order_id = $(this).data("order");

    if (order_id) {
      $.ajax({
        type: "POST",
        data: "order_id=" + order_id,
        url: "/scripts/repeat_order.php",
        success: function (data) {
          if (data == "0") {
            alert("Не получилось повторить заказ.");
          } else {
            window.location.href = "/personal/order/make/";
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(textStatus);
          console.log(errorThrown);
        },
      });
    }

    return false;
  });
  // Повторить заказ

  $("body").on("click", ".activate_date_field_wrap .cart_time_btn", function () {
    var btn = $(this),
      time = btn.text();

    $(".cart_time_btn").removeClass("active");
    btn.addClass("active");
    $("input[name=time]").val(time);

    return false;
  });

  // Доп. товары
  $("body").on("click", ".add2cart_check_dops", function () {
    var btn = $(this),
      pid = btn.data("product-id"),
      wrap = btn.closest(".product_dop_items_wrap");

    if (pid) {
      var items = [];
      if (wrap.length) {
        if (wrap.find(".product_dop_items").length) {
          wrap.find(".product_dop_items .item_str input").each(function (i, el) {
            if ($(el).prop("checked")) {
              items.push($(el).data("id"));
            }
          });
        }
      }

      if (items.length) {
        items = JSON.stringify(items);

        $.ajax({
          type: "POST",
          data: "target=add&pid=" + pid + "&items=" + items,
          url: "/scripts/dop_items.php",
          success: function (data) {},
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
          },
        });
      }
    }
  });
  // Доп. товары

  $("body").on("click", ".items_hidden_block_input .inline-block-item", function () {
    var wrap_all = $(this).closest(".bx_catalog_item_scu");

    wrap_all.find(".items_hidden_block_wrap").each(function (i, el) {
      var btn_buy = $(el).find(".go2buy");
      var btn_cart = $(el).find(".add2cart");
      var btn_nabor_add = $(el).find(".nabor_add");

      if (btn_cart.css("display") == "none") {
        btn_buy.hide();
        btn_nabor_add.hide();
      } else {
        btn_buy.show();
        btn_nabor_add.show();
      }
    });
  });

  // Наборы
  $("body").on("click", ".nabor_add", function () {
    var btn = $(this),
      product_id = btn.data("product-id"),
      price_id = btn.data("price_id"),
      item_wrap = btn.closest(".item_nabor_wrap");

    if (!price_id) price_id = "";

    if (!btn.hasClass("nabor_added")) {
      var cnt_items = $(".nabor_wrap_items").find(".nabor_wrap_item").length;

      if (cnt_items > 3) {
        alert("Вы можете добавить максимум 4 подарка в набор.");
        return false;
      } else {
        if (product_id) {
          var img = item_wrap.find(".item_nabor_img").attr("src");
          var name = item_wrap.find(".item_nabor_name").text();

          if (item_wrap.find(".item_nabor_price").length) {
            var price = item_wrap.find(".item_nabor_price").data("price");
          } else {
            var price = item_wrap.find(".price").text();
          }

          var html =
            '<div class="nabor_wrap_item inline-block-item" data-product_id="' +
            product_id +
            '" data-price_id="' +
            price_id +
            '">\
									<div class="img-wrap">\
										<img src="' +
            img +
            '" alt="' +
            name +
            '">\
									</div>\
									<div class="name" title="' +
            name +
            '">' +
            name +
            '</div>\
									<div class="price">' +
            price +
            '</div>\
									<button class="button tiny nabor_delete">Удалить</button>\
								</div>';

          $(".nabor_wrap_items").append(html);

          btn.addClass("nabor_added");
          btn.text("Добавлено в набор");

          $(".nabor_wrap").find(".nabor_wrap_actions").show();

          // Сохраняем набор
          var items = [];
          $(".nabor_wrap_items")
            .find(".nabor_wrap_item")
            .each(function (i, el) {
              var product_id = $(el).data("product_id");
              var price_id = $(el).data("price_id");
              var img = $(el).find("img").attr("src");
              var name = $(el).find(".name").text();
              var price = $(el).find(".price").text();

              items.push([product_id, price_id, img, price, name]);
            });

          $.ajax({
            type: "POST",
            data: "target=save_cookie&items=" + JSON.stringify(items),
            url: "/scripts/nabor.php",
            success: function (data) {},
          });
        }
      }
    }

    return false;
  });

  $("body").on("click", ".nabor_delete", function () {
    var btn = $(this),
      wrap_item = btn.closest(".nabor_wrap_item"),
      wrap = btn.closest(".nabor_wrap_items");

    var product_id = wrap_item.data("product_id");
    var price_id = wrap_item.data("price_id");

    if (price_id) {
      $(".nabor_add[data-product-id=" + product_id + "][data-price_id=" + price_id + "]")
        .removeClass("nabor_added")
        .text("Добавить в набор");
    } else {
      $(".nabor_add[data-product-id=" + product_id + "]")
        .removeClass("nabor_added")
        .text("Добавить в набор");
    }

    wrap_item.remove();

    if (!wrap.find(".nabor_wrap_item").length) {
      wrap.closest(".nabor_wrap").find(".nabor_wrap_actions").hide();
    }

    // Сохраняем набор
    var items = [];
    $(".nabor_wrap_items")
      .find(".nabor_wrap_item")
      .each(function (i, el) {
        var product_id = $(el).data("product_id");
        var price_id = $(el).data("price_id");
        var img = $(el).find("img").attr("src");
        var name = $(el).find(".name").text();
        var price = $(el).find(".price").text();

        items.push([product_id, price_id, img, price, name]);
      });

    $.ajax({
      type: "POST",
      data: "target=save_cookie&items=" + JSON.stringify(items),
      url: "/scripts/nabor.php",
      success: function (data) {},
    });

    return false;
  });

  $("body").on("click", ".nabor_save", function () {
    var btn = $(this),
      wrap_items = $(".nabor_wrap_items");

    if (!btn.hasClass("active")) {
      if (wrap_items.find(".nabor_wrap_item").length) {
        var items = [];
        wrap_items.find(".nabor_wrap_item").each(function (i, el) {
          var product_id = $(el).data("product_id");
          var price_id = $(el).data("price_id");

          if (product_id) {
            items.push([product_id, price_id]);
          }
        });

        if (items.length) {
          $.ajax({
            type: "POST",
            data: "target=add&items=" + JSON.stringify(items),
            url: "/scripts/nabor.php",
            success: function (data) {
              window.location.href = "/personal/order/make/";
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.log(textStatus);
              console.log(errorThrown);
            },
          });
        }
      }
    }

    return false;
  });

  $("body").on("click", ".cart_nabor_edit_link", function () {
    var item = $(this).data("item");
    var basket = $(this).data("basket");

    if (item && basket) {
      $.ajax({
        type: "POST",
        data: "target=edit_item&item=" + item + "&basket=" + basket,
        url: "/scripts/nabor.php",
        success: function (data) {
          window.location.href = "/catalog/katalog/?constructor=1";
        },
      });
    }

    return false;
  });
  // Наборы

  $(".send_review").fancybox({
    padding: 0,
    beforeLoad: function () {
      if ($(this.element).data("order")) {
        var order_id = $(this.element).data("order");
      } else {
        var order_id = "";
      }

      $("#review_popup input[name=order]").val(order_id);
    },
  });

  $("body").on("click", ".review_add_btn", function () {
    var btn = $(this),
      form = btn.closest("form"),
      rating = form.find("input[name=UF_NL_RATING]:checked").val(),
      user_name = $.trim(form.find("input[name=user_name]").val()),
      order = $.trim(form.find("input[name=order]").val()),
      comment = $.trim(form.find("textarea[name=comment]").val());

    form.find("input[name=user_name]").removeClass("error");
    form.find("textarea[name=comment]").removeClass("error");

    if (!form.find("input[name=checkbox_rules]").prop("checked")) {
      alert("Для отправки отзыва необходимо согласиться с условиями сервиса.");
      return false;
    }

    if (user_name.length < 3) {
      form.find("input[name=user_name]").addClass("error").focus();
      return false;
    }
    if (comment.length < 3) {
      form.find("textarea[name=comment]").addClass("error").focus();
      return false;
    }

    $.ajax({
      type: "POST",
      data: "target=add&rating=" + rating + "&user_name=" + user_name + "&comment=" + comment + "&order=" + order,
      url: "/scripts/review.php",
      success: function (data) {
        form.find(".callout").show();
        form.find("input[name=user_name]").removeClass("error").val("");
        form.find("textarea[name=comment]").removeClass("error").val("");
        form.find("input[name=checkbox_rules]").prop("checked", false);
        form.find("input[name=UF_NL_RATING]").prop("checked", false);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
        console.log(errorThrown);
      },
    });

    return false;
  });

  $("body").on("click", ".a-contacts-accept", function () {
    var form = $(this).closest(".feedback-container");

    if (!form.find("input[name=checkbox_rules]").prop("checked")) {
      alert("Необходимо согласиться с условиями обработки персональных данных");
      return false;
    }
  });

  $(".item-popup-description").fancybox({
    padding: 0,
    beforeLoad: function () {
      var parentBlock = $(this.element).closest(".item-popup-description-wrap");
      var text = parentBlock.find(".item-popup-description-text").html();
      var title = parentBlock.find(".item-popup-description-title").html();
      $("#item-description .fancybox-block-caption").html(title);
      $("#item-description .fancybox-block-wrap").html(text);
    },
  });

  // Окно выбора упаковки в корзине
  if ($(".js-choose-pack").length) {
    $(".js-choose-pack").fancybox({
      padding: 0,
    });

    $("body").on("click", ".js-choose-pack", function () {
      if (pack_types) {
        var btn = $(this);
        var type = btn.closest(".cart-item-type-wrap").find("select").val();
        var item = btn.closest(".cart-item-type-wrap").data("item");
        var popup = $("#cart_pack_popup");
        var type_str = "";

        popup.find(".cart-pack-popup").data("item", item).attr("data-item", item);

        if (type == "1") {
          popup.find(".fancybox-block-caption").text("Выберите дизайн сертификата");
          type_str = "email";
        } else if (type == "2") {
          popup.find(".fancybox-block-caption").text("Выберите дизайн конверта");
          type_str = "post";
        } else {
          popup.find(".fancybox-block-caption").text("Выберите дизайн коробки");
          type_str = "box";
        }

        var packs_html = "";
        for (var i = 0; i < pack_types[type_str].length; i++) {
          packs_html +=
            '<div class="pack" data-type="' +
            pack_types[type_str][i]["type"] +
            '" data-id="' +
            pack_types[type_str][i]["id"] +
            '" data-price="' +
            pack_types[type_str][i]["price"] +
            '" data-name="' +
            pack_types[type_str][i]["name"] +
            '">';

          packs_html += '<div class="title">' + pack_types[type_str][i]["name"] + "</div>";

          if (pack_types[type_str][i]["image"]) {
            packs_html += '<div class="image"><img src="' + pack_types[type_str][i]["image"] + '"></div>';
          }

          packs_html += '<div class="pack__bottom">';

          if (pack_types[type_str][i]["price"]) {
            packs_html += '<div class="price">' + pack_types[type_str][i]["price"] + " руб.</div>";
          }

          packs_html += '<button type="button" class="btn btn_lg btn_bold btn_half btn_secondary js-pack-select">Выбрать</button></div>';

          packs_html += "</div>";
        }

        popup.find(".cart-pack-popup").html(packs_html);
      }
    });

    $("body").on("change", "select[name=item-type-select]", function () {
      var value = $(this).val();
      var item = $(this).closest(".cart-item-type-wrap").data("item");

      // var items_cnt = $(".cart-item-type-wrap").length;

      // if (items_cnt > 1) {
      // if (value == "1") {
      // 	$(this).val("2").trigger('refresh');
      // } else {
      // 	$(this).val("1").trigger('refresh');
      // }

      // $.fancybox.open("#cart_pack_popup_warning", {
      // 	padding: 0
      // });
      // } else {
      var wrap = $(this).closest(".cart-item-type-wrap");

      if (value == "1") {
        wrap.find(".js-choose-pack").text("Выберите дизайн сертификата");
        pack_selected[item] = {
          // при загрузке страницы или переключении селекта без выбора дизайна устанавливаем первый дизвйн как дефолтное значение
          id: pack_types["email"][0]["id"],
          name: pack_types["email"][0]["name"],
          price: pack_types["email"][0]["price"],
        };
      } else if (value == "2") {
        wrap.find(".js-choose-pack").text("Выберите дизайн конверта");
        pack_selected[item] = {
          // при загрузке страницы или переключении селекта без выбора дизайна устанавливаем первый дизвйн как дефолтное значение
          id: pack_types["post"][0]["id"],
          name: pack_types["post"][0]["name"],
          price: pack_types["post"][0]["price"],
        };
      } else {
        wrap.find(".js-choose-pack").text("Выберите дизайн коробки");
        pack_selected[item] = {
          // при загрузке страницы или переключении селекта без выбора дизайна устанавливаем первый дизвйн как дефолтное значение
          id: pack_types["box"][0]["id"],
          name: pack_types["box"][0]["name"],
          price: pack_types["box"][0]["price"],
        };
      }
      // console.log(pack_types);
      // console.log(pack_selected);
      wrap.find(".choosen-pack").data("id", "").attr("data-id", "").text("").removeClass("active");

      change_cart_items_type(value);
      // pack_selected = {};
      // }
    });
  }

  $("body").on("click", ".js-pack-select", function () {
    var btn = $(this),
      id = btn.closest(".pack").data("id"),
      name = btn.closest(".pack").data("name"),
      price = btn.closest(".pack").data("price"),
      item = btn.closest(".cart-pack-popup").data("item");

    var wrap = $(".cart-item-type-wrap[data-item=" + item + "]");
    wrap.find(".choosen-pack").text(name);
    wrap.find(".choosen-pack").addClass("active");
    wrap.find(".choosen-pack").data("id", id).attr("data-id", id);

    pack_selected[item] = {
      id: id,
      name: name,
      price: price,
    };

    $.fancybox.close();

    update_cart_delivery_new();
  });

  $("body").on("click", ".js-pack-all-select", function () {
    var btn = $(this),
      type = btn.data("type"),
      have_changed = 0;

    $(".cart-item-type-wrap select").each(function (i, el) {
      if ($(el).val() != type) {
        $(el).val(type).trigger("refresh");

        var wrap = $(el).closest(".cart-item-type-wrap");

        if (type == "1") {
          wrap.find(".js-choose-pack").text("Выберите дизайн сертификата");
        } else if (type == "2") {
          wrap.find(".js-choose-pack").text("Выберите дизайн конверта");
        } else {
          wrap.find(".js-choose-pack").text("Выберите дизайн коробки");
        }

        wrap.find(".choosen-pack").data("id", "").attr("data-id", "").text("").removeClass("active");

        have_changed = 1;
      }
    });

    if (have_changed) {
      change_cart_items_type(type);
      pack_selected = {};
    }

    $.fancybox.close();
  });

  // Окно выбора упаковки в корзине

  $("body").on("click", ".js-close-popup", function () {
    $.fancybox.close();
    return false;
  });
  /*$("body").on("click", ".a-cart-popup-item", function(){
		$.fancybox.open("#popup_added_to_cart", {padding: 0});
	});*/
});

function change_cart_items_type(type) {
  pack_main_type = type;
  update_cart_delivery_new();

  $("#ORDER_FORM input[name=ORDER_PROP_23]").val("V_" + type);

  if (type == "1") {
    $(".cart_form_wrap_1").show();
    $(".cart_form_wrap_2").hide();
    $(".js-pay-courier").hide();
    $(".js-cart-pay-last").show();
    $("#ORDER_FORM input[name=DELIVERY_ID]").val("11");

    var current_scroll = window.pageYOffset;
    $('.cart-order-block input[name=PAY_SYSTEM_ID][value="12"]').closest("label").trigger("click");
    window.scrollTo(0, current_scroll);
  } else {
    $(".cart_form_wrap_2").show();
    $(".cart_form_wrap_1").hide();
    $(".js-pay-courier").show();
    $(".js-cart-pay-last").hide();
    $("#ORDER_FORM input[name=DELIVERY_ID]").val("10");

    var current_scroll = window.pageYOffset;
    $('.cart-order-block input[name=PAY_SYSTEM_ID][value="11"]').closest("label").trigger("click");
    window.scrollTo(0, current_scroll);
  }
}

function update_cart_types() {
  $(".cart-item-type-wrap select").each(function (i, el) {
    if ($(el).val() != pack_main_type) {
      $(el).val(pack_main_type).trigger("refresh");

      var wrap = $(el).closest(".cart-item-type-wrap");

      if (pack_main_type == "1") {
        wrap.find(".js-choose-pack").text("Выберите дизайн сертификата");
      } else if (pack_main_type == "2") {
        wrap.find(".js-choose-pack").text("Выберите дизайн конверта");
      } else {
        wrap.find(".js-choose-pack").text("Выберите дизайн коробки");
      }

      wrap.find(".choosen-pack").data("id", "").attr("data-id", "").text("").removeClass("active");
    }
  });

  for (item in pack_selected) {
    var wrap = $(".cart-item-type-wrap[data-item=" + item + "]");
    wrap.find(".choosen-pack").text(pack_selected[item]["name"]);
    wrap.find(".choosen-pack").addClass("active");
    wrap.find(".choosen-pack").data("id", pack_selected[item]["id"]).attr("data-id", pack_selected[item]["id"]);
  }
}

function update_cart_delivery() {
  var delivery_value = $(".cart-order-block input[name=DELIVERY_ID]:checked").val();
  var delivery_price = 350;

  if (delivery_value == "10") {
    var sum_orig = $("#basket_items .cart-product-footer-amount .footer-amount-price").data("orig");
    sum_orig = parseFloat(sum_orig);
    if (sum_orig > 10000) delivery_price = 0;
    var new_sum = sum_orig + delivery_price;
    new_sum = formatPrice(new_sum) + " руб.";
    $("#basket_items .cart-product-footer-amount .footer-amount-price").html(new_sum);
    $("#basket_items .cart_sum_new .delivery_price").html(delivery_price + " руб.");
    $("#basket_items .cart_sum_new .all_price").html(new_sum);

    if (delivery_price && delivery_price != "0") {
      $(".js-delivery-price-html").html("+ " + delivery_price + " руб.");
    } else {
      $(".js-delivery-price-html").html("бесплатно");
    }
  } else {
    var sum_orig = $("#basket_items .cart-product-footer-amount .footer-amount-price").data("orig");
    sum_orig = parseFloat(sum_orig);
    var new_sum = formatPrice(sum_orig) + " руб.";
    $("#basket_items .cart-product-footer-amount .footer-amount-price").html(new_sum);
    $("#basket_items .cart_sum_new .all_price").html(new_sum);

    $("#basket_items .cart_sum_new .delivery_price").html("0 руб.");

    if (sum_orig > 10000) delivery_price = 0;

    if (delivery_price && delivery_price != "0") {
      $(".js-delivery-price-html").html("+ " + delivery_price + " руб.");
    } else {
      $(".js-delivery-price-html").html("бесплатно");
    }
  }
}

function update_cart_delivery_new() {
  var delivery_price = delivery_cart_price;
  var pack_price = delivery_pack_price;

  if (pack_main_type == "2") {
    var pack_price_all = 0;

    $("#basket_items .cart-product-item").each(function (i, el) {
      var item_cnt = parseInt($(el).find(".product-count .input-group-field").val());
      var id = $(el).data("product-id");

      if (pack_selected[id]) {
        pack_price_all += pack_selected[id]["price"] * item_cnt;
      }
    });

    /*var items_cnt = 0;
		$('#basket_items .cart-product-item').each(function(i, el){
			items_cnt += parseInt($(el).find(".product-count .input-group-field").val());
		});
		var pack_price_all = items_cnt*pack_price;*/

    var sum_orig = $("#basket_items .cart-product-footer-amount .footer-amount-price").data("orig");
    sum_orig = parseFloat(sum_orig);
    if (sum_orig > 10000) delivery_price = 0;
    var new_sum = sum_orig + delivery_price + pack_price_all;
    new_sum = formatPrice(new_sum) + " руб.";
    $("#basket_items .cart-product-footer-amount .footer-amount-price").html(new_sum);
    $("#basket_items .cart_sum_new .delivery_price").html(delivery_price + " руб.");
    $("#basket_items .cart_sum_new .all_price").html(new_sum);

    $("#basket_items .cart_sum_new .pack_price").html(pack_price_all + " руб.");
    $(".js-cart-new-pack").show();
  } else {
    var sum_orig = $("#basket_items .cart-product-footer-amount .footer-amount-price").data("orig");
    sum_orig = parseFloat(sum_orig);
    var new_sum = formatPrice(sum_orig) + " руб.";
    $("#basket_items .cart-product-footer-amount .footer-amount-price").html(new_sum);
    $("#basket_items .cart_sum_new .all_price").html(new_sum);

    $("#basket_items .cart_sum_new .delivery_price").html("0 руб.");

    if (sum_orig > 10000) delivery_price = 0;

    $(".js-cart-new-pack").hide();
  }
}

function formatPrice(price) {
  var result = "";
  if (typeof price != "undefined") {
    if (typeof price == "number") price = price.toString();
    if (price.length > 0) {
      var testPrice = /^([\d]+)|([\d]+\.|,[\d]+)$/;
      if (testPrice.test(price)) {
        var str, integral, decimal, delim, regex;

        regex = /\.|,[\d]+$/gi;
        delimPos = price.search(regex);
        if (delimPos >= 0) {
          integral = price.substr(0, delimPos);
          decimal = price.substr(delimPos + 1);
        } else {
          integral = price;
          decimal = "";
        }

        str = integral;
        var blockSize = 3;
        if (str.length > blockSize) {
          while (str.length > 0) {
            if (str.length > blockSize) {
              result = " " + str.substr(blockSize * -1, blockSize) + result;
              str = str.substr(0, str.length - blockSize);
            } else {
              result = str + result;
              str = "";
            }
          }
          result = decimal.length > 0 ? result + "." + decimal : result;
        } else {
          result = str + (decimal.length > 0 ? "." + decimal : "");
        }
      } else {
        result = price;
      }
    }
  }

  return result;
}

//Функция поиска и замены в строке
function str_replace(search, replace, subject) {
  if (!(replace instanceof Array)) {
    replace = new Array(replace);
    if (search instanceof Array) {
      while (search.length > replace.length) {
        replace[replace.length] = replace[0];
      }
    }
  }

  if (!(search instanceof Array)) search = new Array(search);
  while (search.length > replace.length) {
    replace[replace.length] = "";
  }

  if (subject instanceof Array) {
    for (k in subject) {
      subject[k] = str_replace(search, replace, subject[k]);
    }
    return subject;
  }

  for (var k = 0; k < search.length; k++) {
    var i = subject.indexOf(search[k]);
    while (i > -1) {
      subject = subject.replace(search[k], replace[k]);
      i = subject.indexOf(search[k], i);
    }
  }
  return subject;
}
//Функция поиска и замены в строке - Конец

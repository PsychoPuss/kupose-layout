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
        items: 1,
        navText: [],
      };
    $packSlider.owlCarousel(params);
  }
}

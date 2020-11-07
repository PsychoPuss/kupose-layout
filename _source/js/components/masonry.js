/* Masonry init */
function initMasonry() {
  let elem_kit = document.querySelector(".catalog__items_kit");
  if (elem_kit) {
    new Masonry(elem_kit, {
      itemSelector: ".catalog__items_kit .products_kit",
      columnWidth: ".catalog__items_kit .grid-sizer",
      horizontalOrder: true,
      percentPosition: true,
      stagger: 5,
    });
  }

  let elem_product = document.querySelector(".catalog__items_product");
  if (elem_product) {
    new Masonry(elem_product, {
      itemSelector: ".catalog__items_product .products_cat",
      columnWidth: ".catalog__items_product .grid-sizer",
      horizontalOrder: true,
      percentPosition: true,
      stagger: 5,
    });
  }
}

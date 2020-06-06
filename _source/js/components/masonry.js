function initMasonry() {
	var elem_kit = document.querySelector('.catalog__items_kit');
	var msnry = new Masonry(elem_kit, {
		// options
		itemSelector: '.catalog__items_kit .product_kit',
		columnWidth: '.catalog__items_kit .grid-sizer',
		horizontalOrder: true,
		percentPosition: true,
		stagger: 5,
	});

	var elem_product = document.querySelector('.catalog__items_product');
	var msnry = new Masonry(elem_product, {
		// options
		itemSelector: '.catalog__items_product .product_cat',
		columnWidth: '.catalog__items_product .grid-sizer',
		horizontalOrder: true,
		percentPosition: true,
		stagger: 5,
	});
}
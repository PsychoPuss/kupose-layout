/* Carousel init */
let breakpoints = {
	xs: 320,
	sm: 425,
	md: 768,
	lg: 1024,
	xl: 1180

	//  small: 0,
	// 	medium: 518,
	// 	large: 758,
	// 	xlarge: 998,
	// 	xxlarge: 1238
}

function initOwl() {
	let $mainSlider = $('.main-carousel>.owl-carousel');
	let $whomSlider = $('.for-whom__carousel>.owl-carousel');
	let $productSlider = $('.product__carousel>.owl-carousel');
	// $mainBanner = $('.main-banner'),
	// $mainNews = $('.main-news-carousel'),
	// $mainBrand = $('.main-brand-carousel'),
	// $productPreview = $('.product-slider'),
	// $productPack = $('.product-pack-carousel'),
	// $productSet = $('.product-set-carousel'),
	// $productCompare = $('.product-compare-carousel'),
	// $productSeeIt = $('.product-carousel'),
	// $innerGallery = $('.inner-carousel'),
	// $innerTeam = $('.inner-team');

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
				autoWidth: true,
				items: 1,
				navText: [],
			};
		$productSlider.owlCarousel(params);
	}
	/*
		if ($mainBanner.length) {
			$mainBanner.each(function () {
				var itemLength = $(this).find('.item').length,
					params = {
						loop: true,
						items: 1,
						margin: 20,
						navText: [],
						responsive: {}
					};
				params['responsive'][breakpoints['large']] = {
					items: 2,
				};
				params['responsive'][breakpoints['xlarge']] = {
					items: 3,
					loop: false,
					dots: false,
				};
				switch (itemLength) {
					case 1:
						params['loop'] = false;
						params['dots'] = false;
						break;
					case 2:
						params['responsive'][breakpoints['large']]['loop'] = false;
						params['responsive'][breakpoints['large']]['dots'] = false;
						break;
				}
				$(this).owlCarousel(params);
			});
		}
		if ($mainNews.length) {
			$mainNews.each(function () {
				var $self = $(this),
					itemLength = $self.find('.item').length,
					params = {
						items: 1,
						margin: 23,
						nav: true,
						navText: [],
						responsive: {},
					};
				params['responsive'][breakpoints['large']] = {
					items: 2,
				};
				params['responsive'][breakpoints['xlarge']] = {
					items: 3,
				};
				params['responsive'][breakpoints['xxlarge']] = {
					items: 4,
				};
				switch (itemLength) {
					case 1:
						params['nav'] = false;
						params['dots'] = false;
						break;
					case 2:
						params['responsive'][breakpoints['large']]['dots'] = false;
						params['responsive'][breakpoints['xlarge']]['dots'] = false;
						params['responsive'][breakpoints['xxlarge']]['dots'] = false;
						break;
					case 3:
						params['responsive'][breakpoints['xlarge']]['dots'] = false;
						params['responsive'][breakpoints['xxlarge']]['dots'] = false;
						break;
					case 4:
						params['responsive'][breakpoints['xxlarge']]['dots'] = false;
						break;
				}
				$self.owlCarousel(params);
			});
		}
		if ($mainBrand.length) {
			$mainBrand.each(function () {
				var itemLength = $(this).find('.item').length,
					params = {
						items: 4,
						loop: true,
						navText: [],
						responsive: {},
					};
				params['responsive'][breakpoints['large']] = {
					items: 6,
				};
				params['responsive'][breakpoints['xlarge']] = {
					items: 8,
					dots: false,
				};
				if (itemLength <= 4) {
					params['dots'] = false;
					params['loop'] = false;
				} else if (itemLength <= 6) {
					params['responsive'][breakpoints['large']]['dots'] = false;
					params['responsive'][breakpoints['large']]['loop'] = false;
				} else if (itemLength <= 8) {
					params['responsive'][breakpoints['xlarge']]['dots'] = false;
					params['responsive'][breakpoints['xlarge']]['loop'] = false;
				} else {
					params['responsive'][breakpoints['xlarge']]['nav'] = true;
				}
				$(this).owlCarousel(params);
			});
		}
		if ($productPreview.length) {
			$productPreview.each(function () {
				var params = {
					items: 2,
					nav: true,
					dots: false,
					navText: [],
					responsive: {},
				};
				params['responsive'][breakpoints['medium']] = {
					items: 4,
				};
				$(this).owlCarousel(params);
			});
		}
		if ($productSeeIt.length) {
			$productSeeIt.each(function () {
				var $self = $(this),
					variation = $self.parent().hasClass('product-pack-variation'),
					inner = $self.hasClass('product-carousel-inner'),
					itemLength = $self.children('.item').length,
					params = {
						items: 1,
						margin: -1,
						dragEndSpeed: 100,
						navText: [],
						rewind: variation ? false : true,
						responsive: {},
						mouseDrag: false
					};

				params['responsive'][breakpoints['medium']] = {
					items: 2,
				};
				params['responsive'][breakpoints['large']] = {
					items: 3,
				};
				params['responsive'][breakpoints['xlarge']] = {
					items: inner ? 3 : 4,
					nav: true,
					dots: false,
				};
				params['responsive'][breakpoints['xxlarge']] = {
					items: inner ? 4 : 5,
					nav: true,
					dots: false,
				};
				if (!variation) {
					switch (itemLength) {
						case 1:
							params['loop'] = false;
							params['dots'] = false;
						case 2:
							params['responsive'][breakpoints['medium']]['loop'] = false;
							params['responsive'][breakpoints['medium']]['dots'] = false;
						case 3:
							params['responsive'][breakpoints['large']]['loop'] = false;
							params['responsive'][breakpoints['large']]['dots'] = false;
						case 4:
							params['responsive'][breakpoints['xlarge']]['loop'] = false;
							params['responsive'][breakpoints['xlarge']]['nav'] = false;
						case 5:
							params['responsive'][breakpoints['xxlarge']]['loop'] = (itemLength === 5 && inner);
							params['responsive'][breakpoints['xxlarge']]['nav'] = (itemLength === 5 && inner);
							break;
					}
				}
				$self.owlCarousel(params);
			});
		}
		if ($productPack.length) {
			$productPack.each(function () {
				var $self = $(this),
					params = {
						items: 1,
						margin: -1,
						responsive: {}
					};
				params['responsive'][breakpoints['xlarge']] = {
					items: 2
				};
				params['responsive'][breakpoints['xxlarge']] = {
					items: 3
				};
				$self.owlCarousel(params);
			});
		}
		if ($productSet.length) {
			$productSet.each(function () {
				var $self = $(this),
					params = {
						items: 1,
						margin: -1,
						responsive: {}
					};
				params['responsive'][breakpoints['medium']] = {
					items: 2
				};
				params['responsive'][breakpoints['large']] = {
					items: 3
				};
				params['responsive'][breakpoints['xlarge']] = {
					items: 4
				};
				params['responsive'][breakpoints['xxlarge']] = {
					items: 5
				};
				$self.owlCarousel(params);
			});
		}
		if ($productCompare.length) {
			var itemLength = $productCompare.children('.item').length,
				$compareTd = $('.compare-table-td'),
				heightArr = [],
				params = {
					items: 1,
					margin: -1,
					navText: [],
					responsive: {},
					mouseDrag: false
				};
			params['responsive'][breakpoints['medium']] = {
				items: 2
			};
			params['responsive'][breakpoints['xlarge']] = {
				items: 3,
				nav: true,
				dots: false
			};
			params['responsive'][breakpoints['xxlarge']] = {
				items: 4,
				nav: true,
				dots: false
			};
			switch (itemLength) {
				case 1:
					params['dots'] = false;
				case 2:
					params['responsive'][breakpoints['medium']]['dots'] = false;
					break;
			}

			$compareTd.each(function () {
				var $td = $(this),
					index = $td.index(),
					heightColumn = $td.find('.column:not(.transparent)').outerHeight();

				if ((heightColumn > heightArr[index]) || (heightArr[index] === undefined)) {
					heightArr[index] = heightColumn;
				}
			});
			$compareTd.each(function () {
				var $td = $(this),
					index = $td.index(),
					$column = $td.find('.column:not(.transparent, .hide-for-large)');

				if ($column.length) {
					$column.css('height', heightArr[index]);
				}
			});

			$productCompare.owlCarousel(params);
		}
		if ($innerGallery.length) {
			$innerGallery.each(function () {
				var $self = $(this),
					itemLength = $self.children('.item').length,
					params = {
						items: 2,
						margin: 15,
						loop: true,
						navText: [],
						responsive: {},
					};

				params['responsive'][breakpoints['large']] = {
					nav: true,
					dots: false,
				};
				params['responsive'][breakpoints['xxlarge']] = {
					items: 3,
					nav: true,
					dots: false,
				};
				switch (itemLength) {
					case 1:
					case 2:
						params['loop'] = false;
						params['dots'] = false;
						params['responsive'][breakpoints['large']]['nav'] = false;
					case 3:
						params['responsive'][breakpoints['xxlarge']]['nav'] = false;
						break;
				}
				$self.owlCarousel(params);
			});
		}
		if ($innerTeam.length) {
			$innerTeam.each(function () {
				var $self = $(this),
					itemLength = $self.children('.item').length,
					params = {
						items: 1,
						loop: true,
						navText: [],
						responsive: {},
					};

				params['responsive'][breakpoints['medium']] = {
					items: 2,
				};
				params['responsive'][breakpoints['large']] = {
					items: 3,
				};
				params['responsive'][breakpoints['xxlarge']] = {
					items: 4,
					nav: true,
					dots: false,
				};
				switch (itemLength) {
					case 1:
					case 2:
						params['loop'] = false;
						params['dots'] = false;
					case 4:
						params['responsive'][breakpoints['xxlarge']]['nav'] = false;
						break;
				}
				$self.owlCarousel(params);
			});
		}
	*/
}
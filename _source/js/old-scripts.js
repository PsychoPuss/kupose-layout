$(document).ready(function () {

	$("body").on("click", ".js-main-view", function () {
		var elem = $(this),
			val = elem.data("view-code"),
			block = '.catalog-reload',
			reload = true;

		$(".js-main-view").removeClass("selected");
		elem.addClass("selected");

		if (!$(elem).hasClass('ajax-loading')) {
			$(elem).addClass('ajax-loading');
		} else {
			return false;
		}
		showFilterLoading();

		$.ajax({
			type: 'GET',
			url: '/?view=' + val,
			success: function (data) {
				$(data).find(block).replaceAll($(block));
				$(block).foundation();
				initSelect(block + ' select');
				hideFilterLoading();

				if ($('.products-flex-grid').length > 0) {
					if (reload !== true) {
						$('.products-flex-grid').isotope('reloadItems');
					}
					productGridOptions["masonry"]["columnWidth"] = 295;
					$('.products-flex-grid').isotope(productGridOptions);
				}
				if ($('.product-list-item .dropdown-pane').length > 0) {
					$('.product-list-item .dropdown-pane').foundation();
				}
				$(elem).removeClass('ajax-loading');
				updateAdd2Basket();
				initTimer();
			}
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
				var address = '',
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
					type: 'POST',
					data: 'items=' + JSON.stringify(add_to_cart) + "&pack_selected_simple=" + JSON.stringify(pack_selected_simple),
					url: '/scripts/add_to_cart_packs.php',
					success: function (data) {
						submitForm('Y');
					},
					error: function (jqXHR, textStatus, errorThrown) {
						console.log(textStatus);
						console.log(errorThrown);
					}
				});
			} else {
				submitForm('Y');
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
						type: 'POST',
						data: 'product_id=' + product_id + "&price_id=" + price_id,
						url: '/scripts/add_to_cart.php',
						success: function (data) {
							if (dop_items) {
								dop_items = dop_items.split(',');
								dop_items = JSON.stringify(dop_items);

								$.ajax({
									type: 'POST',
									data: 'target=add&pid=' + product_id + "&items=" + dop_items,
									url: '/scripts/dop_items.php',
									success: function (data) {
										form.submit();
									},
									error: function (jqXHR, textStatus, errorThrown) {
										console.log(textStatus);
										console.log(errorThrown);
									}
								});
							} else {
								form.submit();
							}
						},
						error: function (jqXHR, textStatus, errorThrown) {
							console.log(textStatus);
							console.log(errorThrown);
						}
					});
				}
			} else {
				submitForm('Y');
			}
		}

		return false;
	});

	$("body").on("change", ".cart-order-block input[name=DELIVERY_ID]", function () {
		var delivery_value = $(".cart-order-block input[name=DELIVERY_ID]:checked").val();
		var pay_value = $(".cart-order-block input[name=PAY_SYSTEM_ID]:checked").val();

		if (delivery_value == "11" && pay_value == "11") {
			$(".cart-order-block input[name=PAY_SYSTEM_ID][value=\"12\"]").closest("label").trigger("click");
		}
		if (delivery_value == "11") {
			$(".cart-order-block input[name=PAY_SYSTEM_ID][value=\"11\"]").attr("disabled", "disabled");
		} else {
			$(".cart-order-block input[name=PAY_SYSTEM_ID][value=\"11\"]").removeAttr("disabled");
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
			$(".js-order-confirm-text").html('Нажимая на кнопку "Подтвердить и оплатить", я даю свое согласие на обработку персональных данных в соответствии с указанными условиями в <a href="/company/pd.php" target="_blank">Положении о защите персональных данных</a> и подтверждаю, что ознакомлен и согласен с условиями <a href="/company/oferta.php" target="_blank">Договора Публичной оферты.</a>');
		} else {
			$(".js-btn-order").text("Оформить заказ");
			$(".js-order-confirm-text").html('Нажимая на кнопку "Оформить заказ", я даю свое согласие на обработку персональных данных в соответствии с указанными условиями в <a href="/company/pd.php" target="_blank">Положении о защите персональных данных</a> и подтверждаю, что ознакомлен и согласен с условиями <a href="/company/oferta.php" target="_blank">Договора Публичной оферты.</a>');
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
			type: 'POST',
			data: 'product_id=' + product_id + "&price_id=" + price_id + "&phone=" + phone,
			url: '/scripts/fast_order.php',
			success: function (data) {},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(textStatus);
				console.log(errorThrown);
			}
		});

		return false;
	});
	// Оформление быстрого заказа

	// Каталог на главной
	$("body").on("change", ".a-catalog-sorting select", function () {
		var elem = $(this),
			val = elem.val(),
			block = '.catalog-reload',
			reload = true;

		if (!$(elem).hasClass('ajax-loading')) {
			$(elem).addClass('ajax-loading');
		} else {
			return false;
		}
		showFilterLoading();

		$.ajax({
			type: 'GET',
			url: '/?category=' + val,
			success: function (data) {
				$(data).find(block).replaceAll($(block));
				$(block).foundation();
				initSelect(block + ' select');
				hideFilterLoading();

				if ($('.products-flex-grid').length > 0) {
					if (reload !== true) {
						$('.products-flex-grid').isotope('reloadItems');
					}
					$('.products-flex-grid').isotope(productGridOptions);
				}
				if ($('.product-list-item .dropdown-pane').length > 0) {
					$('.product-list-item .dropdown-pane').foundation();
				}
				$(elem).removeClass('ajax-loading');
				updateAdd2Basket();
				initTimer();
			}
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
				type: 'POST',
				data: 'target=check&coupon=' + coupon,
				url: '/scripts/activate.php',
				dataType: 'json',
				success: function (data) {
					if (data[0] == "1") {
						$(".items_wrap_elements").html(data[1]);
						$(".items_wrap").show();
						$(".form_contact_wrap input[name=coupon]").val(coupon);
					} else {
						alert(data[1]);
						$(".items_wrap, .form_contact_wrap").hide();
					}
				}
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
			type: 'POST',
			data: 'target=activate&coupon=' + coupon + "&name=" + name + "&phone=" + phone + "&email=" + email + "&comment=" + comment + "&date=" + date + "&item_id=" + item_id + "&time=" + time,
			url: '/scripts/activate.php',
			success: function (data) {
				$(".activate_wrap").hide();
				$(".activate_success").show();

				$('html, body').animate({
					scrollTop: 0
				}, 0, function () {});
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(textStatus);
				console.log(errorThrown);
			}
		});

		return false;
	});
	// Активация купона

	// Повторить заказ
	$("body").on("click", ".order-repeat-button", function () {
		var order_id = $(this).data("order");

		if (order_id) {
			$.ajax({
				type: 'POST',
				data: 'order_id=' + order_id,
				url: '/scripts/repeat_order.php',
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
				}
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
					type: 'POST',
					data: 'target=add&pid=' + pid + "&items=" + items,
					url: '/scripts/dop_items.php',
					success: function (data) {},
					error: function (jqXHR, textStatus, errorThrown) {
						console.log(textStatus);
						console.log(errorThrown);
					}
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

					var html = '<div class="nabor_wrap_item inline-block-item" data-product_id="' + product_id + '" data-price_id="' + price_id + '">\
									<div class="img-wrap">\
										<img src="' + img + '" alt="' + name + '">\
									</div>\
									<div class="name" title="' + name + '">' + name + '</div>\
									<div class="price">' + price + '</div>\
									<button class="button tiny nabor_delete">Удалить</button>\
								</div>';

					$(".nabor_wrap_items").append(html);

					btn.addClass("nabor_added");
					btn.text("Добавлено в набор");

					$(".nabor_wrap").find(".nabor_wrap_actions").show();

					// Сохраняем набор
					var items = [];
					$(".nabor_wrap_items").find(".nabor_wrap_item").each(function (i, el) {
						var product_id = $(el).data("product_id");
						var price_id = $(el).data("price_id");
						var img = $(el).find("img").attr("src");
						var name = $(el).find(".name").text();
						var price = $(el).find(".price").text();

						items.push([product_id, price_id, img, price, name]);
					});

					$.ajax({
						type: 'POST',
						data: "target=save_cookie&items=" + JSON.stringify(items),
						url: '/scripts/nabor.php',
						success: function (data) {}
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
			$(".nabor_add[data-product-id=" + product_id + "][data-price_id=" + price_id + "]").removeClass("nabor_added").text("Добавить в набор");
		} else {
			$(".nabor_add[data-product-id=" + product_id + "]").removeClass("nabor_added").text("Добавить в набор");
		}

		wrap_item.remove();

		if (!wrap.find(".nabor_wrap_item").length) {
			wrap.closest(".nabor_wrap").find(".nabor_wrap_actions").hide();
		}

		// Сохраняем набор
		var items = [];
		$(".nabor_wrap_items").find(".nabor_wrap_item").each(function (i, el) {
			var product_id = $(el).data("product_id");
			var price_id = $(el).data("price_id");
			var img = $(el).find("img").attr("src");
			var name = $(el).find(".name").text();
			var price = $(el).find(".price").text();

			items.push([product_id, price_id, img, price, name]);
		});

		$.ajax({
			type: 'POST',
			data: "target=save_cookie&items=" + JSON.stringify(items),
			url: '/scripts/nabor.php',
			success: function (data) {}
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
						type: 'POST',
						data: "target=add&items=" + JSON.stringify(items),
						url: '/scripts/nabor.php',
						success: function (data) {
							window.location.href = "/personal/order/make/";
						},
						error: function (jqXHR, textStatus, errorThrown) {
							console.log(textStatus);
							console.log(errorThrown);
						}
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
				type: 'POST',
				data: "target=edit_item&item=" + item + "&basket=" + basket,
				url: '/scripts/nabor.php',
				success: function (data) {
					window.location.href = "/catalog/katalog/?constructor=1";
				}
			});
		}

		return false;
	});
	// Наборы

	$('.send_review').fancybox({
		padding: 0,
		beforeLoad: function () {
			if ($(this.element).data("order")) {
				var order_id = $(this.element).data("order")
			} else {
				var order_id = "";
			}

			$("#review_popup input[name=order]").val(order_id);
		}
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
			type: 'POST',
			data: "target=add&rating=" + rating + "&user_name=" + user_name + "&comment=" + comment + "&order=" + order,
			url: '/scripts/review.php',
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
			}
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

	$('.item-popup-description').fancybox({
		padding: 0,
		beforeLoad: function () {
			var parentBlock = $(this.element).closest(".item-popup-description-wrap");
			var text = parentBlock.find(".item-popup-description-text").html();
			var title = parentBlock.find(".item-popup-description-title").html();
			$("#item-description .fancybox-block-caption").html(title);
			$("#item-description .fancybox-block-wrap").html(text);
		}
	});

	// Окно выбора упаковки в корзине
	if ($('.js-choose-pack').length) {
		$('.js-choose-pack').fancybox({
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
					popup.find(".fancybox-block-caption").text("Выберите оформление");
					type_str = "email";
				} else {
					popup.find(".fancybox-block-caption").text("Выберите конверт");
					type_str = "post";
				}

				var packs_html = "";
				for (var i = 0; i < pack_types[type_str].length; i++) {
					packs_html += '<div class="pack" data-type="' + pack_types[type_str][i]["type"] + '" data-id="' + pack_types[type_str][i]["id"] + '" data-price="' + pack_types[type_str][i]["price"] + '" data-name="' + pack_types[type_str][i]["name"] + '">';

					if (pack_types[type_str][i]["image"]) {
						packs_html += '<div class="image"><img src="https://kupose.ru' + pack_types[type_str][i]["image"] + '"></div>';
					}

					packs_html += '<div class="title">' + pack_types[type_str][i]["name"] + '</div>';

					if (pack_types[type_str][i]["price"]) {
						packs_html += '<div class="price">' + pack_types[type_str][i]["price"] + ' руб.</div>';
					}

					packs_html += '<button type="button" class="btn btn_xs btn_normal btn_secondary js-pack-select">Выбрать</button></div>';
				}

				popup.find(".cart-pack-popup").html(packs_html);
			}
		});

		$("body").on("change", "select[name=item-type-select]", function () {
			var value = $(this).val();

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
			} else {
				wrap.find(".js-choose-pack").text("Выберите дизайн конверта");
			}

			wrap.find(".choosen-pack").data("id", "").attr("data-id", "").text("").removeClass("active");

			change_cart_items_type(value);
			pack_selected = {};
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
			price: price
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
				$(el).val(type).trigger('refresh');

				var wrap = $(el).closest(".cart-item-type-wrap");

				if (type == "1") {
					wrap.find(".js-choose-pack").text("Выберите дизайн сертификата");
				} else {
					wrap.find(".js-choose-pack").text("Выберите дизайн конверта");
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
		$(".cart-order-block input[name=PAY_SYSTEM_ID][value=\"12\"]").closest("label").trigger("click");
		window.scrollTo(0, current_scroll);
	} else {
		$(".cart_form_wrap_2").show();
		$(".cart_form_wrap_1").hide();
		$(".js-pay-courier").show();
		$(".js-cart-pay-last").hide();
		$("#ORDER_FORM input[name=DELIVERY_ID]").val("10");

		var current_scroll = window.pageYOffset;
		$(".cart-order-block input[name=PAY_SYSTEM_ID][value=\"11\"]").closest("label").trigger("click");
		window.scrollTo(0, current_scroll);
	}
}

function update_cart_types() {
	$(".cart-item-type-wrap select").each(function (i, el) {
		if ($(el).val() != pack_main_type) {
			$(el).val(pack_main_type).trigger('refresh');

			var wrap = $(el).closest(".cart-item-type-wrap");

			if (pack_main_type == "1") {
				wrap.find(".js-choose-pack").text("Выберите дизайн сертификата");
			} else {
				wrap.find(".js-choose-pack").text("Выберите дизайн конверта");
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
		var sum_orig = $('#basket_items .cart-product-footer-amount .footer-amount-price').data("orig");
		sum_orig = parseFloat(sum_orig);
		if (sum_orig > 10000) delivery_price = 0;
		var new_sum = sum_orig + delivery_price;
		new_sum = formatPrice(new_sum) + " руб.";
		$('#basket_items .cart-product-footer-amount .footer-amount-price').html(new_sum);
		$('#basket_items .cart_sum_new .delivery_price').html(delivery_price + " руб.");
		$('#basket_items .cart_sum_new .all_price').html(new_sum);

		if (delivery_price && delivery_price != "0") {
			$(".js-delivery-price-html").html("+ " + delivery_price + " руб.");
		} else {
			$(".js-delivery-price-html").html("бесплатно");
		}
	} else {
		var sum_orig = $('#basket_items .cart-product-footer-amount .footer-amount-price').data("orig");
		sum_orig = parseFloat(sum_orig);
		var new_sum = formatPrice(sum_orig) + " руб.";
		$('#basket_items .cart-product-footer-amount .footer-amount-price').html(new_sum);
		$('#basket_items .cart_sum_new .all_price').html(new_sum);

		$('#basket_items .cart_sum_new .delivery_price').html("0 руб.");

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

		$('#basket_items .cart-product-item').each(function (i, el) {
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

		var sum_orig = $('#basket_items .cart-product-footer-amount .footer-amount-price').data("orig");
		sum_orig = parseFloat(sum_orig);
		if (sum_orig > 10000) delivery_price = 0;
		var new_sum = sum_orig + delivery_price + pack_price_all;
		new_sum = formatPrice(new_sum) + " руб.";
		$('#basket_items .cart-product-footer-amount .footer-amount-price').html(new_sum);
		$('#basket_items .cart_sum_new .delivery_price').html(delivery_price + " руб.");
		$('#basket_items .cart_sum_new .all_price').html(new_sum);

		$('#basket_items .cart_sum_new .pack_price').html(pack_price_all + " руб.");
		$(".js-cart-new-pack").show();
	} else {
		var sum_orig = $('#basket_items .cart-product-footer-amount .footer-amount-price').data("orig");
		sum_orig = parseFloat(sum_orig);
		var new_sum = formatPrice(sum_orig) + " руб.";
		$('#basket_items .cart-product-footer-amount .footer-amount-price').html(new_sum);
		$('#basket_items .cart_sum_new .all_price').html(new_sum);

		$('#basket_items .cart_sum_new .delivery_price').html("0 руб.");

		if (sum_orig > 10000) delivery_price = 0;

		$(".js-cart-new-pack").hide();
	}
}

function formatPrice(price) {
	var result = '';
	if (typeof (price) != 'undefined') {
		if (typeof (price) == 'number')
			price = price.toString();
		if (price.length > 0) {
			var testPrice = /^([\d]+)|([\d]+\.|,[\d]+)$/;
			if (testPrice.test(price)) {
				var str, integral, decimal, delim, regex;

				regex = /\.|,[\d]+$/ig;
				delimPos = price.search(regex);
				if (delimPos >= 0) {
					integral = price.substr(0, delimPos);
					decimal = price.substr(delimPos + 1);
				} else {
					integral = price;
					decimal = '';
				}

				str = integral;
				var blockSize = 3;
				if (str.length > blockSize) {
					while (str.length > 0) {
						if (str.length > blockSize) {
							result = ' ' + str.substr((blockSize * (-1)), blockSize) + result;
							str = str.substr(0, (str.length - blockSize));
						} else {
							result = str + result;
							str = '';
						}
					}
					result = decimal.length > 0 ? result + '.' + decimal : result;
				} else {
					result = str + (decimal.length > 0 ? '.' + decimal : '');
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
		replace[replace.length] = '';
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
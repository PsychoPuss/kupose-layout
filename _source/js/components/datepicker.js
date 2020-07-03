/* Datepicker init */
function initDatepicker() {
	let date_now = new Date();
	date_now.setDate(date_now.getDate() + 1);

	$('.form-input_date').datepicker({
		minDate: date_now
	})
}
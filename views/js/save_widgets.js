function save_exchange_widget(id) {
	my_timer.stopTimer(id)
	const currency1 = document.getElementById(id + 'currency1').value
	const currency2 = document.getElementById(id + 'currency2').value
	const time = Number(document.getElementById(id + 'timer').value)
	my_timer.addTimer(id, time, {id: id, currency1: currency1, currency2: currency2}, update_exchange_widget)
}

async function save_tl_widget(id) {
	my_timer.stopTimer(id)
	const type = document.getElementById(id + 'type').value
	const time = Number(document.getElementById(id + 'timer').value)
	my_timer.addTimer(id, time, {id: id, type: type}, update_tl_widget)
}

async function save_wallet_widget(id) {
	my_timer.stopTimer(id)
	const currency = document.getElementById(id + 'currency').value
	const time = Number(document.getElementById(id + 'timer').value)
	my_timer.addTimer(id, time, {id: id, currency: currency}, update_wallet_widget)
}
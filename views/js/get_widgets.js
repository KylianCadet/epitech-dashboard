function get_wallet_widgets() {
	const all_wallet_widgets = document.getElementsByClassName('widget wallet')
	var wallet_widget = []
	for (var i = 0; i != all_wallet_widgets.length; i++) {
		var currency = document.getElementById(all_wallet_widgets[i].id + 'currency').value
		var timer = Number(document.getElementById(all_wallet_widgets[i].id + 'timer').value)
		var div = document.getElementById(all_wallet_widgets[i].id)
		var top = div.style.top ? div.style.top : '0px'
		var left = div.style.left ? div.style.left : '0px'
		var width = div.style.width ? div.style.width : '350px'
		var height = div.style.height ? div.style.height : '180px'
		wallet_widget.push({
			id: all_wallet_widgets[i].id,
			currency: currency,
			timer: timer,
			top: top,
			left: left,
			width: width,
			height: height
		})
	}
	return wallet_widget
}

function get_tl_widgets() {
	const all_tl_widgets = document.getElementsByClassName('widget tl')
	var tl_widget = []
	for (var i = 0; i != all_tl_widgets.length; i++) {
		var type = document.getElementById(all_tl_widgets[i].id + 'type').value
		var timer = Number(document.getElementById(all_tl_widgets[i].id + 'timer').value)
		var div = document.getElementById(all_tl_widgets[i].id)
		var top = div.style.top ? div.style.top : '0px'
		var left = div.style.left ? div.style.left : '0px'
		var width = div.style.width ? div.style.width : '350px'
		var height = div.style.height ? div.style.height : '180px'
		tl_widget.push({
			id: all_tl_widgets[i].id,
			type: type,
			timer: timer,
			top: top,
			left: left,
			width: width,
			height: height
		})
	}
	return tl_widget
}

function get_exchange_widgets() {
	const all_exchange_widgets = document.getElementsByClassName('widget exchange')
	var exchange_widget = []
	for (var i = 0; i != all_exchange_widgets.length; i++) {
		var currency1 = document.getElementById(all_exchange_widgets[i].id + 'currency1').value
		var currency2 = document.getElementById(all_exchange_widgets[i].id + 'currency2').value
		var timer = Number(document.getElementById(all_exchange_widgets[i].id + 'timer').value)
		var div = document.getElementById(all_exchange_widgets[i].id)
		var top = div.style.top ? div.style.top : '0px'
		var left = div.style.left ? div.style.left : '0px'
		var width = div.style.width ? div.style.width : '350px'
		var height = div.style.height ? div.style.height : '180px'
		exchange_widget.push({
			id: all_exchange_widgets[i].id,
			currency1: currency1,
			currency2: currency2,
			timer: timer,
			top: top,
			left: left,
			width: width,
			height: height
		})
	}
	return exchange_widget
}
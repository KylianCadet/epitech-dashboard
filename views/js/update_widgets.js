async function update_wallet_widget(obj) {
	fetch('/data/wallet', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			currency: obj.currency
		})
	})
		.then(response => response.text())
		.then((data) => {
			if (data == 'ERR') {
				location.reload();
			} if (data == 'timeout') {
				return
			} else {
				const div = document.getElementById(obj.id + 'data')
				div.innerHTML = ''
				div.innerHTML += '<p style="color: white">' + data + ' ' + obj.currency + '</p>'
			}
		})
}

function update_tl_widget(obj) {
	fetch('/data/tl', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ type: obj.type })
	})
		.then(response => response.text())
		.then((data) => {
			const div = document.getElementById(obj.id + 'data')
			div.innerHTML = ''
			div.innerHTML += data
			twttr.widgets.load(div)
		});
}

function update_exchange_widget(obj) {
	fetch('/data/exchange', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			currency1: obj.currency1,
			currency2: obj.currency2
		})
	})
		.then(response => response.text())
		.then((data) => {
			const div = document.getElementById(obj.id + 'data')
			div.innerHTML = ''
			div.innerHTML += '<p style="color: white">' + obj.currency1 + '-' + obj.currency2 + ' ' + data + '</p>'
		})
}
function top_bar(id, keyword) {
	const top_bar =
		'<div id=' + id + ' class="widget ' + keyword + '" draggable="true" ondragstart=dragstart_handler(event)> \
			<div class="widget-top-bar"> \
				<select name="'+ id + '" id = "' + id + 'timer"> \
					<option value="0">Never</option> \
					<option value="5">5s</option> \
					<option value="10">10s</option> \
					<option value="20">20s</option> \
					<option value="30">30s</option> \
					<option value="60">1min</option> \
				</select > \
				<div style="align-self: center; margin-left: auto; color: white"> \
					<p style="display: contents;">' + keyword + ' widget' + '</p> \
				</div> \
				<div style="margin-left: auto; display: flex;"> \
					<button onclick=save_' + keyword + '_widget("' + id + '") style="float: right; align-self: center;">save</button> \
					<p onclick=delete_box("' + id + '") style="float: right; margin: 3px; align-self: center; cursor: pointer;">X</p> \
				</div> \
			</div> \
		<div class="widget-pannel ' + keyword + '">'
	return top_bar
}

function end_bar() {
	return '</div></div>'
}

function setNewContentStyle(newContent, top_,left_, width_, height_) {
	top_ ? newContent.style.top = top_ : null
	left_ ? newContent.style.left = left_ : null
	width_ ? newContent.style.width = width_ : null
	height_ ? newContent.style.height = height_ : null
}

function create_wallet_widget(currency, top_, left_, width_, height_, timer) {
	var div = document.getElementById("board")
	const keyword = 'wallet'
	var counter = document.getElementsByClassName("widget." + keyword).length
	while (document.getElementById(counter + keyword))
		counter++;
	var newContent = document.createElement('div');
	const id = counter + keyword
	newContent.innerHTML = top_bar(id, keyword) +
		'<select id = "' + id + 'currency"> \
			<option value="BTC">BTC</option> \
			<option value="ETH">ETH</option> \
			<option value="LTC">LTC</option> \
			<option value="ZRX">ZRX</option> \
			<option value="BAT">BAT</option> \
			<option value="USDC">USDC</option> \
			<option value="ZEC">ZEC</option> \
			<option value="DAI">DAI</option> \
			<option value="LINK">LINK</option> \
			<option value="XRP">XRP</option> \
			<option value="REP">REP</option> \
			<option value="XLM">XLM</option> \
			<option value="EOS">EOS</option> \
			<option value="XTZ">XTZ</option> \
			<option value="DASH">DASH</option> \
		</select> \
		<div id = "' + id + 'data' + '" class="widget-data"> \
		</div>' + end_bar();
	while (newContent.firstChild)
		div.appendChild(newContent.firstChild)
	currency ? document.getElementById(id + 'currency').value = currency : null
	timer ? document.getElementById(id + 'timer').value = timer : null
	setNewContentStyle(document.getElementById(id), top_, left_, width_, height_)
	save_wallet_widget(id)
}

function create_tl_widget(type, top_, left_, width_, height_, timer) {
	var div = document.getElementById("board")
	const keyword = 'tl'
	var counter = document.getElementsByClassName("widget." + keyword).length
	while (document.getElementById(counter + keyword))
		counter++;
	var newContent = document.createElement('div');
	const id = counter + keyword
	newContent.innerHTML = top_bar(id, keyword) +
		'<select id = "' + id + 'type' + '"> \
			<option value="home">Home Timeline</option> \
			<option value="mentions">Mention Timeline</option> \
			<option value="user">User Timeline</option> \
		</select> \
		<div id = "' + id + 'data' + '" class="widget-data"> \
		</div>' + end_bar();
	while (newContent.firstChild)
		div.appendChild(newContent.firstChild)
	type ? document.getElementById(id + 'type').value = type : null
	timer ? document.getElementById(id + 'timer').value = timer : null
	setNewContentStyle(document.getElementById(id), top_, left_, width_, height_)
	save_tl_widget(id)
}

function exchange_select(id, name) {
	return (
		'<select id = "' + id + name + '"> \
		<option value="BTC">BTC</option> \
		<option value="EUR">EUR</option> \
		<option value="USD">USD</option> \
		<option value="ETH">ETH</option> \
		<option value="XRP">XRP</option> \
		<option value="LTC">LTC</option> \
		<option value="EOS">EOS</option> \
		<option value="USDC">USDC</option> \
		<option value="DAI">DAI</option> \
		<option value="ZEC">ZEC</option> \
		<option value="BAT">BAT</option> \
		<option value="MANA">MANA</option> \
		<option value="LOOM">LOOM</option> \
		<option value="DASH">DASH</option> \
		<option value="XTZ">XTZ</option> \
		<option value="ETC">ETC</option> \
	</select >')
}

function create_exchange_widget(currency1, currency2, top_, left_, width_, height_, timer) {
	var div = document.getElementById("board")
	const keyword = 'exchange'
	var counter = document.getElementsByClassName("widget." + keyword).length
	while (document.getElementById(counter + keyword))
		counter++;
	var newContent = document.createElement('div');
	const id = counter + keyword
	const newHTML = top_bar(id, keyword) + exchange_select(id, 'currency1') + exchange_select(id, 'currency2') +
		'<div id = "' + id + 'data' + '" class="widget-data"> \
		</div>' + end_bar();
	newContent.innerHTML = newHTML;
	while (newContent.firstChild)
		div.appendChild(newContent.firstChild)
	currency1 ? document.getElementById(id + 'currency1').value = currency1 : null
	currency2 ? document.getElementById(id + 'currency2').value = currency2 : null
	timer ? document.getElementById(id + 'timer').value = timer : null
	setNewContentStyle(document.getElementById(id), top_, left_, width_, height_)
	save_exchange_widget(id)
}
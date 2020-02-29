const pool = require('./const').pool

exports.register = async (username, password) => {
	const query = 'SELECT * FROM USERS WHERE USERNAME = $1'
	const values = [username]
	const { rows } = await pool.query(query, values);
	if (rows.length != 0)
		return ('exist')
	const query_insert = 'INSERT INTO USERS(username, password) VALUES($1, $2);'
	const values_insert = [username, password];
	await pool.query(query_insert, values_insert);
	return ('ok')
}

exports.login = async (username, password) => {
	const query = 'SELECT * FROM USERS WHERE USERNAME = $1 AND PASSWORD = $2';
	const values = [username, password];
	const { rows } = await pool.query(query, values);
	if (rows.length == 0)
		return ('wrong')
	return (rows[0].id)
}

exports.get_user_info = async (username) => {
	const query = 'SELECT * FROM USERS WHERE USERNAME = $1'
	const values = [username]
	const { rows } = await pool.query(query, values)
	return rows[0];
}



// TWITTER SERVICE
exports.get_twitter_info = async (username) => {
	var query = 'SELECT TWITTER_ID FROM USERS WHERE USERNAME = $1'
	var values = [username]
	var { rows } = await pool.query(query, values);
	if (rows[0].twitter_id == null)
		return null;
	query = 'SELECT * FROM TWITTER WHERE ID = $1'
	values = [rows[0].twitter_id]
	var result = await pool.query(query, values);
	result = result.rows[0]
	return result;
}

exports.delete_twitter = async (username) => {
	var query = 'select TWITTER_ID from USERS where USERNAME = $1'
	const { rows } = await pool.query(query, [username])
	const twitter_id = rows[0].twitter_id
	query = 'update USERS set TWITTER_ID = NULL where USERNAME = $1;'
	await pool.query(query, [username])
	query = 'delete from TWITTER where id = $1'
	await pool.query(query, [twitter_id])
}

exports.create_twitter_service = async (username, oauthUserToken, oauthUserSecret, screenName) => {
	var query = 'INSERT INTO TWITTER(TOKEN, TOKEN_SECRET, SCREEN_NAME) VALUES ($1, $2, $3) RETURNING *'
	var values = [oauthUserToken, oauthUserSecret, screenName]
	const { rows } = await pool.query(query, values)
	const twitter_id = rows[0].id
	query = 'UPDATE USERS SET TWITTER_ID = $1 WHERE USERNAME = $2'
	values = [twitter_id, username]
	await pool.query(query, values)
}


// COINBASE SERVICE
exports.get_coinbase_info = async (username) => {
	var query = 'SELECT COINBASE_ID FROM USERS WHERE USERNAME = $1'
	var values = [username]
	var { rows } = await pool.query(query, values);
	if (rows[0].coinbase_id == null)
		return null;
	query = 'SELECT * FROM COINBASE WHERE ID = $1'
	values = [rows[0].coinbase_id]
	var result = await pool.query(query, values);
	result = result.rows[0]
	return result
}

exports.delete_coinbase = async (username) => {
	var query = 'select COINBASE_ID from USERS where USERNAME = $1'
	const { rows } = await pool.query(query, [username])
	const coinbase_id = rows[0].coinbase_id
	query = 'update USERS set COINBASE_ID = NULL where USERNAME = $1;'
	await pool.query(query, [username])
	query = 'delete from COINBASE where id = $1'
	await pool.query(query, [coinbase_id])
}

exports.create_coinbase_service = async (username, access_token, refresh_token) => {
	var query = 'INSERT INTO COINBASE(ACCESS_TOKEN, REFRESH_TOKEN) VALUES ($1, $2) RETURNING *'
	var values = [access_token, refresh_token]
	const { rows } = await pool.query(query, values);
	const coinbase_id = rows[0].id
	query = 'UPDATE USERS SET COINBASE_ID = $1 WHERE USERNAME = $2'
	values = [coinbase_id, username]
	await pool.query(query, values);
}

// WALLET WIDGET
exports.get_widgets_wallet = async (coinbase_info) => {
	if (!coinbase_info)
		return []
	const query = 'SELECT * FROM COINBASE_WIDGET_WALLET WHERE COINBASE_ID = $1'
	const values = [coinbase_info.id]
	const { rows } = await pool.query(query, values)
	return rows
}

exports.delete_wallet_widgets = async (coinbase_id) => {
	const query = 'DELETE FROM COINBASE_WIDGET_WALLET WHERE COINBASE_ID = $1'
	const values = [coinbase_id]
	await pool.query(query, values)
}

exports.create_wallet_widgets = async (coinbase_id, widgets) => {
	for (var i = 0; i != widgets.length; i++) {
		var query = 'INSERT INTO COINBASE_WIDGET_WALLET(COINBASE_ID, CURRENCY, TIMER, TOP_, LEFT_, WIDTH_, HEIGHT_) \
		VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
		var values = [
			coinbase_id,
			widgets[i].currency,
			widgets[i].timer,
			widgets[i].top,
			widgets[i].left,
			widgets[i].width,
			widgets[i].height
		]
		await pool.query(query, values)
	}
}


// EXCHANGE WIDET
exports.get_widgets_exchange = async (username) => {
	const user_info = await this.get_user_info(username)
	const query = 'SELECT * FROM COINBASE_WIDGET_EXCHANGE WHERE USER_ID = $1'
	const values = [user_info.id]
	const { rows } = await pool.query(query, values)
	return rows
}

exports.delete_exchange_widgets = async (user_id) => {
	const query = 'DELETE FROM COINBASE_WIDGET_EXCHANGE WHERE USER_ID = $1'
	const values = [user_id]
	await pool.query(query, values)
}

exports.create_exchange_widgets = async (user_id, widgets) => {
	for (var i = 0; i != widgets.length; i++) {
		var query = 'INSERT INTO COINBASE_WIDGET_EXCHANGE(USER_ID, CURRENCY1, CURRENCY2, TIMER, TOP_, LEFT_, WIDTH_, HEIGHT_) \
		VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *'
		var values = [
			user_id,
			widgets[i].currency1,
			widgets[i].currency2,
			widgets[i].timer,
			widgets[i].top,
			widgets[i].left,
			widgets[i].width,
			widgets[i].height
		]
		await pool.query(query, values)
	}
}


// TL WIDGET
exports.get_widgets_tl = async (twitter_info) => {
	if (!twitter_info)
		return []
	const query = 'SELECT * FROM TWITTER_WIDGET_TL WHERE TWITTER_ID = $1'
	const values = [twitter_info.id]
	const { rows } = await pool.query(query, values)
	return rows
}

exports.delete_tl_widgets = async (twitter_id) => {
	const query = 'DELETE FROM TWITTER_WIDGET_TL WHERE TWITTER_ID = $1'
	const values = [twitter_id]
	await pool.query(query, values)
}

exports.create_tl_widgets = async (twitter_id, widgets) => {
	for (var i = 0; i != widgets.length; i++) {
		var query = 'INSERT INTO TWITTER_WIDGET_TL(TWITTER_ID, TYPE, TIMER, TOP_, LEFT_, WIDTH_, HEIGHT_) \
		VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
		var values = [
			twitter_id,
			widgets[i].type,
			widgets[i].timer,
			widgets[i].top,
			widgets[i].left,
			widgets[i].width,
			widgets[i].height
		]
		await pool.query(query, values)
	}
}
const pool = require('./const').pool

const get_twitter_info = require('./db').get_twitter_info
const get_coinbase_info = require('./db').get_coinbase_info
const get_user_info = require('./db').get_user_info

const delete_wallet_widgets = require('./db').delete_wallet_widgets
const create_wallet_widgets = require('./db').create_wallet_widgets

const delete_exchange_widgets = require('./db').delete_exchange_widgets
const create_exchange_widgets = require('./db').create_exchange_widgets

const delete_tl_widgets = require('./db').delete_tl_widgets
const create_tl_widgets = require('./db').create_tl_widgets


exports.save_tl_widgets = async (username, widgets) => {
	const twitter_info = await get_twitter_info(username)
	if (!twitter_info)
		return
	await delete_tl_widgets(twitter_info.id)
	await create_tl_widgets(twitter_info.id, widgets)
}

exports.save_wallet_widgets = async (username, widgets) => {
	const coinbase_info = await get_coinbase_info(username)
	if (!coinbase_info)
		return
	await delete_wallet_widgets(coinbase_info.id)
	await create_wallet_widgets(coinbase_info.id, widgets)
}

exports.save_exchange_widgets = async (username, widgets) => {
	const user_info = await get_user_info(username)
	await delete_exchange_widgets(user_info.id)
	await create_exchange_widgets(user_info.id, widgets)
}

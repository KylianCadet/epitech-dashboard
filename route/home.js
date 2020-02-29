'use strict'

var express = require('express')
var router = express.Router()

const redirect_if_not_connected = require('../js/const').redirect_if_not_connected;

const get_twitter_info = require('../js/db').get_twitter_info;
const get_coinbase_info = require('../js/db').get_coinbase_info;

const get_widgets_exchange = require('../js/db').get_widgets_exchange
const get_widgets_tl = require('../js/db').get_widgets_tl
const get_widgets_wallet = require('../js/db').get_widgets_wallet



router.get('/', async (req, res) => {
	if (redirect_if_not_connected(req, res))
		return;
	const username = req.session.username;
	const twitter_info = await get_twitter_info(username);
	const coinbase_info = await get_coinbase_info(username);
	const widgets_wallet = await get_widgets_wallet(coinbase_info)
	const widgets_exchange = await get_widgets_exchange(username)
	const widgets_tl = await get_widgets_tl(twitter_info)
	return res.render('home', {
		error: null,
		username: username,
		twitter_info: twitter_info,
		coinbase_info: coinbase_info,
		widgets_wallet: widgets_wallet,
		widgets_tl: widgets_tl,
		widgets_exchange: widgets_exchange
	});
});


const save_tl_widgets = require('../js/save').save_tl_widgets
const save_wallet_widgets = require('../js/save').save_wallet_widgets
const save_exchange_widgets = require('../js/save').save_exchange_widgets

router.post('/save', async (req, res) => {
	if (redirect_if_not_connected(req, res))
		return;
	const tl_widgets = req.body.tl_widgets
	const wallet_widgets = req.body.wallet_widgets
	const exchange_widgets = req.body.exchange_widgets
	save_tl_widgets(req.session.username, tl_widgets)
	save_wallet_widgets(req.session.username, wallet_widgets)
	save_exchange_widgets(req.session.username, exchange_widgets)
})

module.exports = router
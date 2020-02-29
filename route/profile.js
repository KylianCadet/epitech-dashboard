'user strict'

var express = require('express')
var router = express.Router()
const redirect_if_not_connected = require('../js/const').redirect_if_not_connected

const get_twitter_info = require('../js/db').get_twitter_info;
const get_coinbase_info = require('../js/db').get_coinbase_info;

router.get('/', async (req, res) => {
	if (redirect_if_not_connected(req, res))
		return;
	const username = req.session.username;
	var twitter_info = await get_twitter_info(username);
	var coinbase_info = await get_coinbase_info(username);
	res.render('profile', { twitter_info: twitter_info, coinbase_info: coinbase_info });
})

module.exports = router

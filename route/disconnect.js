'user strict'

var express = require('express')
var router = express.Router()

const redirect_if_not_connected = require('../js/const').redirect_if_not_connected;

const delete_tiwtter = require('../js/db').delete_twitter
const delete_coinbase = require('../js/db').delete_coinbase

router.get('/', (req, res) => {
	if (redirect_if_not_connected(req, res))
		return;
	req.session.destroy();
	res.redirect('/');
})

router.get('/twitter', async (req, res) => {
	if (redirect_if_not_connected(req, res))
		return;
	await delete_tiwtter(req.session.username);
	res.redirect('/profile')
})

router.get('/coinbase', async (req, res) => {
	// POST https://api.coinbase.com/oauth/revoke
	if (redirect_if_not_connected(req, res))
		return;
	await delete_coinbase(req.session.username);
	res.redirect('/profile')
})

module.exports = router
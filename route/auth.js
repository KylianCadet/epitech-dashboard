'user strict'

var express = require('express')
var router = express.Router();
const fetch = require("node-fetch");

const create_coinbase_service = require('../js/db').create_coinbase_service
const create_twitter_service = require('../js/db').create_twitter_service
const login = require('../js/db').login

const redirect_if_not_connected = require('../js/const').redirect_if_not_connected;

router.post('/', async (req, res, next) => {
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password)
		return res.render('index', { error: "Username or Password missing", success: null });
	const response = await login(username, password)
	if (response == 'wrong') {
		return res.render('index', { error: "Wrong username / password combinaison", success: null });
	} else {
		req.session.username = username;
		req.session.username_id = response;
		req.session.connected = true;
		return res.redirect('/home');
	}
});

router.get('/coinbase', (req, res) => {
	if (redirect_if_not_connected(req, res))
		return;
	res.redirect(require('../js/const').COINBASE_URL);
});

router.get('/coinbase/callback', async (req, res) => {
	if (redirect_if_not_connected(req, res))
		return;
	const code = req.query.code;
	if (!code)
		res.redirect('/home');
	const response = await fetch('https://api.coinbase.com/oauth/token', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			'grant_type': 'authorization_code',
			'code': code,
			'client_id': require('../js/const').COINBASE_CLIENT_ID,
			'client_secret': require('../js/const').COINBASE_CLIENT_SECRET,
			'redirect_uri': require('../js/const').COINBASE_REDIRECT_URI
		})
	});
	const data = await response.json();
	await create_coinbase_service(req.session.username, data['access_token'], data['refresh_token'])
	res.redirect('/home');
});

router.get('/twitter/callback', async (req, res) => {
	if (redirect_if_not_connected(req, res))
		return;
	var oauthToken = req.query.oauth_token;
	var oauthVerifier = req.query.oauth_verifier;
	const oauth = {
		token: oauthToken,
		verifier: oauthVerifier
	};
	const response = await request.post({ url: 'https://api.twitter.com/oauth/access_token', oauth: oauth });
	const reqData = qs.parse(response);
	const oauthUserToken = reqData.oauth_token;
	const oauthUserSecret = reqData.oauth_token_secret;
	const screenName = reqData.screen_name;
	const userId = reqData.user_id;
	await create_twitter_service(req.session.username, oauthUserToken, oauthUserSecret, screenName)
	res.redirect('/home');
});

var request = require('request-promise-native');
var qs = require('qs');

router.get('/twitter', async (req, res) => {
	if (redirect_if_not_connected(req, res))
		return;
	const oauth = {
		callback: "http://127.0.0.1:8080/auth/twitter/callback",
		consumer_key: require('../js/const').TWITTER_CONSUMER_API_KEY,
		consumer_secret: require('../js/const').TWITTER_CONSUMER_API_KEY_SECRET
	};
	const response = await request.post({ url: 'https://api.twitter.com/oauth/request_token', oauth: oauth });
	const reqData = qs.parse(response);
	const oauthToken = reqData.oauth_token;
	const oauthTokenSecret = reqData.oauth_token_secret;
	res.redirect('https://api.twitter.com/oauth/authorize?oauth_token=' + oauthToken);
});

module.exports = router
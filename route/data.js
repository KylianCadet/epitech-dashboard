'use strict'

var express = require('express')
var router = express.Router()

const get_coinbase_info = require('../js/db').get_coinbase_info
const get_twitter_info = require('../js/db').get_twitter_info
const delete_coinbase = require('../js/db').delete_coinbase

const fetch = require("node-fetch");



const consumer_key = require('../js/const').TWITTER_CONSUMER_API_KEY
const consumer_secret = require('../js/const').TWITTER_CONSUMER_API_KEY_SECRET
const Twitter = require('twitter')

router.post('/tl', async (req, res) => {
	const twitter_info = await get_twitter_info(req.session.username)
	var client = new Twitter({
		consumer_key: consumer_key,
		consumer_secret: consumer_secret,
		access_token_key: twitter_info.token,
		access_token_secret: twitter_info.token_secret
	});
	var final_response = ''
	client.get('statuses/' + req.body.type + '_timeline', async function (error, tweets, response) {
		if (error)
			return res.status(200).send(error[0].message)
		for (var i = 0; i != tweets.length; i++) {
			var response = await fetch('https://publish.twitter.com/oembed?url=https%3A%2F%2Ftwitter.com%2F' + tweets[i].user.screen_name + '%2Fstatus%2F' + tweets[i].id_str + '&dnt=true')
			var data = await response.json();
			final_response += data.html
		}
		res.status(200).send(final_response);
	})
})


const CoinbasePro = require('coinbase-pro');
const publicClient = new CoinbasePro.PublicClient();

router.post('/exchange', async (req, res) => {
	const currency_pair = req.body.currency1 + '-' + req.body.currency2
	if (req.body.currency1 == req.body.currency2)
		return res.status(200).send('1')
	publicClient.getProductTicker(currency_pair)
		.then((data) => {
			return res.status(200).send(data.price)
		})
		.catch(err => {
			const inverted_currency_pair = req.body.currency2 + '-' + req.body.currency1
			publicClient.getProductTicker(inverted_currency_pair)
				.then((data) => {
					return res.status(200).send((1 / data.price).toString())
				})
				.catch(err => {
					return res.status(200).send('Invalid currency pair')
				})
		})
})



var Client = require('../js/const').COINBASE_CLIENT

router.post('/wallet', async (req, res) => {
	const coinbase_info = await get_coinbase_info(req.session.username)
	var client = new Client({ 'accessToken': coinbase_info.access_token, 'refreshToken': coinbase_info.refresh_token })
	client.getAccounts({}, function (err, accounts) {
		if (err) {
			if (err.name == 'ExpiredToken') {
				return delete_coinbase(req.session.username).then(res.status(500).send('ERR'))
			}
			return res.status(500).send('timeout')
		}
		for (var i = 0; i != accounts.length; i++) {
			if (req.body.currency == accounts[i].name.split(' ')[0]) {
				return res.status(200).send(accounts[i].balance.amount)
			}
		}
		res.status(500).send('Internal Error')
	});
})

module.exports = router
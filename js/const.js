'use strict'

const { Pool } = require('pg')
var Client = require('coinbase').Client;

exports.COINBASE_CLIENT = Client;
exports.PORT = process.env.PORT || 8080;
exports.HOST = '0.0.0.0';
exports.pool = new Pool({ connectionString: process.env.DATABASE_URL });
exports.COINBASE_CLIENT_ID = 'b0e76ed41855c111251c5ab56c7fde0914bac5df4d5ad8787fc87b1336570a19'
exports.COINBASE_CLIENT_SECRET = '70272815ec94385d88f123455d9f439233a0295ae70dbec8ca6be3c1c256cbe7'
exports.COINBASE_REDIRECT_URI = 'http://localhost:8080/auth/coinbase/callback'
exports.COINBASE_URL = 'https://www.coinbase.com/oauth/authorize?client_id=b0e76ed41855c111251c5ab56c7fde0914bac5df4d5ad8787fc87b1336570a19&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fcoinbase%2Fcallback&response_type=code&scope=wallet%3Aaccounts%3Aread'
exports.TWITTER_CONSUMER_API_KEY = 'J6MBsYcg3IDGTHVsO3E3Cu0XU'
exports.TWITTER_CONSUMER_API_KEY_SECRET = 'VC7VsNgjQlpXIDiCsFrif6vw0QolVB4FieuYTB5P6cgPTq36dB'
exports.TWITTER_REDIRECT_URI = 'http://127.0.0.1:8080/auth/twitter/callback'


exports.redirect_if_not_connected = (req, res) => {
	if (!req.session.connected) {
		res.writeHead(302, {
			'Location': '/'
		});
		res.end();
		return true;
	}
	return false
}

exports.get_services = () => {
	return ([{
		"name": "twitter",
		"widgets": [{
			"name": "tl",
			"description": "Display the user's Twitter timeline",
			"params": [{
				"name": "type",
				"type": "string"
			}]
		}]
	}, {
		"name": "coinbase",
		"widgets": [{
			"name": "wallet",
			"description": "Display the user's Coinbase wallet in several currencies",
			"params": [{
				"name": "currency",
				"type": "string"
			}]
		}, {
			"name": "exchange",
			"description": "Display the exchange rates between two currencies",
			"params": [{
				"name": "currency1",
				"type": "string"
			}, {
				"name": "currency2",
				"type": "string"
			}]
		}]
	}])
}
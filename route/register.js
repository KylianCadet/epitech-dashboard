'user strict'

var express = require('express')
var router = express.Router()
var pool = require('../js/const').pool

const register = require('../js/db').register

router.post('/', async (req, res, next) => {
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password)
		return res.redirect('/');
	const response = await register(username, password)
	if (response == 'exist') {
		return res.render('register', { error: "Username '" + username + "' already exist" });
	} else {
		return res.render('index', { success: "new user created", error: null });
	}
});

router.get('/', (req, res, next) => {
	return res.render('register', { error: null });
});

module.exports = router
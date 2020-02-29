'use strict'

const express = require('express');
var session = require('express-session');
var PostgreSqlStore = require('connect-pg-simple')(session);

const app = express();


app.use(express.json());

app.use(express.urlencoded({
	extended: true,
}));

app.use(session({
	secret: 'keyboard cat',
	cookie: { maxAge: 3600000 }, // 1 hour
	resave: false, // does not forces the session to be saves back to the session store (we are using a store)
	saveUninitialized: false, // does not store cookies session when first connecting
	store: new PostgreSqlStore({ conString: process.env.DATABASE_URL }) // setting a store, the psql db needs to have a well formatted session table
}));

app.set('view engine', 'ejs'); // use ejs for the view engine

exports.app = app;

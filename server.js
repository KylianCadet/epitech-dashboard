'use strict';

// Constants
const PORT = require('./js/const').PORT;
const HOST = require('./js/const').HOST;
const get_services = require('./js/const').get_services

// App
const { app } = require('./js/app');

// Routes
const auth = require('./route/auth');
const register = require('./route/register');
const disconnect = require('./route/disconnect');
const home = require('./route/home');
const profile = require('./route/profile');
const data = require('./route/data');

// Routes
app.use('/auth', auth);
app.use('/register', register);
app.use('/disconnect', disconnect);
app.use('/home', home);
app.use('/profile', profile);
app.use('/data', data);

app.get('/', (req, res) => {
	if (req.session.connected) {
		res.writeHead(302, {
			'Location': '/home'
		});
		return res.end();
	}
	res.render('index', { error: null, success: null });
});

app.get('/about.json', (req, res) => {
	res.json({
		"client": {
			"host": req.connection.remoteAddress
		},
		"server": {
			"current_time": (new Date).getTime(),
			"services": get_services()
		}
	})
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
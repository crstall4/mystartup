const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const app = express();

let users = [];
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.get('/api/health', (req, res) => {
	res.send({ ok: true });
});

app.post('/api/auth/create', async (req, res) => {
	const { username, password } = req.body;

	const existing = users.find((u) => u.username === username);
	if (existing) {
		res.status(409).send({ msg: 'Username already taken' });
		return;
	}

	const user = await createUser(username, password);
	res.send({ username: user.username });
});

app.post('/api/auth/login', async (req, res) => {
	const { username, password } = req.body;

	const user = users.find((u) => u.username === username);
	if (!user) {
		res.status(401).send({ msg: 'Invalid credentials' });
		return;
	}

	const passwordMatches = await bcrypt.compare(password, user.password);
	if (!passwordMatches) {
		res.status(401).send({ msg: 'Invalid credentials' });
		return;
	}

	user.token = uuid.v4();
	setAuthCookie(res, user.token);
	res.send({ username: user.username });
});

async function createUser(username, password) {
	const passwordHash = await bcrypt.hash(password, 10);
	const user = { username, password: passwordHash };
	users.push(user);
	return user;
}

function setAuthCookie(res, token) {
	res.cookie("token", token, {
		maxAge: 1000 * 60 * 60 * 24 * 365,
		httpOnly: true,
		sameSite: 'strict',
	});
}

app.use((req, res) => {
	if (req.path.startsWith('/api')) {
		res.status(404).send({ msg: 'Not found' });
		return;
	}

	res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
	console.log('Backend listening on port ' + port);
});
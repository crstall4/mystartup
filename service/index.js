const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const DB = require('./database.js');

const app = express();

let users = [];
let decks = [];
let scores = [];
const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware. Same thing is used in Simon.
app.use(express.json());
app.use(cookieParser());
//front-end static content hosting happens here.
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
	user.token = uuid.v4();
	setAuthCookie(res, user.token);
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

app.delete('/api/auth/logout', (req, res) => {
	const user = users.find((u) => u.token === req.cookies[authCookieName]);
	if (user) {
		delete user.token;
	}
	res.clearCookie(authCookieName);
	res.status(204).end();
});

app.get('/api/decks', verifyAuth, (req, res) => {
	const user = users.find((u) => u.token === req.cookies[authCookieName]);
	const userDecks = decks.filter((deck) => deck.owner === user.username);
	res.send(userDecks);
});

app.get('/api/alldecks', verifyAuth, (req, res) => {
	res.send(decks);
});

app.post('/api/decks', verifyAuth, (req, res) => {
	const user = users.find((u) => u.token === req.cookies[authCookieName]);
	const incomingDeck = req.body;

	if (!incomingDeck || !incomingDeck.name || !Array.isArray(incomingDeck.cards) || incomingDeck.cards.length === 0) {
		res.status(400).send({ msg: 'Deck must have a name and at least one card.' });
		return;
	}

	for (const card of incomingDeck.cards) {
		if (!card || !card.question || !card.answer) {
			res.status(400).send({ msg: 'All cards must have question and answer.' });
			return;
		}
	}

	const newDeck = {
		id: uuid.v4(),
		name: String(incomingDeck.name),
		owner: user.username,
		cards: incomingDeck.cards.map((card, index) => ({
			id: `${index + 1}`,
			question: String(card.question),
			answer: String(card.answer),
		})),
	};

	decks.push(newDeck);
	res.status(201).send(newDeck);
});

//example of restricted endpoint:
app.get('/api/scores', verifyAuth, (req, res) => {
	const user = users.find((u) => u.token === req.cookies[authCookieName]);
	const userScores = scores.filter((entry) => entry.user === user.username);
	res.send(userScores);
});

app.post('/api/scores', verifyAuth, (req, res) => {
	const user = users.find((u) => u.token === req.cookies[authCookieName]);
	const incomingScore = req.body;

	if (!incomingScore || !incomingScore.word || typeof incomingScore.points !== 'number') {
		res.status(400).send({ msg: 'Score must include word and numeric points.' });
		return;
	}

	const newScore = {
		word: String(incomingScore.word),
		answer: incomingScore.answer ? String(incomingScore.answer) : '',
		points: incomingScore.points,
		date: incomingScore.date || new Date().toISOString(),
		user: user.username,
	};

	scores.push(newScore);
	res.status(201).send(newScore);
});

function verifyAuth(req, res, next) {
	const user = users.find((u) => u.token === req.cookies[authCookieName]);
	if (user) {
		next();
	} else {
		res.status(401).send({ msg: 'Unauthorized' });
	}
}

//bcrypt used here.
async function createUser(username, password) {
	const passwordHash = await bcrypt.hash(password, 10);
	const user = { username, password: passwordHash };
	users.push(user);
	return user;
}

function setAuthCookie(res, token) {
	res.cookie(authCookieName, token, {
		maxAge: 1000 * 60 * 60 * 24 * 365,
		httpOnly: true,
		sameSite: 'strict',
	});
}

//the rerouting happens here.
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
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const DB = require('./database.js');

const app = express();

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

	if (await DB.getUser(username)) {
		res.status(409).send({ msg: 'Username already taken' });
	} else {
		const user = await createUser(username, password);
		user.token = uuid.v4();
		await DB.updateUser(user);
		setAuthCookie(res, user.token);
		res.send({ username: user.username });
	}
});

app.post('/api/auth/login', async (req, res) => {
	const { username, password } = req.body;

	const user = await DB.getUser(username);
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
	await DB.updateUser(user);
	setAuthCookie(res, user.token);
	res.send({ username: user.username });
});

app.delete('/api/auth/logout', async (req, res) => {
	const user = await DB.getUserByToken(req.cookies[authCookieName]);
	if (user) {
		await DB.updateUserRemoveAuth(user);
	}
	res.clearCookie(authCookieName);
	res.status(204).end();
});

app.get('/api/decks', verifyAuth, async (req, res) => {
	const user = await DB.getUserByToken(req.cookies[authCookieName]);
	const userDecks = await DB.getUserDecks(user.username);
	res.send(userDecks);
});

app.get('/api/alldecks', verifyAuth, (req, res) => {
	const decks = DB.getAllDecks();
	res.send(decks);
});

app.post('/api/decks', verifyAuth, async (req, res) => {
	const user = await DB.getUserByToken(req.cookies[authCookieName]);
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

	await DB.addDeck(newDeck);
	res.status(201).send(newDeck);
});

//example of restricted endpoint:
app.get('/api/scores', verifyAuth, async (req, res) => {
	const user = await DB.getUserByToken(req.cookies[authCookieName]);
	const userScores = await DB.getUserScores(user.username);
	res.send(userScores);
});

app.post('/api/scores', verifyAuth, async (req, res) => {
	const user = await DB.getUserByToken(req.cookies[authCookieName]);
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
	await DB.addScore(newScore);
	res.status(201).send(newScore);
});

async function verifyAuth(req, res, next) {
	const user = await DB.getUserByToken(req.cookies[authCookieName]);
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
	await DB.addUser(user);
	return user;
}

function setAuthCookie(res, token) {
	res.cookie(authCookieName, token, {
		maxAge: 1000 * 60 * 60 * 24 * 365,
		httpOnly: true,
		sameSite: 'strict',
	});
}

app.get('/api/current-weather', async (req, res) => {
	const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.2338&longitude=-111.6585&current=temperature_2m,weather_code&timezone=America/Denver&temperature_unit=fahrenheit');
	const data = await response.json();
	res.send({
		temperature: data.current.temperature_2m,
	});
});

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
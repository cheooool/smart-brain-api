const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();

const database = {};

app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('정상 작동');
});

app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db);
});

// 아래 방식으로도 동작 (db, bcrypt) => (req, res) => { ... }
app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});
app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('app is running on port 3000');
});

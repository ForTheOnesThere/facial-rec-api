//Packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

//Import controllers
const { handleImage } = require('./controllers/image.js');
const { handleSignIn } = require('./controllers/signin.js');
const { handleRegister } = require('./controllers/register.js');
const { handleProfile } = require('./controllers/profile.js');

//Configure knex.js to use my PostgreSQL database
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'jamescockayne',
      password : '',
      database : 'facial-recognition'
    }
});

//Start the express server
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Endpoints
app.get('/', (req, res) => {res.json('Server is running')})
app.post('/signin', (req,res) => {handleSignIn(req, res, db, bcrypt)})
app.post('/register', (req,res) => {handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req,res) => {handleProfile(req, res, db)})
app.put('/image', (req, res) => handleImage(req, res, db))

//Start listening
app.listen(3000, () => {
    console.log('App running on port 3000')
});
//Packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'jamescockayne',
      password : '',
      database : 'facial-recognition'
    }
});

db.select('*').from('users').then(data => {

})

const app = express();

database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'test',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Hannah',
            email: 'hannah@gmail.com',
            password: 'test',
            entries: 0,
            joined: new Date()
        },
    ]
}

//Middleware
app.use(cors());
app.use(bodyParser.json());

//
app.get('/', (req, res) => {
    console.log('success');
    res.send(database.users);
});

app.post('/signin', (req,res) => {
    if (req.body.email === database.users[0].email &&  req.body.password === database.users[0].password){
        console.log('logged in successfully');
        res.json(database.users[0]); 
    } else {
        res.status(400).json('error logging in');
        console.log(req.body)
    } 
});

app.post('/register', (req,res) => {
    const { email, name, password } = req.body;
    db('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            joined: new Date()
        })
        .then(user => res.json(user[0]))
        .catch(err => res.status(400).json('Unable to register... Sorry about that.'));

    console.log('registered user');
    
})

app.get('/profile/:id', (req,res) => {
    const { id } = req.params;
    db.select('*')
        .from('users')
        .where({id: id})
        .then(user => {
            if (user.length){
                res.json(user[0])
            } else {
                res.status(400).json('user may not exist')
            }
        })
        .catch(err => res.status(400).json(err));  
});

app.put('/image', (req,res) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            if (entries.length){
                res.json(entries[0])
            } else {
                res.status(400).json('no such user')
            }      
        })
        .catch(error => console.log)
})

//Start listening
app.listen(3000, () => {
    console.log('App running on port 3000')
});
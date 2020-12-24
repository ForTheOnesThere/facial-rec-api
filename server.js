//Packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

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
        console.log(database.users[0].password);
        res.json('this is working!') 
    } else {
        res.status(400).json('error logging in');
        console.log(req.body)
    } 
});

app.post('/register', (req,res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,   
        entries: 0,  
        joined: new Date()
    });
    res.json(database.users[database.users.length -1])
})

app.get('/profile/:id', (req,res) => {
    const { id } = req.params;
    let match = false;
    database.users.forEach(user => {
        if (user.id === id){
            match = true;
            return res.json(user);
        }
    });
    if (!match){
        res.status(404).json('User not found');
    }
});

app.post('/image', (req,res) => {
    const { id } = req.body;
    let match = false;
    database.users.forEach(user => {
        if (user.id === id){
            match = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!match){
        res.status(404).json('User not found');
    }
})

//Start listening
app.listen(3000, () => {
    console.log('App running on port 3000')
});

/*
/ => user list
/signin => POST, success/fail
/register => POST, return user
/profile/:userid => GET user
/image => PUT, return updated user
*/
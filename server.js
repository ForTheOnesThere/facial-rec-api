//Packages
const express = require('express');
const cors = require('cors');

const app = express();

//Middleware
app.use(cors());

//
app.get('/', (req, res) => {
    res.send('working!');
})


//Start listening
app.listen(3000, () => {
    console.log('App running on port 3000')
})

/*
/ => working
/signin => POST, success/fail
/register => POST, return user
/profile/:userid => GET user
/image => PUT, return updated user
*/
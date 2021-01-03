const handleSignIn = (req, res, db, bcrypt) => {

    //get the input from the request body, validate inputs exist
    const { email, password} = req.body
    if (!email || !password) {
        return res.status(400).json('Incorrect input')
    }

    //find the user with the imput email, compare the hash, and if it matches, return all the user data.
    db.select('email', 'hash').from('login')
        .where('email','=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash)
            if (isValid) {
                db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => res.json(user[0]))
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('invalid credentials')
            }
        })
        .catch(err => res.status(400).json('invalid credentials'))
}

module.exports = {
   handleSignIn: handleSignIn
}
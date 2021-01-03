const handleRegister = (req, res, db, bcrypt) => {

    //get the input from the request body, validate inputs exist, and hash the password string
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('Incorrect input')
    }
    const hash = bcrypt.hashSync(password);

    //begin a transaction, so that the login and user tables only update if both operations are successful
    //first, insert the hash and email into the login table, and return the email to be used again
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')

        //if successful, now return the email and insert into the users table
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .then(user => res.json(user[0]))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(error => res.status(400).json('Unable to register'))
}

//the transaction only commits when all actions are complete. If there is an error on either of them,
//do not modify the database.

module.exports = {
    handleRegister: handleRegister
}
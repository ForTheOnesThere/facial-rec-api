const handleProfile = (req, res, db) => {

    //extract the id param
    const { id } = req.params;

    //search the users table for a user with the requested unique id
    db.select('*')
        .from('users')
        .where({id: id})
        .then(user => {
            //if the user exists, return it
            if (user.length){
                res.json(user[0])
            } else {
                res.status(400).json('user may not exist')
            }
        })
        .catch(err => res.status(400).json(err));  
}

module.exports = {
    handleProfile: handleProfile
}
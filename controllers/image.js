const handleImage = (req, res, db) => {
    
    //increment the user's entries count, and return either the new entry count, or an error
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
}

module.exports = {
   handleImage: handleImage
}
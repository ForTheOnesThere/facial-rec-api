const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.API_KEY
   });

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

const handleAPI = (req, res) => {
    app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
      .then(generalModel => generalModel.predict(req.body.url))
      .then(data => res.json(data))
      .catch(error => res.status(400).json('Problem fetching from API'))
}

module.exports = {
   handleImage: handleImage,
   handleAPI: handleAPI
}
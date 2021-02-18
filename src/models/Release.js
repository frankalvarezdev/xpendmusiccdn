const { Schema, model } = require('mongoose');

const releaseSchema = new Schema({
    rid: String,
    name: String,
    type: String,
    artists: [],
    url: String,
    services: [],
    date: String,
    image: String
});

module.exports = model('Release', releaseSchema);
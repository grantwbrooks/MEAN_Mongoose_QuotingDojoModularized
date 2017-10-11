var mongoose = require('mongoose');

var FishSchema = new mongoose.Schema({
    name:  { type: String, required: true},
    // last_name: { type: String, required: true, maxlength: 20 },
    length: { type: Number, required: true},
    // email: { type: String, required: true }
}, {timestamps: true });

mongoose.model('fishes', FishSchema); // We are setting this Schema in our Models as 'fishes'
var Fish = mongoose.model('fishes') // We are retrieving this Schema from our Models, named 'fishes'

// Use native promises
mongoose.Promise = global.Promise;
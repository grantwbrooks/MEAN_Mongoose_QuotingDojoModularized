// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require Mongoose
var mongoose = require('mongoose');
// this is the external validator the platform talked about
// var validate = require('mongoose-validator');
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/mongoose_dashboard');

//define your validator for external validator
// var nameValidator = [
//     validate({
//       validator: 'isLength',
//       arguments: [3, 50],
//       message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
//     }),
//     validate({
//       validator: 'isAlphanumeric',
//       passIfEmpty: true,
//       message: 'Name should contain alpha-numeric characters only'
//     })
//     // validate({
//     //     validator: 'isEmail',
//     //     passIfEmpty: true,
//     //     message: 'Should be an email'
//     // })
// ];


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

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

// Routes
// GET Root Request  show all fish
app.get('/', function(req, res) {
    Fish.find({}, function(err, fishies) {
        if(err) {
            console.log("didn't get quote data");
            res.render('index');
        } else {
            console.log("got quote data");
            res.render('index', {fishData: fishies});
        }
      })
})

// GET form to make a new fish
app.get('/fishes', function(req,res) {
    res.render('create');
})

// POST for a new fish
app.post('/fishes', function(req, res) {
    console.log("POST DATA", req.body);
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    Fish.create(req.body, function(err, fishy) {
        // if there is an error console.log that something went wrong!
        if(err) {
            console.log('something went wrong saving user');
            console.log(fishy.errors);
            res.render('/', {errors: fishy.errors});
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a fish!');
            res.redirect('/');
        }
    })
})

// GET with id - one fish info
app.get('/fishes/:id', function(req, res) {
    console.log("fish id-----"+"ObjectId('"+req.params.id+"')")
    // Fish.find({_id:"ObjectId('"+req.params.id+"')"}, function(err, fishies) {
    Fish.findOne({_id:req.params.id}, function(err, fishies) {
        if(err) {
            console.log("didn't get fish data");
            res.render('showFish');
        } else {
            console.log("got fish data", fishies);
            res.render('showFish', {fishData: fishies});
        }
    })
})

// GET form to edit a fish
app.get('/fishes/edit/:id', function(req, res) {
    console.log("fish id-----"+"ObjectId('"+req.params.id+"')")
    // Fish.find({_id:"ObjectId('"+req.params.id+"')"}, function(err, fishies) {
    Fish.findOne({_id:req.params.id}, function(err, fishies) {
        if(err) {
            console.log("didn't get fish data");
            res.render('showFish');
        } else {
            console.log("got fish data", fishies);
            res.render('create', {fishData: fishies});
        }
    })
})

// POST with id to edit a fish and save it
app.post('/fishes/edit/:id', function(req, res) {
    console.log("POST DATA-----", req.body);
    console.log("ID", req.params.id);
    // Fish.findOne({_id:req.params.id}, function(err, fishy) {
    //     fishy.name = req.body.name;
    //     fishy.length = req.body.length;
    //     fishy.save(function(err){
    //         if(err) {
    //             console.log('something went wrong saving user');
    //             console.log(fishy.errors);
    //             res.render('/', {errors: fishy.errors});
    //         } else { // else console.log that we did well and then redirect to the root route
    //             console.log('successfully updated a fish!');
    //             res.redirect('/');
    //         }
    //     })    
    // })
// try another way with update method instead:
    Fish.update({_id:req.params.id}, req.body, function(err, fishy) {
        if(err) {
            console.log('something went wrong saving user');
            console.log(fishy.errors);
            res.render('/', {errors: fishy.errors});
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully updated a fish!');
            res.redirect('/');
        }
    })


})

// POST with id to delete a fish
app.post('/fishes/destroy/:id', function(req, res) {
    console.log("POST DATA-----", req.body);
    console.log("ID", req.params.id);
    Fish.remove({_id:req.params.id}, function(err) {
        if(err) {
            console.log('something went wrong saving user');
            console.log(fishy.errors);
            res.render('/', {errors: fishy.errors});
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully deleted a fish!');
            res.redirect('/');
        }
    })
})


// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000 for fish creation");
})

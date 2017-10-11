var mongoose = require('mongoose');
var Fish = mongoose.model('fishes');

module.exports = {
    showAll: function(req, res) {
        Fish.find({}, function(err, fishies) {
            if(err) {
                console.log("didn't get quote data");
                res.render('index');
            } else {
                console.log("got quote data");
                res.render('index', {fishData: fishies});
            }
        })
    },
    newFish: function(req, res) {
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
    },
    showOneFish: function(req, res) {
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
    },
    showFishtoEdit: function(req, res) {
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
    },
    saveEditFish: function(req, res) {
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
    },
    deleteFish: function(req, res) {
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
    }
}
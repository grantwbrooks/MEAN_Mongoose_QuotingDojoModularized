var fishes = require('../controllers/fishes.js')

module.exports = function(app) {
    // Routes
    // GET Root Request  show all fish

    app.get('/', function(req, res) {
        fishes.showAll(req, res)
    })

    // GET form to make a new fish
    app.get('/fishes', function(req,res) {
        res.render('create');
    })

    // POST for a new fish
    app.post('/fishes', function(req, res) {
        fishes.newFish(req, res)
    })

    // GET with id - one fish info
    app.get('/fishes/:id', function(req, res) {
        fishes.showOneFish(req, res)
    })

    // GET form to edit a fish
    app.get('/fishes/edit/:id', function(req, res) {
        fishes.showFishtoEdit(req, res)
    })

    // POST with id to edit a fish and save it
    app.post('/fishes/edit/:id', function(req, res) {
        fishes.saveEditFish(req, res)
    })

    // POST with id to delete a fish
    app.post('/fishes/destroy/:id', function(req, res) {
        fishes.deleteFish(req, res)
    })
}


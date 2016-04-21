var Food = require('./models/food');

function getFood(res) {
    Food.find(function (err, food) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(food); // return all todos in JSON format
    });
}
;


module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/food', function (req, res) {
        // use mongoose to get all todos in the database
        getFood(res);
    });
    
    // get total price of food
    app.get('/api/total', function (req, res) {
        // use mongoose to get all total price of food in the database
            Food.find(function (err, food) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }
            var total = 0;
            for(i = 0; i < food.length; i++){  // sum up all prices
                   total += food[i].price;
            }
            res.json(total); // return total price in JSON format
        });
            
    });

    // create todo and send back all todos after creation
    app.post('/api/food', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Food.create({
            text: req.body.text,
            price: req.body.price,
            done: false
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getFood(res);
        });

    });

    // delete a todo
    app.delete('/api/food/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);

            getFood(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
// Pull in required dependencies
// the thing that makes the app work 
// you require the model, you need to access a way the data
// controlle is the middlemand between the data and the visuals (output)
var express = require('express');
// all the methods in express libraries 
// controlls the way our application functions 
//router is its own object
// alows it to extract from o0ur server files 
// separtion of concerns is only in in charge of creating a route 
//going to start up our server and start up our application 
// look up[ the docs
// deep dive to understand expressjs.com 

var router = express.Router();

// Import the model (burger.js) to use its database functions.
// allowing you to interact with the model 
var burger = require('../models/burger_model.js');

// Create the routes and associated logic
// this referes to the cb (call back) of the orm
// once you get data from the database the function below happens
//with the data that was received.
// the router.get allows for your home page to point to the basic url to the application
// not creating anything, you are reading get is reading / . reading your data 
// req equals request res equals result 
// get the informaiton we need and then do the below 
// we are putting all our burgers into an object called hbsObject 
router.get('/', function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    // console.log(hbsObject);
    // telling us to render the html at our index.handelbars 
    //hbsObject 
    // res.render as the index. handlebards with the handblebars object object 
    res.render('index', hbsObject);
  });
});

router.post('/burgers', function(req, res) {
  burger.insertOne([
    'burger_name'
  ], [
    req.body.burger_name
  ], function(data) {
    res.redirect('/');
  });
});

router.put('/burgers/:id', function(req, res) {
  var condition = 'id = ' + req.params.id;

  // passing in and object which is the property you want to update
  // a condition which is the id of the object you want to update
  // and the call back 
  burger.updateOne(burgers,{
    devoured: true
  }, condition, function(data) {
    res.redirect('/');
  });
});

// Export routes for server.js to use.
module.exports = router;
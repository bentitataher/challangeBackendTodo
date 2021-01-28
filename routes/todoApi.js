const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// get list of todos from the db
router.get('/', function(req, res, next){
  Todo.find({}).then(function(todos){
      res.send(todos);
  });
});

// get specific todo from the db
router.get('/:id', function(req, res, next){
    Todo.findById({_id: req.params.id}).then(function(todo){
        res.send(todo);
    });
  });

// add a new todos to the db
router.post('/', function(req, res, next){
    Todo.create(req.body).then(function(todo){
        res.send(todo)
    }).catch(next);
  });

// update a todo in the db
  router.put('/:id', function(req, res, next){
    Todo.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Todo.findOne({_id: req.params.id}).then(function(todo){
            res.send(todo);
        });
    });
  });

//  delete a todo from the db 
  router.delete('/:id', function(req, res, next){
    Todo.findByIdAndRemove({_id: req.params.id}).then(function(todo){
        res.send(todo);
    });  
  });

  module.exports = router;
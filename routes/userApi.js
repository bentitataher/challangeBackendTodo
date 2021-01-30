const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

// get list of users from the db
router.get('/', passport.authenticate('bearer', { session: false }) , (req, res)=>{
  User.find({}).then(function(users){
      res.send(users);
  });
});

// get specific user from the db
router.get('/:id', function(req, res, next){
    User.findById({_id: req.params.id}).then(function(user){
        res.send(user);
    });
  });

// add a new users to the db
router.post('/', function(req, res, next){
    User.create(req.body).then(function(user){
        res.send(user)
    }).catch(next);
  });

// update a user in the db
  router.put('/:id', function(req, res, next){
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        User.findOne({_id: req.params.id}).then(function(user){
            res.send(user);
        });
    });
  });

//  delete a todo from the db 
  router.delete('/:id', function(req, res, next){
    User.findByIdAndRemove({_id: req.params.id}).then(function(user){
        res.send(user);
    });  
  });

// affecter un Id à un user
   router.post('/add-todo-to-user/:idUser/:idTodo',(req, res)=>{
     User.findByIdAndUpdate({_id: req.params.idUser}, { $push: { todos: req.params.idTodo}}).then(()=>{
       User.findOne({_id: req.params.idUser}).then((user)=>{
         res.send(user);
       });
     });
   });

   // supprimer un Id d'un user
   router.delete('/delete-todo-from-user/:idUser/:idTodo',(req, res)=>{
    User.findByIdAndUpdate({_id: req.params.idUser}, { $pull: { todos: req.params.idTodo}}).then(()=>{
      User.findOne({_id: req.params.idUser}).then((user)=>{
        res.send(user);
      });
    });
  });

  module.exports = router;
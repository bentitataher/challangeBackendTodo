const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

/* inscription */
router.post('/signup', (req, res, next) => {
    User.findOne({email: req.body.email}).then(user =>{
        if (user){
            return res.status(409).json({
                message: 'Mail exists'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash)=> {

                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }
          
                else {
                    req.body.password = hash;
                    User.create(req.body).then(function(user){
                        console.log('user is :', user)
                        res.status(201).json({
                            message: 'Bcrypt ok'
                        });
                    })
                    .catch(err =>{
                        console.log(err =>{
                            res.status(500).json({
                                error: err
                            });
                        });
                    });
                }
            });
        }
    })  


}); /* Fin API post */

/* login */
router.post('/login', (req, res, next)=>{
  User.find({email: req.body.email})
      .then(user=>{
          if (user.length<1){
              return res.status(401).json({
                  message: 'Auth failed'
              });
          }
          bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
              if(err) {
                return res.status(401).json({
                    message: 'Auth failed'
                });     
              }
              if (result) {
                 const token = jwt.sign({
                     email:user[0].email,
                     esurId: user[0]._id
                 },
                  'secret',
                  {
                      expiresIn: "1d"
                  },
                  ); 
                 return res.status(200).json({
                     message: 'Auth succeful',
                     token: token
                 });
              }  
              res.status(401).json({
                  message: 'Auth failed'
              });         
          });
      })  
      .catch(err =>{
          console.log(err=>{
              res.status(500).json({
                  error: err
              })
          });
      })
})

module.exports = router;
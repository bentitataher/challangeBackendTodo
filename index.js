const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/projet');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// initiliaze routes
app.use('/api',require('./routes/todoApi'));
app.use('/api',require('./routes/userApi'));

// error handling middelwere
app.use(function(err, req, res, next){
  //console.log(err);  
  res.status(422).send({error: err.message});  
});

// listen for requests
app.listen(process.env.port || 4000,function(){
  console.log('now listening for requests');  
});
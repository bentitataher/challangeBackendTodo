const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import passport
const passport =  require('./passport')

//set up express app
const app = express();

// connect to mongodb
const connexionOptions = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect('mongodb://localhost/projet', connexionOptions);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// initiliaze routes
app.use('/todos',require('./routes/todoApi'));
app.use('/users',require('./routes/userApi'));
app.use('/email',require('./routes/mailApi'));
app.use('/email-cron',require('./routes/nodecron'));
app.use('/image',require('./routes/imageApi'));
app.use('/auth',require('./routes/authApi'));

// error handling middelwere
app.use(function(err, req, res, next){
  //console.log(err);  
  res.status(422).send({error: err.message});  
});

// listen for requests
app.listen(process.env.port || 4000,function(){
  console.log('now listening for requests');  
});
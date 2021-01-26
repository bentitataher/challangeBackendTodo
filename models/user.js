const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create user schema & model
const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Il faut définir une adresse mail'],
    },
    password: {
        type: String,
        required: [true, 'Il faut définir un mot de passe'],
    },
});





const User = mongoose.model('user', UserSchema);

module.exports = User;
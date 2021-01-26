const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create todo schema & model
const TodoSchema = new Schema({
    titre: {
        type: String,
        required: [true, 'Il faut définir le titre de la tâche'],
    },
    description: {
        type: String,
        required: [true, 'Il faut définir la description de la tàche'],
    },
});





const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;
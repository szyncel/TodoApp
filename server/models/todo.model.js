var mongoose=require('mongoose');

var ToDoSchema = mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    status: String
})

var Todo = mongoose.model('Todo', ToDoSchema);

module.exports={Todo}
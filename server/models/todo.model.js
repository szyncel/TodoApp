var mongoose = require('mongoose');

var ToDoSchema = mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  status: String,
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

var Todo = mongoose.model('Todo', ToDoSchema);

module.exports = {
  Todo
}

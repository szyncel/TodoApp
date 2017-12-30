var mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI, {
//     useMongoClient: true
// });
// mongoose.Promise = global.Promise;
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));
module.exports = {
  mongoose
};



//mongodb://localhost/TodoApp
//'mongodb://szyncel:szynka123@ds257245.mlab.com:57245/szyncel-todo-test'

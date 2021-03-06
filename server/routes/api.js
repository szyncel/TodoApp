
const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var _ = require('lodash');

//mongodb://szyncel:szynka123@ds235877.mlab.com:35877/angular-todo

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://szyncel:szynka123@ds235877.mlab.com:35877/angular-todo', {
//     useMongoClient: true
//   })
//   .then(() => console.log('connection successful'))
//   .catch((err) => console.error(err));
var {
  mongoose
} = require('../db/db');

const {
  ObjectID
} = require('mongodb');
var _ = require('lodash');
var Todo = require('../models/todo.model').Todo;
var {
  User
} = require('../models/user.model');
var {
  authenticate
} = require('../middleware/authenticate');





/* ADD TODO */
router.post('/', authenticate, (req, res) => {
  var todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    date: new Date(),
    status: req.body.status,
    _creator: req.body._creator
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });

});

/* GET ALL TODOS */
router.get('/', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({
      todos
    });
  }, (e) => {
    res.status(400).send(e);
  })
});

/* GET SINGLE TODO */
router.get('/:id', (req, res) => {
  var id = req.params.id;

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send({});
    }
    res.status(200).send({
      todo
    });
  }).catch((e) => {
    res.status(400).send({});
  });
});

/* UPDATE TODO */
router.put('/:id', (req, res) => {
  var id = req.params.id;
  Todo.findByIdAndUpdate(id, {
    $set: req.body
  }, {
    new: true
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((e) => {
    res.status(400).send({});
  });
});


/* DELETE TODO */
router.delete('/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({
      info: "invalidId"
    });
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((e) => {
    res.status(400).send({});
  })
});

/* .............USERS............. */

router.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User({
    email: body.email,
    password: body.password,
    role: 'user'
  });

  user.save().then(() => {
    //return user.generateAuthToken();
    res.status(200).json({
      message: 'User created',
      user
    });
  }).catch((e) => {
    res.status(400).json({
      title: 'Error fucking',
      error: e
    });
  })
})

router.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findbyCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send({
        message: 'Successfully logged in',
        token: token,
        userId: user._id
      });
    })
  }).catch((e) => {
    res.status(400).send(e);
  });

})

router.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});



module.exports = router;

const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var _ = require('lodash');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/angular-todo', {
    useMongoClient: true
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

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
router.post('/', (req, res) => {
  var todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    date: new Date(),
    status: req.body.status
  });
  // console.log(todo);
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });

});

/* GET ALL TODOS */
router.get('/', (req, res) => {
  Todo.find({}).then((todos) => {
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
    // console.log({todo});
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
    email:body.email,
    password:body.password,
    role:'user'
  });

  user.save().then(() => {
    //return user.generateAuthToken();
    res.status(200).send(user);
  }).catch((e) => {
    res.status(400).send(e);
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

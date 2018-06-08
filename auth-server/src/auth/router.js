'use strict';

import express from 'express';
const authRouter = express.Router();

import User from './model.js';
import auth from './middleware.js';

authRouter.post('/api/v1/signup', (req, res, next) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.sendStatus(400);
  }

  let user = new User(req.body);
  user.save()
  .then(user => res.send(user.generateToken()))
  .catch(next);
});

authRouter.get('/api/v1/signin', auth, (req, res, next) => {
  console.log(`\nToken: ${req.token}`);
  res.cookie('Token', req.token);
  res.send(req.token);
});

authRouter.get('/api/v1/users', (req, res, next) => {
  User.find({})
  .then(data => { sendJSON(res,  data)})
  .catch(next);
});

authRouter.get('/api/v1/users/:id', (req, res, next) => {
  User.findOne({_id: req.params.id})
  .then(data => { sendJSON(res,  data)})
  .catch(next);
});


// authRouter.delete('/api/v1/:id', (req,res, next) => {
//   console.log(req.user._id);
//   // console.log(req.user);
//   req.user.findOneAndDelete(req.user._id);
//   res.send('deleted user');
// });

let sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.send();
};

export default authRouter;

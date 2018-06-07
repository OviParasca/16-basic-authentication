'use strict';

import express from 'express';
const authRouter = express.Router();

import User from './model.js';
import auth from './middleware.js';
authRouter.param('user', User);


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
  res.send(req.user.generateToken());
});

authRouter.get('/api/v1/show', auth, (req, res, next) => {
  console.log(req.user)
  res.send(req.user);
});

authRouter.delete('/api/v1/remove', auth, (req, res, next) => {
  req.user.findOneAndDelete(req.user);
  res.send(req.user);
});

authRouter.delete('/api/v1/delete/:id', auth, (req,res, next) => {
  res.send('deleted user');
});



export default authRouter;
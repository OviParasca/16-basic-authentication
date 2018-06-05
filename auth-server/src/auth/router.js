'use strict';

import express from 'express';
const authRouter = express.Router();

import User from './model.js';
import auth from './middleware.js';


authRouter.post('/api/v1/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then(user => res.send(user.generateToken()))
    .catch(next);
});

authRouter.get('/api/v1/signin', auth, (req, res, next) => {
  res.send(req.user.generateToken());
});

export default authRouter;
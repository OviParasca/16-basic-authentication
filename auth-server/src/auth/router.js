'use strict';

import express from 'express';
const authRouter = express.Router();

import User from './model.js';
import auth from '../auth/middleware.js';



authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then(user => res.send(user.generateToken()))
    .catch(next);
});

authRouter.get('/signin', auth, (req, res, next) => {
  res.send(req.user.generateToken());
});

export default authRouter;
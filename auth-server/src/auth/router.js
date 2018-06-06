'use strict';

import express from 'express';
const authRouter = express.Router();

import User from './model.js';
import auth from './middleware.js';
// import { userInfo } from 'os';


authRouter.post('/api/v1/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then(user => res.send(user.generateToken()))
    .catch(next);
});

authRouter.get('/api/v1/signin', auth, (req, res, next) => {
  res.cookie('Token', req.token);
  res.send(req.token);
  next();
});

authRouter.get('/api/v1/userprofile', auth, (req, res, next) => {
  res.send('user access');
  next();
});

authRouter.post('/api/v1/user', auth, (req, res, next) => {
  res.send(res.user).then().catch(next);
});

// authRouter.get('/api/v1/user/:Id', auth (req, res, next) => {
//   console.log(`user Id: ${user}`);
// });

// authRouter.put('/api/v1/user/:Id', auth (req, res, next) => {
//   console.log(`user Id: ${user}`);
// });

// authRouter.delete('/api/v1/user/:Id', auth (req, res, next) => {
//   console.log(`user Id: ${user}`);
// });

export default authRouter;
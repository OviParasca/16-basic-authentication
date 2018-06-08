'use strict';

import express from 'express';
const authRouter = express.Router();

import User from './model.js';
import auth from './middleware.js';
<<<<<<< HEAD
// import { userInfo } from 'os';
=======
// authRouter.param('user', User);
>>>>>>> b2047eff4e6be98af37c016ea965d394777a7492


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
<<<<<<< HEAD
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
=======
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

// authRouter.post('/api/v1/show', auth, (req, res, next) => {
  // let user = new User(req.body);
  // res.send(user);
// });

// authRouter.post('/api/v1/getme', auth, (req, res, next) => {
//   let user = new User(req.body);
//   req.user.findOne();
//   res.send(user);
// });


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
>>>>>>> b2047eff4e6be98af37c016ea965d394777a7492

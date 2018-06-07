'use strict';

import superagent from 'superagent';
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
  res.cookie('Token', req.token);
  res.send(req.token);
  next();

authRouter.get('/oauth', (req, res, next) => {
  let URL = process.env.CLIENT_URL;
  let code = req.query.code;

  
  superagent.post('https://api.twitter.com/oauth/request_token')
    .type('form')
    .send({
      code: code,
      client_id: process.env.AMAZON_CLIENT_KEY,
      client_secret: process.env.AMAZON_CLIENT_SECRET,
      grant_type: 'client_credentials',
      redirect_uri: `${process.env.API_URL}/oauth/amazon/code`,
    })
    .then( response => {
      let amazonToken = response.body.access_token;
      console.log('(2) amazon token', amazonToken);
      return amazonToken;
    })
 
     .then ( token => {
       return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
         .set('Authorization', `Bearer ${token}`)
        .then (response => {
           let user = response.body;
           console.log('(3) Amazon User', user);
           return user;
         });
   })
    .then(amazonUser => {
      return User.createFromOAuth(amazonUser);
    })
    .then ( user => {
      return user.generateToken();
    })
    .then ( token => {
      res.cookie('Token', token);
      res.redirect(URL);
    })
    .catch( error => {
      console.log('ERROR', error.message);
      next(error);
    });

});
authRouter.get('/showMeTheMoney', auth, (req, res, next) => {
  res.send('here is the ca$h');
});



//res.send('user access');
// next();
//});

//authRouter.post('/api/v1/user', auth, (req, res, next) => {
//  res.send(res.user).then().catch(next);
//});

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
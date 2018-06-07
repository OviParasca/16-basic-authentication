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
});

//TO DO: Change route for twitter 
authRouter.get('/oauth', (req, res, next) => {
  let URL = process.env.CLIENT_URL;
  let code = req.query.code;

  //TO DO: updat for TWITTER
  superagent.post('https://www.googleapis.com/oauth2/v4/token')
    .type('form')
    .send({
      code: code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.API_URL}/oauth/google/code`,
      grant_type: 'authorization_code',
    })
    .then( response => {
      let googleToken = response.body.access_token;
      console.log('(2) twitter token', twitterToken);
      return twitterToken;
    })
  //TO DO: Update for Twitter
    .then ( token => {
      return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
        .set('Authorization', `Bearer ${token}`)
        .then (response => {
          let user = response.body;
          console.log('(3) Twitter User', user);
          return user;
        });
    })
    .then(TwittereUser => {
      return User.createFromOAuth(twitterUser);
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
'use strict';

import User from './model.js';

export default (req, res, next) => {

<<<<<<< HEAD
  let authorize = (token) => {
    User.authorize(token)
=======

  let authorize = (token) => {
  
    User.authorization(token)
    .then(user => {
      if (!user) {
        getAuth();
      } else {
        req.user = user;
        next();
      }
    })
    .catch(next);
  };

  let authenticate = (auth) => {
    User.authenticate(auth)
>>>>>>> b2047eff4e6be98af37c016ea965d394777a7492
      .then(user => {
        if (!user) {
          getAuth();
        } else {
          next();
        }
<<<<<<< HEAD
      }).catch(next);
  };

  let getAuth = () => {
    next({
      status:401,
      statusMessage: 'Unauthorized',
      message: 'Invalid User Credentials',
    });
  };

  let authenticate = (auth) => {
    User.authenticate(auth).then(user => {
      if (!user) {
        getAuth();
      } else {
        req.token = user.generateToken();
        next();
      }
    }).catch(next);
=======
        req.token = user.generateToken();
        // req.user = user;
        next();
      });
  };

  let getAuth = () => {
    // res.set({
    //   'WWW-Authenticate': 'Basic realm="protected secret stuff"',
    // }).send(401);
>>>>>>> b2047eff4e6be98af37c016ea965d394777a7492
  };

  try {
    let auth = {};
    let authHeader = req.headers.authorization;

    if (!authHeader) {
      return getAuth();
    }

    if (authHeader.match(/basic/i)) {
      let base64Header = authHeader.replace(/Basic\s+/, '');
      let base64Buf = new Buffer(base64Header, 'base64');
      let [username, password] = base64Buf.toString().split(':');
      auth = {username, password};
<<<<<<< HEAD
      authenticate(auth);
    } 
    else if (authHeader.match(/bearer/i)) {
      let token = authHeader.replace(/Bearer\s+/, '');
      authorize(token);
=======
      authenticate(auth, next);
    } else if (authHeader.match(/bearer/i)) {
      let token = authHeader.replace(/Bearer\s+/i, '');
      authorize(token);
      // auth.token = authHeader.replace(/bearer\s+/, '');
      // authenticate(auth, next);
>>>>>>> b2047eff4e6be98af37c016ea965d394777a7492
    }
  } catch(err) {
    next(err);
  }

};
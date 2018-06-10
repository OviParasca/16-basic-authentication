'use strict';

import User from './model.js';

export default (req, res, next) => {


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
      .then(user => {
        if (!user) {
          getAuth();
        }
        req.token = user.generateToken();
        // req.user = user;
        next();
      });
  };

  let getAuth = () => {
    // res.set({
    //   'WWW-Authenticate': 'Basic realm="protected secret stuff"',
    // }).send(401);
  };

  try {
    let auth = {};
    let authHeader = req.headers.authorization;

    if (!authHeader) {
      getAuth();
    }

    if (authHeader.match(/basic/i)) {
      let base64Header = authHeader.replace(/Basic\s+/, '');
      let base64Buf = new Buffer(base64Header, 'base64');
      let [username, password] = base64Buf.toString().split(':');
      auth = {username, password};
      authenticate(auth, next);
    } else if (authHeader.match(/bearer/i)) {
      let token = authHeader.replace(/Bearer\s+/i, '');
      authorize(token);
      // auth.token = authHeader.replace(/bearer\s+/, '');
      // authenticate(auth, next);
    }
  } catch(err) {
    next(err);
  }

};
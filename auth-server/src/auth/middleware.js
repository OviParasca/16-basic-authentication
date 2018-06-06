'use strict';

import User from './model.js';

export default (req, res, next) => {

  let authorize = (token) => {
    User.authorize(token)
      .then(user => {
        if (!user) {
          getAuth();
        } else {
          next();
        }
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
      authenticate(auth);
    } 
    else if (authHeader.match(/bearer/i)) {
      let token = authHeader.replace(/Bearer\s+/, '');
      authorize(token);
    }
  } catch(err) {
    next(err);
  }

};
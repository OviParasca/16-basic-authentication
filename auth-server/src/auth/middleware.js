'use strict';

import User from './model.js';

export default (req, res, next) => {


  let authenticate = (auth) => {
    User.authenticate(auth)
      .then(user => {
        if (!user) {
          getAuth();
        }
        req.user = user;
        next();
      });
  };
'use strict';

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10).then(hashedPassword => {
<<<<<<< HEAD
    this.password = hashedPassword;
    next();
  }).catch(error => {throw error;});
=======
      this.password = hashedPassword;
      next();
    }).catch( error => {throw error;} );
>>>>>>> b2047eff4e6be98af37c016ea965d394777a7492
});


userSchema.statics.authenticate = function(auth) {
  let query = {username:auth.username};
<<<<<<< HEAD
  
  return this.findOne(query)
    .then(user => user.comparePassword(auth.password))
=======
  if ( auth.token ) {
    let token = jwt.verify(auth.token,process.env.SECRET || 'changethis');
    query = {_id:token.id};
  };
  return this.findOne(query)
    .then( user => user.comparePassword(auth.password) )
>>>>>>> b2047eff4e6be98af37c016ea965d394777a7492
    .catch(error => error);
};

userSchema.statics.authorize = function(token) {
<<<<<<< HEAD
  let parsedToken = jwt.verify(token, process.env.SECRET || 'ChangeYoToken');
  let query = {_id:parsedToken.id};

=======
  let parsedToken = jwt.verify(token, process.env.SECRET || 'changethis');
  let query = {_id:parsedToken.id};
  
>>>>>>> b2047eff4e6be98af37c016ea965d394777a7492
  return this.findOne(query).then(user => {
    return user;
  }).catch(error => error);
};

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password).then(valid => valid ? this : null);
<<<<<<< HEAD
=======
    // .then(response => {
    //   if (err) { throw err; }
    // }).send(401, 'Incorrect Username or Password');
>>>>>>> b2047eff4e6be98af37c016ea965d394777a7492
};

userSchema.methods.generateToken = function() {
  return jwt.sign({id:this._id}, process.env.SECRET || 'ChangeYoSecret');
};

export default mongoose.model('users', userSchema);

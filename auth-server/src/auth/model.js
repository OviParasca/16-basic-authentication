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
    this.password = hashedPassword;
    next();
  }).catch(error => {throw error;});
});

userSchema.statics.createFromOAuth = function(incoming) {

  if (!incoming || ! incoming.email) {
    return Promise.reject('Validation Error: missing username or password');
  }
  return this.findOne({email:incoming.email})
    .then(user => {
      if (!user) {throw new Error ('User not found');}
      console.log('Welcome back, user.username');
      return user;
    })
  //TO DO: Update deafult to be more secure
    .catch(error => {
      let username = incoming.email;
      let password = 'none';
      return this.create ({
        username: username,
        password: password,
        email: incoming.email,
      });
    });
};

userSchema.statics.authenticate = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)
    .then(user => user.comparePassword(auth.password))
    .catch(error => error);
};

userSchema.statics.authorize = function(token) {
  let parsedToken = jwt.verify(token, process.env.SECRET || 'ChangeYoToken');
  let query = {_id:parsedToken.id};
  return this.findOne(query).then(user => {
    return user;
  }).catch(error => error);
};

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password).then(valid => valid ? this : null);
};

userSchema.methods.generateToken = function() {
  return jwt.sign({id:this._id}, process.env.SECRET || 'ChangeYoSecret');
};

export default mongoose.model('users', userSchema);
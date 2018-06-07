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
  this.password = bcrypt.hashSync(this.password,10);
  next();
});


userSchema.statics.authenticate = function(auth) {
  let query = {username:auth.username} || {username:auth.email};
  if (auth.token) {
    let token = jwt.verify(auth.token,process.env.SECRET || 'changethis');
    query = {_id:token.id};
  }
  console.log(query);
  return this.findOne(query)
    .then(user => user.comparePassword(auth.password) )
    .catch(error => error);
};


userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null );
    // .then(response => {
    //   if (err) { throw err; }
    // }).send(401, 'Incorrect Username or Password');
};

userSchema.methods.generateToken = function() {
  return jwt.sign({id: this._id}, process.env.SECRET || 'changethis');
};

export default mongoose.model('users', userSchema);
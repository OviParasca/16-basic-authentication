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
    }).catch( error => {throw error;} );
});


userSchema.statics.authenticate = function({username, password, token}) {
  let query = {username};
  if ( token ) {
    let jwtRes = jwtRes.verify(jwtRes,process.env.SECRET || 'changethis');
    query = {_id:jwtRes.id};
  };
  console.log(`query to mongoDB: ${JSON.stringify(query)}`)
  return this.findOne(query)
    .then( user => {
      console.log(`Got a user: ${JSON.stringify(user)}`)
      return user.comparePassword(password) 
    })
    .catch(error => {
      console.log(error);
      return error
    });
};

userSchema.statics.authorize = function(token) {
  let parsedToken = jwt.verify(token, process.env.SECRET || 'changethis');
  let query = {_id:parsedToken.id};
  
  return this.findOne(query).then(user => {
    return user;
  }).catch(error => error);
};

userSchema.methods.comparePassword = function(password) {
  console.log(`Current password: ${password}, saved password: ${this.password}`);
  return bcrypt.compare(password, this.password).then(valid => valid ? this : null);
    // .then(response => {
    //   if (err) { throw err; }
    // }).send(401, 'Incorrect Username or Password');
};

userSchema.methods.generateToken = function() {
  return jwt.sign({id: this._id}, process.env.SECRET || 'changethis');
};

export default mongoose.model('users', userSchema);
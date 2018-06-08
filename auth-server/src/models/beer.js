'use strict';

const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  name: {type:String, required:true},
  type: {type:String},
  brewery: {type:String},
  user: [ {type:mongoose.Schema.Types.ObjectId, ref:'users'}],
});

teamSchema.pre('findOne', function(next) {
  this.populate('user');
  next();
});

export default mongoose.model('beers', teamSchema);
'use strict';

const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  name: {type:String, require:true},
  type: {type:String, require:false},
  breweryName: {type:String, require:false},
  user: [ {type:mongoose.Schema.Types.ObjectId, ref:'users'}],
});

teamSchema.pre('findOne', function(next) {
  this.populate('users');
  next();
});

export default mongoose.model('beers', teamSchema);
'use strict';

var _ = require('lodash');
var Mongo = require('mongodb');

function Priority(obj){
  this.name   = obj.name;
  this.color  = obj.color;
  this.value  = parseInt(obj.value);
}

Object.defineProperty(Priority, 'collection', {
  get:function(){
    return global.mongodb.collection('prioities');
  }
});

Priority.prototype.save = function(cb){
  Priority.collection.save(this, cb);
};

Priority.findAll = function(cb){
  Priority.collection.find().toArray(function(err, objects){
    var priorities = objects.map(function(obj){
      return changePrototype(obj);
    });
    cb(priorities);
  });
};

Priority.findById = function(id, cb){
  var priority = Priority.collection.find({_id: Mongo.ObjectID(id)}).toArray(function(err, objects){
    priority = changePrototype(objects[0]);
    cb(priority);
  });
};


// Private function
function changePrototype(obj){
  var priority = _.create(Priority.prototype, obj);
  return priority;
}

module.exports = Priority;

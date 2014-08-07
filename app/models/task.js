'use strict';

var _ = require('lodash');
var async = require('async');
var Priority = require('./priority');

var Task = function(obj) {
  this.name = obj.name;
  this.due = new Date(obj.due);
  this.photo = obj.photo;
  this.tags = obj.tags.split(',').map(function(t) {
    return t.trim();
  });
  this.priorityId = obj.priorityId;
  this.isComplete = false;
};

Object.defineProperty(Task, 'collection', {
  get: function() {
    return global.mongodb.collection('tasks');
  }
});

Task.prototype.toggleComplete = function() {
  this.isComplete = !this.isComplete;
};

Task.prototype.save = function(cb) {
  Task.collection.save(this, cb);
};

Task.findAll = function(cb) {
  //first, get all tasks
  Task.collection.find().toArray(function(err, tasks) {
    //iterate over each task
    async.map(tasks,function(task,callback){
      //fix prototype chain
      task = changePrototype(task);
      //lookup task's priority by priorityId
      getPriority(task, function(data) {
        //add priority object to task
        task.priority = data;

        callback(null,task);
      });
    },function(error,results){
        //our tasks are fixed up, pass them to the cb
        cb(results);
    });
  });
};

function getPriority(task, cb) {
  Priority.findById(task.priorityId, cb);
}

function changePrototype(obj) {
  var tasks = _.create(Task.prototype, obj);
  return tasks;
}

module.exports = Task;

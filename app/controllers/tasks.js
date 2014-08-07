'use strict';

var Task = require('../models/task');
var Priority = require('../models/priority');

exports.init = function(req, res){
  Priority.findAll(function(priorities){
    res.render('tasks/init', {priorities: priorities});
  });
};

exports.create = function(req, res){
  var task = new Task(req.body);
  task.save(function(){
    res.redirect('/tasks');
  });
};

exports.index = function(req, res){
  Task.findAll(function(tasks){
    res.render('tasks/index', {tasks:tasks});
  });
};

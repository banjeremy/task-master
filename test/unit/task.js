/* jshint  expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
//var assert = require('chai').assert;
var Task = require('../../app/models/task');
var dbConnect = require('../../app/lib/mongodb');
//var Mongo = require('mongodb');

var t1;

describe('Task', function(){
  before(function(done){
    dbConnect('tasks-test', function(){
      done();
    });
  });

  beforeEach(function(done){
    Task.collection.remove(function(){
      t1 = new Task({
        name: 'Groceries',
        due: '2014-8-6',
        photo: 'images/test.png',
        tags: 'food, store, chore, weekly',
        priorityId: ''
      });

      t1.save(function(){
        done();
      });
    });
  });

 describe('constructor', function(){
    it('should create a task', function(){
      expect(t1).to.be.instanceof(Task);
      expect(t1.name).to.equal('Groceries');
      expect(t1.due).to.be.instanceof(Date);
      expect(t1.due.toString().to.be.equal(new Date('2014-8-6').toString()));
    });
  });
});

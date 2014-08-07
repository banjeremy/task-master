'use strict';

var morgan = require('morgan');
var bodyParser = require('body-parser');
//var methodOverride = require('express-method-override');
var priorities = require('../controllers/priorities');
var tasks = require('../controllers/tasks');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
 // app.use(methodOverride());

  app.get('/', tasks.index);

  app.get('/priorities/new', priorities.init);
  app.post('/priorities', priorities.create);
  app.get('/priorities', priorities.index);

  app.get('/tasks/new', tasks.init);
  app.post('/tasks', tasks.create);
  app.get('/tasks', tasks.index);

  console.log('Pipeline Configured');
};

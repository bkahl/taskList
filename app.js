/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// app.get('/', routes.index);
// app.get('/users', user.list);

var TaskList = require('./routes/tasklist');
//var taskList = new TaskList('mongodb://admin:password@ds045137.mongolab.com:45137/tasklist');
var taskList = new TaskList('mongodb://admin:password@ds043987.mongolab.com:43987/af_node-tasklist-bkahl1984');

app.get('/', taskList.showTasks.bind(taskList));
app.post('/addtask', taskList.addTask.bind(taskList));
app.post('/completetask', taskList.completeTask.bind(taskList));

http.createServer(app).listen(app.get(process.env.VMC_APP_PORT || 1337, null), function(){
  console.log("Express server listening on port " + app.get(process.env.VMC_APP_PORT || 1337, null));
});
var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var io = require('socket.io').listen(app.listen(3001));

mongoose.connect('mongodb://localhost/tasks');

var TasksSchema = new mongoose.Schema({
  name: String,
  active: Boolean,
  status: String,
  updated_at: { type: Date, default: Date.now },
  order: Number,
});

var Tasks = mongoose.model('Tasks', TasksSchema);

app.use(express.static('../build'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.send(fs.readFileSync('../build/index.html'));
});

app.route('/api/tasks')
  .get(function(req, res) {
    Tasks.find().sort({'order' : 1, 'updated_at' : -1}).exec(function (err, tasks) {
      if (err) return console.error(err);
      res.json(tasks)
    });
  })
  .post(function(req, res) {
    var Task = new Tasks({
      name: req.body.name,
      active: 0,
      status: req.body.status,
      order: 0,
    });

    Task.save(function(err){
      if(!err){
        io.sockets.emit('taskChange')

        res.json({status:'success'});
      }

    });
  })
  .put(function(req, res) {
    res.send('Update the tasks');
  })
  .delete(function(req, res) {
    res.send('Delete the tasks');
  });

io.sockets.on('connection', function (socket) {
  console.log('socket')
});

console.log('Server start');

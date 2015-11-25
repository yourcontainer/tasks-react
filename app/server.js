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
    Tasks.update({_id: req.body._id}, {active:req.body.active}, function(err){
      if (err) return console.error(err);

      io.sockets.emit('taskChange')

      res.json({status:'success'});
    })
  })
  .delete(function(req, res) {
    Tasks.remove({_id: req.body._id}, function(err){
      if (err) return console.error(err);

      io.sockets.emit('taskChange')

      res.json({status:'success'});
    })
  });

console.log('Server start');

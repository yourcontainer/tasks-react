var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');

var app = express();

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

app.get('/', function (req, res) {
  res.send(fs.readFileSync('../build/index.html'));
});

app.route('/api/tasks')
  .get(function(req, res) {
    Tasks.find(function (err, tasks) {
      if (err) return console.error(err);
      res.json(tasks)
    });
  })
  .post(function(req, res) {
    var Task = new Tasks({
      name: 'test',
      active: 1,
      status: 'tag 1',
      order: 1,
    })
    console.log(req)
    Task.save(function(err){
      if(!err)
        res.json({status:'success'});
    })
  })
  .put(function(req, res) {
    res.send('Update the book');
  })
  .delete(function(req, res) {
    res.send('Delete the book');
  });

var server = app.listen(3001, function () {
  var host = server.address().address || 'localhost';
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});

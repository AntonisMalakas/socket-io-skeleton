var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// app.get('/', (req, res) => {
//   res.render('index',
//     { title: '2', message: 'Welcome' })

// });

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
io.set("origins", "*:*");
server.listen(8000);

var sockets = [];
var socketsAndNames = [];
global.usersNames = {};

io.on('connection', (socket) => {
  sockets.push(socket);
  global.usersNames.lastConnected = socket.id;

  console.log('User Connected: ' + socket.id)


  socket.on('userSocket', (userId) => {
    console.log('userSocket Data: ', userId)
    let obj = new Object({
      socketId: socket.id,
      userId: userId
    });
    socketsAndNames.push(obj)
    // console.log('obj ', obj)
    console.log('socketsAndNames ', socketsAndNames)

  });

  socket.on('adminSocket', (userId) => {
    console.log('adminSocket Data: ', userId)
    let obj = new Object({
      socketId: socket.id,
      userId: userId
    });
    socketsAndNames.push(obj)
    // console.log('obj ', obj)
    console.log('socketsAndNames ', socketsAndNames)

  });

  socket.on('create notification', (data) => {
    // console.log('create Notification with socket id: '+ socket.id)
    let userId = data.userId;
    let message = data.message;
    let targetUser = socketsAndNames.find(x => x.userId == userId)
    // console.log('x: ' + targetUser.socketId + " " + targetUser.userId)
    // socket.broadcast.emit('new notification', data);
    // socket.to(targetUser.socketId);
    socket.broadcast.to(targetUser.socketId).emit('new notification', data.message);

  });

  socket.on('requestConfirmation', (data) => {
    // console.log('create Notification with socket id: '+ socket.id)
    let userId = data.userId;
    let message = data.message;
    let targetUser = socketsAndNames.find(x => x.userId == userId)
    // console.log('y: ' + targetUser.socketId + " " + targetUser.userId)
    // socket.broadcast.emit('new notification', data);
    // socket.to(targetUser.socketId);
    socket.broadcast.to(targetUser.socketId).emit('new notification', data.message);

  });


  socket.on('disconnect', () => {
    // console.log('Got disconnect!');
    socket.disconnect(true);
    // console.info('disconnected user (id=' + socket.id + ').');
    var pos = socketsAndNames.findIndex(x => x.socketId === socket.id)
    socketsAndNames.splice(pos, 1);
    console.log('remaining socketsAndNames ', socketsAndNames)

  });


});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

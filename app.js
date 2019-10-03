var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var busboy = require('then-busboy');
var fileUpload = require('express-fileupload');
var indexRouter = require('./routes/index');
const db = require('./db');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8600;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'kuuhaku',
  resave: true,
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(fileUpload());

app.use('/', indexRouter);

//broadcast video
io.on('connection',function(socket) {
  socket.on('stream',function(image) {
    socket.broadcast.emit('stream',image);
  });
  //trying send message from socket
  socket.on('message',function(data){
    socket.broadcast.emit('message',data);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.listen(port, function(){
  logger("Server is running at port " +port);
});
module.exports = app;

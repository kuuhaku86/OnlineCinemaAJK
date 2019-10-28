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
var Room = require('./room');

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

var people = {};
var rooms = {};
var clients = [];
var allRooms = [];

//broadcast video
io.on('connection',function(socket) {
  socket.on('stream',function(image) {
    socket.broadcast.to(people[socket.id].roomID).emit('stream',image);
  });

  //for sending message
  socket.on('message',function(data){
    io.in(people[socket.id].roomID).emit('message',data);
  });

  //When user want to make a room
  socket.on('makeRoom',function() {
    console.log("Server " + socket.id + " join the server");
    let exists = true;
    while(exists){
      let add = true;
      var id = Math.floor(Math.random() * 900) + 100;
      for (let index = 0; index < allRooms.length; index++) {
        if(allRooms[index] == id){
          add = false;
          console.log("Mengacak kembali");
        }
      }
      if(add){
        allRooms.push(id);
        exists = false;
      }
    }
    var room = new Room(id,socket.id);
    rooms[id] = room;

    people[socket.id] = {"roomID" : id, "role" : "master"};

    people[socket.id].roomID = id;
    room.addPerson(socket.id);
    socket.join(people[socket.id].roomID);
    console.log("Server "+socket.id+" join the room "+people[socket.id].roomID);
    clients.push(socket);
    socket.emit("roomNumber", id);
  });

  socket.on("joinRoom",function(id) {
    let exists = false;
    for (let index = 0; index < allRooms.length; index++) {
      if(allRooms[index] == id){
        exists = true;
        break;
      }
    }

    if(exists){
      var room = rooms[id];
      room.addPerson(socket.id);
      people[socket.id] = {"roomID" : id, "role" : "user"};
      socket.join(people[socket.id].roomID);
      console.log("Client "+socket.id+" Username:"+people[socket.id].name+" join room "+people[socket.id].roomID);
      socket.emit('showReady',id);
    }else{
      socket.emit("errorMsgRoom", {msg: "The room does not exists, please check your input."});
    }
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

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
var allRooms = [];
//io.to(socketid).emit('message', 'for your eyes only');

function purge(s) {
  if (people[s.id].roomID) { //user is in a room
    var room = rooms[people[s.id].roomID]; //check which room user is in.
    room.removePerson(s); //remove people from the room:people{}collection
    if (s.id === room.owner) { //user in room and owns room
      if(room.people.length >= 1){
        var newMaster = room.people[0].id;
        rooms[people[s.id].roomID].owner = newMaster;
        console.log(newMaster);
        io.sockets.to(newMaster).emit("changeRoomMaster");
      }else{
        delete rooms[room.id];
        for (let i = 0; i < allRooms.length; i++) {
          if(allRooms[i] == room.id){
            allRooms.splice(i,1);
            break;
          }
        }
      }
    }
  }
  //delete user from people collection
  if(room.people.length >= 1) io.sockets.to(room.owner).emit("onlineUser",room.people);
  delete people[s.id];
  console.log(room.people);
}

//broadcast video
io.on('connection',function(socket) {
  socket.on('stream',function(image,roomID) {
    socket.broadcast.to(roomID).emit('stream',image);
  });

  //for sending message
  socket.on('message',function(data,roomID){
    io.in(roomID).emit('message',data);
  });

  //When user want to make a room
  socket.on('makeRoom',function(username) {
    console.log("Server " + socket.id + " join the server");
    let exists = true;
    while(exists){
      let add = true;
      var id = Math.floor(Math.random() * 900) + 100;
      for (let i = 0; i < allRooms.length; i++) {
        if(allRooms[i] == id){
          add = false;
          id = Math.floor(Math.random() * 900) + 100;
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

    people[socket.id] = {"roomID" : id, "role" : "master", "name" : username};

    people[socket.id].roomID = id;
    room.addPerson(socket,username);
    socket.join(people[socket.id].roomID);
    console.log("Server "+socket.id+" join the room "+people[socket.id].roomID);
    io.sockets.to(socket.id).emit("roomNumber", id,socket.id);
  });

  socket.on("joinRoom",function(data) {
    let exists = false;
    for (let i = 0; i < allRooms.length; i++) {
      if(allRooms[i] == data.id){
        exists = true;
        break;
      }
    }

    if(exists){
      var room = rooms[data.id];
      room.addPerson(socket,data.username);
      people[socket.id] = {"roomID" : data.id, "role" : "user", "name" : data.username};
      socket.join(people[socket.id].roomID);
      console.log("Client "+socket.id+" Username:"+people[socket.id].name+" join room "+people[socket.id].roomID);
      io.sockets.to(socket.id).emit('showReady',data.id,socket.id);
      io.sockets.to(rooms[people[socket.id].roomID].owner).emit("onlineUser",rooms[people[socket.id].roomID].people);
    }else{
      socket.emit("errorMsgRoom", "The room does not exists, please check your input.");
    }
  });

  socket.on("disconnect", function() {
    if (typeof people[socket.id] !== "undefined") { //this handles the refresh of the name screen
      purge(socket);
    }
  });

  //Change room master from click
  socket.on("chooseRoomMaster",function(newMaster) {
    let room = rooms[people[socket.id].roomID];
    rooms[room.id].owner = newMaster;
    io.sockets.to(rooms[room.id].owner).emit("changeRoomMaster");
    io.sockets.to(rooms[room.id].owner).emit("onlineUser",room.people);
    io.sockets.to(socket.id).emit("showReady",room.id,socket.id);
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

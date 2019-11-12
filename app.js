var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
var indexRouter = require('./routes/index');
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
var timeRoom = new Object;
var filmRoom = new Object;
//io.to(socketid).emit('message', 'for your eyes only');

function purge(s,roomID) {
  if (people[s.id] && people[s.id].roomID) { //user is in a room
    rooms[people[s.id].roomID].removePerson(s); //remove people from the room:people{}collection
    if (s.id ===  rooms[people[s.id].roomID].owner) { //user in room and owns room
      if(rooms[people[s.id].roomID].people.length >= 1){
        var newMaster = rooms[people[s.id].roomID].people[0].id;
        rooms[people[s.id].roomID].owner = newMaster;
        console.log(newMaster);
        io.sockets.to(newMaster).emit("changeRoomMaster");
      }else{
        delete rooms[people[s.id].roomID];
        for (let i = 0; i < allRooms.length; i++) {
          if(allRooms[i] == people[s.id].roomID){
            allRooms.splice(i,1);
            break;
          }
        }
      }
    }
    if(roomID >= 0 && rooms[people[s.id].roomID] && rooms[people[s.id].roomID].people.length >= 1) io.sockets.to(rooms[people[s.id].roomID].owner).emit("onlineUser",rooms[people[s.id].roomID].people);
    if(rooms[people[s.id].roomID]) console.log(rooms[people[s.id].roomID].people);
  }
  //delete user from people collection
  if(people[s.id]) delete people[s.id];
}

//broadcast video
io.on('connection',function(socket) {
  socket.on('stream',function(image,roomID,time,filmName) {
    timeRoom[roomID] = time;
    filmRoom[roomID] = filmName;
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
    rooms[id].addPerson(socket,username);
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
      rooms[data.id].addPerson(socket,data.username);
      people[socket.id] = {"roomID" : data.id, "role" : "user", "name" : data.username};
      socket.join(people[socket.id].roomID);
      console.log("Client "+socket.id+" Username:"+people[socket.id].name+" join room "+people[socket.id].roomID);
      io.sockets.to(socket.id).emit('showReady',data.id,socket.id,timeRoom[people[socket.id].roomID],filmRoom[people[socket.id].roomID]);
      io.sockets.to(rooms[people[socket.id].roomID].owner).emit("onlineUser",rooms[people[socket.id].roomID].people);
    }else{
      socket.emit("errorMsgRoom", "The room does not exists, please check your input.");
    }
  });

  socket.on("disconnect", function(roomID) {
    if (typeof people[socket.id] !== "undefined") { //this handles the refresh of the name screen
      purge(socket,roomID);
    }
  });

  //Change room master from click
  socket.on("chooseRoomMaster",function(newMaster,roomID) {
    let room = rooms[roomID];
    rooms[room.id].owner = newMaster;
    io.sockets.to(rooms[room.id].owner).emit("changeRoomMaster");
    io.sockets.to(rooms[room.id].owner).emit("onlineUser",room.people);
    io.sockets.to(socket.id).emit("showReady",room.id,socket.id);
    io.in(roomID).emit('changeFilm',"joker");
  });

  //Sound handler

  socket.on("videoOnPlay",function(time,roomID) {
    io.in(roomID).emit('videoPlay',time);
  });

  socket.on("videoOnPause",function(time,roomID) {
    io.in(roomID).emit('videoPause',time);
  });

  socket.on("videoOnPlaying",function(time,roomID) {
    io.in(roomID).emit('videoPlay',time);
  });

  socket.on("videoOnSeeked",function(time,roomID) {
    io.in(roomID).emit('videoPlay',time);
  });

  socket.on("videoOnVolumeChange",function(volume,roomID) {
    io.in(roomID).emit('videoVolumeChange',volume);
  });

  socket.on("changeAudio",function(roomID,filmName) {
    filmRoom[roomID] = filmName;
    socket.broadcast.to(roomID).emit('changeFilm',filmName);
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

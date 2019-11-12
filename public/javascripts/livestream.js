var socket = io('');
var username = $('#navbarDropdown').html();
var video = document.getElementById("video");
var audio = document.getElementById("audio");
var filmNamee = $(".filmm").html();
var videoPlay;
var idUser;
var roomID;

$(function() {
    $("#modal-default").show();
    $("#chat-modal").hide();
    $(".chatbox").hide();
    //master
    $("#video").hide();
    $("#change-film-modal").hide();
    $("#change-room-master").hide();

    //user
    $("#video-stream").hide();
});

var canvas = document.getElementById("preview");
var context = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 700;

context.width = canvas.width;
context.height = canvas.height;


function viewVideo(){
    context.drawImage(video, 0, 0, context.width, context.height);
    socket.emit('stream',canvas.toDataURL('image/webp'),roomID,video.currentTime,filmNamee);
}

var modal = document.getElementById('simpleModal');

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

$(".make-a-room").click(function(e) {
    e.preventDefault();
    socket.emit('makeRoom',username);
});

socket.on('stream', function(image){
    var img = document.getElementById("video-stream");
    img.src = image;
});

socket.on('roomNumber',function(id,userID) {
    if(!roomID){
        $('.navbar-brand').html($('.navbar-brand').html() + " Room : " + id);
        roomID = id;
    }
    $("#modal-default").hide();
    $("#video").show();
    $("#chat-modal").show();
    $("#change-film-modal").show();
    $(".chatbox").show();
    $("#change-room-master").show();
    idUser = userID;
    video.play();
    videoPlay = setInterval(function(){
        viewVideo(video,context);
    },0);
});

$(".join-room").click(function(e){
    e.preventDefault();
    var id = $("#room-input").val();
    socket.emit('joinRoom',{id, username});
});

socket.on('showReady',function(id,userID,time,filmName) {
    if(!roomID){
        $('.navbar-brand').html($('.navbar-brand').html() + " Room : " + id);
        roomID = id;
    }
    $("#modal-default").hide();
    $("#video-stream").show();
    $("#chat-modal").show();
    $(".chatbox").show();

    //Hide and stop room master component
    $("#change-room-master").hide();
    $("#video").hide();
    $("#change-film-modal").hide();
    idUser = userID;
    video.pause();
    if(videoPlay)clearInterval(videoPlay);
    changeAudio(filmNamee,time);
});

socket.on("errorMsgRoom", function(msg) {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = msg;
});

socket.on('message', function (data) {
    $('.chatlogs').append('<div class="chat"><p class="chat-message"><strong>' + data.user + '</strong>: ' + data.message + '</p></div>');

    function scrollToBottom() {
        messages.scrollTop = messages.scrollHeight;
    }

    scrollToBottom();
});

    // When the form is submitted

    // Get the input field
var input = document.getElementById('chat-input');

    // Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById('button').click();
    }
    
});

$('#button').click(function (e) {
    // Avoid submitting it through HTTP
    e.preventDefault();
    // Retrieve the message from the user
    var message = filterXSS($('#chat-input').val());
    if(message == "")return;
    // Send the message to the server
    socket.emit('message', {
        user: username,
        message: message
    },roomID);
    // Clear the input and focus it for a new message
    $('#chat-input').val('');
});


//Dunno how to modularity this, but I think it's okay
function changeFilm(filmName) {
    filmName = filmName.toLowerCase();
    filmName = filmName.replace(" ","-");
    filmNamee = filmName;
    audio.pause();
    socket.emit("changeAudio",roomID,filmNamee);
    video.src = "/movie/" + filmName + ".mp4";
    video.play();
}

function changeAudio(filmName,time) {
    filmName = filmName.toLowerCase();
    filmName = filmName.replace(" ","-");
    filmNamee = filmName;
    audio.pause();
    audio.src = "/audio/" + filmName + ".ogg";
    audio.currentTime = time;
    audio.play();
}

$("#joker").click(function(e) {
        e.preventDefault();
        changeFilm($("#joker").html());
});

$("#schematics").click(function(e) {
    e.preventDefault();
    changeFilm($("#schematics").html());
});

$("#avenger-endgame").click(function(e) {
    e.preventDefault();
    changeFilm($("#avenger-endgame").html());
});


//Disconnect event
window.onbeforeunload = function(e) { 
    e.preventDefault();
};

window.onunload = function(e) {
    (roomID)?socket.emit("disconnect",roomID):socket.emit("disconnect",0);
};

$("#logout").click(function(e) {
    (roomID)?socket.emit("disconnect",roomID):socket.emit("disconnect",0);
});

//When change room master from disconnect
socket.on("changeRoomMaster",function() {
    $("#video-stream").hide();
    $("#video").show();
    $("#change-film-modal").show();
    $("#change-room-master").show();
    audio.pause();
    audio.src = "/audio/" + filmName + ".ogg";
    audio.play();
    video.play();
    setInterval(function(){
        viewVideo(video,context);
    },0);
});

//Knowing who is online
socket.on("onlineUser",function(data) {
    $("#dropdownChangeRoomMaster").html("");
    for (let i = 0; i < data.length; i++) {
        if(data[i].id != idUser){
            $("#dropdownChangeRoomMaster").append("<li class='dropdown-item' data-id=" + data[i].id + ">" + data[i].name + "</li>");
        }
    }
});

//When change room master from click
$("body").on('click', '#dropdownChangeRoomMaster li', function () {
    let newMaster = $(this).data('id');
    audio.pause();
    socket.emit("chooseRoomMaster",newMaster,roomID);
});


//Sound
video.onplay = function(){
    socket.emit("videoOnPlay",video.currentTime,roomID);
};

video.onpause = function() {
    socket.emit("videoOnPause",video.currentTime,roomID);
}

video.onplaying = function() {
    socket.emit("videoOnPlaying",video.currentTime,roomID);
}

video.onseeked = function() {
    socket.emit("videoOnSeeked",video.currentTime,roomID);
}

video.onvolumechange = function() {
    socket.emit("videoOnVolumeChange",video.volume,roomID);
}

socket.on("videoPlay",function(time) {
    audio.currentTime = time;
    audio.play();
});

socket.on("videoPause",function(time) {
    audio.currentTime = time;
    audio.pause()
});

socket.on("videoVolumeChange",function(volume) {
    audio.volume = volume;
    audio.play();
});

socket.on("changeFilm",function(filmName) {
    changeAudio(filmName,0);
});
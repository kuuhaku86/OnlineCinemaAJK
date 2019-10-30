var socket = io('');
var username = $('#navbarDropdown').html();

$(function() {
    $("#modal-default").show();
    $("#chat-modal").hide();
    $(".chatbox").hide();
    //master
    $("#video").hide();
    $("#change-film-modal").hide();

    //user
    $("#video-stream").hide();
});

var canvas = document.getElementById("preview");
var context = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 700;

context.width = canvas.width;
context.height = canvas.height;

var video = document.getElementById("video");

function viewVideo(){
    context.drawImage(video, 0, 0, context.width, context.height);
    socket.emit('stream',canvas.toDataURL('image/webp'));
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

socket.on('roomNumber',function(id) {
    $('.navbar-brand').html($('.navbar-brand').html() + " Room : " + id);
    $("#modal-default").hide();
    $("#video").show();
    $("#chat-modal").show();
    $("#change-film-modal").show();
    $(".chatbox").show();
    video.play();
    setInterval(function(){
        viewVideo(video,context);
    },0);
});

$(".join-room").click(function(e){
    e.preventDefault();
    var id = $("#room-input").val();
    socket.emit('joinRoom',{id, username});
});

socket.on('showReady',function(id) {
    $('.navbar-brand').html($('.navbar-brand').html() + " Room : " + id);
    $("#modal-default").hide();
    $("#video-stream").show();
    $("#chat-modal").show();
    $(".chatbox").show();
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
    });
    $('#chat-input').val('');
    // Clear the input and focus it for a new message
});


//Dunno how to modularity this, but I think it's okay
function changeFilm(filmName) {
    filmName = filmName.toLowerCase();
    filmName = filmName.replace(" ","-");
    video.src = "/movie/" + filmName + ".mp4";
    video.play();
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
    socket.emit("disconnect");
};

$("#logout").click(function(e) {
    socket.emit("disconnect");
});

//When change room master
socket.on("changeRoomMaster",function(id) {
    $("#video-stream").hide();
    $("#video").show();
    video.play();
    setInterval(function(){
        viewVideo(video,context);
    },0);
});
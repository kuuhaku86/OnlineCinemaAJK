var canvas = document.getElementById("preview");
var context = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 700;

context.width = canvas.width;
context.height = canvas.height;

var video = document.getElementById("video");
var socket = io('');

function viewVideo(){
    context.drawImage(video, 0, 0, context.width, context.height);
    socket.emit('stream',canvas.toDataURL('image/webp'));
}
$(function(){
    setInterval(function(){
        viewVideo(video,context);
    },0);
});
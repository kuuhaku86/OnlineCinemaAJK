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

var modal = document.getElementById('simpleModal');
var modalBtn = document.getElementById('modalBtn');
var closeBtn = document.getElementsByClassName('closeBtn')[0];

modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}
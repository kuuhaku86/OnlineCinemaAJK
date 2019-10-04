var socket = io('');
            socket.on('stream', function(image){
                var img = document.getElementById("video");
                img.src = image;
            });
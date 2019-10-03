document.getElementById("submit").disabled = true;
var check = function() {
    document.getElementById('message').style.display = "inline";
    if (document.getElementById('password').value !=document.getElementById('confirm_password').value || document.getElementById('password').value == "" || document.getElementById('password').value.length < 5) {
        document.getElementById("submit").disabled = true;
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'Not match or the length less than 5';
    } else {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'Match';
        document.getElementById("submit").disabled = false;
    }
}

    socket.on('message', function (data) {
    $('.chatlogs').append('<div class="chat"><p class="chat-message"><strong>' + data.user + '</strong>: ' + data.message + '</p></div>');
    });
    // When the form is submitted
    $('.chat-form').submit(function (e) {
        // Avoid submitting it through HTTP
        e.preventDefault();

        // Retrieve the message from the user
        var message = $(e.target).find('input').val();

        // Send the message to the server
        socket.emit('message', {
            user: $('.nav-link').html(),
            message: message
        });
        // Clear the input and focus it for a new message
        e.target.reset();
        $(e.target).find('input').focus();
    });
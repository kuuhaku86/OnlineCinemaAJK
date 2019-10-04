socket.on('message', function (data) {
    $('.chatlogs').append('<div class="chat"><p class="chat-message"><strong>' + data.user + '</strong>: ' + data.message + '</p></div>');
    });
    // When the form is submitted
$('#button').click(function (e) {
    // Avoid submitting it through HTTP
    e.preventDefault();
    // Retrieve the message from the user
    var message = $('#chat-box').val();
    if(message == "")return;
    // Send the message to the server
    socket.emit('message', {
        user: $('.nav-link').html(),
        message: message
    });
    $('#chat-box').val('');
    // Clear the input and focus it for a new message
    });
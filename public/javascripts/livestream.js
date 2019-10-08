function encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}
socket.on('message', function (data) {
    $('.chatlogs').append('<div class="chat"><p class="chat-message"><strong>' + data.user + '</strong>: ' + data.message + '</p></div>');
    });
    // When the form is submitted
$('#button').click(function (e) {
    // Avoid submitting it through HTTP
    e.preventDefault();
    // Retrieve the message from the user
    var message = filterXSS($('#chat-input').val());
    if(message == "")return;
    // Send the message to the server
    socket.emit('message', {
        user: $('.nav-link').html(),
        message: message
    });
    $('#chat-input').val('');
    // Clear the input and focus it for a new message
    });
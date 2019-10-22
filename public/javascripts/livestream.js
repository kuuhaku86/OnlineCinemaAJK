socket.on('message', function (data) {
    $('.chatlogs').append('<div class="chat"><p class="chat-message"><strong>' + data.user + '</strong>: ' + data.message + '</p></div>');
    
    var message = document.getElementById('messages');

    function appendMessage() {
        var message = document.getElementById('chat-input');
        var newMessage = message.cloneNode(true);
        message.appendChild(newMessage);
    }

    function getMessages() {
        shouldScroll = messages.scrollTop + messages.clientHeight == messages.scrollHeight;
        appendMessage();

        if (!shouldScroll) {
            scrollToBottom();
        }
    }

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

$('#button').click(function (e) {
    // Avoid submitting it through HTTP
    e.preventDefault();
    // Retrieve the message from the user
    var message = filterXSS($('#chat-input').val());
    if(message == "")return;
    // Send the message to the server
    socket.emit('message', {
        user: $('#navbarDropdown').html(),
        message: message
    });
    $('#chat-input').val('');
    // Clear the input and focus it for a new message
    });

});
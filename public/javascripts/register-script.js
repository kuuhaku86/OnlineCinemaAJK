

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

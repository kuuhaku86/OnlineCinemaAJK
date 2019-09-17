<?php
    include "bootstrap.php";
?>

<!DOCTYPE html>
<html lang="en">
    <head>

        <!-- CSS -->
        <style type="text/css">
            @import url('style.css');
        </style>

        <title></title>
    </head>

    <body>
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container">
            <a class="navbar-brand" href="#">OnlineCinema</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item dropdown">
                            <a class="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
                            Username
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Change Movie</a>
                            <a class="dropdown-item" href="#">Logout</a>
                        </li>
                        <!-- Foto Profil -->
                            <img src="img/5d7e27b07cf5d.png" alt="hi" class="img-thumbnail2">
                    </ul>
                </div>
            </div>
        </nav>

        <!-- Jumbotron -->
        <div class="jumbotron4 jumbotron-fluid">
            <!-- Movie -->
            <video controls="controls">
                <source src="movie/launch.mp4">
            </video>
            <!-- Chat -->
            <div class="chatbox">
                <div class="chatlogs">

                    <div class="chat">
                        <div class="user-photo"><img src="img/default.png"></div>
                        <p class="chat-message">Bismillah</p>
                    </div>
                    <div class="chat">
                        <div class="user-photo"><img src="img/default.png"></div>
                        <p class="chat-message">HaiiHaii Namaku Zahra, Camin AJK. Doain ya temen-temen biar aku bisa jadi Admin AJK, Aamiin.</p>
                    </div>

                </div>

                <div class="chat-form">
                        <textarea></textarea>
                        <button>Send</button>
                </div>

            </div>
        </div>

    </body>
</html>
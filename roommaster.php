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

            </div>
        </nav>

        <!-- Foto Profil -->
        <div class="container">
            <div class="row">
                <div class="col-2">
                    <img src="profile.png" alt="..." class="img-thumbnail">
                    <div class="hi">
                        <p> Hi Zahramillah </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Jumbotron -->
        <div class="jumbotron3 jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">WELCOME ROOM MASTER</h1>
                <p> <a href="#" class="btn-upload">Upload Movie</a> </p>
                <p> <a href="#" class="btn-update">Update</a> </p>
            </div>
        </div>

    </body>
</html>
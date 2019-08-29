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
                        <li class="nav-item active">
                            <a class="nav-link" href="login.php">Login <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="register.php">Register <span class="sr-only">(current)</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- Jumbotron -->
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">Nonton Bareng</h1>
                <div class="lead">
                    <p> Mau nonton bareng, tapi males ke Bioskop? </p>
                    <p> Disini, bisa pilih film yang ingin kamu tonton dan ajak siapapun yang kamu mau </p> 
                    <p> tanpa perlu repot datang ke bioskop</p>
                </div>
                <p> <a href="register.php" class="btn-coba">Coba</a> </p>
            </div>
        </div>

    </body>
</html>
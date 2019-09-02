<?php
    include "bootstrap.php";
    require 'functions.php';
    if(isset($_POST["register"])){
        if(register($_POST) > 0) {
            echo "
                <script>
                    alert('User baru telah dibuat');
                </script>
            ";
            header("Location: login.php");
        }else{
            print_r($dbh->errorInfo());
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
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
                <h1 class="display-4_register">Register</h1>
                <div class="lead_register">
                    <p> Selamat Mendaftar </p>
                </div>
            </div>
        </div>

        <!-- Form Register -->
        <div class="register">
            <form action="" method="POST" enctype="multipart/form-data">
                <b> <h1>Username</h1> </b>
                <p> <input type="text" title="username" name="username" /> </p>
                <b> <h1>Password</h1> </b>
                <p> <input type="Password" title="password" name="password" /> </p>
                <b> <h1>Confirm Password</h1> </b>
                <p> <input type="Password" title="password" name="passwordConfirm" > </p>
                <b> <h2>Foto Profile</h2> </b>
                <p> <input type="file"  name="gambar" id="gambar"/> </p>
                <p> <button type="submit" name="register" class="btn">Submit</button> </p>
            </form>
        </div>
    </body>
</html>
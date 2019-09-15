<?php
    session_start();
    include "bootstrap.php";
    include "functions.php";
    if(!isset($_SESSION['login'])){
        header("Location: login.php");
        exit;
    }
    $id = $_SESSION['id'];
    // echo $id;
    $res = $dbh->query("SELECT * FROM room WHERE id_user='$id'");
    $res = $res->fetch();
    ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <style type="text/css">
        @import url('style.css');
    </style>
    <title>Homepage</title>
</head>
<body>
    <?php
        if($res['roles']=='master'){
    ?>
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container">
            <a class="navbar-brand" href="homepage.php">OnlineCinema</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

            </div>
        </nav>

        <!-- Foto Profil -->
        <div class="container">
            <div class="row">
                <div class="col-2">
                    <img src="img/<?=$res['gambar']?>" alt="img/default.png" class="img-thumbnail">
                    <div class="hi">
                        <p> Hi <?=$res['user']?> </p>
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
    <?php
        }else{
    ?>
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container">
            <a class="navbar-brand" href="homepage.php">OnlineCinema</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

            </div>
        </nav>

        <!-- Foto Profil -->
        <div class="container">
            <div class="row">
                <div class="col-2">
                    <img src="img/<?=$res['gambar']?>" alt="img/default.png" class="img-thumbnail">
                    <div class="hi">
                        <p> Hi <?=$res['user']?> </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Jumbotron -->
        <div class="jumbotron2 jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">WELCOME USER</h1>
                <p> <a href="#" class="btn-join">Join</a> </p>
            </div>
        </div>
    <?php 
        }
    ?>
</body>
</html>
![logo](public/images/logo.png)

## Content
- [1. Description](#1-description)
- [2. Installation](#2-installation)
  - [Requirements:](#requirements)
  - [How to Install](#how-to-install)
- [3. How to Use](#3-how-to-use)
  - [Features](#features)
  - [Step to Use](#step-to-use)
- [4. Conclusion](#4-conclusion)
- [5. Used Tools and Reference](#5-used-tools-and-reference)
  - [Tools](#tools)
  - [Reference](#reference)

# 1. Description
OnlineCinemaAJK is a web based application that have a purpose to connect every people in the world through a film that played in an online web that acts as a cinema, so the people can watch a movie together, have chat with their peers, and have fun. OnlineCinemaAJK was build with Node.JS and Socket.IO technology so the apps can run real-time.

# 2. Installation
## Requirements:

  - Operating System \(Linux, Windows, macOS\)
  - Npm
  - MySQL
  - NodeJS \(ver 10.x.x\)

## How to Install
   1.  _git clone_ [https://github.com/kuuhaku86/OnlineCinemaAJK.git](https://github.com/kuuhaku86/OnlineCinemaAJK.git)
   2. Get in to folder OnlineCinemaAJK
   3. Run in terminal _npm install --save_
   4. Turn on the MySQL server
   5. Import onlinecinemaajk.sql
   6. Change in _/core/user.js_ and _db.js_ the setting according to your database setting

# 3. How to Use

## Features

1. Login Page and Register Page
2. Multiroom \(One server can consist many rooms\).
3. Real-time chat
4. Master room selection
5. Change film

## Step to Use
1. Turn on the node.js server in terminal with _node app.js_ command
2. The computer that acts as the server can open the web with _localhost:8600_ address in the browser
3. The computer that acts as common user can open the web with _IPServer:8600_ , you must change the _IPServer_ with the server IP address
4. Login if you have an account in that web and register if you don't have one
   ![](/public/images/1.PNG)
   ![](/public/images/2.PNG)
5. The user that wants to acts as a room master can click the _make a room_ button to make a new room
6. Other user that wants to join the room that had been created by the master room can fill the text field input below the _make a room_ button and the click _join room_ button
   ![](/public/images/3.PNG)
   ![](/public/images/4.PNG)
7. All the user can chatting with the user that join the same room in the chat field
   <br>
   ![](/public/images/5.PNG)
8.  The master room can change the film that played in the room by clicking dropdown button below the film
   ![](/public/images/7.PNG)
11. The master room can give his/her position as a master room to the other user in the room
    ![](/public/images/6.PNG)

# 4. Conclusion
We can use socket programming's technique to create fascinating app's like this one. It's run perfectly although use big bandwith to use. For further development, there are some advices that can be used like just send the movie's time and not the entire image, deprecate the login features, and make the user can upload the image.  

# 5. Used Tools and Reference

## Tools
- [Visual Studio Code](https://code.visualstudio.com/)
- [Node JS](https://nodejs.org/en/)
- [Socket.IO](https://socket.io/)

## Reference
- https://socket.io/get-started/chat
- https://betterprogramming.pub/video-stream-with-node-js-and-html5-320b3191a6b6
- https://codeshack.io/basic-login-system-nodejs-express-mysql/

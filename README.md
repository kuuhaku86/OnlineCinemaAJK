# OnlineCinemaAJK

OnlineCinemaAJK is a web based application that have a purpose to connect every people in the world through a film that played in an online web that acts as a cinema. OnlineCinemaAJK was build with Node.JS and Socket.IO technology so the apps can run in real-time.

---

## Features in OnlineCinemaAJK

1. Login Page and Register Page
2. Multiroom \(One server can consist many rooms\).
3. Real-time chat
4. Master room selection
5. Change film

---

## Installation

* **Requirement**s:

  * Operating System \(Linux, Windows, macOS\)
  * Npm
  * MySQL
  * NodeJS \(ver 10.x.x\)

* **How to Install this app:**
    * _git clone_ [https://github.com/kuuhaku86/OnlineCinemaAJK.git](https://github.com/kuuhaku86/OnlineCinemaAJK.git)
    * Get in to folder OnlineCinemaAJK
    * Run in terminal _npm install --save_
    * Turn on the MySQL server
    * Import onlinecinemaajk.sql
    * Change in _/core/user.js_ and _db.js_ the setting according to your database setting

---

**How to use :**

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

const mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'onlinecinemaajk'
});

connection.connect();

module.exports = connection;
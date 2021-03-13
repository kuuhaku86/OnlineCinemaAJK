const mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'kuuhaku86',
    password : 'yohan123',
    database : 'onlinecinemaajk'
});

connection.connect();

module.exports = connection;
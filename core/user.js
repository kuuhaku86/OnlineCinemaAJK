const db = require('./../db');
const bcrypt = require('bcrypt');

var User = {
    find : function(user = null, callback) {
        let sql = `SELECT * FROM users WHERE username = ?`;
        db.query(sql, user, function(err,result) {
            if(err)throw err;
            if(result.length)callback(result[0]);
            else callback(null);
        });
    },
    
    create : function(body, callback) {
        let pwd = body.password;
        body.password = bcrypt.hashSync(pwd,10);
        var bind = [];
        for(prop in body){
            bind.push(body[prop]);
        }
        let sql = "INSERT INTO users (username,password) VALUES (?, ?)";
        db.query(sql, bind, function(err,lastId) {
            if(err)throw err;
            callback(lastId);
        });
    },
    
    login : function(username, password, callback) {
        this.find(username,function (result) {
            if(result) {
                if(bcrypt.compareSync(password, result.password)){
                    callback(result);
                    return;
                }
            }
            callback(null);
        });
    }
};

module.exports = User;
const mysql = require("mysql");
require("dotenv").config();
const connection = mysql.createConnection(process.env.JAWSDB_URL)
connection.connect();

exports.get_user = (req, res) => {
    connection.query(`SELECT * FROM users WHERE email = "${req.params.email}"`, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows[0])
    })
}

exports.test = (req, res) => {
    res.send("test works")
}

exports.add_user_social = (req, res) => {
    connection.query(`INSERT INTO users (email, given_name, family_name, nickname) VALUES ("${req.params.email}","${req.params.given_name}","${req.params.family_name}","${req.params.nickname}")`, 
        (err, rows, fields) => { 
            if (err) throw err;
         }
    );
}
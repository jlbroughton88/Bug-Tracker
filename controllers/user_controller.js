const mysql = require("mysql");
require("dotenv").config();
const connection = mysql.createConnection(process.env.JAWSDB_URL)
connection.connect();

exports.get_user = (req, res) => {
    connection.query(`SELECT * FROM users WHERE email = "${req.params.email}"`, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows[0]);
    })
}

exports.test = (req, res) => {
    res.send("test works")
}

exports.add_user_social = (req, res) => {
    connection.query(`INSERT INTO users (uid, email, given_name, family_name, nickname, company, role, date_created, time_created) VALUES ("${req.params.uid}","${req.params.email}","${req.params.given_name}","${req.params.family_name}","${req.params.nickname}","${req.params.company}","${req.params.role}","${req.params.date_created}","${req.params.time_created}")`, 
        (err, rows, fields) => {
            if (err) throw err;
            console.log(rows[0])
         }
    );
}

exports.add_name = (req, res) => {
    connection.query(`UPDATE users SET given_name="${req.params.given_name}", family_name="${req.params.family_name}" WHERE email="${req.params.email}"`, 
        (err, rows, fields) => {
            if (err) throw err;
        }
    )
}

exports.add_comp_role = (req, res) => {
    connection.query(`UPDATE users SET company="${req.params.company}", role="${req.params.role}" WHERE email="${req.params.email}"`,
        (err, rows, fields) => {
            if (err) throw err;
        }
    )
}
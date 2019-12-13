const router = require("express").Router();
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection(process.env.JAWSDB_URL)
connection.connect();


router.get("/all", (req, res) => {
        connection.query("SELECT * FROM users", (err, rows, fields) => {
        if(err) throw err;
        console.log(rows)
        res.send(rows)
    })
})

module.exports = router;




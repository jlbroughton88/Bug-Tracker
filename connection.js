const router = require("express").Router();
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection(process.env.JAWSDB_URL)
connection.connect();


router.get("/", (req, res) => {
    console.log("=====================================================" + connection);
    connection.query('SELECT * FROM users', (err, rows, fields) => {
        if(err) throw err;
        console.log(rows)
            res.send(rows)
        
    })
    console.log("END OF / =====================================================")
})

router.get("/:email", (req, res) => {
        console.log("=====================================================" + connection);
        connection.query(`SELECT * FROM users where email = "${req.params.email}"` , (err, rows, fields) => {
        if(err) throw err;
        console.log(rows)
        res.send(rows)
    })
    console.log("END OF /:email =====================================================")
})

module.exports = router;




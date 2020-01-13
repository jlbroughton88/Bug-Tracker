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

exports.get_selected_issue = (req, res) => {
    connection.query(`SELECT * FROM issues WHERE uid="${req.params.uid}"`, 
        (err, rows, fields) => {
            if(err) throw err;
            res.send(rows[0])
        }
    )
}

exports.get_user_issues = (req, res) => {
    connection.query(`SELECT * FROM issues WHERE user_uid="${req.params.user_uid}"`, 
        (err, rows, fields) => {
            if(err) throw err;
            res.send(rows)
        }   
    ) 
}

exports.post_issue = (req, res) => {
    console.log(req.body)
    const iss = req.body;
    
    connection.query(`INSERT INTO issues (uid, user_uid, nickname, issue_title, issue_text, date_created, time_created, downvotes, upvotes, solved) VALUES ("${iss.uid}","${iss.user_uid}","${iss.nickname}", "${iss.issue_title}", "${iss.issue}","${iss.date_created}","${iss.time_created}", "${0}", "${0}", "${false}")`, 
        (err, rows, fields) => {
            if(err) throw err;
        }
    )
    console.log("Issue posted!")
}
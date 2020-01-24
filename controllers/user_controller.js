const mysql = require("mysql");
require("dotenv").config();
const connection = mysql.createConnection(process.env.JAWSDB_URL);
connection.connect();

exports.get_user = (req, res) => {
  connection.query(
    `SELECT * FROM users WHERE email = "${req.params.email}"`,
    (err, rows, fields) => {
      if (err) throw err;
      res.send(rows[0]);
    }
  );
};

exports.test = (req, res) => {
  res.send("test works");
};

exports.add_user_social = (req, res) => {
  connection.query(
    `INSERT INTO users (uid, email, given_name, family_name, nickname, company, role, date_created, time_created) VALUES ("${req.params.uid}","${req.params.email}","${req.params.given_name}","${req.params.family_name}","${req.params.nickname}","${req.params.company}","${req.params.role}","${req.params.date_created}","${req.params.time_created}")`,
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
};

exports.add_name = (req, res) => {
  connection.query(
    `UPDATE users SET given_name="${req.params.given_name}", family_name="${req.params.family_name}" WHERE email="${req.params.email}"`,
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
};

exports.add_comp_role = (req, res) => {
  connection.query(
    `UPDATE users SET company="${req.params.company}", role="${req.params.role}" WHERE email="${req.params.email}"`,
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
};

exports.get_all_issues = (req, res) => {
  connection.query(`SELECT * FROM issues`, (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
};

exports.get_selected_issue = (req, res) => {
  connection.query(
    `SELECT * FROM issues WHERE uid="${req.params.uid}"`,
    (err, rows, fields) => {
      if (err) throw err;
      res.send(rows[0]);
    }
  );
};

exports.get_user_issues = (req, res) => {
  connection.query(
    `SELECT * FROM issues WHERE user_uid="${req.params.user_uid}"`,
    (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    }
  );
};

exports.post_issue = (req, res) => {
  const iss = req.body;
  connection.query(
    `INSERT INTO issues (uid, user_uid, nickname, issue_title, issue_text, date_created, time_created, downvotes, upvotes, solved) VALUES ("${
      iss.uid
    }","${iss.user_uid}","${iss.nickname}", "${iss.issue_title}", "${
      iss.issue
    }","${iss.date_created}","${
      iss.time_created
    }", "${0}", "${0}", "${false}")`,
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
};

exports.delete_selected_issue = (req, res) => {
  connection.query(
    `DELETE FROM issues WHERE uid = "${req.params.uid}"`,
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
};

exports.add_comment = (req, res) => {
  let comm = req.body;
  connection.query(
    `INSERT INTO comments (comm_uid, user_uid, issue_uid, comm_nickname, comm_text, date_created, time_created, upvotes, downvotes, solved) VALUES ("${comm.comm_uid}","${comm.user_uid}","${comm.issue_uid}", "${comm.comm_nickname}", "${comm.comm_text}","${comm.date_created}","${comm.time_created}","${comm.upvotes}","${comm.downvotes}", "${comm.solved}")`,
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
};

exports.get_comments = (req, res) => {
  connection.query(
    `SELECT * FROM comments WHERE issue_uid = "${req.params.issueuid}"`,
    (err, rows, field) => {
      res.send(rows);
      if (err) throw err;
    }
  );
};

exports.get_votes = (req, res) => {
  connection.query(
    `SELECT * FROM votes WHERE issue_uid = "${req.params.issueuid}"`,
    (err, rows, fields) => {
      if (err) throw err;
      // console.log(rows)
      res.send(rows);
    }
  );
};

exports.post_vote = (req, res) => {
  let vote = req.body;

  connection.query(
    `INSERT INTO votes (issue_uid, user_uid, upvoted,downvoted,date_voted, time_voted) VALUES ("${vote.issue_uid}","${vote.user_uid}", "${vote.upvoted}", "${vote.downvoted}","${vote.date_voted}", "${vote.time_voted}")`,
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
};

exports.update_vote = (req, res) => {
  connection.query(
    `UPDATE votes SET upvoted="${req.params.upvoted}", downvoted="${req.params.downvoted}" WHERE issue_uid="${req.params.issue_uid}" AND user_uid="${req.params.user_uid}"`,
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
};

exports.update_solved = (req, res) => {
  connection.query(
    `UPDATE comments SET solved="1" WHERE issue_uid="${req.params.issue_uid}" AND comm_uid="${req.params.comm_uid}"`,
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
  connection.query(
    `UPDATE issues SET solved="1" WHERE uid=${req.params.issue_uid}`,
    (err, rows, field) => {
      if (err) throw err;
    }
  );
};

exports.delete_comment = (req, res) => {
  connection.query(`DELETE FROM comments WHERE comm_uid = "${req.params.comm_uid}"`, 
    (err, rows, fields) => {
      if(err) throw err;
      console.log(rows);
    }
  )
}

exports.add_reply = (req, res) => {
  console.log(req.body);
}
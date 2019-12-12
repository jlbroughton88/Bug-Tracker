const express = require("express");
const app = express();
const router = express.Router();

require("dotenv").config();


// const SQL_USER = process.env.SQL_USERNAME;
// const SQL_PASS = process.env.SQL_PASSWORD;
// const SQL_SERVER = process.env.SQL_SERVER;
// console.log(SQL_SERVER);

// Create connection to DB
// const config = {
//     authentication: {
//         options: {
//             userName: SQL_USER,
//             password: SQL_PASS
//         },
//         type: "default"
//     },
//     server: SQL_SERVER,
//     options: {
//         database: "BugTracker",
//         encrypt: true
//     }
// };

// const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through.
// connection.on("connect", err => {
//     if(err) {
//         console.error(err.message);
//     } else {
//         console.log("connection made!")
//         // queryDatabase();
//     }
// })

// app.use((req, res, next) => {
//     req.sql = tediousExpress(req, connection);
//     console.log(req.sql)
//     next();
// })

// router.get("/", (req, res) => {
//     res.send("Hello")
// })

app.get("/", (req, res) => {
    res.send("Hello from server")
})

if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

app.listen( process.env.PORT || 5002 , () => {
    console.log("Server listening on port 5001");
});
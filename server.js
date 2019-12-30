const express = require("express");
const app = express();
const connection = require("./connection.js")
const path = require("path");

require("dotenv").config();
console.log("This is working");
app.use("/api", connection);


app.use(function(req, res, next)  {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

if(process.env.NODE_ENV === "production") {
    console.log("production")
    app.use(express.static("client/build"))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
} else {
    console.log("not production bucko")
   app.get("/", (req, res) => {
       res.send("not production bucko")
   })
}


const port = process.env.PORT || 5002;
app.listen(() => {
    console.log(`Server listening on ${port}`);
});
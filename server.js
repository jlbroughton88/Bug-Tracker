const express = require("express");
const app = express();
const connection = require("./connection")
const path = require("path");

require("dotenv").config();
console.log("Hello from server");

if(process.env.NODE_ENV === "production") {
    console.log("production")
    app.use(express.static("client/build"))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
} else {
   app.get("/", (req, res) => {
       res.send("not production bucko")
   })
}

app.use(function(req, res, next)  {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use("/api", connection);

app.listen( process.env.PORT || 5002 , () => {
    console.log("Server listening on port 5002");
});
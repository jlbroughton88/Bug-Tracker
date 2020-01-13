const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const routes = require("./routes/routes.js")
const bodyParser = require("body-parser")
require("dotenv").config();

console.log(process.env.JAWSDB_URL)

if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
    app.get("*", (req, res) => {
        console.log("server route on production")
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
} else {
    console.log("not production bucko")
   app.get("/", (req, res) => {
       console.log("/ not on production")
   })
}

app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); 
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", routes);

const port = process.env.PORT || 5002;

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
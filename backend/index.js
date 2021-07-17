require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const routes = require("./Routes/index.router");
const uri = process.env.DB_URL;

// app.get("/",(req,res) => {
//     res.send("good luck");
// })

mongoose
.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
.then((data) => {
    console.log("DB_CONNECTED");
})
.catch((err) => {
    console.log(err);
})

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use("/uploads",express.static("uploads"))

app.use("/api", routes);

const port = process.env.port || 4000;
app.listen(port,() => {
    console.log("Server Keeps Eyes On You");
})
const express = require("express");

const app= express();

// initiate other services
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, ()=> {
    console.log("connected to MongoDB");
});

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// app.get("/", (req,res)=> {
//     res.send("Welcome to homepage");
// })

app.listen(8800, ()=> {
    console.log("backend server running");
})
const express = require('express');
const DBconnect = require('./config/db');
const app = express();
app.use(express.json())








app.get("/", (req, res) => {
    res.send("Welcome To My Blog Project API Backend......☺☺🙋‍♀️")
})





app.listen(8090, () => {
    console.log("Server Started....");
})
DBconnect();
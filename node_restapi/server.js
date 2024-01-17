var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var db = require('../utils/database.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(session({ secret: "test1234@!" }));



app.post("/signup", (req, res) => {
    const userData = req.body;
    const currentDateTime = new Date().toISOString().slice(0, 19).replace("T", " ");
    const insertQuery = "INSERT INTO users (uname, password, uemail) VALUES(?, ?, ?)";
    const values = [userData.uname, userData.password, userData.uemail, currentDateTime];

    db.query(insertQuery, values, function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send({ msg: "Error inserting data into the database" });
        }
        console.log(result);
        res.send({ msg: "Data inserted successfully", id: result.insertId });
    });
});

app.post('/login_users', (req, res) => {
    const loginData = req.body;
    const selectQuery = "SELECT * FROM users WHERE uemail = ? AND password = ?";
    const values = [loginData.uemail, loginData.password];

    db.query(selectQuery, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ msg: "Error during login" });
        }

        if (result.length > 0) {
            res.status(200).send({ msg: "Login successful", redirectTo: "/" });
        }
        else {
            res.status(401).send({ msg: "Invalid credentials" });
        }
    });
});

app.post('/contactus', (req, res) => {
    const contactusData = req.body;
    const currentDateTime = new Date().toISOString().slice(0, 19).replace("T", " ");
    const insertQuery = "INSERT INTO contactus_sub (uname, email, subject, message,submission_date) VALUES(?, ?, ?, ?, ?)";
    console.log('SQL Query:', insertQuery);
    const values = [contactusData.uname, contactusData.email, contactusData.subject, contactusData.message, currentDateTime];

    db.query(insertQuery, values, function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send({ msg: "Error inserting data into the database" });
        }
        console.log(result);
        res.send({ msg: "Data inserted successfully", id: result.insertId });
    });
});

app.listen(8000, () => console.log("server running at port no 8000"));


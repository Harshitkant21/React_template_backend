const express = require("express");
const router = express.Router();
const connection = require("../utils/database");

// Display all users
router.get("/", (req, res) => {
    const { username, email, password } = req.query;

    if (username && email && password) {
        const userData = {
            username: username,
            email: email,
            password: password
        };

        connection.query("INSERT INTO users SET ?", userData, (err, results) => {
            if (err) {
                console.error("Error inserting data:", err);
                res.status(500).send("Error inserting data");
            } else {
                console.log("Data inserted successfully");
                if (req.headers.accept && req.headers.accept.includes("application/json")) {
                    res.send(results);
                } else {
                    res.render("indexusers", { data: results });
                }
            }
        });
    } else {
        connection.query("SELECT * FROM users", (err, results) => {
            if (err) throw err;
            console.log(results);
            res.render("indexusers", { data: results });
        });
    }
});

// Add a new user
router.post("/add", (req, res) => {
    const { uname, password, uemail } = req.body;
    const insertQuery = `INSERT INTO users (uname, password, uemail) VALUES (?, ?, ?)`;
    connection.query(
        insertQuery,
        [uname, password, uemail],
        (err, results) => {
            if (err) throw err;
            res.redirect("/users");
        }
    );
});

// Delete a user
router.get("/delete/:id", (req, res) => {
    const userId = req.params.id;
    const deleteQuery = "DELETE FROM users WHERE userid = ?";
    connection.query(deleteQuery, [userId], (err, results) => {
        if (err) throw err;
        res.redirect("/users");
    });
});

// Edit a user
router.get("/edit/:id", (req, res) => {
    const userId = req.params.id;
    const selectQuery = "SELECT * FROM users WHERE userid = ?";
    connection.query(selectQuery, [userId], (err, results) => {
        if (err) throw err;
        res.render("editusers", { user: results[0] });
    });
});

// Update a user
router.post("/update/:id", (req, res) => {
    const userId = req.params.id;
    const { uname, password, uemail } = req.body;
    const updateQuery =
        "UPDATE users SET uname = ?, password = ?, uemail = ? WHERE userid = ?";
    connection.query(
        updateQuery,
        [uname, password, uemail, userId],
        (err, results) => {
            if (err) throw err;
            res.redirect("/users");
        }
    );
});

module.exports = router;

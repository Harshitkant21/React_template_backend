const express = require("express");
const router = express.Router();
const connection = require("../utils/database");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM business_team", (err, results) => {
    if (err) throw err;
    console.log(results);
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      res.send(results);
    } else {
      res.render("index", { data: results });
    }
  });
});

router.post("/add", (req, res) => {
  const {employee_name,designation,department,email,contact_number,profile_picture,} = req.body;

  const insertQuery = `INSERT INTO business_team (employee_name, designation, department, email, contact_number, profile_picture) VALUES (?, ?, ?, ?, ?, ? )`;
  connection.query(
    insertQuery,
    [employee_name, designation, department, email, contact_number, profile_picture],
    (err, results) => {
      if (err) throw err;
      res.redirect("/businessteam");
    }
  );
});

router.get("/delete/:id", (req, res) => {
  const userId = req.params.id;
  const deleteQuery = "DELETE FROM business_team WHERE id = ?";
  connection.query(deleteQuery, [userId], (err, results) => {
    if (err) throw err;
    res.redirect("/businessteam");
  });
});

router.get("/edit/:id", (req, res) => {
  const userId = req.params.id;
  const selectQuery = "SELECT * FROM business_team WHERE id = ?";
  connection.query(selectQuery, [userId], (err, results) => {
    if (err) throw err;
    res.render("edit", { employee: results[0] });
  });
});

router.post("/update/:id", (req, res) => {
  const employeeId = req.params.id;
  const { employee_name, designation, department, email, contact_number, profile_picture } = req.body;
  const updateQuery =
    "UPDATE business_team SET employee_name = ?, designation = ?, department = ?, email = ?, contact_number = ?, profile_picture = ? WHERE id = ?";
  connection.query(
    updateQuery,
    [employee_name, designation, department, email, contact_number, employeeId, profile_picture],
    (err, results) => {
      if (err) throw err;
      res.redirect("/businessteam");
    }
  );
});

module.exports = router;

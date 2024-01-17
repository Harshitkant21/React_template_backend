const express = require("express");
const router = express.Router();
const connection = require("../utils/database");

router.get("/", (req, res) => {
    connection.query("SELECT * FROM services", (err, results) => {
        if (err) throw err;
        console.log(results);
        if (req.headers.accept && req.headers.accept.includes("application/json")) {
            res.send(results);
        } else {
            res.render("indexservices", { data: results });
        }
    });
});

router.post("/add", (req, res) => {
    const { service_name, description, image } = req.body;
    const insertQuery = `INSERT INTO services (service_name, description, image) VALUES (?, ?, ?)`;
    connection.query(
        insertQuery,
        [service_name, description, image],
        (err, results) => {
            if (err) throw err;
            res.redirect("/services");
        }
    );
});

router.get("/delete/:id", (req, res) => {
    const serviceId = req.params.id;
    const deleteQuery = "DELETE FROM services WHERE id = ?";
    connection.query(deleteQuery, [serviceId], (err, results) => {
        if (err) throw err;
        res.redirect("/services");
    });
});

router.get("/edit/:id", (req, res) => {
    const serviceId = req.params.id;
    const selectQuery = "SELECT * FROM services WHERE id = ?";
    connection.query(selectQuery, [serviceId], (err, results) => {
        if (err) throw err;
        res.render("editservices", { service: results[0] });
    });
});

router.post("/update/:id", (req, res) => {
    const serviceId = req.params.id;
    const { service_name, description, image } = req.body;
    const updateQuery =
        "UPDATE services SET service_name = ?, description = ?, image = ? WHERE id = ?";
    connection.query(
        updateQuery,
        [service_name, description, image, serviceId],
        (err, results) => {
            if (err) throw err;
            res.redirect("/services");
        }
    );
});

module.exports = router;

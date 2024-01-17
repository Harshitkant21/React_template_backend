const express = require("express");
const router = express.Router();
const connection = require("../utils/database");

router.get("/", (req, res) => {
    connection.query("SELECT * FROM testimonials", (err, results) => {
        if (err) throw err;
        console.log(results);
        res.render("indextestimonials", { data: results });
    });
});

router.post("/add", (req, res) => {
    const { uname, testimonial, image } = req.body;
    const insertQuery = `INSERT INTO testimonials (uname, testimonial, image) VALUES (?, ?, ?)`;
    connection.query(
        insertQuery,
        [uname, testimonial, image],
        (err, results) => {
            if (err) throw err;
            res.redirect("/testimonials");
        }
    );
});


router.get("/delete/:client_id", (req, res) => {
    const testimonialId = req.params.client_id;
    const deleteQuery = "DELETE FROM testimonials WHERE client_id = ?";
    connection.query(deleteQuery, [testimonialId], (err, results) => {
        if (err) throw err;
        res.redirect("/testimonials");
    });
});

router.get("/edit/:client_id", (req, res) => {
    const testimonialId = req.params.client_id;
    const selectQuery = "SELECT * FROM testimonials WHERE client_id = ?";
    connection.query(selectQuery, [testimonialId], (err, results) => {
        if (err) throw err;
        res.render("edittestimonials", { testimonial: results[0] });
    });
});

router.post("/update/:client_id", (req, res) => {
    const testimonialId = req.params.client_id;
    const { uname, testimonial, image } = req.body;
    const updateQuery =
        "UPDATE testimonials SET uname = ?, testimonial = ?, image = ? WHERE client_id = ?";
    connection.query(
        updateQuery,
        [uname, testimonial, image, testimonialId],
        (err, results) => {
            if (err) throw err;
            res.redirect("/testimonials");
        }
    );
});

module.exports = router;

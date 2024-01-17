const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const connection = require("./utils/database");
const business = require("./routes/business");
const app = express();
const service = require("./routes/services");
const testimonial = require("./routes/testimonials");
const users = require("./routes/users");
const cors = require("cors");
connection.connect((err) => {
  if (err) throw err;
  console.log("connected to database");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/businessteam", business);
app.use("/services", service);
app.use("/testimonials", testimonial);
app.use("/users", users);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.listen(8080, () => {
  console.log("app running on port 8080");
});

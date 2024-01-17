const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Harshit@2004",
  database: "advertising",
});

module.exports = connection;

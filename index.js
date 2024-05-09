const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

app.use(bodyParser.json());
app.get("/", (req, res) => {
  response(200, "API V1 ready to go", "SUCCESS", res);
});

app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM mahasiswa";
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, "mahasiswa get list", res);
  });
});

app.get("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim;
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, "mahasiswa get by nim", res);
  });
});

app.post("/mahasiswa", (req, res) => {
  const { nim, nama, kelas, alamat } = req.body;

  console.log(req.body);
  const sql = `INSERT INTO mahasiswa (nim, nama, kelas, alamat) VALUES (?, ?, ?, ?)`;
  db.query(sql, [nim, nama, kelas, alamat], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      response(500, "Internal Server Error", "ERROR", res);
    } else {
      console.log("Data inserted successfully");
      response(200, "Data Added Successfully", "SUCCESS", res);
    }
  });
});

app.put("/mahasiswa", (req, res) => {
  const { nim, nama, kelas, alamat } = req.body;

  const sql = `UPDATE mahasiswa SET nama=?, kelas=?, alamat=? WHERE nim=?`;
  db.query(sql, [nama, kelas, alamat, nim], (err, result) => {
    if (err) {
      console.error("Error updating data:", err);
      response(500, "Internal Server Error", "ERROR", res);
    } else {
      console.log("Data updated successfully");
      response(200, "Data Updated Successfully", "SUCCESS", res);
    }
  });
});

app.delete("/mahasiswa", (req, res) => {
  const { nim } = req.body;

  const sql = `DELETE FROM mahasiswa WHERE nim=?`;
  db.query(sql, [nim], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      response(500, "Internal Server Error", "ERROR", res);
    } else {
      console.log("Data deleted successfully");
      response(200, "Data Deleted Successfully", "SUCCESS", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

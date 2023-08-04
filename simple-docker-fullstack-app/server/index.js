const express = require("express");
const cors = require("cors");
const app = express();
const sqlite3 = require("sqlite3").verbose();

app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let db = new sqlite3.Database(
  "./db/sample.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the sample database.");

    db.run(
      `CREATE TABLE IF NOT EXISTS items(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT
  )`,
      [],
      (err) => {
        if (err) {
          console.log("Error when creating the table", err);
        } else {
          console.log("Items Table Created Successfully");
        }
      }
    );
  }
);

app.get("/items/:id", (req, res) => {
  console.log(`GET request received for id ${req.params.id}`);

  db.get(`SELECT * FROM items WHERE id = ?`, req.params.id, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(row);
  });
});

app.get("/items", (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Failed to retrieve items" });
    } else {
      res.json(rows);
    }
  });
});

app.post("/items", (req, res) => {
  console.log(req.body);

  const data = [req.body.name, req.body.description];

  db.run(
    `INSERT INTO items(name, description) VALUES(?, ?)`,
    data,
    function (err) {
      if (err) {
        return console.error(err.message);
      }
      res.json({
        message:
          "Received your POST request. A new item has been inserted into the database.",
      });
    }
  );
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

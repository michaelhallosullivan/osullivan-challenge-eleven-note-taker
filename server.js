const fs = require("fs");
const express = require("express");
const path = require("path");
const uuid = require('./public/assets/js/uuid.js');
const PORT = 3001;
const app = express();
//const database = require('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
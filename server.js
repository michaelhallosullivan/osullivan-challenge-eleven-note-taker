const fs = require("fs");
const express = require("express");
const path = require("path");
const uuid = require('./public/assets/js/uuid.js');
const PORT = 3001;
const app = express();
const notes = require('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req,res)=>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', function(err, data) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(notes);
    };
  });
});

//receive a new note to save on the request body
//add it to the db.json file
//then return the new note to the client
//give each note a unique id when it's saved (uuid)
app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request received`);
    console.info(`${req.method} request received`);
    const { title, text } = req.body;
    let newNote = {
      title,
      text,
      note_id: uuid(),
    };
    fs.readFile('./db/db.json', function(err, data) {
      if (err) {
        console.log(err);
      }
      else {
        let arrayOfNotes = JSON.parse(data);
        arrayOfNotes.push(newNote);
        const notesString = JSON.stringify(arrayOfNotes);
        fs.writeFile('./db/db.json', notesString, (err) =>
        err ? console.error(err) : console.log("New note added to db.json")
        );
      };
    });
    console.log(newNote);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
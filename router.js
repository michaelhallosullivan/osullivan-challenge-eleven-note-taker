const express = require("express");
const router = express.Router();
const uuid = require('./public/assets/js/uuid.js');
const fs = require("fs");

router.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', function(err, data) {
      if (err) {
        console.log(err);
      }
      else {
        let notes = JSON.parse(data);
        return res.json(notes);
      };
    });
});
  
router.post('/api/notes', (req, res) => {
      res.json(`${req.method} request received`);
      console.info(`${req.method} request received`);
      const { title, text } = req.body;
      let newNote = {
        title,
        text,
        id: uuid(),
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
  
router.delete('/api/notes/:id', (req, res) => {
      res.json(`${req.method} request received`);
      console.info(`${req.method} request received`);
      fs.readFile('./db/db.json', function(err, data) {
        if (err) {
          console.log(err);
        }
        else {
          let arrayOfNotes = JSON.parse(data);
          var idToRemove = req.params.id;
          arrayOfNotes = arrayOfNotes.filter(item => {
            if(idToRemove !== item.id) {
                return item
            }
          });
          const notesString = JSON.stringify(arrayOfNotes);
          fs.writeFile('./db/db.json', notesString, (err) =>
          err ? console.error(err) : console.log("Note removed from db.json")
          );
        };
      });
});

module.exports = router;
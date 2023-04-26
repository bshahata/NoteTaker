const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  readAndRemove,
} = require('../helpers/fsUtils');



// Route to get a list of notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Route to create new notes and add them to the json list
notes.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

if (title && text) {
  const newNotes = { title, text, id: uuidv4() };

  readAndAppend(newNotes, './db/db.json');

  response = { status: 'Nice!', data: req.body };
  res.status(200).json('Bad Request');
}
});

// Route to delete notes using query params to specify based on uuid
notes.delete('./api/notes/:id', (req, res) => {
  const requestedID = req.params.id;

  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  const filteredNotes = notes.filter((note) => note.id !== requestedID);

  if (filteredNotes.length === notes.length) {
    return res.status(401).send('Bad Request');
  }

  fs.writeFileSync('./db/db.json', JSON.stringify(filteredNotes));

  res.status(201).send('Note Deleted');
});

module.exports = notes;
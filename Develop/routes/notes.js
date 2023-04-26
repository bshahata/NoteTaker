const notes = require('express').Router();
const uuid = require('../helpers/uuid');
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
  const newNotes = { title, text, id: uuid() };

  readAndAppend(newNotes, './db/db.json');

  response = { status: 'Nice!', data: req.body };
  res.status(200).json('Bad Request');
}
});

// Route to delete notes using query params to specify based on uuid
notes.delete('/:id', (req, res) =>
{
  const requestedID = req.params.id;

  // Filter notes based on uuid and remove from list
  if (requestedID)
  {
    readAndRemove(requestedID, './db/db.json');

    response = { status: 'Successfully Deleted' }
    res.status(201).json(response);
  } else
  {
    res.status(400).json('Bad request');
  }
});

module.exports = notes;
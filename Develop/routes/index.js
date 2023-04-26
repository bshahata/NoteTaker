const express = require('express');

// Import our modular routers for notes
const notesRouter = require('../routes/notes');

const app = express();

app.use('../routes/notes', notesRouter);

module.exports = app;

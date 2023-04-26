const express = require('express');
const path = require('path');
const { clog } = require('./Develop/middleware/clog');
const api = require('./Develop/routes/index')

const PORT = process.env.PORT || 3001;

const app = express();

// Use middleware
app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// Route to homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html')));

// Route to notes
app.get('/notes/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/pages/notes.html')));

let server = app.listen(PORT, function ()
{
    let host = server.address().address;
    let port = server.address().port;
    console.log("server is listening at http://%s:%s", host, port);
});
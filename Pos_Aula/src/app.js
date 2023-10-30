const express = require('express');
const app = express();
const { bookController } = require('./controllers');

app.use(express.json());

app.get('/books', bookController.getAll);
app.get('/books/:id', bookController.getById);
app.post('/books', bookController.create);
app.put('/books/:id', bookController.update);
app.delete('/books/:id', bookController.remove);

module.exports = app;
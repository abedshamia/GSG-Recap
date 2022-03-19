const express = require('express');
const {join} = require('path');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');
const connection = require('./database/config/connection');
const app = express();
app.use(cookieParser());
app.disable('x-powered-by');
app.use(express.urlencoded({extended: false}));
app.use(express.static(join(__dirname, '..', 'public')));
app.use(express.json());

app.get('/users/:id', async (req, res) => {
  const {id} = req.params;

  const books = await connection.query(
    'SELECT * FROM books WHERE id IN (SELECT book_id FROM book_user WHERE user_id = $1)',
    [id]
  );

  if (books.rowCount === 0) {
    res.status(404).send('User not found');
  }

  res.send(books.rows);
});
app.use(errorHandler);

module.exports = app;

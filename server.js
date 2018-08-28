'use strict';

// TODO: Make sure to do a 'DROP if exists' for database

const pg = require('pg');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

// 'constring' first one is for deploying in Heroku, second is for running locally
const constring = 'postgres://tbfoxjsvccjhpw:acb4781a3a9d288b343884eef5a8b95a79ea38864cd483f6eef9adc93b76049a@ec2-54-235-86-226.compute-1.amazonaws.com:5432/dd0mkqadc3k5r';
// const constring = 'postgres://localhost:5432/books_app';
const client = new pg.Client(constring);

client.connect();
client.on('error', err => {
  console.error('Error: ', err);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}!`));

app.get('/hello', (request, response) => {
  response.render('index');
});

app.get('/books', (request, response) => {
  let SQL = 'SELECT title, author, image_url FROM books';
  client.query(SQL)
  .then( data => {
    let booklist = data.rows;
    response.render('index', {items: booklist});
  })
});
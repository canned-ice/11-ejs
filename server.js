'use strict';

// TODO: Make sure to do a 'DROP if exists' for database

require('dotenv').config();
const pg = require('pg');
const express = require('express');
const PORT = process.env.PORT;

const app = express();
app.set('view engine', 'ejs');

const constring = process.env.DATABASE_URL;
const client = new pg.Client(constring);

client.connect();
client.on('error', err => console.error(err));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  let SQL = 'SELECT title, author, image_url FROM books';
  client.query(SQL)
  .then( data => {
    let booklist = data.rows;
    response.render('index', {items: booklist})
    console.log('going thru .then');
  })
  .catch(err => {
    console.error(err);
    response.render('error');
  })
});

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}!`));
app.use('*', (req, res) => res.render('error') );
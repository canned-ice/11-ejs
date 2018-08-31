'use strict';

require('dotenv').config();
const pg = require('pg');
const express = require('express');
const superagent = require('superagent');
const PORT = process.env.PORT || 8080; 
const app = express();
const constring = process.env.DATABASE_URL || 'postgres://localhost:5432/books_app';
const client = new pg.Client(constring);

client.connect();
client.on('error', err => console.error(err));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', showHome);
app.get('/book/:id', showBook);
app.get('/form', showForm);

app.post('/form/submit', addBook);

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}!`));
app.use('*', (req, res) => res.render('error') );


// Show the Home index page upon visit of the site
function showHome(req, res) {
  let SQL = 'SELECT title, author, image_url, id FROM books'
  client.query(SQL)
  .then( data => {
    let booklist = data.rows;
    res.render('index', {items: booklist})
  })
  .catch(err => {
    console.error(err);
    res.render('error');
  })
};

// Show a single book's details after clicking link from index
function showBook( req, res ) {
  let SQL =`SELECT * FROM books WHERE id=$1`;
  let id = req.params.id;
  let values = [id];
  client.query(SQL, values)
  .then( data =>{
    res.render('book', {item:data.rows[0]})
  })
};

// Show the add-book form
function showForm( req, res ) {
  res.render('form');
};

// Add a book's details to database AFTER clicking submit from /form
function addBook( req, res ){
  let SQL = `INSERT INTO books (title, author, image_url, description, isbn) VALUES ($1, $2, $3, $4, $5)`;
  let values = [
    req.body.title,
    req.body.author,
    req.body.image_url,
    req.body.description,
    req.body.isbn
  ];
  client.query(SQL, values)
    .then( () => {
      let newBookData = [];
      newBookData.push(req.body);
      res.render('add', {
        item: newBookData});
    });
}
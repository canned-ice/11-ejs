'use strict';

require('dotenv').config();
const pg = require('pg');
const express = require('express');
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
app.get('/new', showForm);

app.post('/new/submit', addBook);

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}!`));
app.use('*', (req, res) => res.render('error') );


// Show the Home index page upon visit of the site
function showHome(request, response) {
  let SQL = 'SELECT title, author, image_url, id FROM books'
  client.query(SQL)
  .then( data => {
    let booklist = data.rows;
    response.render('index', {items: booklist})
    console.log('going thru get.then');
  })
  .catch(err => {
    console.error(err);
    response.render('error');
  })
};

// Show a single book's details after clicking link from index
function showBook( request, response ) {
  let SQL =`SELECT * FROM books WHERE id=$1`;
  let id = request.params.id;
  let values = [id];
  client.query(SQL, values)
  .then( data =>{
    response.render('book', {item:data.rows[0]})
  })
};

// Show the add-book form
function showForm( request, response ) {
  response.render('new');
};

// Add a book's details to database AFTER clicking submit from /new
function addBook( request, response ){
  let SQL = `INSERT INTO books (title, author, image_url, description, isbn) VALUES ($1, $2, $3, $4, $5)`;
  let values = [
    request.body.title,
    request.body.author,
    request.body.image_url,
    request.body.description,
    request.body.isbn
  ];
  client.query(SQL, values)
    .then( () => {
      let newBookData = [];
      newBookData.push(request.body);
      response.render('add', {
        item: newBookData});
    });
}
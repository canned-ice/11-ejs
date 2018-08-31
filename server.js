'use strict';

// TODO: Make sure to do a 'DROP if exists' for database

require('dotenv').config();
const pg = require('pg');
const express = require('express');
const PORT = process.env.PORT || 8080; 
const app = express();
app.set('view engine', 'ejs');

console.log('I am on line 12');

const constring = process.env.DATABASE_URL || 'postgres://ashabraifrauen:troy12@localhost:5432/books_app';
const client = new pg.Client(constring);

client.connect();
client.on('error', err => console.error(err));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/book/:id', showBook);
app.get('/new/:id', addForm);
app.post('/new',addBook);
console.log('I am on line 26');
//----------------------------------------//
app.get('/', (request, response) => {
  let SQL = 'SELECT title, author, image_url, id FROM books'
  console.log('I am on line 30')
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
});

function showBook( request, response ) {
  let SQL =`SELECT * FROM books WHERE id=$1`;
  let id = request.params.id;
  
  let values = [id];

  client.query(SQL, values)
  .then( data =>{
    response.render('book', {item:data.rows[0]})
  })
};

function addForm ( request, response ) {
  let data = {
    item: request.params.item,
    id:request.params.id
  }
  response.render('new', data);
};

function addBook( request, response ){
  let SQL = `INSERT INTO books (title, author, image_url, description, id) VALUES($1, $2, $3, $4, $5)`;

  let values = [
    request.body.title,
    request.body.author,
    request.body.image_url,
    request.body.description,
    request.body.id
  ];

  client.query(SQL, values)
    .then(()=>{
      respond.render('index',{
        items: [{title: request.body.title,
              author: request.body.author,
              image_url: request.body.image_url,
              description: request.body.description
        }]
      })
    });
}

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}!`));
app.use('*', (req, res) => res.render('error') );

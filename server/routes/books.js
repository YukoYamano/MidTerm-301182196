// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model   connecting to the book model
let Book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  Book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/details', (req, res, next) => {
  res.render('books/details', {title: 'Add Book'});

    /*****************
     * ADDed CODE HERE (This is working)*
     *****************/

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/details', (req, res, next) => {
  let newBook = new Book({
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  Book.create(newBook, (err,Book) =>{
    if (err) {
      console.log(err);
      res.end(err);
  } else {
      // refresh the book list
      res.redirect('/books');
  }
  });

  //here

});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;
  //console.log(Book.findById(id));

  Book.findById(id, (err, bookToEdit) => {
    if (err) {
        console.log(err);
        res.end(err);    
    } else {
        //show the edit view
        res.render('books/edit', {title: 'Edit Book', books: bookToEdit})
    }
})
    /*****************
     * ADDed CODE HERE *
     *****************/
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id;
  let updatedBook = Book({
    "_id": id,
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
});

Book.updateOne({_id: id}, updatedBook, (err) => {
  if (err) {
      console.log(err);
      res.end(err);    
  } else {
      // refresh the book list
      res.redirect('/books');
  }
});

    /*****************
     * ADDed CODE HERE *
     *****************/

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

  Book.remove({_id: id}, (err) => {
      if (err) {
          console.log(err);
          res.end(err);    
      } else {
          // refresh the books
          res.redirect('/books');
      }
  });
    /*****************
     * ADDed CODE HERE *
     *****************/
});


module.exports = router;

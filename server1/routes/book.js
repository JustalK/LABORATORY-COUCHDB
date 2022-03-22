/**
* The endpoint of the express app
* @module routes/app
*/
'use strict'

const express = require('express')
const couch = require('../dbs/couchdb');
const booksDB = couch.db.use('books');
const router = express.Router()

// Get all object inside the couchdb
router.get('/all', async (request, response) => {
  // include doc give you the real document
  const rsl = await booksDB.list({include_docs: true})
  response.status(200).send(rsl)
})

// Get all object following a certain pattern
// https://docs.couchdb.org/en/stable/api/database/find.html
router.get('/all/selected', async (request, response) => {
  const body = await booksDB.view('main_design', 'all_books')
  response.status(200).send(body)
})

const func = function(doc) {
  emit(doc.title, doc._id);
}

// Create an object inside the couchdb
router.post('/create', async (request, response) => {
  booksDB.insert(
    { views:
      {
        all_books:
        {
          map: function(doc) {
            emit([doc.title], doc._id);
          }
        },
        all_books2:
        {
          map: function(doc) {
            emit(doc.title, doc._id);
          }
        },
        all_books3:
        {
          map: func.toString()
        },
        book_restriction:
        {
          map: function(doc) {
            if (doc.title === "Gregor and the Prophecy of Bane") {
              emit([doc.title], doc._id);
            }
          }
        },
        book_count_js:
        {
          map: function(doc) {
            if (doc.title === "Gregor and the Prophecy of Bane") {
              emit([doc.title], doc._id);
            }
          },
          reduce: '_count'
        }
      }
    }, '_design/books_all6');
  response.status(200).send(true)
})

router.get('/all/selected2', async (request, response) => {
  const body = await booksDB.view('books_all6', 'all_books2')
  response.status(200).send(body)
})

router.get('/all/selected3', async (request, response) => {
  const body = await booksDB.view('books_all6', 'all_books3')
  response.status(200).send(body)
})

router.get('/all/restricted', async (request, response) => {
  const body = await booksDB.view('books_all6', 'book_restriction')
  response.status(200).send(body)
})

router.get('/all/count', async (request, response) => {
  const body = await booksDB.view('books_all6', 'book_count_js')
  response.status(200).send(body)
})


module.exports = router

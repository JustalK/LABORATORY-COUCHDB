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

module.exports = router

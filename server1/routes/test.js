/**
* The endpoint of the express app
* @module routes/app
*/
'use strict'

const express = require('express')
const couch = require('../dbs/couchdb');
const testDB = couch.db.use('test');
const booksDB = couch.db.use('books');
const router = express.Router()

// Create an object inside the couchdb
router.post('/create', async (request, response) => {
  const rsl = await testDB.insert({ name: request.body.name }, { ddoc: "nameindex" })
  response.status(200).send(rsl)
})

// Create the index with a ddoc which can be use after in the selected
router.get('/create/indexes', async (request, response) => {
  const rsl = await testDB.createIndex({
    index: { fields: ['name'] },
    ddoc: 'namei',
    name: 'namei'
  })
  response.status(200).send(rsl)
})

// Get all object inside the couchdb
router.get('/all', async (request, response) => {
  // include doc give you the real document
  const rsl = await testDB.list({include_docs: true})
  response.status(200).send(rsl)
})

// Get all object inside the couchdb
router.get('/all2', async (request, response) => {
  // include doc give you the real document
  const rsl = await booksDB.list({include_docs: true})
  response.status(200).send(rsl)
})

// Get all object following a certain pattern
// https://docs.couchdb.org/en/stable/api/database/find.html
router.get('/all/selected', async (request, response) => {
  // include doc give you the real document
  const rsl = await testDB.find({
    selector: {
      "name": {"$regex": "whatever.*"}
    },
    fields: ["name", "_id"],
    limit: 2,
    skip: 1,
    execution_stats: true,
    use_index: "_design/namei"
  })
  response.status(200).send(rsl)
})

// Get one object inside the couchdb
router.get('/one/:id', async (request, response) => {
  const rsl = await testDB.get(request.params.id)
  response.status(200).send(rsl)
})

// Delete one object inside the couchdb
router.delete('/d/:id/:rev', async (request, response) => {
  const rsl = await testDB.destroy(request.params.id, request.params.id)
  response.status(200).send(rsl)
})

module.exports = router

/**
* The endpoint of the express app
* @module routes/app
*/
'use strict'

const express = require('express')
const couch = require('../dbs/couchdb');
const testDB = couch.db.use('test');
const router = express.Router()

// Create an object inside the couchdb
router.post('/create', async (request, response) => {
  const rsl = await testDB.insert({ name: request.body.name })
  response.status(200).send(rsl)
})

// Get all object inside the couchdb
router.get('/all', async (request, response) => {
  // include doc give you the real document
  const rsl = await testDB.list({include_docs: true})
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

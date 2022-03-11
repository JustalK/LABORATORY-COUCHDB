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



module.exports = router

/**
* The endpoint of the express app
* @module routes/app
*/
'use strict'

const express = require('express')
const router = express.Router()

// Create an object inside the couchdb
router.get('/create', async (request, response) => {
  const rsl = await dbs.insert({name: "test"})
  response.status(200).send(rsl)
})

module.exports = router

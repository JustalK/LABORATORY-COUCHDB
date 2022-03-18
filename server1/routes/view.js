/**
* The endpoint of the express app
* @module routes/app
*/
'use strict'

const express = require('express')
const couch = require('../dbs/couchdb');
const designDB = couch.db.use('design_query');
const testDB = couch.db.use('test');
const router = express.Router()

// Create an object inside the couchdb
router.post('/create', async (request, response) => {
  testDB.insert(
    { views:
      {
        by_name:
        {
          map: function(doc) {
            emit([doc.name], doc._id);
          }
        }
      }
    }, '_design/people', function (error, response) {
      console.log("yay");
    });
  response.status(200).send(true)
})

// Get all object inside the couchdb
router.get('/all', async (request, response) => {
  const body = await testDB.view('people', 'by_name', { include_docs: true })
  response.status(200).send(body)
})

module.exports = router

const express = require('express')
const app = express()
const port = 3000
const couch = require('./dbs/couchdb');

async function asyncCall() {
  const response = await couch.db.list()
  return response
}
asyncCall()

app.get('/', (req, res) => {
  res.send({
    running: true
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

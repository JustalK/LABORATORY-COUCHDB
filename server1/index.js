const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const couch = require('./dbs/couchdb');

async function asyncCall() {
  const response = await couch.db.list()
  return response
}
asyncCall()

app.use(bodyParser.json())
app.use('/', require('./routes/test'))
app.use('/view', require('./routes/view'))
app.use('/book', require('./routes/book'))

app.get('/', (req, res) => {
  res.send({
    running: true
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

const express = require('express')
const app = express()
const port = 3000
const NodeCouchdb = require('node-couchdb');

const couch = new NodeCouchdb(
  {
    host: 'couchdb',
    protocol: 'http',
    port: 5984,
    auth: {
      user: 'admin',
      password: 'test'
    }
  }
);

couch.listDatabases().then(function(dbs){
  console.log(dbs);
});

app.get('/', (req, res) => {
  res.send({
    running: true
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

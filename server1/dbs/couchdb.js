const nano = require('nano');

module.exports = nano(process.env.COUCHDB_URL || 'http://admin:test@couchdb:5984');

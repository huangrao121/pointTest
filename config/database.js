var pg = require('pg')

const db = new pg.Client({
  user,
  password,
  host,
  database,
  ssl
})
db.connect()
module.exports = db
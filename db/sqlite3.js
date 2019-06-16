const debug = require('../debug')('sqlite3');
const sqlite3 = require('sqlite3').verbose();

let db;

const connect = () => new Promise((resolve, reject) => {
  db = new sqlite3.Database(process.env.DB_NAME, (err) => {
    if (err) {
      reject(err.message);
    }
    debug(`Connected to "${process.env.DB_NAME}" SQlite database.`);
    resolve();
  });
});

const getDB = () => db;

const disconnect = () => new Promise((resolve, reject) => {
  db.close((err) => {
    if (err) {
      return reject(err.message);
    }
    debug('Close the database connection.');
    resolve();
  });
});

module.exports = {
  connect,
  getDB,
  disconnect
}
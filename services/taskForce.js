const { getDB } = require('../db/sqlite3');
const { CREATE_TABLE_EVENTS } = require('./queries');

const initializeDB = () => new Promise((resolve, reject) => {
  const db = getDB();
  db.serialize(() => {
    db.run(CREATE_TABLE_EVENTS, (err) => {
      if (!err) {
        resolve();
      } else {
        reject();
      }
    });
  });
});

module.exports = {
  initializeDB,
};

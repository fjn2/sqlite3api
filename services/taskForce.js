const { getDB } = require('../db/sqlite3');
const { CREATE_TABLE_ACTORS, CREATE_TABLE_EVENTS } = require('./queries');

const initializeDB = () => new Promise((resolve, reject) => {
  const db = getDB();
  db.serialize(() => {
    db.run(CREATE_TABLE_EVENTS);
    resolve();
  });
});

const createMockData = () => {

};

module.exports = {
  initializeDB,
  createMockData,
};

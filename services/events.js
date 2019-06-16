const { getDB } = require('../db/sqlite3');
const { DELETE_ALL_EVENTS, ADD_EVENT, GET_ALL_EVENT } = require('./queries');
const { BAD_REQUEST } = require('../utils/errorCodes');

const flatenizeData = ({ id, type, actor = {}, repo = {} }) => ({
  $id: id,
  $type: type,
  $actorId: actor.id,
  $actorLogin: actor.login,
  $actorAvatarUrl: actor.avatar_url,
  $repoId: repo.id,
  $repoName: repo.name,
  $repoUrl: repo.url
});

const unFlatenizeData = ({
  id,
  type,
  actor_id,
  actor_login,
  actor_avatar_url,
  repo_id,
  repo_name,
  repo_url,
  created_at
}) => ({
  id,
  type,
  actor: {
    id: actor_id,
    login: actor_login,
    avatar_url: actor_avatar_url
  },
  repo: {
    id: repo_id,
    name: repo_name,
    url: repo_url
  },
  created_at: created_at
});

const deleteAll = () => new Promise((resolve, reject) => {
  getDB().run(DELETE_ALL_EVENTS, (err) => {
    if (err) {
      reject(err);
      return;
    }
    resolve();
  });
});

const addOne =  data => new Promise((resolve, reject) => {
  getDB().run(ADD_EVENT, flatenizeData(data), (err) => {
    if (err) {
      if (['SQLITE_RANGE', 'SQLITE_CONSTRAINT', 'SQLITE_CONSTRAINT'].includes(err.code)) {
        const newError = new Error(err.message);
        newError.code = BAD_REQUEST;
        reject(newError);
      }

      err.code = 0;
      reject(err);
      return;
    }
    resolve();
  });
});

const getAll = ({ actorId }) => new Promise((resolve, reject) => {
  // NOTE: Due to the amount of items is not a lot, I've used 'all' instead of 'each'
  getDB().all(GET_ALL_EVENT, {
    $actor_id: actorId
  }, (err, data) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(data.map(unFlatenizeData));
  });
});

module.exports = {
  deleteAll,
  addOne,
  getAll
};
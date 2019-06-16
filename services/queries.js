module.exports = {
  DELETE_ALL_EVENTS: `DELETE FROM events`,
  CREATE_TABLE_EVENTS: `
    CREATE TABLE events (
      id INTEGER PRIMARY KEY NULL,
      type TEXT NULL,
      actor_id INTEGER NULL,
      actor_login TEXT NULL,
      actor_avatar_url INTEGER NULL,
      repo_id INTEGER NULL,
      repo_name TEXT NULL,
      repo_url TEXT NULL,
      created_at DATE default current_timestamp
    );
  `,
  ADD_EVENT: `
    INSERT INTO events (id, type, actor_id, actor_login, actor_avatar_url, repo_id, repo_name, repo_url)
    VALUES ($id, $type, $actorId, $actorLogin, $actorAvatarUrl, $repoId, $repoName, $repoUrl);
  `,
  GET_ALL_EVENT: `
    SELECT * FROM events
    WHERE
    (actor_id = $actor_id OR $actor_id is NULL)
    ORDER BY id ASC
  `
};
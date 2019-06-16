module.exports = {
  DELETE_ALL_EVENTS: 'DELETE FROM events',
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
    INSERT INTO events (id, type, actor_id, actor_login, actor_avatar_url, repo_id, repo_name, repo_url, created_at)
    VALUES ($id, $type, $actorId, $actorLogin, $actorAvatarUrl, $repoId, $repoName, $repoUrl, $createdAt);
  `,
  GET_ALL_EVENT: `
    SELECT * FROM events
    WHERE
    (actor_id = $actor_id OR $actor_id is NULL)
    ORDER BY id ASC
  `,
  EDIT_AVATARS_BY_ACTOR: `
    UPDATE events
    SET actor_avatar_url = $actor_avatar_url
    WHERE
      actor_id  = $actor_id
  `,
  GET_ALL_ACTORS: `
    SELECT DISTINCT(actor_id), actor_login, actor_avatar_url from events
    group by actor_id
    ORDER BY COUNT(*) DESC, created_at DESC, actor_login ASC
  `,
  GET_STREAK: `
    SELECT
    actor_id, actor_login, actor_avatar_url, group_concat(created_at) as events_date, MAX(created_at) last_event
    FROM
    events
    group by
    actor_id
    ORDER BY actor_id;
  `,
};

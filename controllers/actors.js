// const debug = require('../debug')('actors');
const { editByActor, getAllActors, getStreakActors } = require('../services/events');
const { BAD_REQUEST, NOT_FOUND } = require('../utils/errorCodes');

const getAllActorsFromEvents = () => getAllActors()
  .then(actors => actors.map(({ actor }) => (actor)));

const updateActor = ({ id, avatar_url }) => {
  if (!id) {
    const noIdError = new Error('The actor_id is missing');
    noIdError.code = BAD_REQUEST;
    throw noIdError;
  }

  return editByActor({ id, avatar_url }).then(({ changes }) => {
    if (!changes) {
      const noActorError = new Error('The actor_id does not exists');
      noActorError.code = NOT_FOUND;
      throw noActorError;
    }
  });
};

const ONE_DAY_DIFF = 86400000;

const streakCalculation = (eventsDate) => {
  let maxStreak = 1;
  const dates = eventsDate.split(',')
    .map(stringDate => new Date(stringDate))
    .sort((a, b) => a - b);
  let inProgressStreak = 1;
  for (let i = 0; i < dates.length - 1; i += 1) {
    const currentDate = new Date(
      dates[i].getFullYear(),
      dates[i].getMonth(),
      dates[i].getDate(),
    ).getTime();
    const nextDate = new Date(
      dates[i + 1].getFullYear(),
      dates[i + 1].getMonth(),
      dates[i + 1].getDate(),
    ).getTime();

    if (nextDate - currentDate === ONE_DAY_DIFF) {
      inProgressStreak += 1;
      if (inProgressStreak > maxStreak) {
        maxStreak = inProgressStreak;
      }
    } else {
      inProgressStreak = 1;
    }
  }

  return maxStreak;
};

const getStreak = () => getStreakActors().then((data) => {
  const computedData = data.map(actor => ({
    ...actor,
    streak: streakCalculation(actor.events_date),
  }));

  const sortedResult = computedData.sort((a, b) => {
    if (a.streak !== b.streak) {
      return b.streak - a.streak;
    }
    if (a.last_event.getTime() !== b.last_event.getTime()) {
      return b.last_event.getTime() - a.last_event.getTime();
    }

    return a.login - b.login;
  });

  return sortedResult;
}).then(data => (data.map((item => ({
  avatar_url: item.actor_avatar_url,
  id: item.actor_id,
  login: item.actor_login,
})))));

module.exports = {
  updateActor,
  getAllActorsFromEvents,
  getStreak,
};

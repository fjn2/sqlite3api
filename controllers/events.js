const debug = require('../debug')('events');
const { deleteAll, addOne, getAll } = require('../services/events');

const getEvents = (params) => getAll(params);

const addEvent = data => addOne(data).then((newEvent) => {
	debug('A new event has been created');
	return newEvent;
});


const eraseEvents = () => deleteAll().then(() => {
	debug('All events has been removed');
});

module.exports = {
	getEvents,
	addEvent,
	eraseEvents
};


















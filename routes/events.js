const express = require('express');

const { addEvent, getEvents } = require('../controllers/events');
const { NOT_FOUND } = require('../utils/errorCodes');

const router = express.Router();

router.get('/', (req, res) => {
  getEvents().then((resp) => {
    res.status(200).send(resp);
  }).catch((err) => {
    res.status(err.code || 500).send({
      errors: [err.message],
    });
  });
});

router.get('/actors/:actorId', (req, res) => {
  getEvents({
    actorId: req.params.actorId,
  }).then((resp) => {
    if (resp.length === 0) {
      const notFoundError = new Error('The actor was not found');
      notFoundError.code = NOT_FOUND;
      throw notFoundError;
    }
    res.status(200).send(resp);
  }).catch((err) => {
    res.status(err.code || 500).send({
      errors: [err.message],
    });
  });
});

router.post('/', (req, res) => {
  addEvent(req.body).then((resp) => {
    res.status(201).send(resp);
  }).catch((err) => {
    res.status(err.code || 500).send({
      errors: [err.message],
    });
  });
});

module.exports = router;

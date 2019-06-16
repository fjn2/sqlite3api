const express = require('express');

const { addEvent, eraseEvents, getEvents } = require('../controllers/events');
const { BAD_REQUEST, NOT_FOUND } = require('../utils/errorCodes');

const router = express.Router();

router.get('/', (req, res, next) => {
  getEvents().then((resp) => {
    res.status(200).send({
      data: resp
    });
  }).catch((err) => {
    res.status(err.code || 500).send({
      errors: [err.message]
    });
  });;
});

router.get('/actors/:actorId', (req, res, next) => {
  getEvents({
    actorId: req.params.actorId
  }).then((resp) => {
    if (resp.length === 0) {
      const notFoundError = new Error('The actor was not found');
      notFoundError.code = NOT_FOUND;
      throw notFoundError;
    }
    res.status(200).send({
      data: resp
    });
  }).catch((err) => {
    res.status(err.code || 500).send({
      errors: [err.message]
    });
  });;
});

router.post('/', (req, res, next) => {
  addEvent(req.body).then((resp) => {
    res.status(201).send({
      data: resp
    });
  }).catch((err) => {
    res.status(err.code || 500).send({
      errors: [err.message]
    });
  });;
});

router.delete('/', (req, res, next) => {
  eraseEvents().then(() => {
    res.send({
      data: { status: 'ok' },
    });
  }).catch((err) => {
    res.status(err.code || 500).send({
      errors: [err.message]
    });
  });
});


module.exports = router;
const express = require('express');

const router = express.Router();
const { getAllActorsFromEvents, updateActor, getStreak } = require('../controllers/actors');

router.get('/', (req, res) => {
  getAllActorsFromEvents().then((resp) => {
    res.status(200).send(resp);
  }).catch((err) => {
    res.status(err.code || 500).send({
      errors: [err.message],
    });
  });
});

router.put('/', (req, res) => {
  updateActor(req.body).then((resp) => {
    res.status(200).send(resp);
  }).catch((err) => {
    res.status(err.code || 500).send({
      errors: [err.message],
    });
  });
});

router.get('/streak', (req, res) => {
  getStreak().then((resp) => {
    res.status(200).send(resp);
  }).catch((err) => {
    res.status(err.code || 500).send({
      errors: [err.message],
    });
  });
});
module.exports = router;

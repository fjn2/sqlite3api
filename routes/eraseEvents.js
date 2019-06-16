const express = require('express');
const { eraseEvents } = require('../controllers/events');

const router = express.Router();

router.delete('/', (req, res) => {
  eraseEvents().then(() => {
    res.send({ status: 'ok' });
  }).catch((err) => {
    res.status(err.code || 500).send({
      errors: [err.message],
    });
  });
});

module.exports = router;

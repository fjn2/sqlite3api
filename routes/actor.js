const express = require('express');
const router = express.Router();
const { getAllActors, updateActor, getStreak } = require('../controllers/actors');

router.put('/', (req, res, next) => {
  updateActor(req.body).then((resp) => {
    res.status(200).send({
      data: resp
    });
  }).catch((err) => {
    res.status(err.code || 500).send({
      errors: [err.message]
    });
  });;
});

module.exports = router;
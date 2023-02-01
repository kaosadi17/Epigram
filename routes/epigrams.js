const express = require('express');
const router = express.Router();
const epigrams = require('../services/epigrams');

router.get('/', async function(req, res, next) {
  try {
    res.json(await epigrams.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting epigrams `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await epigrams.create(req.body));
  } catch (err) {
    console.error(`Error while posting epigrams `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

module.exports = router;

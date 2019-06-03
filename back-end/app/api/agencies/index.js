const { Router } = require('express');
const { Agency } = require('../../models');


const router = new Router();


router.post('/', (req, res) => {
  try {
    const agency = Agency.create(req.body);
    res.status(201).json(agency);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.get('/', (req, res) => {
  try {
    const agency = Agency.getAgencys(req.query);
    res.status(200).json(agency);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.get('/available_countries', (req, res) => {
  try {
    const countries = Agency.getAvailableCountries();
    res.status(200).json(countries);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;

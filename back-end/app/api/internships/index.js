const { Router } = require('express');
const { Internship } = require('../../models');


const router = new Router();

router.post('/', (req, res) => {
  try {
    const internship = Internship.create(req.body);
    res.status(201).json(internship);
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
    const internships = Internship.getInternships(req.query);
    res.status(200).json(internships);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.post('/set_validity', (req, res) => {
  try {
    const hasBeenValidated = Internship.setValidity(req.body);
    if(hasBeenValidated){
      res.status(200).json('ok');
    } else {
      res.status(200).json('ko');
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.get('/statistics', (req, res) => {
  try {
    const stats = Internship.getStatistics();
    res.status(200).json(stats);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.get('/max_duration', (req, res) => {
  try {
    const maxDuration = Internship.getMaxDuration();
    res.status(200).json(maxDuration);
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
    const countries = Internship.getAvailableCountries();
    res.status(200).json(countries);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.get('/available_sections', (req, res) => {
  try {
    const sections = Internship.getAvailableSections();
    res.status(200).json(sections);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;

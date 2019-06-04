const { Router } = require('express');
const { Internship } = require('../../models');
const CommonMids = require('../../utils/common-mids.js');

const router = new Router();

router.post('/', CommonMids.catchError, (req, res) => {
  const internship = Internship.create(req.body, req.query);
  res.status(201).json(internship);
});

router.get('/', CommonMids.catchError, (req, res) => {
  const internships = Internship.getInternships(req.query);
  res.status(200).json(internships);
});

router.post('/set_validity', CommonMids.catchError, (req, res) => {
  const hasBeenValidated = Internship.setValidity(req.body);
  if (hasBeenValidated) {
    res.status(200).json('ok');
  } else {
    res.status(200).json('ko');
  }
});

router.get('/statistics', CommonMids.catchError, (req, res) => {
  const stats = Internship.getStatistics();
  res.status(200).json(stats);
});

router.get('/max_duration', CommonMids.catchError, (req, res) => {
  const maxDuration = Internship.getMaxDuration();
  res.status(200).json(maxDuration);
});

router.get('/available_countries', CommonMids.catchError, (req, res) => {
  const countries = Internship.getAvailableCountries();
  res.status(200).json(countries);
});

router.get('/available_sections', CommonMids.catchError, (req, res) => {
  const sections = Internship.getAvailableSections();
  res.status(200).json(sections);
});

module.exports = router;

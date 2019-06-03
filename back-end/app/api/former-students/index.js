const { Router } = require('express');
const { FormerStudent } = require('../../models');


const router = new Router();

router.post('/', (req, res) => {
  try {
    const formerStudent = FormerStudent.create(req.body);
    res.status(201).json(formerStudent);
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
    const formerStudents = FormerStudent.getFormerStudents(req.query);
    res.status(200).json(formerStudents);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.get('/available_countries', (req, res) => {
  try {
    const countries = FormerStudent.getAvailableCountries();
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
    const sections = FormerStudent.getAvailableSections();
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

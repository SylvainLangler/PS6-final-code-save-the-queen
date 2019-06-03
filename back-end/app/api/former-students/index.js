const { Router } = require('express');
const { FormerStudent } = require('../../models');
const CommonMids = require('../../utils/common-mids.js');


const router = new Router();

router.post('/', CommonMids.catchError, (req, res) => {
  const formerStudent = FormerStudent.create(req.body);
  res.status(201).json(formerStudent);
});

router.get('/', CommonMids.catchError, (req, res) => {
  const formerStudents = FormerStudent.getFormerStudents(req.query);
  res.status(200).json(formerStudents);
});

router.get('/allFormerStudents', CommonMids.catchError, (req, res) => {
  const formerStudents = FormerStudent.getAllFormerStudents();
  res.status(200).json(formerStudents);
});

router.get('/available_countries', CommonMids.catchError, (req, res) => {
  const countries = FormerStudent.getAvailableCountries();
  res.status(200).json(countries);
});

router.get('/available_sections', CommonMids.catchError, (req, res) => {
  const sections = FormerStudent.getAvailableSections();
  res.status(200).json(sections);
});

module.exports = router;

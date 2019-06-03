const { Router } = require('express');
const { Agency } = require('../../models');
const CommonMids = require('../../utils/common-mids.js');


const router = new Router();


router.post('/', CommonMids.catchError, (req, res) => {
  const agency = Agency.create(req.body);
  res.status(201).json(agency);
});

router.get('/', CommonMids.catchError, (req, res) => {
  const agency = Agency.getAgencys(req.query);
  res.status(200).json(agency);
});

router.get('/available_countries', CommonMids.catchError, (req, res) => {
  const countries = Agency.getAvailableCountries();
  res.status(200).json(countries);
});

module.exports = router;

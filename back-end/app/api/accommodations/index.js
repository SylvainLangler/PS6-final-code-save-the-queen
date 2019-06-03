const { Router } = require('express');
const { Accommodation } = require('../../models');
const CommonMids = require('../../utils/common-mids.js');

const router = new Router();

router.post('/', CommonMids.catchError, (req, res) => {
  const accommodation = Accommodation.create(req.body);
  res.status(201).json(accommodation);
});

router.get('/', CommonMids.catchError, (req, res) => {
  const accommodations = Accommodation.getAccommodations(req.query);
  res.status(200).json(accommodations);
});

router.get('/max_price', CommonMids.catchError, (req, res) => {
  const maxPrice = Accommodation.getMaxPrice();
  res.status(200).json(maxPrice);
});

router.get('/max_surface', CommonMids.catchError, (req, res) => {
  const maxSurface = Accommodation.getMaxSurface();
  res.status(200).json(maxSurface);
});

router.get('/available_countries', CommonMids.catchError, (req, res) => {
  const countries = Accommodation.getAvailableCountries();
  res.status(200).json(countries);
});

module.exports = router;

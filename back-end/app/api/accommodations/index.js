const { Router } = require('express');
const { Accommodation } = require('../../models');


const router = new Router();


router.post('/', (req, res) => {
  try {
    const accommodation = Accommodation.create(req.body);
    res.status(201).json(accommodation);
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
    const accommodations = Accommodation.getAccommodations(req.query);
    res.status(200).json(accommodations);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.get('/max_price', (req, res) => {
  try {
    const maxPrice = Accommodation.getMaxPrice();
    res.status(200).json(maxPrice);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.get('/max_surface', (req, res) => {
  try {
    const maxSurface = Accommodation.getMaxSurface();
    res.status(200).json(maxSurface);
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
    const countries = Accommodation.getAvailableCountries();
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

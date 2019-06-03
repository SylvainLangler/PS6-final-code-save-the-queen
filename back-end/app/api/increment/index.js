const { Router } = require('express');
const { Increment } = require('../../models');

const router = new Router();

router.post('/', (req, res) => {
  try {
    const increment = Increment.increment();
    res.status(201).json(increment);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

/*router.get('/', (req, res) => {
  try {
    const result = Increment.increment();
    res.status(200).json(result);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});*/

module.exports = router;

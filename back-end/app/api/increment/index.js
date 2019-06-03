const { Router } = require('express');
const { Increment } = require('../../models');

const router = new Router();

router.post('/', (req, res) => {
  try {
    const increment = Increment.increment();

    const io = req.app.get('io');
    io.emit('mash', "mashalla");
  
    res.status(201).json(increment);
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
    console.log('value : ', Increment.getValue());
    
    res.status(200).json(Increment.getValue());
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;

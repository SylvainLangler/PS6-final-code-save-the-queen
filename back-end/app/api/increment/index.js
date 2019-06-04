const { Router } = require('express');
const { Increment } = require('../../models');
const CommonMids = require('../../utils/common-mids.js');

const router = new Router();

router.post('/', CommonMids.catchError, (req, res) => {
  const id = req.body.id;

  if (id === undefined) {
    throw err;
  }

  const increment = Increment.increment();
  const io = req.app.get('io');

  const smap = req.app.get('smap');

  if (smap[id] !== undefined) {
    smap[id].emit('ouai', 'yeppa');
  }

  if (id == 15651565112) {
    console.log('12 a posté');

    res.status(200).json(69);
  } else if (id == 15877166342) {
    console.log('42 a posté');
    res.status(200).json(96);
  } else {
    res.status(403).json('Rip');
  }

  //   io.emit('mash', 'mashalla');
  //   res.status(201).json(increment);
});

router.get('/:id', CommonMids.catchError, (req, res) => {
  const id = req.param('id');

  if (id == 15651565112) {
    console.log('12 a get');
    res.status(200).json(69);
  } else if (id == 15877166342) {
    console.log('42 a get');
    res.status(200).json(96);
  } else {
    res.status(403).json('Rip');
  }
});

module.exports = router;

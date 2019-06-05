const { Router } = require('express');
const { Increment, Admin, Internship } = require('../../models');
const CommonMids = require('../../utils/common-mids.js');

const router = new Router();

router.post('/', CommonMids.catchError, (req, res) => {
  const id = req.body.id;

  if (id === undefined) {
    throw err;
  }

  // const increment = Increment.increment();
  const io = req.app.get('io');

  const smap = req.app.get('smap');

  Internship.setFirstValidity(id, true);

  console.log(smap[id]);
  if (smap[id] !== undefined) {
    smap[id].emit('up', 'upped');
  }

    res.status(200).json('next internship');


  // if (id == 15651565112) {
  //   console.log('12 a posté');

  //   res.status(200).json(69);
  // } else if (id == 15877166342) {
  //   console.log('42 a posté');
  //   res.status(200).json(96);
  // } else {
  //   res.status(403).json('Rip');
  // }

  //   io.emit('mash', 'mashalla');
  //   res.status(201).json(increment);
});

router.get('/:id', CommonMids.catchError, (req, res) => {
  res.status(200).json(Admin.getFirstUnvalidatedAdminStage(req.param('id'), Internship.get()));
  
  // if (id == 15651565112) {
  //   console.log('12 a get');
  //   res.status(200).json(69);
  // } else if (id == 15877166342) {
  //   console.log('42 a get');
  //   res.status(200).json(96);
  // } else {
  //   res.status(403).json('Rip');
  // }
});

module.exports = router;

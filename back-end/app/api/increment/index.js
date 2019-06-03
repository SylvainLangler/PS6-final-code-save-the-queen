const { Router } = require('express');
const { Increment } = require('../../models');
const CommonMids = require('../../utils/common-mids.js');

const router = new Router();

router.post('/', CommonMids.catchError, (req, res) => {
    const increment = Increment.increment();
    const io = req.app.get('io');
    io.emit('mash', "mashalla");
    res.status(201).json(increment);
});

router.get('/', CommonMids.catchError, (req, res) => {
    res.status(200).json(Increment.getValue());
});

module.exports = router;

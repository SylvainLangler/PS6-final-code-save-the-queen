const { Router } = require('express');
const InternshipRouter = require('./internships');
const AccommodationRouter = require('./accommodations');
const AgencyRouter = require('./agencies');
const FormerStudentRouter = require('./former-students');
const IncrementRouter = require('./increment');
const AdminRouter = require('./admin');
const ConnectionRouter = require('./connection');

const router = new Router();
router.get('/status', (req, res) => res.status(200).json('ok'));
router.use('/internships', InternshipRouter);
router.use('/accommodations', AccommodationRouter);
router.use('/agencies', AgencyRouter);
router.use('/former-students', FormerStudentRouter);
router.use('/increment', IncrementRouter);
router.use('/admin', AdminRouter);
router.use('/connection', ConnectionRouter);

module.exports = router;

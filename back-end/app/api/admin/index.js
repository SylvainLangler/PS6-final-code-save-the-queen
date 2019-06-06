const { Router } = require('express');
const { Admin, Internship } = require('../../models');
const CommonMids = require('../../utils/common-mids.js');

const router = new Router();

router.get('/first_unvalidated_internship', CommonMids.catchError, (req, res) => {
	res.status(200).json(Admin.getFirstUnvalidatedAdminStage(req.query.adminId, Internship.get()));
});


router.post('/connect', CommonMids.catchError, (req, res) => {
  const connectedUser = Admin.connectWithPassword(req.body);
  if (connectedUser) {
    	res.status(200).json({ status: 'ok', id: connectedUser.id, token: connectedUser.token });
  } else {
    	res.status(200).json({ status: 'ko', id: null, token: null });
  }
});

router.post('/token_connect', CommonMids.catchError, (req, res) => {
  const connectedUser = Admin.connectWithToken(req.body);
  if (connectedUser) {
    	res.status(200).json({ status: 'ok', id: connectedUser.id, token: connectedUser.token });
  } else {
    	res.status(200).json({ status: 'ko', id: null, token: null });
  }
});

module.exports = router;

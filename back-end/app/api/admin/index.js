const { Router } = require('express');
const { Admin, Internship } = require('../../models');
const CommonMids = require('../../utils/common-mids.js');

const router = new Router();

router.get('/first_unvalidated_internship', CommonMids.catchError, (req, res) => {
	res.status(200).json(Admin.getFirstUnvalidatedAdminStage(req.query, Internship.get()));
});

router.post('/validate', CommonMids.catchError, (req, res) => {
	if(Internship.setValidity(req.body, true)){
		res.status(200).json('ok');
	} else {
		res.status(200).json('ko');
	}
});

router.delete('/refuse/:adminId', CommonMids.catchError, (req, res) => {
	let id = Admin.getFirstUnvalidatedAdminStage(req.param('adminId'), Internship.get()).id;
	Internship.delete(id);
	res.status(200).json('ok');
});

router.post('/connect', CommonMids.catchError, (req, res) => {
  const connectedUser = Admin.connectWithPassword(req.body);
  if (connectedUser) {
    	res.status(200).json({ status: 'ok', id: connectedUser.id, token: connectedUser.token });
  } else {
    	res.status(200).json({ status: 'ko', id: null, token: null});
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

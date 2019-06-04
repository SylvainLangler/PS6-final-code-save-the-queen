const { Router } = require('express');
const { BaseModel } = require('../../utils/base-model.js')
const { Admin, Internship } = require('../../models');
const CommonMids = require('../../utils/common-mids.js');

const router = new Router();

router.get('/unvalidated_internships', CommonMids.catchError, (req, res) => {
	/*if(Admin.isConnectedToken(req.query.mail, req.query.token)){
		res.status(200).json(Admin.getUnvalidatedAdminStage(req.query));
	} else {
		res.status(200).json('not connected');
	}*/
	Admin.getUnvalidatedAdminStage(req.query);
	return;

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

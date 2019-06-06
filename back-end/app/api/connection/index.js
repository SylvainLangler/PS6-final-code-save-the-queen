const { Router } = require('express');
const { Admin, Internship } = require('../../models');
const CommonMids = require('../../utils/common-mids.js');

const router = new Router();


router.post('/connect', CommonMids.catchError, (req, res) => {
  const connectedUser = Admin.connectWithPassword(req.body);
  if (connectedUser) {
    	res.status(200).json({ status: 'ok', id: connectedUser.id, token: connectedUser.token });
  } else {
    	res.status(200).json({ status: 'ko', id: null, token: null });
  }
});


module.exports = router;

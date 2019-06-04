const { Router } = require('express');
const { Connection } = require('../../models');
const CommonMids = require('../../utils/common-mids.js');

const router = new Router();

router.post('/connect', CommonMids.catchError, (req, res) => {
    const connectedUser = Connection.connectWithPassword(req.body);
    if(connectedUser){
    	res.status(200).json({status:'ok', id: connectedUser.id, token: connectedUser.token});
    } else {
    	res.status(200).json({status:'ko'});
    }
});

router.post('/token_connect', CommonMids.catchError, (req, res) => {
	let connectedUser = Connection.connectWithToken(req.body);
	if(connectedUser){
    	res.status(200).json({status:'ok', id: connectedUser.id, token: connectedUser.token});
    } else {
    	res.status(200).json({status:'ko'});
    }
});

module.exports = router;

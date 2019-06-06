const { Router } = require("express");
const { Increment, Admin, Internship } = require("../../models");
const CommonMids = require("../../utils/common-mids.js");

const router = new Router();

router.post("/", CommonMids.catchError, (req, res) => {
  const id = req.body.id;
  let msg = "";

  if (id === undefined) {
    throw id;
  }

  if (req.body.invalidate) {
    let idi = Admin.getFirstUnvalidatedAdminStage(req.body.id, Internship.get())
      .id;
    Internship.delete(idi);
    msg = "Correctly removed";
  } else if (req.body.delay) {
    Internship.moveToLast(
      Admin.getFirstUnvalidatedAdminStage(req.body.id, Internship.get())
    );
    msg = "Correctly delayed";
  } else {
    Internship.setFirstValidity(id, true);
    msg = "Correctly validated";
  }

  // TODO lasocket
  const io = req.app.get('io');
  io.emit('up', 'upped');
  res.status(200).json(msg);

  // const smap = req.app.get('smap');

  // console.log(smap[id]);
  // if (smap[id] !== undefined) {
  //   smap[id].emit('up', 'upped');
  // }
});

router.get("/", CommonMids.catchError, (req, res) => {
  res.status(200).json(Admin.getFirstUnvalidatedAdminStage(req.query.id, Internship.get()));
});

module.exports = router;

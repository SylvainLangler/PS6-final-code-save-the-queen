

class CommonMids{

	catchError(req, res, next) {
    try {
      next();
    } catch (err) {
      if (err.name === 'ValidationError') {
        res.status(400).json(err.extra);
      } else {
        res.status(500).json(err);
      }
    }
  }
}

module.exports = new CommonMids();
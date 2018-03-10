

function adminGatekeeper (req, res, next) {
  if (!req.admin) {
    res.status(403).end();
  } else {
    next();
  }
}


module.exports = {
  adminGatekeeper
};

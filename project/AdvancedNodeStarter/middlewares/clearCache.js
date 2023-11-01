const { clearHash } = require("../services/cache");

/**
 * !! POST request middleware
 */
module.exports = async (req, res, next) => {
  // call next() first / route handler, wait for it
  await next();
  clearHash(req.user.id);
};

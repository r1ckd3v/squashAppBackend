// Health Check

exports.getHealthCheck = (req, res, next) => {
  res.status(200).send('Squash Backend Server is OK! ✅');
};

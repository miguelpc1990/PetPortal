const router = require('express').Router();
const dogRoutes = require('./dog-routes');

router.use('/dogs', dogRoutes);

module.exports = router;
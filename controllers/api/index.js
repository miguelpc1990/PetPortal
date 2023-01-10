const router = require('express').Router();
const dogRoutes = require('./dog-routes');
// const userRoutes = require('../home-routes');

router.use('/dogs', dogRoutes);
// router.use('/users', userRoutes);

module.exports = router;
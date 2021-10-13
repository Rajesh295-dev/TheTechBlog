//Dependencies
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

//routes set up
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

//module Exports
module.exports = router;

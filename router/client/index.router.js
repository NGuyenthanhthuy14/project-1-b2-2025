const router =require ('express').Router();
const tourRouters =require ("./tour.router")
const homeRouter = require ("./home.router")

router.use('/tours', tourRouters);

router.use('/', homeRouter);

module.exports = router;
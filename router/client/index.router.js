const router =require ('express').Router();
const tourRouters =require ("./tour.router")
const homeRouter = require ("./home.router")
const cartRouter = require ("./cart.router")

router.use('/tours', tourRouters);

router.use('/', homeRouter);

router.use('/cart', cartRouter);

module.exports = router;
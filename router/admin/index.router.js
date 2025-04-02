const router =require ('express').Router();
const accountRouters =require ("./account.router")
const dashboardRouters = require ("./dashboard.router")
const categoryRouters = require ("./catagory.router")
const tourRouter = require("./tour.router")
const orderRouter = require("./order.router")

router.use ('/account', accountRouters)

router.use ('/dashboard', dashboardRouters)

router.use ('/category', categoryRouters)

router.use ('/tour', tourRouter)

router.use ('/order', orderRouter)

module.exports = router;
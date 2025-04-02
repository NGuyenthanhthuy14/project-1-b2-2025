const router =require ('express').Router();
const accountRouters =require ("./account.router")
const dashboardRouters = require ("./dashboard.router")
const categoryRouters = require ("./catagory.router")

router.use ('/account', accountRouters)

router.use ('/dashboard', dashboardRouters)

router.use ('/category', categoryRouters)

module.exports = router;
const router =require ('express').Router();
const accountRouters =require ("./account.router")
const dashboardRouters = require ("./dashboard.router")
const categoryRouters = require ("./catagory.router")
const tourRouter = require("./tour.router")
const orderRouter = require("./order.router")
const userRouters = require("./user.router")
const contactRouters = require("./contact.router")
const settingRouters = require("./setting.router")
const profileRouters = require("./profile.router")

const authMiddleware = require ("../../middlewares/admin/auth.middleware")

router.use ('/account', accountRouters)

router.use ('/dashboard',authMiddleware.verifyToken ,dashboardRouters)

router.use ('/category', authMiddleware.verifyToken , categoryRouters)

router.use ('/tour', authMiddleware.verifyToken ,  tourRouter)

router.use ('/order',authMiddleware.verifyToken , orderRouter)

router.use ('/user',authMiddleware.verifyToken , userRouters)

router.use ('/contact',authMiddleware.verifyToken , contactRouters)

router.use ('/setting',authMiddleware.verifyToken , settingRouters)

router.use ('/profile',authMiddleware.verifyToken , profileRouters)

router.get ('*', authMiddleware.verifyToken ,(req, res) => {
    res.render ("admin/pages/error-404", {
        title: "404 Not Found"
    })
})

module.exports = router;
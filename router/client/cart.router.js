const router = require ("express").Router();


const cartController = require("../../controllers/clients/cart.controller")

router.get('/', cartController.cart)

module.exports = router
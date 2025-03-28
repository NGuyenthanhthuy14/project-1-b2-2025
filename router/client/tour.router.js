const router =require ('express').Router();

const tourController = require("../../controllers/clients/tour.controller");

router.get('/', tourController.list);

module.exports = router;
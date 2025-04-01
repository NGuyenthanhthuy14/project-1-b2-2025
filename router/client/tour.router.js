const router =require ('express').Router();

const tourController = require("../../controllers/clients/tour.controller");

router.get('/', tourController.list);
router.get('/detail', tourController.detail);


module.exports = router;
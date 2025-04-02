const router =require ('express').Router();

const accountController = require("../../controllers/admin/account.controller");

const registerController = require("../../controllers/admin/register.controller")


router.get('/login', accountController.login);

router.get('/register', registerController.register)


module.exports = router;
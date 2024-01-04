const router = require('express').Router();
const {loginController, logoutController} = require('../controllers/user/authController');
const { authorization } = require('../middlewares/auth/authorization');
 

router.post('/login',loginController);
router.post('/logout',authorization,logoutController);
module.exports = router;
const router = require('express').Router();
const {tokenVerify} = require('../../middlewares/auth/authMiddleware');
const authController = require('../../controllers/auth/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', tokenVerify, authController.logout);
router.get('/profile', tokenVerify, authController.profile);
router.patch('/update', tokenVerify, authController.updateProfile);

module.exports = router;
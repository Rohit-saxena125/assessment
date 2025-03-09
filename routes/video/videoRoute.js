const router = require('express').Router();
const {tokenVerify} = require('../../middlewares/authMiddleware');
const videoController = require('../../controllers/video/videoControlller');

router.get('/users', tokenVerify, videoController.getAllUsers);
router.get('/user/:id', tokenVerify, videoController.getUser);

module.exports = router;
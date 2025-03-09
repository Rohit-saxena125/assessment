const router = require('express').Router();
const {videoUpload, profileUpload} = require('../../middlewares/upload/upload');
const {tokenVerify} = require('../../middlewares/auth/authMiddleware');
const uploadController = require('../../controllers/upload/uploadController');

router.post('/video', tokenVerify, videoUpload, uploadController.uploadVideo);
router.post('/profile', tokenVerify, profileUpload, uploadController.profileImage);

module.exports = router;
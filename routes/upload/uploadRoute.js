const router = require('express').Router();
const {videoUpload, profileUpload} = require('../../middlewares/upload/upload');
const {tokenVerify} = require('../../middlewares/authMiddleware');
const uploadController = require('../../controllers/upload/uploadController');

router.post('/video', tokenVerify, videoUpload, uploadController.uploadVideo);
router.post('/profileImage', tokenVerify, profileUpload, uploadController.profileImage);

module.exports = router;
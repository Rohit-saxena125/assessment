const User = require('../../models/user/userModel');
const Video = require('../../models/video/videoModel');
const {
  badRequestErrorResponse,
  internalServerErrorResponse,
  successResponse,
} = require('../../utils/customResponse');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        const data = await Promise.all(
            users.map(async (user) => {
                const videos = await Video.find({ user: user._id }).skip(0).limit(5);
                return { ...user._doc, videos };
            })
        );
        return successResponse(res, data);

    } catch (error) {
        return internalServerErrorResponse(res, error);
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return badRequestErrorResponse(res, 'User not found');
        }
        const videos = await Video.find({ user: user._id });
        return successResponse(res, { ...user._doc, videos });
    } catch (error) {
        return internalServerErrorResponse(res, error);
    }
}
const video = require("../../models/video/videoModel");
const {
  successResponse,
  badRequestErrorResponse,
  internalServerErrorResponse,
} = require("../../utils/customResponse");
const User = require("../../models/user/userModel");

exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, thumbnail } = req.body;
    const videoUrl = req.file.location;
    const user = await User.findById(req.user._id);
    if (!user) {
      return badRequestErrorResponse(res, "User not found");
    }
    const newVideo = new video({
      title,
      description,
      thumbnail,
      videoUrl,
      user: req.user._id,
    });
    await newVideo.save();
    return successResponse(res, "Video uploaded successfully");
  } catch (error) {
    return internalServerErrorResponse(res, error);
  }
};

exports.profileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return badRequestErrorResponse(res, "User not found");
    }
    user.profile = req.file.location;
    await user.save();
    return successResponse(res, "Profile image uploaded successfully");
  } catch (error) {
    return internalServerErrorResponse(res, error);
  }
};

const User = require("../../models/user/userModel");
const Video = require("../../models/video/videoModel");
const {
  badRequestErrorResponse,
  internalServerErrorResponse,
  successResponse,
} = require("../../utils/customResponse");
const { generatePassword, sendEmail } = require("../../utils/helper");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const password = generatePassword(firstName, lastName, phone);
    const user = await User.findOne({ firstName });
    if (user) {
      return badRequestErrorResponse(res, "User already exists");
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
    });
    await newUser.save();
    await sendEmail({
      email,
      subject: "Registration Successful",
      message: `<html>
        <body>
          <h3>Hi ${firstName},</h3>
          <p>Your registration is successful.</p>
          <p>Your password is: ${password}</p>
        </body>
      </html>`,
    });
    return successResponse(res, "User registered successfully");
  } catch (error) {
    return internalServerErrorResponse(res, error);
  }
};

exports.login = async (req, res) => {
  try {
    const { firstName, password } = req.body;
    const user = await User.findOne({ firstName });
    if (!user) {
      return badRequestErrorResponse(res, "Invalid credentials");
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return badRequestErrorResponse(res, "Invalid credentials");
    }
    const accessToken = user.getSignedJwtToken();
    const refreshToken = user.getSignedJwtRefreshToken();
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return successResponse(res, "User logged in successfully", {
      accessToken,
    });
  } catch (error) {
    return internalServerErrorResponse(res, error);
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return successResponse(res, "User logged out successfully");
  } catch (error) {
    return internalServerErrorResponse(res, error);
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const videos = await Video.find({ user: req.user._id });
    return successResponse(res, "User profile", { user, videos });
  } catch (error) {
    return internalServerErrorResponse(res, error);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: req.body },
      { new: true }
    );
    return successResponse(res, "Profile updated successfully", user);
  } catch (error) {
    return internalServerErrorResponse(res, error);
  }
};

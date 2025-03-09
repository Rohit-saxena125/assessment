const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.Region,
  credentials: {
    accessKeyId: process.env.Access_key,
    secretAccessKey: process.env.Secret_Access_Key,
  },
});

exports.videoUpload = multer({
  limits: { fileSize: 1024 * 1024 * 6 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "video/mp4") {
      cb(null, true);
    } else {
      cb(new Error("Only mp4 video allowed"));
    }
  },
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.Bucket,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
}).single("video");

exports.profileUpload = multer({
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only jpeg, jpg, png images allowed"));
    }
  },
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.Bucket,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
}).single("profile");

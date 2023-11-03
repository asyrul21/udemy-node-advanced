const AWS = require("aws-sdk");
const uuid = require("uuid/v1");
const keys = require("../config/keys");
const requireLogin = require("../middlewares/requireLogin");

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
  },
  region: "ap-southeast-1",
});

module.exports = (app) => {
  /*
   * Get Pre-Signed AWS Upload URL
   * [putObject] for uploading / write permissions
   * [getObject] for retrieving Objects
   */
  app.get("/api/upload", requireLogin, (req, res) => {
    const randomImageFileName = uuid();
    const key = `${req.user.id}/${randomImageFileName}.jpeg`; // grouping images by user id

    s3.getSignedUrl(
      "putObject",
      {
        Bucket: "course-node-advanced",
        ContentType: "image/jpeg",
        Key: key,
      },
      (err, url) => {
        if (err) {
          console.log("S3 Eror!");
          console.log(err);
        }
        res.send({ key, url });
      }
    );
  });
};

// [
//     {
//         "AllowedHeaders": [
//             "*"
//         ],
//         "AllowedMethods": [
//             "PUT"
//         ],
//         "AllowedOrigins": [
//             "http://localhost:3000"
//         ],
//         "ExposeHeaders": [],
//         "MaxAgeSeconds": 3000
//     }
// ]

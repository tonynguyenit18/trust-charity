var aws = require('aws-sdk');
var uuid = require('uuid');


require('dotenv').config(); // Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: 'ap-southeast-2', // Put your aws region here
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
})

const S3_BUCKET = process.env.BUCKET
// Now lets export this function so we can call it from somewhere else
exports.sign_s3 = (req, res) => {
  const s3 = new aws.S3();  // Create a new instance of S3
  const fileKey = uuid.v4()
  const fileType = req.body.fileType;
  // Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileKey,
    Expires: 500,
    ContentType: fileType,
    ACL: 'public-read'
  };
  // Make a request to the S3 API to get a signed URL which we can use to upload our file
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err })
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved. 
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileKey}`
    };
    // Send it all back
    res.json({ success: true, data: { returnData } });
  });
}
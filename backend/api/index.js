const express = require("express");
const AWS = require("aws-sdk");
const uuid = require("uuid");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});
const route53 = new AWS.Route53();
app.get("/list-hosted-zones", async (req, res) => {
  try {
    const data = await route53.listHostedZones().promise();
    res.json(data.HostedZones);
  } catch (err) {
    console.error("Error listing hosted zones:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Route to create a new hosted zone
// app.post("/create-hosted-zone", async (req, res) => {
//   try {
//     const callerReference = uuid.v4(); // Generate a unique caller reference using UUID
//     const params = {
//       Name: "testedneelam376.com",
//       CallerReference: callerReference, // Use the unique caller reference
//       HostedZoneConfig: {
//         Comment: "Optional comment for the hosted zone",
//         PrivateZone: false,
//       },
//     };

//     const data = await route53.createHostedZone(params).promise();
//     res.json(data); // Return the response containing information about the newly created hosted zone
//   } catch (err) {
//     console.error("Error creating hosted zone:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });
app.post("/create-hosted-zone", async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData);
    const callerReference = uuid.v4(); // Generate a unique caller reference using UUID
    const params = {
      Name: formData.Name,
      CallerReference: callerReference, // Use the unique caller reference
      HostedZoneConfig: {
        Comment: "Optional comment for the hosted zone",
        PrivateZone: formData.PrivateZone,
      },
      VPC: {
        VPCRegion: "eu-north-1", // Specify the region of your VPC
        VPCId: "vpc-08173062dad5581b2", // Specify the ID of your VPC
      },
    };

    const data = await route53.createHostedZone(params).promise();
    res.json(data); // Return the response containing information about the newly created hosted zone
  } catch (err) {
    console.error("Error creating hosted zone:", err);
    res.status(500).send("Internal Server Error");
  }
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

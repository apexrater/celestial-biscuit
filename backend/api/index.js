const express = require("express");
const AWS = require("aws-sdk");
const uuid = require("uuid");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(cors());
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});
const route53 = new AWS.Route53();
app.post("/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});
app.post("/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});
app.get("/profile", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});
app.get("/list-hosted-zones", async (req, res) => {
  try {
    const data = await route53.listHostedZones().promise();
    res.json(data.HostedZones);
  } catch (err) {
    console.error("Error listing hosted zones:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
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
app.post("/create-records", async (req, res) => {
  try {
    const { data, hostedId } = req.body;

    // Define parameters for the change resource record sets request
    const params = {
      ChangeBatch: {
        Changes: [
          {
            Action: "CREATE",
            ResourceRecordSet: {
              Name: data.domainName, // Use the domain name from form data
              Type: data.dnsType, // Use the DNS type from form data
              TTL: data.ttl || 300, // Use the TTL from form data, default to 300 if not provided
              ResourceRecords: [
                {
                  Value: data.value, // Use the value from form data
                },
              ],
            },
          },
        ],
        Comment: "Add record for " + data.domainName, // Use a comment to describe the change
      },
      HostedZoneId: hostedId, // Use the hosted zone ID from form data
    };

    // Call the change resource record sets API
    const data1 = await route53.changeResourceRecordSets(params).promise();

    res.json(data1); // Return the response containing information about the change
  } catch (err) {
    console.error("Error creating record:", err);
    res.status(500).send("Internal Server Error");
  }
});
app.delete("/delete-hosted-zone", async (req, res) => {
  try {
    const { zoneId } = req.body;
    const zoneIdString = String(zoneId);
    // Define parameters for the delete hosted zone request
    const params = {
      Id: zoneIdString,
    };

    // Call the deleteHostedZone method to delete the hosted zone
    await route53.deleteHostedZone(params).promise();

    // Send a JSON response indicating success
    res.json({ message: `Hosted zone with ID ${zoneId} deleted successfully` });
  } catch (error) {
    console.error("Error deleting hosted zone:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

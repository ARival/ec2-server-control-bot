const AWS = require('aws-sdk');
require('dotenv').config();
const { AWS_ACCESS_KEY_ID: accessKeyId, AWS_SECRET_ACCESS_KEY: secretAccessKey, AWS_REGION: region, GUILD_IDS, INSTANCE_IDS } = process.env;

// Configure the SDK with your AWS credentials
AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region,
});

const guildIds = GUILD_IDS.split(',');
const instanceIds = INSTANCE_IDS.split(',');
console.log(guildIds);
console.log(instanceIds);

// Create an EC2 client
const ec2 = new AWS.EC2();

module.exports = {
  StartAWSInstance: async (instanceId) => {
    await ec2.startInstances({ InstanceIds: [instanceId] }, async (err, data) => {
      if (err) {
        return ([false, err]);
      } else {
        return ([true, data]);
      }
    });
  },
};
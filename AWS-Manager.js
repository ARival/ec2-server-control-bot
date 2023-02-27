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

const StartAWSInstance = async (guildId) => {
  const instanceId = instanceIds[guildIds.indexOf(guildId)];
  const result = await ec2.startInstances({ InstanceIds: [instanceId] }, async (err, data) => {
    if (err) {
      return [false, err];
    } else {
      return [true, data];
    }
  });

  return result;
};
const CheckAWSInstanceStatus = async (guildId) => {
  const instanceId = instanceIds[guildIds.indexOf(guildId)];
  const result = await ec2.describeInstanceStatus({ IncludeAllInstances: true }).promise().then(data => {
    console.log(data.InstanceStatuses);
    const { InstanceState: instanceState } = data.InstanceStatuses.find(instance => instance.InstanceId === instanceId);
    console.log(instanceState);
    if (instanceState.Code !== 80) {
      return [true, instanceState.Name];
    } else {
      return [false, 'stopped'];
    }
  }).catch(err => {
    return [false, err];
  });
  console.log('result', result);

  return result;
};


module.exports = {
  StartAWSInstance,
  CheckAWSInstanceStatus,
};
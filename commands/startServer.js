'use strict';
const { SlashCommandBuilder } = require('discord.js');
const AWS = require('aws-sdk');
require('dotenv').config();
const { AWS_ACCESS_KEY_ID: accessKeyId, AWS_SECRET_ACCESS_KEY: secretAccessKey, AWS_REGION: region, GUILD_IDS, INSTANCE_IDS } = process.env;
// const {StartAWSInstance} = require('./AWS-Manager.js');

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
  data: new SlashCommandBuilder()
    .setName('start-server')
    .setDescription('Starts up the AWS EC2 Server for play'),
  async execute(interaction) {
    // Call the startInstances method
    const instanceId = instanceIds[guildIds.indexOf(interaction.guild.id)];
    await ec2.startInstances({ InstanceIds: [instanceId] }, async (err, data) => {
      if (err) {
        console.log('Error starting instance:', err);
        await interaction.reply('Error starting instance: ' + err);
      } else {
        console.log('Instance started successfully:', data);
        await interaction.reply('Instance started successfully!');
      }
    });

  },
};
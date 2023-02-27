'use strict';
const { SlashCommandBuilder } = require('discord.js');
const { CheckAWSInstanceStatus } = require('../AWS-Manager.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('check-status')
    .setDescription('Checks the online status of the AWS EC2 Server'),
  async execute(interaction) {
    // Call the startInstances method
    const result = await CheckAWSInstanceStatus(interaction.guild.id);
    // console.log('result', result);
    if (result[0] === false) {
      // console.log('Instance is offline.', result[1]);
      await interaction.reply('Instance is offline.');
    } else {
      // console.log('Instance is online!', result[1]);
      await interaction.reply('Instance is online!');
    }
  },
};
'use strict';
const { SlashCommandBuilder } = require('discord.js');
const { StartAWSInstance } = require('../AWS-Manager.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start-server')
    .setDescription('Starts up the AWS EC2 Server for play'),
  async execute(interaction) {
    // Call the startInstances method
    const result = await StartAWSInstance(interaction.guild.id);
    console.log('result', result);
    if (result[0] === false) {
      console.log('Error starting instance:', result[1]);
      await interaction.reply('Error starting instance: ' + result[1]);
    } else {
      console.log('Instance started successfully:', result[1]);
      await interaction.reply('Instance started successfully!');
    }
  },
};
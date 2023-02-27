const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
require('dotenv').config();
const StartServer = require('./commands/startServer.js');
const CheckServerStatus = require('./commands/CheckStatus.js');

const { CLIENT_ID: clientId, GUILD_IDS: guildIds, TOKEN: token } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


console.log(clientId);
console.log(guildIds);

client.once('ready', () => {
  console.log('ready!');
});

client.commands = [StartServer, CheckServerStatus];

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log(`Started refreshing ${client.commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const Promises = guildIds.split(',').map(async guildId => await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: client.commands.map(internalCommand => internalCommand.data.toJSON()) },
    ));

    await Promise.all(Promises);
    console.log('Successfully reloaded all application (/) commands.');

  }
  catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  console.log('guild = ' + interaction.guild.id);
  interaction.client = client;

  const command = client.commands.find(cmd => cmd.data.name === interaction.commandName);
  if (!command) {
    console.log('No matching command found for interaction: ' + interaction.commandName);
    return;
  }
  try {
    await command.execute(interaction);
  }
  catch (error) {
    console.error(error);
    interaction.reply({ content: `Command ${interaction.name} not found!`, ephemeral: true });
  }
});

client.login(token);

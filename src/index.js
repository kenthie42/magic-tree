const fs = require('fs');
const { Intents } = require('discord.js');
const ForestClient = require('./classes/ForestClient.js');
const { token } = require('../token.json');

const client = new ForestClient({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.handle(...args));
  } else {
    client.on(event.name, (...args) => event.handle(client, ...args));
  }
}

client.login(token);

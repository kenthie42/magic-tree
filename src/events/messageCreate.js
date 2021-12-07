module.exports = {
  name: 'messageCreate',
  once: false,
  async handle(client, message) {
    if (message.content !== 'tree' && message.author.id !== 204621728004046848) {
      return;
    }
    
    console.log(`${message.author.tag} planted a tree!`);
    console.log('Growing tree...');

    await client.growTree(message.channel)
      .then(() => {
        console.log('Tree grown.');
        console.log('Saving tree to file...');
        client.save();
      })
      .then(() => console.log('File saved.'));
  },
};

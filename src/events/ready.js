module.exports = {
  name: 'ready',
  once: true,
  async handle(client) {
    console.log(`Wakey wakey ${client.user.username}...`);

    console.log('Loading forest...');

    await client.loadTrees()
      .then(() => {
        console.log('Forest loaded.');
        console.log(`${client.user.username} is ready to go baby!`);
      });
  },
};

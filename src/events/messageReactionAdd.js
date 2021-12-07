module.exports = {
  name: 'messageReactionAdd',
  once: false,
  async handle(client, messageReaction, user) {
    const message = messageReaction.message;

    const layer = client.findLayer(message.channel.id, message.id);

    if (!layer) {
      return;
    }

    const emojiReaction = messageReaction.emoji;

    const emoji = emojiReaction.toString();

    console.log(`${user.tag} gave us a ${emoji} decoration!`);

    if (emojiReaction.id && !client.emojis.cache.has(emojiReaction.id)) {
      console.log(`We don't have access to the ${emoji} decoration. :(`);

      await messageReaction.remove();

      return;
    }

    console.log('Adding decoration...');

    await client.updateLayer(message, layer, emoji)
      .then(() => {
        console.log('Decoration added.');
        messageReaction.remove();
        console.log('Saving tree to file...');
        client.save();
      })
      .then(() => console.log('File saved.'));
  },
};
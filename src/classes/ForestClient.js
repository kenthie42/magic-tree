const trees = require('../../trees.json');
const fsPromises = require('fs/promises');
const { Client } = require('discord.js');
const Tree = require('./Tree.js');

module.exports = class ForestClient extends Client {
  constructor(options) {
    super(options);
    this.trees = trees.map(tree => new Tree(tree.channelId, tree.layers));
  }

  loadTrees() {
    const l = this.trees.length;
    const treePromises = [];

    for (let i = 0; i < l; i++) {
      treePromises.push(this.loadTree(i));
    }

    return Promise.all(treePromises);
  }

  async loadTree(i) {
    const tree = this.trees[i];
    const channel = await this.channels.fetch(tree.channelId);
    const layers = tree.layers;
    const l = layers.length;

    return Promise.all([
      channel.messages.fetch(layers[0].id),
      channel.messages.fetch({ limit: l - 1, after: layers[0].id })
    ]);
  }

  growTree(channel) {
    const tree = new Tree(channel.id);
    this.trees.push(tree);
    const l = tree.layers.length;
    const treeLayerPromises = [];

    for (let i = 0; i < l; i++) {
      const message = tree.layers[i].generateMessage();

      treeLayerPromises.push(
        channel.send(message)
          .then(sentMessage => tree.layers[i].id = sentMessage.id)
      );
    }

    return Promise.all(treeLayerPromises);
  }

  save() {
    return fsPromises.writeFile('trees.json', JSON.stringify(this.trees));
  }

  findLayer(channelId, messageId) {
    const tree = this.trees.find(tree => tree.channelId === channelId);

    if (!tree) {
      return undefined;
    }

    const l = tree.layers.length;
    const layer = tree.layers.find((layer, index) => layer.id === messageId && index > -1 && index < l);

    if (!layer) {
      return undefined;
    }

    return layer;
  }

  updateLayer(message, layer, emoji) {
    layer.addDecoration(emoji);

    return message.edit(layer.generateMessage());
  }
};

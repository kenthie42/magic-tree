const treeConfig = require('../../tree-config.json');
const { leaf, trunk, baseWidth } = treeConfig;
const TreeLayer = require('./TreeLayer.js');

module.exports = class Tree {
  constructor(channelId, layers = null) {
    this.channelId = channelId;
    if (layers) {
      this.layers = layers.map(layer => new TreeLayer(layer.emojis, layer.id));
    }
    else {
      this.plant();
    }
  }

  plant() {
    this.layers = [];

    for (let i = 1; i <= baseWidth; i++) {
      this.layers.push(new TreeLayer(new Array(i).fill(leaf)));
    }

    this.layers.push(new TreeLayer([trunk]));
  }
};

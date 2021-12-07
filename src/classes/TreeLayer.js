const treeConfig = require('../../tree-config.json');
const { space, baseWidth } = treeConfig;
const { randomInt } = require('../functions/randomInt.js');

module.exports = class TreeLayer {
  constructor(emojis, id = null) {
    this.emojis = emojis;
    this.id = id;
  }

  addDecoration(emoji) {
    const indices = this.emojis.map((_, i) => i).filter(i => this.emojis[i] !== emoji);

    const l = indices.length;
    
    if (l > 0) {
      this.emojis[indices[randomInt(l)]] = emoji;
    }
  }

  generateMessage() {
    const l = this.emojis.length;

    let message = `_${space.repeat(baseWidth - l + 1)}_`;

    for (let i = 0; i < l; i++) {
      message += this.emojis[i];
    }

    return message;
  }
};

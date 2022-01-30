const { space, baseWidth } = require('../../tree-config.json');
const { randomInt } = require('../functions/randomInt.js');

module.exports = class TreeLayer {
  constructor(emojis, id = null) {
    this.emojis = emojis;
    this.id = id;
  }

  addDecoration(emoji) {
    const indices = this.emojis.map((_, i) => i).filter(i => this.emojis[i] !== emoji);
    const l = indices.length;

    if (l === 0) return null;
    const k = randomInt(l);
    this.emojis[indices[k]] = emoji;
    return k;
  }

  generateMessage() {
    const l = this.emojis.length;
    let message = `_${space.repeat(baseWidth - l + 1)}_`;

    for (let i = 0; i < l; i++) {
      message += this.emojis[i];
      message += '‌'; // zero-width non-joiner, to prevent two consecutive emojis combining into one
    }

    return message;
  }
};

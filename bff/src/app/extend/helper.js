// app/extend/helper.js
'use strict';
module.exports = {
  async generate(plainText) {
    const hash = await this.ctx.genHash(plainText);
    return hash;
    // this 是 helper 对象，在其中可以调用其他 helper 方法
    // this.ctx => context 对象
    // this.app => application 对象
  },
  async compare(hash, plainText) {
    const checked = await this.ctx.compare(plainText, hash);
    return checked;
    // this 是 helper 对象，在其中可以调用其他 helper 方法
    // this.ctx => context 对象
    // this.app => application 对象
  },
};

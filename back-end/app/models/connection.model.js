const Joi = require('joi');
const sha1 = require('sha1');
const BaseModel = require('../utils/base-model.js');

class ConnectionModel extends BaseModel {
  constructor() {
    super('Connection', {
      mail: Joi.string().required(),
      password: Joi.string().required(),
      token: Joi.string(),
    });
  }

  connectWithPassword(obj = {}) {
    for (let i = 0; i < this.items.length; i += 1) {
      if (obj.mail == this.items[i].mail && sha1(obj.password) == this.items[i].password) {
        this.items[i].token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.save();
        return this.items[i];
      }
    }
    return null;
  }

  connectWithToken(obj = {}) {
    for (let i = 0; i < this.items.length; i += 1) {
      if (obj.mail == this.items[i].mail && obj.token == this.items[i].token) {
        return this.items[i];
      }
    }
    return null;
  }
}

module.exports = new ConnectionModel();

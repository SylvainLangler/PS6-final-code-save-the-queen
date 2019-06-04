const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');
const Internship = require('./internship.model.js');

class IncrementModel extends BaseModel {
  constructor() {
    super('Increment', {
      value: Joi.number().required(),
    });
  }

  increment() {
    this.load();
    this.items[0].value += 1;
    this.update(this.items[0].id, this.items[0]);
    return this.items[0];
  }

  getValue() {
    Internship.test();
    return this.items[0].value;
  }
}

module.exports = new IncrementModel();

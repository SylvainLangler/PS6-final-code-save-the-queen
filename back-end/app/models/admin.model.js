const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');
const Internship = require('./internship.model.js');
const sha1 = require('sha1');

class AdminModel extends BaseModel {
  constructor() {
    super('Admin', {
      mail: Joi.string().required(),
      password: Joi.string().required(),
      token: Joi.string(),
      nb_stage: Joi.number()
    });
  }

  connectWithPassword(obj = {}) {
    for(let i = 0; i < this.items.length; i += 1){
      if(obj.mail == this.items[i].mail && sha1(obj.password) == this.items[i].password){
        this.items[i].token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.save();
        return this.items[i];
      }
    }
    return null;
  }

  connectWithToken(obj = {}){
    for(let i = 0; i < this.items.length; i += 1){
      if(obj.mail == this.items[i].mail && obj.token == this.items[i].token){
        return this.items[i];
      }
    }
    return null;
  }

  getLowestStageNumber(){
    let minAdmin = this.items[0];
    for(let i = 0; i < this.items.length; i += 1){
      if(this.items[i].nb_stage < minAdmin.nb_stage){
        minAdmin = this.items[i];
      }
    }
    return minAdmin;
  }

  getFirstUnvalidatedAdminStage(adminId, internships){
    let adminUnvalidatedInternships = [];
    for(let i = 0; i < internships.length; i += 1){
      if(adminId == internships[i].referent.id && !internships[i].isValidated){
        adminUnvalidatedInternships.push(internships[i]);
      }
    }
    return adminUnvalidatedInternships[0];
  }
}

module.exports = new AdminModel();
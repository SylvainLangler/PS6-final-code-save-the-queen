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
    this.load();
  }

  connectWithPassword(obj = {}) {
    if(this.isConnectedPassword(obj.mail, obj.password)){
      this.items[i].token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      this.save();
      return this.items[i];
    }
    return null;
  }

  connectWithToken(obj = {}){
    if(isConnectedToken(obj.mail, obj.token)){
      return this.items[i];
    }
    return null;
  }

  isConnectedPassword(mail, password){
    for(let i = 0; i < this.items.length; i += 1){
      if(mail == this.items[i].mail && sha1(password) == this.items[i].password){
        return true;
      }
    }
    return false;
  }

  isConnectedToken(mail, token){
    for(let i = 0; i < this.items.length; i += 1){
      if(mail == this.items[i].mail && token == this.items[i].token){
        return true;
      }
    }
    return false;
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

  getUnvalidatedAdminStage(params = {}){
    //let internships = Internship.get();
    console.log("blabla2");
    Internship.test();
    let adminUnvalidatedInternships = [];
    for(let i = 0; i < stages.length; i += 1){
      if(params.adminId == stages[i].referent.id && !stages[i].isValidated){
        adminUnvalidatedInternships.push(stages[i]);
      }
    }
    return adminUnvalidatedInternships;
  }
}

module.exports = new AdminModel();
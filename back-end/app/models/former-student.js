const Joi = require('joi');
var Paginator = require("paginator");
const BaseModel = require('../utils/base-model.js');
const DEFAULT_ELEM_PER_PAGE = 10;
const DEFAULT_LINK_PER_PAGE = 7;
const DEFAULT_PAGE = 1;

class FormerStudentModel extends BaseModel {

  constructor() {
    super('FormerStudent', {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      yearAbroad: Joi.number().required(),
      firstYear: Joi.number().required(),
      lastYear: Joi.number().required(),
      country: Joi.string().required(),
      internship: Joi.string().required(),
      section: Joi.string().required(),
      contact: Joi.string().required(),
      photo: Joi.string().required()
    });
    this.filteredFormerStudents = {};
  }

  static normalizeString(str) {
    const strCopy = str.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return strCopy;
  }

  static sortByYearAbroad(a, b) {
    if (a.yearAbroad < b.yearAbroad) return -1;
    if (a.yearAbroad > b.yearAbroad) return 1;
    return 0;
  }

  filterByFirstName(firstNameParam) {
    if (firstNameParam) {
      this.filteredFormerStudents = this.filteredFormerStudents.filter(
        formerStudent => FormerStudentModel.normalizeString(`${formerStudent.firstName}`)
          .indexOf(FormerStudentModel.normalizeString(firstNameParam)) !== -1,
      );
    }
  }

  filterByLastName(lastNameParam) {
    if (lastNameParam) {
      this.filteredFormerStudents = this.filteredFormerStudents.filter(
        formerStudent => FormerStudentModel.normalizeString(`${formerStudent.lastName}`)
          .indexOf(FormerStudentModel.normalizeString(lastNameParam)) !== -1,
      );
    }
  }

  filterByCountry(countryParam) {
    if (countryParam) {
      this.filteredFormerStudents = this.filteredFormerStudents.filter(
        formerStudent => FormerStudentModel.normalizeString(`${formerStudent.country}`) === FormerStudentModel.normalizeString(countryParam),
      );
    }
  }

  filterByInternship(internshipParam) {
    if (internshipParam) {
      this.filteredFormerStudents = this.filteredFormerStudents.filter(
        formerStudent => FormerStudentModel.normalizeString(`${formerStudent.internship}`)
          .indexOf(FormerStudentModel.normalizeString(internshipParam)) !== -1,
      );
    }
  }

  filterBySection(sectionParam) {
    if (sectionParam) {
      this.filteredFormerStudents = this.filteredFormerStudents.filter(
        formerStudent => FormerStudentModel.normalizeString(`${formerStudent.section}`)
          .indexOf(FormerStudentModel.normalizeString(sectionParam)) !== -1,
      );
    }
  }

  filterByYearAbroad(yearAbroadParam) {
    if (yearAbroadParam) {
      this.filteredFormerStudents = this.filteredFormerStudents.filter(
        formerStudent => FormerStudentModel.normalizeString(`${formerStudent.yearAbroad}`) === FormerStudentModel.normalizeString(yearAbroadParam),
      );
    }
  }

  static checkPaginationParams(params) {
    if (!params.elemPerPage) params.elemPerPage = DEFAULT_ELEM_PER_PAGE;
    if (!params.linkPerPage) params.linkPerPage = DEFAULT_LINK_PER_PAGE;
    if (!params.page) params.page = DEFAULT_PAGE;
  }

  getFormerStudents(q = {}) {
    this.load();
    this.filteredFormerStudents = this.items;

    // Filtering elements with received parameters
    this.filterByFirstName(q.firstName);
    this.filterByLastName(q.lastName);
    this.filterByCountry(q.country);
    this.filterByInternship(q.internship);
    this.filterBySection(q.section);
    this.filterByYearAbroad(q.yearAbroad);

    // To do after filtering
    // Adding all sorting parameters possibly requested to an array
    const sortingParams = {};

    // To do after sorting
    // Reverse the array if decreasing order requested
    if (q.decreasingSort === 'true') {
      this.filteredFormerStudents = this.filteredFormerStudents.reverse();
    }

    // Building paginations infos
    const nbTotalElements = this.filteredFormerStudents.length;
    FormerStudentModel.checkPaginationParams(q);
    const paginator = new Paginator(q.elemPerPage, q.linkPerPage);
    const pagination_info = paginator.build(nbTotalElements, q.page);

    // Slicing the list of items to only get the elements needed for the requested page
    const reqResult = {};
    reqResult.formerStudent = this.filteredFormerStudents.slice(pagination_info.first_result, pagination_info.last_result + 1);
    reqResult.pagination_info = pagination_info;
    return reqResult;
  }

  getAllFormerStudents(){
    return this.items;
  }


  getAvailableSections() {
    let tabSections = [];
    for (let i = 0; i < this.items.length; i += 1) {
      if (!tabSections.includes(this.items[i].section)){
        tabSections.push(this.items[i].section)
      }
    }
    return tabSections;
  }

  getAvailableCountries() {
    let tabCountries = [];
    for (let i = 0; i < this.items.length; i += 1) {
      if (!tabCountries.includes(this.items[i].country)){
        tabCountries.push(this.items[i].country)
      }
    }
    return tabCountries;
  }

}

module.exports = new FormerStudentModel();



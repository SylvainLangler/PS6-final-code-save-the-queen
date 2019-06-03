const Joi = require('joi');
var Paginator = require("paginator");
const BaseModel = require('../utils/base-model.js');
const FormerStudent = require('./former-student.js');
const DEFAULT_ELEM_PER_PAGE = 10;
const DEFAULT_LINK_PER_PAGE = 7;
const DEFAULT_PAGE = 1;

class InternshipModel extends BaseModel {

  constructor() {
    super('Internship', {
      title: Joi.string().required(),
      country: Joi.string().required(),
      countryFlag: Joi.string(),
      countryFlagBackground: Joi.string(),
      city: Joi.string(),
      company: Joi.string().required(),
      lab: Joi.boolean(),
      salary: Joi.number(),
      currency: Joi.string(),
      durationNbWeek: Joi.number().required(),
      schoolYear: Joi.string().required(),
      websiteURL: Joi.string().required(),
      section: Joi.string().required(),
      description: Joi.string().required(),
      ambience: Joi.string().required(),
      costOfLife: Joi.number(),
      studentName: Joi.string(),
      studentSurname: Joi.string(),
      tutorMail: Joi.string(),
      isValidated: Joi.boolean(),
      student: Joi.object()
    });
    this.filteredInternships = {};
  }

  create(obj = {}, params = {}){
    let internship = super.create(obj);
    internship.isValidated = false;
    internship.student = FormerStudent.getById(params.studentId);
    this.save();
    return internship;
  }

  setValidity(body){
    for(let i = 0; i < this.items.length; i += 1){
      if(this.items[i].id == body.id){
        this.items[i].isValidated = body.validity;
        super.update(this.items[i].id, this.items[i]);
        return true;
      }
    }
    return false;
  }

  // Set the string to lower case, remove useless spaces and replace accents/diacritics with
  // base character (For example : é becomes e)
  static normalizeString(str) {
    const strCopy = str.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return strCopy;
  }

  // Sorting an Internship by durationNbWeek order
  static sortByDuration(a, b) {
    if (a.durationNbWeek < b.durationNbWeek) return -1;
    if (a.durationNbWeek > b.durationNbWeek) return 1;
    return 0;
  }

  // Sorting an Internship by title order
  static sortByTitle(a, b) {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  }

  // Filtering by title received from URL's parameter (if any)
  filterByTitle(listToFilter, titleParam) {
    if (titleParam) {
      listToFilter = listToFilter.filter(
        internship => InternshipModel.normalizeString(`${internship.title}`)
          .indexOf(InternshipModel.normalizeString(titleParam)) !== -1,
      );
    }
    return listToFilter;
  }

  // Filtering by section received from URL's parameter (if any)
  filterBySection(listToFilter, sectionParam) {
    if (sectionParam) {
      listToFilter = listToFilter.filter(
        internship => InternshipModel.normalizeString(`${internship.section}`)
          .indexOf(InternshipModel.normalizeString(sectionParam)) !== -1,
      );
    }
    return listToFilter;
  }

  // Filtering by company name received from URL's parameter (if any)
  filterByCompanyName(listToFilter, companyNameParam) {
    if (companyNameParam) {
      listToFilter = listToFilter.filter(
        internship => InternshipModel.normalizeString(`${internship.company}`)
          .indexOf(InternshipModel.normalizeString(companyNameParam)) !== -1,
      );
    }
    return listToFilter;
  }

  // Filtering by country received from URL's parameter (if any)
  filterByCountry(listToFilter, countryParam) {
    if (countryParam) {
      listToFilter = listToFilter.filter(
        internship => InternshipModel.normalizeString(`${internship.country}`) === InternshipModel.normalizeString(countryParam),
      );
    }
    return listToFilter;
  }

  // Filtering by schoolYear received from URL's parameter (if any)
  filterBySchoolYear(listToFilter, schoolYearParam) {
    if (schoolYearParam) {
      listToFilter = listToFilter.filter(
        internship => InternshipModel.normalizeString(`${internship.schoolYear}`) === InternshipModel.normalizeString(schoolYearParam),
      );
    }
    return listToFilter;
  }

  // Filter laboratory internship
  filterByLab(listToFilter, labParam) {
    if (labParam) {
      listToFilter = listToFilter.filter(
        internship => InternshipModel.normalizeString(`${internship.lab}`) === InternshipModel.normalizeString(labParam),
      );
    }
    return listToFilter;
  }

  // Filter by internship validity
  filterByValidity(listToFilter, validityParam){
    if (validityParam) {
      listToFilter = listToFilter.filter(
        internship => InternshipModel.normalizeString(`${internship.isValidated}`) === InternshipModel.normalizeString(validityParam),
      );
    }
    return listToFilter;
  }

  // Filter the duration taking element from Start value to End value
  // If only Start value provided, get elements from Start to Infinite
  // If only End value provided, get elements from 0 to End
  filterByDuration(listToFilter, durationStartParam, durationEndParam) {
    const parsedDurationStartParam = parseInt(durationStartParam, 10);
    const parsedDurationEndParam = parseInt(durationEndParam, 10);
    if (parsedDurationStartParam && parsedDurationEndParam) {
      listToFilter = listToFilter.filter(
        internship => parsedDurationStartParam <= `${internship.durationNbWeek}`
          && `${internship.durationNbWeek}` <= parsedDurationEndParam,
      );
    } else if (parsedDurationEndParam) {
      listToFilter = listToFilter.filter(
        internship => `${internship.durationNbWeek}` <= parsedDurationEndParam,
      );
    } else if (parsedDurationStartParam) {
      listToFilter = listToFilter.filter(
        internship => parsedDurationStartParam <= `${internship.durationNbWeek}`,
      );
    }
    return listToFilter;
  }

  // Sorting Internships referred to what was requested, as only one sort can be done at once
  sortInternships(listToFilter, sortingParams) {
    if (sortingParams.durationSort == 'true') {
      listToFilter.sort(InternshipModel.sortByDuration);
    }
    return listToFilter;
  }

  static checkPaginationParams(params) {
    if (!params.elemPerPage) params.elemPerPage = DEFAULT_ELEM_PER_PAGE;
    if (!params.linkPerPage) params.linkPerPage = DEFAULT_LINK_PER_PAGE;
    if (!params.page) params.page = DEFAULT_PAGE;
  }

  getInternships(q = {}) {
    this.load();
    this.filteredInternships = this.items;

    // Filtering elements with received parameters
    this.filteredInternships = this.filterByTitle(this.filteredInternships, q.title);
    this.filteredInternships = this.filterBySection(this.filteredInternships, q.section);
    this.filteredInternships = this.filterByCompanyName(this.filteredInternships, q.company);
    this.filteredInternships = this.filterByCountry(this.filteredInternships, q.country);
    this.filteredInternships = this.filterByDuration(this.filteredInternships, q.durationStart, q.durationEnd);
    this.filteredInternships = this.filterBySchoolYear(this.filteredInternships, q.schoolYear);
    this.filteredInternships = this.filterByLab(this.filteredInternships, q.lab);
    this.filteredInternships = this.filterByValidity(this.filteredInternships, q.validity);


    // To do after filtering
    // Adding all sorting parameters possibly requested to an array
    const sortingParams = {};
    sortingParams.durationSort = q.durationSort;
    sortingParams.titleSort = q.titleSort;
    this.filteredInternships = this.sortInternships(this.filteredInternships, sortingParams);

    // To do after sorting
    // Reverse the array if decreasing order requested
    if (q.decreasingSort === 'true') {
      this.filteredInternships = this.filteredInternships.reverse();
    }

    // Building paginations infos
    const nbTotalElements = this.filteredInternships.length;
    // console.log("totel elements : ", nbTotalElements);
    InternshipModel.checkPaginationParams(q);
    const paginator = new Paginator(q.elemPerPage, q.linkPerPage);
    const pagination_info = paginator.build(nbTotalElements, q.page);

    // Slicing the list of items to only get the elements needed for the requested page
    const reqResult = {};
    reqResult.internships = this.filteredInternships.slice(pagination_info.first_result, pagination_info.last_result + 1);
    reqResult.pagination_info = pagination_info;
    return reqResult;
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

  getAvailableSections() {
    let tabSections = [];
    for (let i = 0; i < this.items.length; i += 1) {
      if (!tabSections.includes(this.items[i].section)){
        tabSections.push(this.items[i].section)
      }
    }
    return tabSections;
  }

  getMaxDuration(){
    let maxDuration = 0;
    for(let i = 0; i < this.items.length; i += 1){
      if(maxDuration < this.items[i].durationNbWeek){
        maxDuration = this.items[i].durationNbWeek;
      }
    }
    return maxDuration;
  }

  getInternshipsByCountry(country){
    return this.items.filter(
        internship => InternshipModel.normalizeString(`${internship.country}`) === InternshipModel.normalizeString(country),
      );
  }

  getInternshipsBySection(section){
    return this.items.filter(
        internship => InternshipModel.normalizeString(`${internship.section}`) === InternshipModel.normalizeString(section),
      );
  }

  getStatistics(){
    let stats = {};
    // Calculate how many internships by countries are stored
    stats.internshipByCountry = this.getInternshipsByCountryStats();

    // Calculate sections percentage
    stats.sectionPercentage = this.getSectionPercentage();

    // Calculate number of internships by duration 
    stats.nbInternshipsPerDuration = this.getInternshipsPerDuration();

    return stats;
  }

  getInternshipsByCountryStats(){
    let internshipByCountry = []
    let countries = this.getAvailableCountries();
    for(let i = 0; i < countries.length; i += 1){
      internshipByCountry.push({
        country:countries[i],
        nbInternships:this.getInternshipsByCountry(countries[i]).length
      });
    }
    return internshipByCountry;
  }

  getSectionPercentage(){
    let sectionPercentage = [];
    let sections = this.getAvailableSections();
    for(let i = 0; i < sections.length; i += 1){
      let sectionPercent = Number(((this.getInternshipsBySection(sections[i]).length/this.items.length)*100).toFixed(2))
      sectionPercentage.push({
        section:sections[i],
        sectionPercent: sectionPercent
      });
    }
    return sectionPercentage;
  }

  getInternshipsPerDuration(){
    let nbInternshipsPerDuration = [];
    for(let i = 0; i < this.items.length; i += 1){
      let currDuration = nbInternshipsPerDuration[this.items[i].durationNbWeek];
      if(!currDuration){
        nbInternshipsPerDuration[this.items[i].durationNbWeek] = 1;
      } else {
        nbInternshipsPerDuration[this.items[i].durationNbWeek] += 1;
      }
    }

    for(let i = 0; i < nbInternshipsPerDuration.length; i += 1){
      if(!nbInternshipsPerDuration[i]){
        nbInternshipsPerDuration[i] = 0;
      }
    }
    return nbInternshipsPerDuration;
  }
}

module.exports = new InternshipModel();

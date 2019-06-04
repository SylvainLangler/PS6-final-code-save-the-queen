const Joi = require('joi');
const Paginator = require('paginator');
const BaseModel = require('../utils/base-model.js');

const DEFAULT_ELEM_PER_PAGE = 10;
const DEFAULT_LINK_PER_PAGE = 7;
const DEFAULT_PAGE = 1;

class AgencyModel extends BaseModel {
  constructor() {
    super('Agency', {
      name: Joi.string().required(),
      country: Joi.string().required(),
      websiteURL: Joi.string().required(),
      logoURL: Joi.string().required(),
    });
    this.filteredAgencies = {};
  }

  static normalizeString(str) {
    	const strCopy = str.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    	return strCopy;
  }

  filterByCountry(countryParam) {
    if (countryParam) {
      this.filteredAgencies = this.filteredAgencies.filter(
        agency => AgencyModel.normalizeString(`${agency.country}`) === AgencyModel.normalizeString(countryParam),
      );
    }
  }

  filterByName(nameParam) {
    if (nameParam) {
      this.filteredAgencies = this.filteredAgencies.filter(
        agency => AgencyModel.normalizeString(`${agency.name}`)
          .indexOf(AgencyModel.normalizeString(nameParam)) !== -1,
      );
    }
  }

  static checkPaginationParams(params) {
    if (!params.elemPerPage) params.elemPerPage = DEFAULT_ELEM_PER_PAGE;
    if (!params.linkPerPage) params.linkPerPage = DEFAULT_LINK_PER_PAGE;
    if (!params.page) params.page = DEFAULT_PAGE;
  }

  getAgencys(q = {}) {
    this.load();
    this.filteredAgencies = this.items;

    // Filtering elements with received parameters
    this.filterByCountry(q.country);
    this.filterByName(q.name);

    // To do after sorting
    // Reverse the array if decreasing order requested
    if (q.decreasingSort === 'true') {
      this.filteredAgencies = this.filteredAgencies.reverse();
    }

    // Building paginations infos
    const nbTotalElements = this.filteredAgencies.length;
    AgencyModel.checkPaginationParams(q);
    const paginator = new Paginator(q.elemPerPage, q.linkPerPage);
    const pagination_info = paginator.build(nbTotalElements, q.page);

    // Slicing the list of items to only get the elements needed for the requested page
    const reqResult = {};
    reqResult.agencies = this.filteredAgencies.slice(pagination_info.first_result, pagination_info.last_result + 1);
    reqResult.pagination_info = pagination_info;
    return reqResult;
  }

  getAvailableCountries() {
	    const tabCountries = [];
	    for (let i = 0; i < this.items.length; i += 1) {
	      if (!tabCountries.includes(this.items[i].country)) {
	        tabCountries.push(this.items[i].country);
	      }
	    }
	    return tabCountries;
  }
}

module.exports = new AgencyModel();

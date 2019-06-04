const Joi = require('joi');
const Paginator = require('paginator');
const BaseModel = require('../utils/base-model.js');

const DEFAULT_ELEM_PER_PAGE = 10;
const DEFAULT_LINK_PER_PAGE = 7;
const DEFAULT_PAGE = 1;

class AccommodationModel extends BaseModel {
  constructor() {
    super('Accommodation', {
      country: Joi.string().required(),
      adress: Joi.string().required(),
      price: Joi.number().required(),
      surface: Joi.number().required(),
      contact: Joi.string().required(),
      devise: Joi.string().required(),
      contact: Joi.string().required(),
      websiteURL: Joi.string().required(),
      etudiant: Joi.string().required(),
    });
    this.filteredAccommodations = {};
  }

  static normalizeString(str) {
    const strCopy = str.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return strCopy;
  }

  static sortByPrice(a, b) {
    if (a.price < b.price) return -1;
    if (a.price > b.price) return 1;
    return 0;
  }

  static sortBySurface(a, b) {
    if (a.surface < b.surface) return -1;
    if (a.surface > b.surface) return 1;
    return 0;
  }

  filterByPrice(priceStartParam, priceEndParam) {
    const parsedPriceStartParam = parseInt(priceStartParam, 10);
    const parsedPriceEndParam = parseInt(priceEndParam, 10);
    console.log('price start', parsedPriceStartParam);
    console.log('price end', parsedPriceEndParam);
    if (parsedPriceStartParam && parsedPriceEndParam) {
      this.filteredAccommodations = this.filteredAccommodations.filter(
        accommodation => parsedPriceStartParam <= `${accommodation.price}`
          && `${accommodation.price}` <= parsedPriceEndParam,
      );
    } else if (parsedPriceEndParam) {
      this.filteredAccommodations = this.filteredAccommodations.filter(
        accommodation => `${accommodation.price}` <= parsedPriceEndParam,
      );
    } else if (parsedPriceStartParam) {
      this.filteredAccommodations = this.filteredAccommodations.filter(
        accommodation => parsedPriceStartParam <= `${accommodation.price}`,
      );
    }
  }

  filterBySurface(surfaceStartParam, surfaceEndParam) {
    const parsedSurfaceStartParam = parseInt(surfaceStartParam, 10);
    const parsedSurfaceEndParam = parseInt(surfaceEndParam, 10);
    if (parsedSurfaceStartParam && parsedSurfaceEndParam) {
      this.filteredAccommodations = this.filteredAccommodations.filter(
        accommodation => parsedSurfaceStartParam <= `${accommodation.surface}`
          && `${accommodation.surface}` <= parsedSurfaceEndParam,
      );
    } else if (parsedSurfaceEndParam) {
      this.filteredAccommodations = this.filteredAccommodations.filter(
        accommodation => `${accommodation.surface}` <= parsedSurfaceEndParam,
      );
    } else if (parsedSurfaceStartParam) {
      this.filteredAccommodations = this.filteredAccommodations.filter(
        accommodation => parsedSurfaceStartParam <= `${accommodation.surface}`,
      );
    }
  }

  filterByCountry(countryParam) {
    if (countryParam) {
      this.filteredAccommodations = this.filteredAccommodations.filter(
        accommodation => AccommodationModel.normalizeString(`${accommodation.country}`) === AccommodationModel.normalizeString(countryParam),
      );
    }
  }


  static checkPaginationParams(params) {
    if (!params.elemPerPage) params.elemPerPage = DEFAULT_ELEM_PER_PAGE;
    if (!params.linkPerPage) params.linkPerPage = DEFAULT_LINK_PER_PAGE;
    if (!params.page) params.page = DEFAULT_PAGE;
  }

  getAccommodations(q = {}) {
    this.load();
    this.filteredAccommodations = this.items;

    // Filtering elements with received parameters
    this.filterByPrice(q.priceStart, q.priceEnd);
    this.filterBySurface(q.surfaceStart, q.surfaceEnd);
    this.filterByCountry(q.country);

    // To do after filtering
    // Adding all sorting parameters possibly requested to an array
    const sortingParams = {};
    sortingParams.priceSort = q.priceSort;
    sortingParams.sizeSort = q.sizeSort;

    // To do after sorting
    // Reverse the array if decreasing order requested
    if (q.decreasingSort === 'true') {
      this.filteredAccommodations = this.filteredAccommodations.reverse();
    }

    // Building paginations infos
    const nbTotalElements = this.filteredAccommodations.length;
    AccommodationModel.checkPaginationParams(q);
    const paginator = new Paginator(q.elemPerPage, q.linkPerPage);
    const pagination_info = paginator.build(nbTotalElements, q.page);

    // Slicing the list of items to only get the elements needed for the requested page
    const reqResult = {};
    reqResult.accommodations = this.filteredAccommodations.slice(pagination_info.first_result, pagination_info.last_result + 1);
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

  getMaxPrice() {
    let maxPrice = 0;
    for (let i = 0; i < this.items.length; i += 1) {
      if (maxPrice < this.items[i].price) {
        maxPrice = this.items[i].price;
      }
    }
    return maxPrice;
  }

  getMaxSurface() {
    let maxSurface = 0;
    for (let i = 0; i < this.items.length; i += 1) {
      if (maxSurface < this.items[i].surface) {
        maxSurface = this.items[i].surface;
      }
    }
    return maxSurface;
  }
}

module.exports = new AccommodationModel();

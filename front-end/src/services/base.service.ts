import { Injectable } from '@angular/core';
import { Internship } from '../models/internship';
import { FormerStudent } from '../models/former-student';
import { Agency } from '../models/agency';
import { Accommodation } from 'src/models/accommodation';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public baseURL = 'http://' + window.location.hostname +':9428/api/';
}

export interface ResponseJSON {
	internships: Internship[];
	formerStudent: FormerStudent[];
	agencies: Agency[];
	accommodations: Accommodation[];
	pagination_info: PaginationInfo;
}

export interface PaginationInfo {
	total_pages: number;
	current_page: number;
	first_page: number;
	last_page: number;
	previous_page: number;
	next_page: number;
	has_previous_page: boolean;
	has_next_page: boolean;
	total_results: number;
	results: number;
	first_result: number;
	last_result: number
}

export class Filter{
	public name: string;
	public display_name: string;
	public value: string;

	constructor(name: string, display_name: string){
		this.name = name;
		this.display_name = display_name;
		this.value = '';
	}
}

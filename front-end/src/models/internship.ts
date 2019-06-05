import { FormerStudent } from './former-student';

export interface Internship {
   id?: number;
   title?: string;
   country?: string;
   countryFlag?: string;
   countryFlagBackground?: string;
   company?: string;
   descrition?: string;
   ambience?: string;
   lab?:boolean;
   salary?: number;
   durationNbWeek?: number;
   schoolYear?: string;
   websiteURL?: string;
   detailURL?: string;
   section?: string;
   student?: FormerStudent;
   city?: string;
   currency?: string;
   costOfLife?: number;
   description?: string;
}

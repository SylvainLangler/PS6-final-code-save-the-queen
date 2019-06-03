import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InternshipService } from '../../../services/internship/internship.service';
import { Internship } from '../../../models/internship';
import { FLAG_MOCK } from '../../../mocks/flags.mock';
import { Flag } from '../../../models/flag';
import { FormerStudentService } from 'src/services/former-student/former-student.service';
import { FormerStudent } from 'src/models/former-student';

@Component({
  selector: 'app-internship-form',
  templateUrl: './internship-form.component.html',
  styleUrls: ['./internship-form.component.css']
})
export class InternshipFormComponent implements OnInit {
  listFlag: Flag[] = FLAG_MOCK;
  currentFlag: Flag = FLAG_MOCK[0];
  public formerStudentList: FormerStudent[] = [];


  public internshipform: FormGroup;
  constructor(public formBuilder: FormBuilder, public internshipService: InternshipService, public formerStudentService: FormerStudentService) {
  
    this.internshipform = this.formBuilder.group({
      title: [''],
      company: [''],
      durationNbWeek: [''],
      schoolYear: [''],
      section: [''],
      description: [''],
      city: [''],
      lab: [''],
      costOfLife: [''],
      salary: [''],
      ambience: [''],
      studentName: [''],
      studentSurname: [''],
      student:[''],
      tutorMail: [''],
      websiteURL: ['']
    });
   }
   
  ngOnInit() {
    this.formerStudentService
    .getAllFormerStudents()
    .then(res => {
      this.formerStudentList = res;
    })
    .catch(error => console.log(error));

  }

  addInternship() {
    const internshipToCreate: Internship = this.internshipform.getRawValue() as Internship;
    internshipToCreate.country = this.currentFlag.CountryName;
    internshipToCreate.countryFlag = 'https://www.countryflags.io/' + this.currentFlag.Code + '/flat/64.png';
    internshipToCreate.currency = '€';
    console.log(internshipToCreate);
    
    this.internshipService.addInternship(internshipToCreate, this.internshipform.controls['student'].value.id);
  }

  getSelectedCountry(country) {
    // tslint:disable-next-line:radix
    this.currentFlag = FLAG_MOCK[parseInt(country.split(':')[0])];
    console.log(this.currentFlag);
  }

}

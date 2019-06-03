import { Component, OnInit } from '@angular/core';
import { Internship } from '../../../models/internship';
import { InternshipService } from '../../../services/internship/internship.service';
import { PaginationInfo } from '../../../services/base.service';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-internship-list',
  templateUrl: './internship-list.component.html',
  styleUrls: ['./internship-list.component.css'],
})
export class InternshipListComponent implements OnInit {

  

  private NB_ELEMENT_PER_PAGE: number = 4;
  private durationSortState: string = 'disabled';
  public internshipList: Internship[] = [];
  public pagination_info: PaginationInfo;
  public current_page: number;
  public isFilterApplied = false;
  
  public internshipStatistics;

  public chartInternshipByCountryType = 'pie';
  public chartInternshipByCountryOptions = {};
  public chartInternshipByCountryColors = [{
      backgroundColor: [
        'rgba(181, 28, 28, 0.6)',
        'rgba(66, 134, 244, 0.6)',
        'rgba(229, 229, 29, 0.6)',
        'rgba(226, 154, 29, 0.6)',
        'rgba(29, 186, 40, 0.6)',
      ],
      borderColor: [
        'rgba(181, 28, 28, 1)',
        'rgba(66, 134, 244, 1)',
        'rgba(229, 229, 29, 1)',
        'rgba(226, 154, 29, 1)',
        'rgba(29, 186, 40, 1)',
      ]
    }];
  public chartInternshipByCountryData = [];
  public chartInternshipByCountryLabels = [];

  public chartSectionPercentageType = 'doughnut';
  public chartSectionPercentageOptions = {};
  public chartSectionPercentageColors = [];
  public chartSectionPercentageData = [];
  public chartSectionPercentageLabels = [];

  public chartNbInternshipsPerDurationIntervalType = 'bar';
  public chartNbInternshipsPerDurationIntervalOptions = {};
  public chartNbInternshipsPerDurationIntervalColors = [];
  public chartNbInternshipsPerDurationIntervalData = [];
  public chartNbInternshipsPerDurationIntervalLabels = [];

  constructor(public internshipService: InternshipService) {
    this.internshipService.elementPerPage = this.NB_ELEMENT_PER_PAGE;
    this.internshipService.internships$.subscribe((internships) => {
      this.internshipList = internships;
      this.isFilterApplied = this.internshipService.isFilterApplied;
    });

    this.internshipService.pagination$.subscribe((pagination) => {
      this.pagination_info = pagination;
      if(pagination) this.current_page = pagination.current_page;
    });

    console.log(this.isFilterApplied);

    this.internshipService
      .getStatistics()
      .then(res => {
        this.internshipStatistics = res;
        this.setStatistics();
      })
      .catch(error => console.log(error));

    this.internshipService.getStatistics();
    this.internshipService.getInternships();
  }

  ngOnInit() {}

  setStatistics() {
    this.setInternshipByCountryStatistics();
    this.setSectionPercentageStatistics();
    this.setNbInternshipsPerDurationIntervalStatistics();
  }

  setInternshipByCountryStatistics() {
    const tabDatas = [];
    const tabCountries = [];
    this.internshipStatistics.internshipByCountry.forEach((singleStat) => {
      tabCountries.push(singleStat.country);
      tabDatas.push(singleStat.nbInternships);
    });

    this.chartInternshipByCountryData = [{data: tabDatas}];
    this.chartInternshipByCountryLabels = tabCountries;
    this.chartInternshipByCountryOptions = {
      responsive: true,
      title: {
        display: true,
        text: "Nombre de stages par pays"
      },
      legend:{
        display: true,
        position: 'bottom'
      }
    };
  }

  setSectionPercentageStatistics(){
    const tabDatas = [];
    const tabSections = [];
    this.internshipStatistics.sectionPercentage.forEach((singleStat) => {
      tabSections.push(singleStat.section);
      tabDatas.push(singleStat.sectionPercent);
    });

    this.chartSectionPercentageData = [{data: tabDatas}];
    this.chartSectionPercentageLabels = tabSections;
    this.chartSectionPercentageOptions = {
      responsive: true,
      title: {
        display: true,
        text: "Pourcentage de stages par section"
      },
      legend: {
        display: true,
        position: 'bottom'
      }
    };
  }

  setNbInternshipsPerDurationIntervalStatistics(){
    const tabDatas = [];
    const tabLabels = [];
    const maxDuration = this.internshipStatistics.nbInternshipsPerDuration.length-1;
    for(let i = 1; i <= (maxDuration + (maxDuration%4)); i += 4){
      tabLabels.push(i + " - " + (i+3) + " semaines");
      let nbInternshipsInInterval = 0;
      for(let k = i; k < (i+4); k += 1){
        if(this.internshipStatistics.nbInternshipsPerDuration[k]){
          nbInternshipsInInterval += this.internshipStatistics.nbInternshipsPerDuration[k];
        }
      }
      tabDatas.push(nbInternshipsInInterval);
    }
    let maxNbInternshipInInterval = 0;
    for(let i = 0; i < tabDatas.length; i += 1){
      if(tabDatas[i] > maxNbInternshipInInterval){
        maxNbInternshipInInterval = tabDatas[i];
      }
    }
    this.chartNbInternshipsPerDurationIntervalData = [{data: tabDatas}];
    this.chartNbInternshipsPerDurationIntervalLabels = tabLabels;
    this.chartNbInternshipsPerDurationIntervalOptions = {
      responsive: true,
      title: {
        display: true,
        text: "Nombre de stages par tranche de durée"
      },
      scales:{
        yAxes:[{
          stacked: true,
          ticks:{
            suggestedMax: maxNbInternshipInInterval+1
          }
        }]
      }
    };
  }

  goToPage(page: number){
    this.internshipService.getPage(page);
  }

  onPrev(){
    this.internshipService.getPage(this.current_page - 1);
  }

  onNext(){
    this.internshipService.getPage(this.current_page + 1);
  }

  sortDuration() {
    if(this.durationSortState === 'disabled') this.durationSortState = 'asc';
    else if(this.durationSortState === 'asc') this.durationSortState = 'desc';
    else this.durationSortState = 'disabled';
    let decreasingSort = this.durationSortState === 'desc';
    let durationSort = this.durationSortState !== 'disabled';
    this.internshipService.sortDuration(durationSort, decreasingSort);
  }

}

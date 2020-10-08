import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ProjectDetails, ProjectService } from '../project.service'
import { ReportSearch,TaskInfomration,TaskService } from '../task.service'
import { AuthenticationService } from '../authentication.service'
import { Router } from "@angular/router"
import * as _ from 'lodash';
declare var $: any;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {
  taskInformation: TaskInfomration;
  projectDetails: ProjectDetails =
    {
      _id: 0,
      ProjectName: '',
      ProjectDescription: '',
      StartDate: '',
      FinishDate: '',
      Type: '',
      Client: ''
    }
  reportSearch:ReportSearch=
  {
    projectName:'',
    date:'',
    username:''
  }
  projectId :number
  
  constructor( private porject: ProjectService,private auth:AuthenticationService,
    private task: TaskService ) { }

  ngOnInit(): void {
    this.porject.getProjectDetails().subscribe(
      details => {
        this.projectDetails = details
        this.reportSearch.projectName=details[0].ProjectName

      },
      err => {
        console.error(err)
      }
    )
    console.log(this.taskInformation)
  }
  getReport()
  {
    this.reportSearch.username = this.auth.getUserDetails().username
    console.log(this.reportSearch)
    this.task.getReportData(this.reportSearch).subscribe(
      details => {
        this.taskInformation = details
        console.log(this.taskInformation);
      },
      err => {
        console.error(err)
      }
    )
  }

}


@Pipe({
  name: 'filterUnique',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(value: any): any {
    if (value !== undefined && value !== null) {
      return _.uniqBy(value, 'userid');
    }
    return value;
  }
}
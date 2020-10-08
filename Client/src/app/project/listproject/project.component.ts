import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service'
import { ProjectDetails, ProjectService } from '../../project.service'
import { Router } from "@angular/router"

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

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
  constructor(public auth: AuthenticationService, private router: Router, private project: ProjectService) { }
  ngOnInit() {
    this.project.getProjectDetails().subscribe(
      details => {
        this.projectDetails = details
      },
      err => {
        console.error(err)
      }
    )
  }
  deleteProject(id)
  {
    this.project.DeleteProject(id).subscribe(
      data => {
        this.project.getProjectDetails().subscribe(
          details => {
            this.projectDetails = details
          },
          err => {
            console.error(err)
          }
        )
      },
      err => {
        console.error(err)
      }
    )
   
    console.log(id);
  }

}

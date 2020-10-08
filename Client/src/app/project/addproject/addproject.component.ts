import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service'
import { ProjectDetails, ProjectService } from '../../project.service'
import { Router } from "@angular/router"
@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {

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
  constructor(public auth: AuthenticationService, private router: Router, private porject: ProjectService) { }
  ngOnInit() {}
  addProject() {
    this.porject.addProjectDetails(this.projectDetails).subscribe(
      () => {
        this.router.navigateByUrl('/project')
      },
      err => {
        console.error(err)
      }
    )
  }

}

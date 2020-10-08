import { Component, OnInit } from '@angular/core';
import { AuthenticationService, ProfileUserDetails, TeamDetails } from '../../authentication.service'
import { ProjectDetails, ProjectService } from '../../project.service'
import { Router } from "@angular/router"

@Component({
  selector: 'app-manageteam',
  templateUrl: './manageteam.component.html',
  styleUrls: ['./manageteam.component.css']
})
export class ManageteamComponent implements OnInit {
  projectName: string = "";
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

  profileDetails: ProfileUserDetails =
    {
      username: '',
      projectName:''
    }
  teamDetails: TeamDetails =
    {
      username: '',
      project: ''
    }
  constructor(public auth: AuthenticationService, private router: Router, private porject: ProjectService) { }

  ngOnInit(): void {
    this.porject.getProjectDetails().subscribe(
      details => {
        this.projectDetails = details
      },
      err => {
        console.error(err)
      }
    )
    this.auth.getProfileUsers().subscribe(
      details => {
        this.profileDetails = details
      },
      err => {
        console.error(err)
      }
    )
  }
  saveTeam(record) {
    this.auth.mangeUser(this.profileDetails[record]).subscribe(
      () => {
        this.router.navigateByUrl('/team')
      },
      err => {
        console.error(err)
      }
    )
    //console.log(this.teamDetails.project)
    // this.auth.login(this.credentials).subscribe(
    //     ()=>{
    //         this.router.navigateByUrl('/home')
    //     },
    //     err=>{
    //         console.error(err)
    //     }
    // )
  }
  valueSelected(value: string) {
    this.teamDetails.project = value
  }
}

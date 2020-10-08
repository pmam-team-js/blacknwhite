import { Component, OnInit } from '@angular/core';
import { AuthenticationService, ProfileDetails } from '../../../authentication.service'
import { Router, ActivatedRoute } from "@angular/router"

@Component({
  selector: 'app-authorised-top-nav',
  templateUrl: './authorised-top-nav.component.html',
  styleUrls: ['./authorised-top-nav.component.scss']
})
export class AuthorisedTopNavComponent implements OnInit {

  credentials: ProfileDetails = {
    id: 0,
    username: this.auth.getUserDetails()?.username,
    FirstName: '',
    LastName: '',
    Role: '',
    Avatar: 'none'
  }
  avatar: String
  description: string
  constructor(public auth: AuthenticationService, private router: Router) { }
  ngOnInit() {
    this.auth.getProfile(this.auth.getUserDetails()?.username).subscribe(
      user => {
        if (user.Avatar == 'none')
          this.credentials.Avatar = ''
        else
          this.credentials = user
      },
      err => {
        console.error(err)
      }
    )
  }
  searchTask() {
    this.router.navigateByUrl('/tasksearch?task=' + this.description)
  }

}

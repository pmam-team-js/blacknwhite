import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-modelpopup',
  templateUrl: './modelpopup.component.html',
  styleUrls: ['./modelpopup.component.css']
})
export class ModelpopupComponent implements OnInit {

  date; //date Variable
  logedInForm; //These are variables
  emailId;
  password;
  display = 'none'; //default Variable

  constructor() { }

  ngOnInit() {
    this.date = new Date(); // Today date and time
    //Login Validation
    this.logedInForm = new FormGroup({
      emailId: new FormControl("youremail@gmail.com",
        Validators.compose([
          Validators.required,
          Validators.pattern("[^ @]*@[^ @]*")
        ])),
      password: new FormControl('YourPassword', [
        Validators.minLength(8),
        Validators.required])
    });
  }

  // Model Driven Form - login
  mdfLogin(data) {
    this.emailId = data.emailId;
    this.password = data.password;
    // alert(JSON.stringify(data));
  }

  openModalDialog() {
    this.display = 'block'; //Set block css
  }

  closeModalDialog() {
    this.display = 'none'; //set none css after close dialog
  }

}

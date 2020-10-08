import { Component} from '@angular/core'
import { AuthenticationService, UserDetails, ProfileDetails } from '../authentication.service'
import { AlertService } from '../alert.service'
import { Router, ActivatedRoute } from "@angular/router"
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: "./profile.component.html",
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
    profileForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    credentials: ProfileDetails={
        id:0,
        username:this.auth.getUserDetails()?.username,
        FirstName:'',
        LastName:'',
        Role:'',
        Avatar:'none'
    }

    constructor(public  auth: AuthenticationService, private router:Router,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private alertService: AlertService) { }
    ngOnInit() {
        this.profileForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname:['', Validators.required],
            role:['', Validators.required]
            
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.auth.getProfile(this.auth.getUserDetails()?.username).subscribe(
            user => {
                this.credentials= user
            },
            err => {
                console.error(err)
            }
        )
    }
    get f() { return this.profileForm.controls; }
    profileUpdate(){
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.profileForm.invalid) {
            return;
        }

        this.loading = true;

        this.auth.updateProfile(this.credentials).pipe(first()).subscribe(
            ()=>{
                this.router.navigateByUrl('/task')
            },
            err=>{
                console.error(err)
            }
        )
    }
}
import { Component,ViewEncapsulation } from "@angular/core"
import { AuthenticationService, TokenPayload } from '../authentication.service'
import { AlertService } from '../alert.service'
import { Router, ActivatedRoute } from "@angular/router"
import { FormBuilder, FormGroup, Validators,FormControl  } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
    
})

export class RegisterComponent {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    credentials: TokenPayload = {
        id: 0,
        username: '',
        password: ''
    }
    constructor(private auth: AuthenticationService,
        private router: Router,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private alertService: AlertService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username:  new FormControl('',[
                Validators.required,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    get f() { return this.registerForm.controls; }

    
    register() {
        console.log(this.credentials)
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        
        this.auth.register(this.credentials)
            .pipe(first()).subscribe(
                data => {
                    console.log(data.error)
                    if (data.error)
                    {
                        this.alertService.error(data.error);
                        this.loading = false;
                    }
                    else
                        this.router.navigateByUrl('/')
                },
                err => {
                    this.alertService.error(err);
                    this.loading = false;
                    console.error(err)
                }
            )
    }
}

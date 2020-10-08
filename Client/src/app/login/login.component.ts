import { Component, OnInit,ViewEncapsulation,ElementRef,Renderer2} from "@angular/core"
import { AuthenticationService, TokenPayload } from '../authentication.service'
import { AlertService } from '../alert.service'
import { Router, ActivatedRoute } from "@angular/router"
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
  })

export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    display = 'none';
    credentials: TokenPayload = {
        id: 0,
        username: '',
        password: ''

    }
    displayerror=false
    constructor(private auth: AuthenticationService,
        private router: Router,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private el: ElementRef, private renderer:Renderer2) { }

        ngAfterViewInit(){

            this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'background', 'linear-gradient(to left, #434343, #000000) ');
            
            }
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: new FormControl('',[
                Validators.required,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    get f() { return this.loginForm.controls; }

    login() {
        
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.auth.login(this.credentials)
            .pipe(first())
            .subscribe(
                () => {
                    if (this.auth.getToken()==null) {
                       this.alertService.error("Email or password not match..");
                        this.loading = false;
                        this.displayerror=true
                        
                    }
                    else
                        this.router.navigateByUrl('/task')
                    //this.router.navigate([this.returnUrl]);
                },
                err => {
                    console.log(err)
                    this.alertService.error(err);
                    this.loading = false;
                    //console.error(err)
                }
            )
    }
}

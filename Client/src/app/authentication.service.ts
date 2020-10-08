import { Injectable } from '@angular/core'
import { HttpClient } from "@angular/common/http"
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { environment } from '../environments/environment';

export interface UserDetails {
    id: number,
    password: string,
    username:string,
    exp: number
    iat: number
}

interface TokenResponse {
    token: string
}
export interface TokenPayload {
    id: number
    username: string
    password: string

}

export interface ProfileDetails
{
    id: number,
    username: String,
    FirstName: String,
    LastName: String,
    Avatar: String,
    Role:	String, 
}
export interface ProfileUserDetails
{
    username: String,
    projectName : String
}


export interface TeamDetails
{
    username:String,
    project:String
}


@Injectable()
export class AuthenticationService {
    private token: string
    constructor(private http: HttpClient, private router: Router) { }

    private saveToken(token: string): void {
        localStorage.setItem('userToken', token)
        this.token = token
    }

    public getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('userToken')
        }
        return this.token
    }
    public getUserDetails(): UserDetails {
        const token = this.getToken()
        if (token) {
            let payload = token.split('.')[1]
            payload = window.atob(payload)
            return JSON.parse(payload)
        } else {
            return null
        }
    }
    public isLoggedIn(): boolean {
        const user = this.getUserDetails()
        if (user) {
            return user.exp > Date.now() / 10000
        }
        else {  this.router.navigateByUrl('/login')
        return false 
        }
    }
    public register(user: TokenPayload): Observable<any> {
        const base = this.http.post(environment.apiUrl + '/users/register', user)
        const request = base.pipe(
            map((data: TokenResponse) => {
                if (data.token) {
                    this.saveToken(data.token)
                }
                return data
            })
        )
        return request
    }

    public login(user: TokenPayload): Observable<any> {
        const base = this.http.post(environment.apiUrl + '/users/login', user)
        const request = base.pipe(
            map((data: TokenResponse) => {
                if (data.token) {
                    this.saveToken(data.token)
                }
                return data
            })
        )
        return request
    }
    public profile(): Observable<any> {
        if (this.token == null)
            this.router.navigateByUrl('/')
        else {
            return this.http.get(environment.apiUrl + "/users/profile", {
                headers: { Authorization: this.getToken() }
            })
        }
    }
    public logout(): void {
        this.token = ''
        window.localStorage.removeItem('userToken')
        this.router.navigateByUrl('/')
    }
    public updateProfile(user: ProfileDetails): Observable<any> {
        const base = this.http.post(environment.apiUrl + '/profiles/update', user)
        const request = base.pipe(
            map((data: ProfileDetails) => {
                return data
            })
        )
        return request
    }
    public getProfile(user :String){
        const base = this.http.get(environment.apiUrl + '/profiles/profile/'+user)
        const request = base.pipe(
            map((data: ProfileDetails) => {
                return data
            })
        )
        return request
    }
    public getProfileUsers():Observable<any>
    {
        const base = this.http.get(environment.apiUrl + '/profiles')
        const request = base.pipe(
            map((data: ProfileUserDetails) => {
                return data
            })
        )
        
        return request
    }
    public mangeUser(team: ProfileUserDetails): Observable<any> {
        const base = this.http.put(environment.apiUrl + '/profiles', team)
        const request = base.pipe(
            map((data: ProfileDetails) => {
                return data
            })
        )
        return request
    }
}

import { Injectable } from '@angular/core'
import { HttpClient } from "@angular/common/http"
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { environment } from '../environments/environment';

export interface ProjectDetails
{
    _id: number,
    ProjectName: String,
    ProjectDescription: String,
    StartDate: String,
    FinishDate: String,
    Type:	String, 
    Client:String
}
@Injectable()
export class ProjectService {

    constructor(private http: HttpClient, private router: Router) { }
    public getProjectDetails(): Observable<any> {
        const base = this.http.get(environment.apiUrl + '/projects')
        const request = base.pipe(
            map((data: ProjectDetails) => {
                return data
            })
        )
        return request
    }
    public addProjectDetails(project: ProjectDetails): Observable<any> {
        const base = this.http.post(environment.apiUrl + '/projects/add', project)
        const request = base.pipe(
            map((data: ProjectDetails) => {
                return data
            })
        )
        return request
    }
    public DeleteProject(id:string)
    {
        const base = this.http.delete(environment.apiUrl + '/projects/'+id )
        console.log(base)
        const request = base.pipe(
            map((data: String) => {
                return data
            })
        )
        return request
    }
}
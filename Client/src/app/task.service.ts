import { Injectable } from '@angular/core'
import { HttpClient } from "@angular/common/http"
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { environment } from '../environments/environment';


export interface TaskDetails
{
    id: number,
    projectid: String,
    userid: String,
    description:String,
    status:String
}

export interface TaskInfomration
{
    tasks1 : tasks1
    tasks2 : tasks2
}
export interface SearchTaskResult
{
    taskResult : taskResult,
    recordCount : number
}
export interface taskResult
{
    status:String,
    _id:number,
    userid :String,
    description:String,
    comments :comments
    likes : likes,
    dated :string

}
export interface tasks1
{
    status:String,
    _id:number,
    userid :String,
    description:String,
    comments :comments
    likes : likes

}
export interface tasks2
{
    status:String,
    _id:number,
    userid :String,
    description:String,
    comments :comments
    likes : likes
    
}
export interface comments
{
    _id:number
}
export interface likes
{
    _id:number
}
export interface StatusUpdate
{
    Id: number,
    TaskStatus:String

}
export interface Likes
{
    id: number,
    userid:String

}
export interface Comments
{
    id: number,
    userid:String,
    text:String
}

export interface CommentDetails
{
    comments:CommentsInfo
}
interface CommentsInfo
{
    text:String,
    dated :String,
    author:aurhtor
}
interface aurhtor
{
    "id":string,
    "username" :string
}

export interface  ReportSearch
{
    projectName:string,
    date:string
    username:string
}
export interface  TaskSearch
{
    txtsearch:string,
    username:string
}
export interface  TimeTrack
{
    userid:string,
    play:Boolean
}


@Injectable()
export class TaskService {

    constructor(private http: HttpClient, private router: Router) { }

    public addTask(task: TaskDetails): Observable<any> {
        const base = this.http.post(environment.apiUrl + '/tasks', task)
        const request = base.pipe(
            map((data: TaskDetails) => {
                return data
            })
        )
        return request
    }
    public GetAllTask(username:String): Observable<any> {
        // const promise =this.http.get(environment.apiUrl + '/tasks/'+username ).toPromise();
        // promise.then(map((data: TaskInfomration) => {
        //     return data
        // }));
       // return request;

        const base = this.http.get(environment.apiUrl + '/tasks/'+username )
        const request = base.pipe(
            map((data: TaskInfomration) => {
                return data
            })
        )
        return request
    }
    public DeleteTodo(id:string)
    {
        const base = this.http.delete(environment.apiUrl + '/tasks/'+id )
        console.log(base)
        const request = base.pipe(
            map((data: String) => {
                return data
            })
        )
        return request
    }
    public updateTaskStatus(task:StatusUpdate ){
        const base = this.http.put(environment.apiUrl + '/tasks', task)
        const request = base.pipe(
            map((data: TaskDetails) => {
                return data
            })
        )
        return request
    }
    public addLikes(likes:Likes)
    {
        const base = this.http.post(environment.apiUrl + '/likes', likes)
        const request = base.pipe(
            map((data: String) => {
                return data
            })
        )
        return request
    }
    public addComments(comments:Comments)
    {
        const base = this.http.post(environment.apiUrl + '/comments', comments)
        const request = base.pipe(
            map((data: String) => {
                return data
            })
        )
        return request
    }
    public getComments(id:Number)
    {
        const base = this.http.get(environment.apiUrl + '/comments/'+id)
        const request = base.pipe(
            map((data: CommentDetails) => {
                return data
            })
        )
        return request
    }

    public getReportData(repotSearch:ReportSearch)
    {
        const base = this.http.post(environment.apiUrl + '/tasks/reports', repotSearch)
        const request = base.pipe(
            map((data: TaskInfomration) => {
                return data
            })
        )
        return request
    }
    public timeTracker(timeTrack:TimeTrack)
    {
        const base = this.http.post(environment.apiUrl + '/tasks/timetrack', timeTrack)
        const request = base.pipe(
            map(() =>{
                return timeTrack
            })
        )
        return request
    }

    public getTaskSearch(taskSearch:TaskSearch)
    {
        const base = this.http.post(environment.apiUrl + '/tasks/tasksearch', taskSearch)
        const request = base.pipe(
            map((data: SearchTaskResult) => {
                return data
            })
        )
        return request
    }

}
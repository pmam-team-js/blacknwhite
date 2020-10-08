
import { Component, OnInit, ViewEncapsulation, OnDestroy, Pipe, PipeTransform, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AuthenticationService } from '../authentication.service'
import {
  TaskService, TaskDetails, TaskInfomration, StatusUpdate, Likes, Comments,
  CommentDetails, TimeTrack
} from '../task.service'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import * as _ from 'lodash';

declare var $: any;


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']

})

export class TaskComponent implements OnInit, OnDestroy {
  commentForm: FormGroup;
  taskForm: FormGroup;


  currentTime: number = 0;
  intvl = null;
  playToggle = false;

  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  difference_ms: number = 0;
  display = 'none';
  playTime: boolean=true;


  playTimeLine() {
    this.playToggle = true;
    this.timeTrackRecord()
    this.intvl = setInterval(() => {
      this.currentTime = this.currentTime + 1;

      this.difference_ms = this.currentTime;
      this.seconds = Math.floor(this.difference_ms % 60);

      this.difference_ms = this.difference_ms / 60;

      this.minutes = Math.floor(this.difference_ms % 60);
      this.difference_ms = this.difference_ms / 60;
      this.hours = Math.floor(this.difference_ms % 24);

      // this.seconds = this.currentTime / 60
      // this.minutes = this.seconds / 60
      // this.hours = this.minutes / 60
    }, 1000);
  }

  pauseTimeLine() {
    this.playToggle = false;
    // clearInterval(this.intvl);
    // console.log(this.currentTime)
    this.timeTrackRecord()
    if (this.intvl) {
      clearInterval(this.intvl);
    }
  }
  todayDate: Date = new Date();
  taskId: number = 0;
  taskDetails: TaskDetails =
    {
      id: 0,
      projectid: '',
      userid: '',
      description: '',
      status: ''
    }
  statusUpdate: StatusUpdate =
    {
      Id: 0,
      TaskStatus: ''
    }
  likes: Likes =
    {
      id: 0,
      userid: ''
    }
  comments: Comments =
    {
      id: 0,
      userid: '',
      text: ''
    }
  timeTrack: TimeTrack =
    {
      userid: '',
      play: false
    }


  constructor(public auth: AuthenticationService,
    private task: TaskService,
    private formBuilder: FormBuilder, private el: ElementRef, private renderer: Renderer2
    ) { }

  ngAfterViewInit() {
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background', '#FFFFFF');
  }
  taskInformation: TaskInfomration;
  commentDetails: CommentDetails;
  queryValue: string
  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      text: ['', Validators.required]
    });

    this.taskForm = this.formBuilder.group({
      taskdescription: ['', Validators.required]
    });

    //this.auth.getProfileUsers.filter(prof => prof.userid === this.taskDetails.userid).projectName.length >0;
    this.task.GetAllTask(this.auth.getUserDetails()?.username).subscribe(
      details => {
        this.taskInformation = details
        this.currentTime = details.timetrackcount / 1000
        this.playTime=! details.playTime
        console.log(this.playTime)
       if( this.playTime)
       this.playTimeLine();
      },
      err => {
        console.error(err)
      }
    )
  }
  get f() { return this.commentForm.controls; }

  addTask() {
    if (this.taskForm.invalid) {
      return;
    }
    this.taskDetails.userid = this.auth.getUserDetails().username
    this.task.addTask(this.taskDetails).subscribe(
      data => {
        this.refreshTaskList()
        this.taskForm.reset()
      },
      err => {
        console.error(err)
      }
    )

  }

  refreshTaskList() {
    this.task.GetAllTask(this.auth.getUserDetails()?.username).subscribe(
      details => {
        this.taskInformation = details

        console.log(details)
        console.log("Refresh task likst")
      },
      err => {
        console.error(err)
      }
    )
  }
  deleteTask(taskId) {
    this.task.DeleteTodo(taskId).subscribe(
      data => {
        this.refreshTaskList()
      },
      err => {
        console.error(err)
      }
    )
  }

  completeTask(taskId, taskStatus) {
    if (taskStatus == "OPEN")
      taskStatus = "COMPLETED"
    else
      taskStatus = "OPEN"
    this.statusUpdate.Id = taskId
    this.statusUpdate.TaskStatus = taskStatus
    this.task.updateTaskStatus(this.statusUpdate).subscribe(
      data => {
        this.refreshTaskList()
      },
      err => {
        console.error(err)
      }
    )
  }

  addLikes(taskId) {
    this.likes.id = taskId
    this.likes.userid = this.auth.getUserDetails()?.username
    this.task.addLikes(this.likes).subscribe(
      data => {
        this.refreshTaskList()
      },
      err => {
        console.error(err)
      }
    )
  }

  addComments() {
    // stop here if form is invalid
    if (this.commentForm.invalid) {
      return;
    }
    this.comments.id = this.taskId
    this.comments.userid = this.auth.getUserDetails()?.username
    this.task.addComments(this.comments).subscribe(
      data => {
        this.getComments()
        this.refreshTaskList()
        this.commentForm.reset()
      },
      err => {
        console.error(err)
      }
    )
  }
  getComments() {
    this.task.getComments(this.taskId).subscribe(
      data => {
        this.commentDetails = data
      },
      err => {
        console.error(err)
      }
    )
  }

  saveCommentId(taskId) {
    this.taskId = taskId
    this.getComments();
    console.log(this.taskId);
  }

  timeTrackRecord() {
    console.log(this.auth.getUserDetails()?.username);
    if (this.auth.getUserDetails()?.username != undefined) {
      this.timeTrack.userid = this.auth.getUserDetails()?.username;
      this.timeTrack.play = !this.playToggle
      this.task.timeTracker(this.timeTrack).subscribe()
    }
  }
  openModalDialog() {
    this.display = 'block'; //Set block css
  }

  closeModalDialog() {
    this.display = 'none'; //set none css after close dialog
  }

  ngOnDestroy() {
    
    this.timeTrackRecord()
  }
}


@Pipe({
  name: 'filterUnique',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(value: any): any {
    if (value !== undefined && value !== null) {
      return _.uniqBy(value, 'userid');
    }
    return value;
  }
}


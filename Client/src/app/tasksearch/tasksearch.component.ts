import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router"
import { SearchTaskResult, TaskService, TaskSearch } from '../task.service'
import { AuthenticationService } from '../authentication.service'

@Component({
  selector: 'app-tasksearch',
  templateUrl: './tasksearch.component.html',
  styleUrls: ['./tasksearch.component.css']
})
export class TasksearchComponent implements OnInit {
  taskInformation: SearchTaskResult;
  taskSearchSearch: TaskSearch =
    {
      username: '',
      txtsearch: ''
    }
  constructor(private route: ActivatedRoute,
    private task: TaskService, private auth: AuthenticationService,
    private router: Router) {
    {
      // override the route reuse strategy
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      }

      this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
          // trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
          // if you need to scroll back to top, here is the right place
          window.scrollTo(0, 0);
        }
      });

    }
  }
  queryValue: string
  recordCount: number = 0
  p: number = 1;
  // config = {
  //   id: 'custom',
  //   itemsPerPage: 1,
  //   currentPage: 1,
  //   totalItems:0
  // };

  // public maxSize: number = 7;
  // public directionLinks: boolean = true;
  // public autoHide: boolean = false;
  // public responsive: boolean = true;
  // public labels: any = {
  //     previousLabel: '<--',
  //     nextLabel: '-->',
  //     screenReaderPaginationLabel: 'Pagination',
  //     screenReaderPageLabel: 'page',
  //     screenReaderCurrentLabel: `You're on page`
  // };
  ngOnInit(): void {

    this.route.queryParams.subscribe(
      params => {
        this.queryValue = params['task'];

      }
    )
    this.taskSearchSearch.username = this.auth.getUserDetails().username
    this.taskSearchSearch.txtsearch = this.queryValue
    this.task.getTaskSearch(this.taskSearchSearch).subscribe(
      details => {
        this.taskInformation = details
        this.recordCount = details.recordCount
        //this.config.totalItems=details.recordCount
      },
      err => {
        console.error(err)
      }
    )
  }
  onPageChange(event){
    console.log(event);
    //this.config.currentPage = event;
  }

}

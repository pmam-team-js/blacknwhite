import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpClientModule} from '@angular/common/http'
import{FormsModule,ReactiveFormsModule} from '@angular/forms'
import{RouterModule,Routes} from '@angular/router'
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import{AuthenticationService} from './authentication.service'
import{AuthGuardService} from './auth-guard.service'
import{ProjectService} from './project.service'
import {AlertService} from './alert.service'
import {TaskService} from './task.service'

import {HomeComponent} from './home/home.component'
import {ProfileComponent} from './profile/profile.component'
import {RegisterComponent} from './register/register.component'
import {LoginComponent} from './login/login.component'


import { AuthorisedSideNavComponent } from './layout/authorised/authorised-side-nav/authorised-side-nav.component';
import { AuthorisedLayoutComponent } from './layout/authorised/authorised-layout/authorised-layout.component';
import { AuthorisedTopNavComponent } from './layout/authorised/authorised-top-nav/authorised-top-nav.component';
import { AuthorisedSideNavTogglerComponent } from './layout/authorised/authorised-side-nav-toggler/authorised-side-nav-toggler.component';
import { PageContentComponent } from './layout/page-content/page-content.component';
import { ProjectComponent } from './project/listproject/project.component';
import { AddprojectComponent } from './project/addproject/addproject.component';
import { ManageteamComponent } from './team/manageteam/manageteam.component';
import { TaskComponent,FilterPipe } from './task/task.component';
import { AlertComponent } from './alert/alert.component';


import { ReportComponent } from './report/report.component';
import { ModelpopupComponent } from './modelpopup/modelpopup.component';
import { TasksearchComponent } from './tasksearch/tasksearch.component';



@NgModule({
  declarations: [
    AppComponent,ProfileComponent,
    LoginComponent,RegisterComponent,HomeComponent,
    AuthorisedSideNavComponent,
    AuthorisedLayoutComponent,
    AuthorisedTopNavComponent,
    AuthorisedSideNavTogglerComponent,
    PageContentComponent,
    ProjectComponent,
    AddprojectComponent,
    ManageteamComponent,
    TaskComponent,
    AlertComponent,
    FilterPipe,
    ReportComponent,
    ModelpopupComponent,
    TasksearchComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
    //RouterModule.forRoot (routes)
  ],
  providers: [AuthenticationService,AuthGuardService,ProjectService,AlertService,TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }

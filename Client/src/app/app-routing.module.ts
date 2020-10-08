import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorisedLayoutComponent } from './layout/authorised/authorised-layout/authorised-layout.component';
import { AuthGuardService } from './auth-guard.service'
import { HomeComponent } from './home/home.component'
import { ProfileComponent } from './profile/profile.component'
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { ProjectComponent } from './project/listproject/project.component';
import { AddprojectComponent } from './project/addproject/addproject.component'
import { ManageteamComponent } from './team/manageteam/manageteam.component';
import { TaskComponent } from './task/task.component';
import { ReportComponent } from './report/report.component';
import { ModelpopupComponent } from './modelpopup/modelpopup.component';
import { TasksearchComponent } from './tasksearch/tasksearch.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AuthorisedLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent,
        canActivate: [AuthGuardService] },
    ]
  },
  {
    path: '',
    component: AuthorisedLayoutComponent,
    children: [
      {
        path: 'profile', component: ProfileComponent,
        canActivate: [AuthGuardService]
      },
    ],
  },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: AuthorisedLayoutComponent,
    children: [
      { path: 'project', component: ProjectComponent },
    ]

  },
  {
    path: '',
    component: AuthorisedLayoutComponent,
    children: [
      { path: 'addproject', component: AddprojectComponent },
    ]
  },
  {
    path: '',
    component: AuthorisedLayoutComponent,
    children: [
      { path: 'team', component: ManageteamComponent },
    ]
  },
  {
    path: '',
    component: AuthorisedLayoutComponent,
    children: [
      { path: 'task', component: TaskComponent },
    ]
  },
  {
    path: '',
    component: AuthorisedLayoutComponent,
    children: [
      { path: 'report', component: ReportComponent },
    ]
  },
  {
    path: '',
    component: AuthorisedLayoutComponent,
    children: [
      { path: 'tasksearch', component: TasksearchComponent,
     },
    ]
  },
  {path: '404', component: LoginComponent},
  {path: '**', redirectTo: '/404'},
  { path: 'modelpopup', component: ModelpopupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

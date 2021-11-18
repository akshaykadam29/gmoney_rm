import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AddDesignationComponent } from './modules/add-designation/add-designation.component';
import { AddUserComponent } from './modules/add-user/add-user.component';
import { AssignHospitalComponent } from './modules/assign-hospital/assign-hospital.component';
import { CentreComponent } from './modules/centre/centre.component';
import { ClaimHospitalComponent } from './modules/claim-hospital/claim-hospital.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MyEffortComponent } from './modules/effort/my-effort/my-effort.component';
import { TeamEffortComponent } from './modules/effort/team-effort/team-effort.component';
import { LeadsAssignComponent } from './modules/leads-assign/leads-assign.component';
import { LoansComponent } from './modules/loans/loans.component';
import { LoginUserComponent } from './modules/login-user/login-user.component';

import { RmLmsComponent } from './modules/rm-lms/rm-lms.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch : 'full'},
  { path : 'dashboard', component : DashboardComponent, canActivate : [AuthGuard]},
  { path : 'add', component : AddUserComponent, canActivate : [AuthGuard]},
  { path : 'assign', component : AssignHospitalComponent, canActivate : [AuthGuard] },
  { path : 'login', component : LoginUserComponent },
  { path : 'designation', component : AddDesignationComponent, canActivate : [AuthGuard] },
  //Loans Routes
  { path : 'loans', component : LoansComponent, canActivate : [AuthGuard]},
  //centre Routes
  { path : 'center', component : CentreComponent, canActivate : [AuthGuard]},
   //Lead Routes
  { path : 'assign-lead', component : LeadsAssignComponent, canActivate : [AuthGuard]},
  //LMS Routes
  { path : 'lms', component : RmLmsComponent, canActivate : [AuthGuard]},
  //Claim Routes
  { path : 'claim', component : ClaimHospitalComponent, canActivate : [AuthGuard]},
  //Effort Routes
  { path : 'my-effort', component : MyEffortComponent, canActivate : [AuthGuard]},
  { path : 'team-effort', component : TeamEffortComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

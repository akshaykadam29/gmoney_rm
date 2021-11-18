// System Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

// Admin Screen Components
import { AddUserComponent } from './modules/add-user/add-user.component';
import { AddDesignationComponent } from './modules/add-designation/add-designation.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

// Common Screen Components
import { AppComponent } from './app.component';
import { LoginUserComponent } from './modules/login-user/login-user.component';
import { HeaderComponent } from './modules/header/header.component';
import { FooterComponent } from './modules/footer/footer.component';

// Assigned Screen Components
import { AssignHospitalComponent } from './modules/assign-hospital/assign-hospital.component';
import { AllHospitalComponent } from './modules/assign-hospital/all-hospital/all-hospital.component';
import { AssignedHospitalComponent } from './modules/assign-hospital/assigned-hospital/assigned-hospital.component';
import { InactiveHospitalComponent } from './modules/assign-hospital/inactive-hospital/inactive-hospital.component';

// Centers Screen Components
import { CentreComponent } from './modules/centre/centre.component';
import { CentreInprocessComponent } from './modules/centre/centre-inprocess/centre-inprocess.component';
import { CentreApprovedComponent } from './modules/centre/centre-approved/centre-approved.component';
import { CentreOnholdComponent } from './modules/centre/centre-onhold/centre-onhold.component';

// Loans Screen Components
import { LoansComponent } from './modules/loans/loans.component';
import { LoanInprocessComponent } from './modules/loans/loan-inprocess/loan-inprocess.component';
import { LoanRejectedComponent } from './modules/loans/loan-rejected/loan-rejected.component';
import { LoanApprovedComponent } from './modules/loans/loan-approved/loan-approved.component';
import { LoanDisbursedComponent } from './modules/loans/loan-disbursed/loan-disbursed.component';

//Services used
import { RmUserService } from './services/rm-user.service';
import { LoginService } from './services/login.service';
import { AdminServiceService } from './services/admin-service.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

//Angular Material 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

//Image View Component
import { ImageViewDialogComponent } from './modules/dialog/image-view-dialog/image-view-dialog.component';
import { LeadsAssignComponent } from './modules/leads-assign/leads-assign.component';
import { UnassignedLeadComponent } from './modules/leads-assign/unassigned-lead/unassigned-lead.component';
import { AssignedLeadComponent } from './modules/leads-assign/assigned-lead/assigned-lead.component';
import { OnboardedLeadComponent } from './modules/leads-assign/onboarded-lead/onboarded-lead.component';
import { RmOnboardLeadComponent } from './modules/rm-lms/rm-onboard-lead/rm-onboard-lead.component';
import { RmLmsComponent } from './modules/rm-lms/rm-lms.component';
import { RmCallLaterLeadComponent } from './modules/rm-lms/rm-call-later-lead/rm-call-later-lead.component';
import { RmVisitLeadComponent } from './modules/rm-lms/rm-visit-lead/rm-visit-lead.component';
import { RmInProcessLeadComponent } from './modules/rm-lms/rm-in-process-lead/rm-in-process-lead.component';
import { RmLinkSentLeadComponent } from './modules/rm-lms/rm-link-sent-lead/rm-link-sent-lead.component';
import { RmNotInterestedLeadComponent } from './modules/rm-lms/rm-not-interested-lead/rm-not-interested-lead.component';
import { RmDoesnotExistLeadComponent } from './modules/rm-lms/rm-doesnot-exist-lead/rm-doesnot-exist-lead.component';
import { RmAppoinmentLeadComponent } from './modules/rm-lms/rm-appoinment-lead/rm-appoinment-lead.component';
import { RmAssignedLeadComponent } from './modules/rm-lms/rm-assigned-lead/rm-assigned-lead.component';
import { RmAddLeadComponent } from './modules/rm-lms/rm-add-lead/rm-add-lead.component';
import { RmMarketingLeadComponent } from './modules/rm-lms/rm-marketing-lead/rm-marketing-lead.component';
import { ClaimHospitalComponent } from './modules/claim-hospital/claim-hospital.component';
import { UnclaimedHospitalComponent } from './modules/claim-hospital/unclaimed-hospital/unclaimed-hospital.component';
import { ClaimedHospitalComponent } from './modules/claim-hospital/claimed-hospital/claimed-hospital.component';
import { MyClaimedHospitalComponent } from './modules/claim-hospital/my-claimed-hospital/my-claimed-hospital.component';
import { SchemeViewDialogComponent } from './modules/dialog/scheme-view-dialog/scheme-view-dialog.component';
import { EffortComponent } from './modules/effort/effort.component';
import { MyEffortComponent } from './modules/effort/my-effort/my-effort.component';
import { TeamEffortComponent } from './modules/effort/team-effort/team-effort.component';
import { LeadHistoryViewDialogComponent } from './modules/dialog/lead-history-view-dialog/lead-history-view-dialog.component';
import { ClaimSchemeApprovalComponent } from './modules/claim-hospital/claim-scheme-approval/claim-scheme-approval.component';
import { AssignDisputeClaimHospitalDialogComponent } from './modules/dialog/assign-dispute-claim-hospital-dialog/assign-dispute-claim-hospital-dialog.component';



FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);


@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    LoginUserComponent,
    HeaderComponent,
    FooterComponent,
    AssignHospitalComponent,
    AddDesignationComponent,
    AllHospitalComponent,
    AssignedHospitalComponent,
    InactiveHospitalComponent,
    DashboardComponent,
    LoansComponent,
    LoanInprocessComponent,
    LoanApprovedComponent,
    LoanRejectedComponent,
    LoanDisbursedComponent,
    CentreComponent,
    CentreInprocessComponent,
    CentreApprovedComponent,
    CentreOnholdComponent,
    ImageViewDialogComponent,
    LeadsAssignComponent,
    UnassignedLeadComponent,
    AssignedLeadComponent,
    OnboardedLeadComponent,
    RmOnboardLeadComponent,
    RmLmsComponent,
    RmCallLaterLeadComponent,
    RmVisitLeadComponent,
    RmInProcessLeadComponent,
    RmLinkSentLeadComponent,
    RmNotInterestedLeadComponent,
    RmDoesnotExistLeadComponent,
    RmAppoinmentLeadComponent,
    RmAssignedLeadComponent,
    RmAddLeadComponent,
    RmMarketingLeadComponent,
    ClaimHospitalComponent,
    UnclaimedHospitalComponent,
    ClaimedHospitalComponent,
    MyClaimedHospitalComponent,
    SchemeViewDialogComponent,
    EffortComponent,
    MyEffortComponent,
    TeamEffortComponent,
    LeadHistoryViewDialogComponent,
    ClaimSchemeApprovalComponent,
    AssignDisputeClaimHospitalDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxSpinnerModule,
    FullCalendarModule
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true },
    AuthGuard,AdminServiceService,LoginService,RmUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

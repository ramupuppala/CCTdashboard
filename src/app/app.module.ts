import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { UserService } from "./services/user-service";
import { LoyalityService } from "./services/loyality-service";
import { BroadcastNotificationService } from './services/broadcast-notification-service';
import { ManageStaffService } from './services/manage-staff-service';
import { HttpCallService } from './services/http-service';
import { ProfileListService } from './services/profile-list-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ROUTES } from './routes';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { AppDashboardComponent } from './components/dashboard/app-dashboard/app-dashboard.component';
import { LoyalityComponent } from './components/dashboard/app-dashboard/loyality/loyality.component';
import { CreateLoyalityComponent } from './components/dashboard/app-dashboard/loyality/create-loyality/create-loyality.component';
import { EditLoyalityComponent } from './components/dashboard/app-dashboard/loyality/edit-loyality/edit-loyality.component';
import { BroadcastNotificationComponent } from './components/dashboard/app-dashboard/broadcast-notification/broadcast-notification.component';
import { CustomercareComponent } from './components/dashboard/app-dashboard/manage-staff/customercare/customercare.component';
import { StoremanagerComponent } from './components/dashboard/app-dashboard/manage-staff/storemanager/storemanager.component';
import { AssingStoreComponent } from './components/dashboard/app-dashboard/manage-staff/customercare/assing-store/assing-store.component';
import { AssignedStoreComponent } from './components/dashboard/app-dashboard/manage-staff/customercare/assigned-store/assigned-store.component';
import { ProfileListComponent } from './components/dashboard/app-dashboard/profile-list/profile-list.component';
import { UpdateCustomerIdComponent } from './components/dashboard/app-dashboard/profile-list/update-customer-id/update-customer-id.component';
import { CreateProfileListComponent } from './components/dashboard/app-dashboard/profile-list/create-profile-list/create-profile-list.component';
import { EditProfileListComponent } from './components/dashboard/app-dashboard/profile-list/edit-profile-list/edit-profile-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    AppDashboardComponent,
    LoyalityComponent,
    CreateLoyalityComponent,
    EditLoyalityComponent,
    BroadcastNotificationComponent,
    CustomercareComponent,
    StoremanagerComponent,
    AssingStoreComponent,
    AssignedStoreComponent,
    ProfileListComponent,
    UpdateCustomerIdComponent,
    CreateProfileListComponent,
    EditProfileListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [UserService, LoyalityService,BroadcastNotificationService,ManageStaffService,HttpCallService,ProfileListService],
  bootstrap: [AppComponent]
})
export class AppModule { }

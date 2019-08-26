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
import { BrandService } from './services/brand-list-service';
import { RelationsListService } from './services/relations-list-service';
import { NotificationsService } from './services/notification-service';

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
import { BrandListComponent } from './components/dashboard/app-dashboard/brand-list/brand-list.component';
import { CreateBrandListComponent } from './components/dashboard/app-dashboard/brand-list/create-brand-list/create-brand-list.component';
import { EditBrandListComponent } from './components/dashboard/app-dashboard/brand-list/edit-brand-list/edit-brand-list.component';
import { StoreManagerAssignStore } from './components/dashboard/app-dashboard/manage-staff/customercare/assing-store/store-manager-assign-store';
import { StoreManagerAssignedStore } from './components/dashboard/app-dashboard/manage-staff/customercare/assigned-store/store-manager-assigned-store';
import { RelationsListComponent } from './components/dashboard/app-dashboard/relations-list/relations-list.component';
import { NotificationsComponent } from './components/dashboard/app-dashboard/notifications/notifications.component';
import { CreateNotificationsComponent } from './components/dashboard/app-dashboard/notifications/create-notifications/create-notifications.component';

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
    StoreManagerAssignStore,
    AssignedStoreComponent,
    StoreManagerAssignedStore,
    ProfileListComponent,
    UpdateCustomerIdComponent,
    CreateProfileListComponent,
    EditProfileListComponent,
    BrandListComponent,
    CreateBrandListComponent,
    EditBrandListComponent,
    RelationsListComponent,
    NotificationsComponent,
    CreateNotificationsComponent,
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
  providers: [UserService, LoyalityService,BroadcastNotificationService,ManageStaffService,HttpCallService,ProfileListService,BrandService,RelationsListService,NotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

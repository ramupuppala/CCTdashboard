import { Route } from '@angular/router';
//login module
import { LoginComponent } from './components/login/login.component';
//dashboard module
import { DashboardComponent } from './components/dashboard/dashboard.component';
//app-dashboard module
import { AppDashboardComponent } from './components/dashboard/app-dashboard/app-dashboard.component';
//loyality modules 
import { LoyalityComponent } from './components/dashboard/app-dashboard/loyality/loyality.component';
import { CreateLoyalityComponent } from './components/dashboard/app-dashboard/loyality/create-loyality/create-loyality.component';
import { EditLoyalityComponent } from './components/dashboard/app-dashboard/loyality/edit-loyality/edit-loyality.component';
//broadcast-notification modules
import { BroadcastNotificationComponent } from './components/dashboard/app-dashboard/broadcast-notification/broadcast-notification.component';
//manage-staff
import { CustomercareComponent } from './components/dashboard/app-dashboard/manage-staff/customercare/customercare.component';
import { AssingStoreComponent } from './components/dashboard/app-dashboard/manage-staff/customercare/assing-store/assing-store.component';
import { AssignedStoreComponent } from './components/dashboard/app-dashboard/manage-staff/customercare/assigned-store/assigned-store.component';

import { StoremanagerComponent } from './components/dashboard/app-dashboard/manage-staff/storemanager/storemanager.component';

//Profile List
import { ProfileListComponent } from './components/dashboard/app-dashboard/profile-list/profile-list.component';
import { UpdateCustomerIdComponent } from './components/dashboard/app-dashboard/profile-list/update-customer-id/update-customer-id.component';
import { CreateProfileListComponent } from './components/dashboard/app-dashboard/profile-list/create-profile-list/create-profile-list.component';
import { EditProfileListComponent } from './components/dashboard/app-dashboard/profile-list/edit-profile-list/edit-profile-list.component';


export const ROUTES: Route[] = [
    {
        path: 'login', component: LoginComponent
    },
   
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'admindashboard', component: DashboardComponent
    },
    {
        path: 'loyality', component: LoyalityComponent
    },
    {
        path: 'loyality-create', component: CreateLoyalityComponent
    },
    {
        path: 'loyality-edit/:name', component: EditLoyalityComponent
    },
    {
        path: 'app-dashboard/:id/:name', component: AppDashboardComponent
    },
    {
        path: 'broadcast-notification', component: BroadcastNotificationComponent
    },
    {
        path: 'manage-customer-care', component: CustomercareComponent,      
    },
    {
        path: 'manage-staff-assign-store/:id/:type', component: AssingStoreComponent,      
    },
    {
        path: 'manage-staff-assigned-store/:id/:type', component: AssignedStoreComponent,      
    },
    {
        path: 'manage-store-manager', component: StoremanagerComponent
    },
    {
        path: 'profile-list', component: ProfileListComponent
    },
    {
        path: 'update-customerid/:p_id/:customer_id', component: UpdateCustomerIdComponent
    },
    {
        path: 'update-customerid/:p_id', component: UpdateCustomerIdComponent
    },
    {
        path: 'create-profile-list', component: CreateProfileListComponent
    },
    {
        path: 'edit-profile-list/:p_id', component: EditProfileListComponent
    }
]

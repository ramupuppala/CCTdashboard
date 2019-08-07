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
import { StoremanagerComponent } from './components/dashboard/app-dashboard/manage-staff/storemanager/storemanager.component';

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
        path: 'manage-customer-care', component: CustomercareComponent
    },
    {
        path: 'manage-store-manager', component: StoremanagerComponent
    }
]

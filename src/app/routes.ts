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
import { StoreManagerAssignedStore } from './components/dashboard/app-dashboard/manage-staff/customercare/assigned-store/store-manager-assigned-store';

import { StoremanagerComponent } from './components/dashboard/app-dashboard/manage-staff/storemanager/storemanager.component';
import { StoreManagerAssignStore } from './components/dashboard/app-dashboard/manage-staff/customercare/assing-store/store-manager-assign-store';

//Profile List
import { ProfileListComponent } from './components/dashboard/app-dashboard/profile-list/profile-list.component';
import { UpdateCustomerIdComponent } from './components/dashboard/app-dashboard/profile-list/update-customer-id/update-customer-id.component';
import { CreateProfileListComponent } from './components/dashboard/app-dashboard/profile-list/create-profile-list/create-profile-list.component';
import { EditProfileListComponent } from './components/dashboard/app-dashboard/profile-list/edit-profile-list/edit-profile-list.component';


//Brand List
import { BrandListComponent } from './components/dashboard/app-dashboard/brand-list/brand-list.component';
import { CreateBrandListComponent } from './components/dashboard/app-dashboard/brand-list/create-brand-list/create-brand-list.component';
import { EditBrandListComponent } from './components/dashboard/app-dashboard/brand-list/edit-brand-list/edit-brand-list.component';

//Relations List
import { RelationsListComponent } from './components/dashboard/app-dashboard/relations-list/relations-list.component';

//Notifications
import { NotificationsComponent } from './components/dashboard/app-dashboard/notifications/notifications.component';
import { CreateNotificationsComponent } from './components/dashboard/app-dashboard/notifications/create-notifications/create-notifications.component';
import { EditNotificationsComponent } from './components/dashboard/app-dashboard/notifications/edit-notifications/edit-notifications.component';

//geozone-list
import { GeozoneListComponent } from './components/dashboard/app-dashboard/geozone-list/geozone-list.component';
import { CreateGeozoneListComponent } from './components/dashboard/app-dashboard/geozone-list/create-geozone-list/create-geozone-list.component';
import { EngagementListComponent } from './components/dashboard/app-dashboard/geozone-list/engagement-list/engagement-list.component';
import { EnagagementZoneCreateComponent } from './components/dashboard/app-dashboard/geozone-list/engagement-list/enagagement-zone-create/enagagement-zone-create.component';
import { GeozoneNotificationComponent } from './components/dashboard/app-dashboard/geozone-list/geozone-notification/geozone-notification.component';
import { GeoStoresComponent } from './components/dashboard/app-dashboard/geozone-list/geo-stores/geo-stores.component';


//store-list
import { StoresListComponent } from './components/dashboard/app-dashboard/stores-list/stores-list.component';

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
        path: 'manage-staff-assign-store/:id', component: AssingStoreComponent,      
    },
    {
        path: 'store-manager-assign-store/:id', component: StoreManagerAssignStore,      
    },
    {
        path: 'manage-staff-assigned-store/:id', component: AssignedStoreComponent,      
    },
    {
        path: 'store-manager-assigned-store/:id', component: StoreManagerAssignedStore,      
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
    },
    {
        path: 'brand-list', component: BrandListComponent
    },
    {
        path: 'create-brand-list', component: CreateBrandListComponent
    },
    {
        path: 'edit-brand-list/:br_id', component: EditBrandListComponent
    },
    {
        path: 'relations-list', component: RelationsListComponent
    },
    {
        path: 'notifications', component: NotificationsComponent
    },
    {
        path: 'create-notification', component: CreateNotificationsComponent
    },
    {
        path: 'edit-notification/:search/:nt_id', component: EditNotificationsComponent
    },
    {
        path: 'geozone-list', component: GeozoneListComponent
    },
    {
        path: 'create-geozone-list', component: CreateGeozoneListComponent
    },
    {
        path: 'create-geozone-list/:g_id', component: CreateGeozoneListComponent
    },
    {
        path: 'engagement-zone-list/:g_id', component: EngagementListComponent
    },
    {
        path: 'engagement-zone-create/:g_id', component: EnagagementZoneCreateComponent
    },
    {
        path: 'engagement-zone-create/:g_id/:e_id', component: EnagagementZoneCreateComponent
    },
    {
        path: 'geo-notification-create/:g_id', component: GeozoneNotificationComponent
    },
    {
        path: 'geo-notification-edit/:g_id/:nt_id', component: GeozoneNotificationComponent
    },
    {
        path: 'geo-store/:g_id/:e_id', component: GeoStoresComponent
    },
    {
        path: 'store-list', component: StoresListComponent
    }
]

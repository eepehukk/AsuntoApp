import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import { ManageHousingComponent } from "./manage-housing/manage-housing.component";

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details Page'
    },
    { 
        path: 'manage-housing',
        component: ManageHousingComponent,
        title: 'Manage Housing'
    },
];

export default routeConfig;
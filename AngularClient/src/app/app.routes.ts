import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
    
    // { path: 'auth', component: AuthComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },

];

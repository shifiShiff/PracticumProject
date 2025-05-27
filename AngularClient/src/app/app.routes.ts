import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { VotegraphComponent } from './components/votegraph/votegraph.component';
import { ChallengeActionComponent } from './components/challenge-action/challenge-action.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // ברירת מחדל
    { path: 'login', component: LoginComponent },
    { 
        path: 'dashboard', 
        component: DashboardComponent, 
        canActivate: [authGuard],
        children: [
            { path: 'reports', component: VotegraphComponent, canActivate: [authGuard] },
            { path: 'challenges', component: ChallengeActionComponent, canActivate: [authGuard] },
        ]
    },
];

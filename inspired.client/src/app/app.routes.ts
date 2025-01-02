import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
export const routes: Routes = [
    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login',
                loadComponent: () => import('./layout/auth-layout/login.component').then((c) => c.AuthLoginComponent)
            },
            {
                path: 'register',
                loadComponent: () => import('./layout/auth-layout/register.component').then((c) => c.AuthRegisterComponent)
            },
            {
                path: 'forgotten-password',
                loadComponent: () => import('./layout/auth-layout/forgotten-password.component').then((c) => c.ForgottenPasswordComponent)
            },
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: '**', redirectTo: 'login', pathMatch: 'full' },

        ]
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                data: { breadcrumb: 'Dashboard' },
                loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent)
            },
            {
                path: 'my-questions',
                data: { breadcrumb: 'My questions' },
                loadComponent: () => import('./pages/my-questions/my-questions.component').then((c) => c.MyQuestionsComponent)
            },
            {
                path: 'my-answers',
                data: { breadcrumb: 'My answers' },
                loadComponent: () => import('./pages/my-answers/my-answers.component').then((c) => c.MyAnswersComponent)
            },
            {
                path: 'favorites',
                data: { breadcrumb: 'Favorites' },
                loadComponent: () => import('./pages/favorites/favorites.component').then((c) => c.FavoritesComponent)
            },
            { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

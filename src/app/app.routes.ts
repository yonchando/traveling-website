import { Routes } from '@angular/router';
import { authGuard } from '@/app/core/auth/auth-guard';
import { authRequiredGuard } from '@/app/core/auth/auth-required-guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./features/home/home').then((m) => m.Home),
                pathMatch: 'full',
            },
            {
                path: 'page-list',
                loadComponent: () => import('./features/page-list/page-list').then((m) => m.PageList),
            },
            {
                path: 'page-list/detail/:title',
                loadComponent: () => import('./features/page-detail/page-detail').then((m) => m.PageDetail),
            },
            {
                path: 'contact-us',
                loadComponent: () => import('./features/contact-us/contact-us').then((m) => m.ContactUs),
            },
            {
                path: 'about-us',
                loadComponent: () => import('./features/about-us/about-us').then((m) => m.AboutUs),
            },
            {
                path: 'profile',
                canActivate: [authRequiredGuard],
                loadComponent: () => import('./features/user-profile/user-profile').then((m) => m.UserProfile),
            },
            {
                path: 'sign-up',
                loadComponent: () => import('./features/sign-up/sign-up').then((m) => m.SignUp),
            },
            {
                path: 'login',
                loadComponent: () => import('./features/login-page/login-page').then((m) => m.LoginPage),
            },
            {
                path: 'data-privacy',
                loadComponent: () => import('./features/data-policy/data-policy').then((m) => m.DataPolicy),
            },
        ],
    },
    {
        path: '**',
        loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
    },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
        pathMatch: 'full',
    },
    {
        path: 'page-list',
        loadComponent: () =>
            import('./features/page-list/page-list').then((m) => m.PageList),
    },
    {
        path: 'page-list/detail/:title',
        loadComponent: () =>
            import('./features/page-detail/page-detail').then(
                (m) => m.PageDetail,
            ),
    },
];

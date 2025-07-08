import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'standalone',
        loadComponent: () => import('./my-comp/my-comp').then(m => m.MyComp)
    }
];

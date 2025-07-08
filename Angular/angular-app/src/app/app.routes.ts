import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'standalone',
    loadComponent: () => import('./my-comp/my-comp').then((m) => m.MyComp), // Show my Component (Child)
  },
  { path: '', loadComponent: () => import('./app').then((m) => m.App) }, // Show App Component (Parent)
  {
    path: '**',
    redirectTo: "/standalone", // Automatically Redirect to standalone (Child)
  },
];

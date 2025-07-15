import { Routes } from '@angular/router';
import { MyFormComponent } from './my-form/my-form';
import { MyTableComponent } from './my-table/my-table';

export const routes: Routes = [
  { path: '', component: MyFormComponent },
  { path: 'table', component: MyTableComponent },
];

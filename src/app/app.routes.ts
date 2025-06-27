import { Routes } from '@angular/router';
import { DepartmentSearchComponent } from './components/department-search/department-search.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';

export const routes: Routes = [
  { path: '', component: DepartmentSearchComponent },
  { path: 'employee/:id', component: EmployeeDetailsComponent },
  { path: 'employee/edit/:id', component: EmployeeEditComponent },
  { path: '**', redirectTo: '' }
];

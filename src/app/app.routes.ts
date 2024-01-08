import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { ProjectsComponent } from './projects/projects.component';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'projects', component: ProjectsComponent }
];

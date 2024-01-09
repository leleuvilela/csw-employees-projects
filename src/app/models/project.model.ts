import { api } from './api.model';

export interface Allocation {
  id: string;
  employee: api.employees.Employee;
  percentage: number;
}

export interface Project extends api.projects.Project {
  allocations: Allocation[];
}

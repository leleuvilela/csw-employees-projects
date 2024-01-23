import { createSelector } from '@ngrx/store';
import { employeesFeature } from './employees.reducer';

export const selectEmployeesPageViewModel = createSelector(
  employeesFeature.selectEmployees,
  employeesFeature.selectLoading,
  (employees, loading) => ({ employees, loading })
);

export const selectEmployeeById = (id: string) =>
  createSelector(employeesFeature.selectEmployees, (employees) =>
    employees.find((employee) => employee.id === id)
  );

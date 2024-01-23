import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Employee } from '../../models/employee.model';
import { api } from '../../models/api.model';

export const EmployeesActions = createActionGroup({
  source: 'Employees',
  events: {
    LoadRequest: emptyProps(),
    LoadSuccess: props<{ employees: Employee[] }>(),
    LoadFailure: emptyProps(),
    CreateRequest: props<{ employee: api.employees.CreateEmployeeDto }>(),
    CreateSuccess: emptyProps(),
    CreateFailure: emptyProps(),
    UpdateRequest: props<{
      employeeId: string;
      employee: api.employees.UpdateEmployeeDto;
    }>(),
    UpdateSuccess: emptyProps(),
    UpdateFailure: emptyProps(),
    DeleteRequest: props<{ employeeId: string }>(),
    DeleteSuccess: emptyProps(),
    DeleteFailure: emptyProps(),
  },
});

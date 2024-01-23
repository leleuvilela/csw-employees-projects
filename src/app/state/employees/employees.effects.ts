import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from '../../services/employee.service';
import {
  map,
  catchError,
  of,
  forkJoin,
  exhaustMap,
  combineLatest,
  tap,
} from 'rxjs';
import { EmployeesActions } from './employees.actions';
import { RoleService } from '../../services/role.service';
import { PlatoonService } from '../../services/platoon.service';
import { api } from '../../models/api.model';
import { Store } from '@ngrx/store';
import { selectRoles } from '../roles/roles.reducer';
import { selectPlatoons } from '../platoons/platoons.reducer';

@Injectable()
export class EmployeesEffects {
  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.loadRequest),
      exhaustMap(() =>
        combineLatest([
          this.employeeService.getEmployees(),
          this.store.select(selectRoles),
          this.store.select(selectPlatoons),
        ]).pipe(
          map(([employees, roles, platoons]) => {
            const result = employees?.map((employee) => {
              const role =
                roles.find((role) => role.id === employee.roleId) ||
                ({} as api.roles.Role);
              const platoon =
                platoons.find((platoon) => platoon.id === employee.platoonId) ||
                ({} as api.platoons.Platoon);

              return {
                ...employee,
                role,
                platoon,
              };
            });

            return EmployeesActions.loadSuccess({ employees: result });
          }),
          catchError(() => of(EmployeesActions.loadFailure()))
        )
      )
    )
  );

  createEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.createRequest),
      exhaustMap(({ employee }) =>
        this.employeeService.createEmployee(employee).pipe(
          map(() => EmployeesActions.createSuccess()),
          tap(() => this.store.dispatch(EmployeesActions.loadRequest())),
          catchError(() => of(EmployeesActions.createFailure()))
        )
      )
    )
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.updateRequest),
      exhaustMap(({ employeeId, employee }) =>
        this.employeeService.updateEmployee(employeeId, employee).pipe(
          map(() => EmployeesActions.updateSuccess()),
          tap(() => this.store.dispatch(EmployeesActions.loadRequest())),
          catchError(() => of(EmployeesActions.updateFailure()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private employeeService: EmployeeService,
  ) {}
}

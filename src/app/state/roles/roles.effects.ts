import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoleService } from '../../services/role.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { RolesActions } from './roles.actions';

@Injectable()
export class RolesEffects {
  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.loadRequest),
      exhaustMap(() =>
        this.roleService.getRoles().pipe(
          map((roles) => RolesActions.loadSuccess({ roles })),
          catchError(() => of(RolesActions.loadFailure()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private roleService: RoleService) {}
}

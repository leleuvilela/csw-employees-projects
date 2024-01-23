import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { PlatoonsActions } from './platoons.actions';
import { PlatoonService } from '../../services/platoon.service';

@Injectable()
export class PlatoonsEffects {
  loadPlatoons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlatoonsActions.loadRequest),
      exhaustMap(() =>
        this.platoonService.getPlatoons().pipe(
          map((platoons) => PlatoonsActions.loadSuccess({ platoons })),
          catchError(() => of(PlatoonsActions.loadFailure()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private platoonService: PlatoonService) {}
}

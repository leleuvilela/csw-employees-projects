import { createFeature, createReducer, on } from '@ngrx/store';
import { api } from '../../models/api.model';
import { PlatoonsActions } from './platoons.actions';

interface PlatoonsState {
  loading: boolean;
  platoons: ReadonlyArray<api.platoons.Platoon>;
}

export const initialState: PlatoonsState = {
  loading: false,
  platoons: [],
};

export const platoonsFeature = createFeature({
  name: 'platoons',
  reducer: createReducer(
    initialState,
    on(PlatoonsActions.loadRequest, (state) => ({
      ...state,
      loading: true,
    })),
    on(PlatoonsActions.loadSuccess, (state, { platoons }) => ({
      ...state,
      loading: false,
      platoons: platoons,
    })),
    on(PlatoonsActions.loadFailure, (state) => ({
      ...state,
      loading: false,
    }))
  ),
});

export const {
  name,
  reducer,
  selectPlatoonsState,
  selectPlatoons,
  selectLoading,
} = platoonsFeature;

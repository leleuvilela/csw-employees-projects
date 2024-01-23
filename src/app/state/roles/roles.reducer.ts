import { createFeature, createReducer, on } from '@ngrx/store';
import { api } from '../../models/api.model';
import { RolesActions } from './roles.actions';

interface RolesState {
  loading: boolean;
  roles: ReadonlyArray<api.roles.Role>;
}

export const initialState: RolesState = {
  loading: false,
  roles: [],
};

export const rolesFeature = createFeature({
  name: 'roles',
  reducer: createReducer(
    initialState,
    on(RolesActions.loadRequest, (state) => ({
      ...state,
      loading: true,
    })),
    on(RolesActions.loadSuccess, (state, { roles }) => ({
      ...state,
      loading: false,
      roles: roles,
    })),
    on(RolesActions.loadFailure, (state) => ({
      ...state,
      loading: false,
    }))
  ),
});

export const { name, reducer, selectRolesState, selectRoles, selectLoading } =
  rolesFeature;

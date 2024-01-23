import { createFeature, createReducer, on } from "@ngrx/store";
import { Employee } from "../../models/employee.model";
import { EmployeesActions } from "./employees.actions";

interface EmployeesState {
    loading: boolean;
    employees: ReadonlyArray<Employee>;
}

export const initialState: EmployeesState = {
    loading: false,
    employees: [],
};

export const employeesFeature = createFeature({
    name: 'employees',
    reducer: createReducer(
        initialState,
        on(EmployeesActions.loadRequest, (state) => ({
            ...state,
            loading: true,
        })),
        on(EmployeesActions.loadSuccess, (state, { employees }) => ({
            ...state,
            loading: false,
            employees: employees,
        })),
        on(EmployeesActions.loadFailure, (state) => ({
            ...state,
            loading: false,
        })),
        on(EmployeesActions.createRequest, (state) => ({
            ...state,
            loading: true,
        })),
        on(EmployeesActions.createSuccess, (state) => ({
            ...state,
            loading: false,
        })),
        on(EmployeesActions.createFailure, (state) => ({
            ...state,
            loading: false,
        })),
        on(EmployeesActions.updateRequest, (state) => ({
            ...state,
            loading: true,
        })),
        on(EmployeesActions.updateSuccess, (state) => ({
            ...state,
            loading: false,
        })),
        on(EmployeesActions.updateFailure, (state) => ({
            ...state,
            loading: false,
        })),
        on(EmployeesActions.deleteRequest, (state) => ({
            ...state,
            loading: true,
        })),
        on(EmployeesActions.deleteSuccess, (state) => ({
            ...state,
            loading: false,
        })),
        on(EmployeesActions.deleteFailure, (state) => ({
            ...state,
            loading: false,
        })),
    )
})

export const {
    name,
    reducer,
    selectEmployeesState,
    selectEmployees,
    selectLoading,
} = employeesFeature
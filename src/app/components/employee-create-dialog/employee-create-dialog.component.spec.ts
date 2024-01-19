import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EmployeeCreateDialogComponent } from './employee-create-dialog.component';
import { of } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { DataService } from '../../services/data.service';
import { api } from '../../models/api.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('EmployeeCreateDialogComponent', () => {
  let component: EmployeeCreateDialogComponent;
  let fixture: ComponentFixture<EmployeeCreateDialogComponent>;
  let mockEmployeeService = {
    getEmployee: jest.fn((id: string) =>
      of({
        id: '3497c68d-b7c3-48d0-a073-73841f91cd1f',
        name: 'Testeee',
        entryDate: '2024-01-13T00:00:00.000Z',
        platoonId: 'd71bc591-47d3-4d7c-9765-3ba1c4e03630',
        roleId: '68604f9a-fc7f-4d4a-b203-79742a6d4dc9',
      })
    ),
    updateEmployee: jest.fn((id: string, employee: api.employees.Employee) =>
      of()
    ),
    createEmployee: jest.fn((employee: api.employees.Employee) => of()),
  };
  let mockDataService = {
    rolesData$: of<api.roles.Role[]>([]),
    platoonsData$: of<api.platoons.Platoon[]>([]),
  };
  let dialogMock = {
    close: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: DataService, useValue: mockDataService },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });

    fixture = TestBed.createComponent(EmployeeCreateDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.employeeFormGroup).toBeDefined();
  });

  it('should fetch roles and platoons data on init', () => {
    mockDataService.rolesData$ = of([{ id: '1', name: 'Role 1' }]);
    mockDataService.platoonsData$ = of([{ id: '1', name: 'Platoon 1' }]);
    component.ngOnInit();
    expect(component.roles).toEqual([{ id: '1', name: 'Role 1' }]);
    expect(component.platoons).toEqual([{ id: '1', name: 'Platoon 1' }]);
  });

  it('should fetch employee data and patch form if employeeId is provided', () => {
    component.employeeId = '1';
    component.ngOnInit();
    expect(component.employeeFormGroup.value).toEqual({
      name: 'Testeee',
      entryDate: '2024-01-13T00:00:00.000Z',
      platoonId: 'd71bc591-47d3-4d7c-9765-3ba1c4e03630',
      roleId: '68604f9a-fc7f-4d4a-b203-79742a6d4dc9',
    });
  });

  it('should close dialog on cancel click', () => {
    component.onCancelClick();
    expect(dialogMock.close).toHaveBeenCalled();
  });

  it('should to create the employee if has no employeeId', () => {
    component.employeeId = undefined;
    component.employeeFormGroup.patchValue({
      name: 'Testeee',
      entryDate: '2024-01-13T00:00:00.000Z',
      platoonId: 'd71bc591-47d3-4d7c-9765-3ba1c4e03630',
      roleId: '68604f9a-fc7f-4d4a-b203-79742a6d4dc9',
    });
    component.onSubmit();
    expect(mockEmployeeService.createEmployee).toHaveBeenCalledWith({
      name: 'Testeee',
      entryDate: '2024-01-13T00:00:00.000Z',
      platoonId: 'd71bc591-47d3-4d7c-9765-3ba1c4e03630',
      roleId: '68604f9a-fc7f-4d4a-b203-79742a6d4dc9',
    });
  });

  it('should to update the employee if has a employeeId', () => {
    component.employeeId = '1';
    component.employeeFormGroup.patchValue({
      name: 'Testeee',
      entryDate: '2024-01-13T00:00:00.000Z',
      platoonId: 'd71bc591-47d3-4d7c-9765-3ba1c4e03630',
      roleId: '68604f9a-fc7f-4d4a-b203-79742a6d4dc9',
    });
    component.onSubmit();
    expect(mockEmployeeService.updateEmployee).toHaveBeenCalledWith('1', {
      name: 'Testeee',
      entryDate: '2024-01-13T00:00:00.000Z',
      platoonId: 'd71bc591-47d3-4d7c-9765-3ba1c4e03630',
      roleId: '68604f9a-fc7f-4d4a-b203-79742a6d4dc9',
    });
  });

  it('should close dialog on submit', () => {
    component.onSubmit();
    expect(dialogMock.close).toHaveBeenCalled();
  });

  
});

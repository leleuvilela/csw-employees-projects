import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { EmployeesComponent } from './employees.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee.service';
import { DataService } from '../../services/data.service';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let dataServiceMock = {
    fetchEmployees: jest.fn(),
    fetchRoles: jest.fn(),
    fetchPlatoons: jest.fn(),
    employeesData$: of([
      {
        id: 'c5e6a86d-5f77-42f5-baf9-4eefd4837dd7',
        name: 'Vinicius Vilela',
        entryDate: '2024-01-08T11:10:07.000Z',
        platoonId: '93482fbe-736b-4aaa-841d-fea363c6cbb9',
        roleId: 'f9683f23-ad10-441d-a957-d2b4043beee6',
      },
      {
        id: 'ce8faf3c-2862-4809-b4be-7add93db1287',
        name: 'Testetse',
        entryDate: '2024-01-11T00:00:00.000Z',
        platoonId: '93482fbe-736b-4aaa-841d-fea363c6cbb9',
        roleId: 'f9683f23-ad10-441d-a957-d2b4043beee6',
      },
    ]),
    rolesData$: of([
      { id: 'f9683f23-ad10-441d-a957-d2b4043beee6', name: 'Engineer I' },
    ]),
    platoonsData$: of([
      { id: '93482fbe-736b-4aaa-841d-fea363c6cbb9', name: 'Spartans' },
    ]),
  };
  let employeeServiceMock = {
    deleteEmployee: jest.fn((id: string) => of(true)),
  };
  let routerMock = {};
  let snackBarMock = { open: jest.fn() };
  let dialogMock = {
    open: jest.fn(() => ({
      afterClosed: jest.fn(() => of(true)),
    })),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesComponent],
      providers: [
        { provide: DataService, useValue: dataServiceMock },
        { provide: EmployeeService, useValue: employeeServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data on init', () => {
    expect(dataServiceMock.fetchEmployees).toHaveBeenCalled();
    expect(dataServiceMock.fetchRoles).toHaveBeenCalled();
    expect(dataServiceMock.fetchPlatoons).toHaveBeenCalled();
  });

  it('should get employee data', (done) => {
    expect(component.employees$).toBeTruthy();
    component.employees$.subscribe((value) => {
      expect(value).toEqual([
        {
          id: 'c5e6a86d-5f77-42f5-baf9-4eefd4837dd7',
          name: 'Vinicius Vilela',
          entryDate: '2024-01-08T11:10:07.000Z',
          platoonId: '93482fbe-736b-4aaa-841d-fea363c6cbb9',
          roleId: 'f9683f23-ad10-441d-a957-d2b4043beee6',
          role: {
            id: 'f9683f23-ad10-441d-a957-d2b4043beee6',
            name: 'Engineer I',
          },
          platoon: {
            id: '93482fbe-736b-4aaa-841d-fea363c6cbb9',
            name: 'Spartans',
          },
        },
        {
          id: 'ce8faf3c-2862-4809-b4be-7add93db1287',
          name: 'Testetse',
          entryDate: '2024-01-11T00:00:00.000Z',
          platoonId: '93482fbe-736b-4aaa-841d-fea363c6cbb9',
          roleId: 'f9683f23-ad10-441d-a957-d2b4043beee6',
          role: {
            id: 'f9683f23-ad10-441d-a957-d2b4043beee6',
            name: 'Engineer I',
          },
          platoon: {
            id: '93482fbe-736b-4aaa-841d-fea363c6cbb9',
            name: 'Spartans',
          },
        },
      ]);
      done();
    });
  });

  it('should display a snackbar on error', () => {
    // @ts-ignore
    dataServiceMock.employeesData$ = throwError(
      () => new Error('Error fetching employees')
    );

    component.employees$.subscribe({
      error: () => {
        expect(snackBarMock.open).toHaveBeenCalledWith(
          'Error fetching employees',
          'Dismiss'
        );
      },
    });
  });

  it('should select an employee', () => {
    component.selectEmployee('c5e6a86d-5f77-42f5-baf9-4eefd4837dd7');
    expect(component.selectedEmployeeId).toEqual(
      'c5e6a86d-5f77-42f5-baf9-4eefd4837dd7'
    );
  });

  it('should deselect an employee', () => {
    component.selectEmployee('c5e6a86d-5f77-42f5-baf9-4eefd4837dd7');
    component.selectEmployee('c5e6a86d-5f77-42f5-baf9-4eefd4837dd7');
    expect(component.selectedEmployeeId).toBeUndefined();
  });

  it('should delete an employee', () => {
    component.deleteEmployee('c5e6a86d-5f77-42f5-baf9-4eefd4837dd7');
    expect(dataServiceMock.fetchEmployees).toHaveBeenCalled();
  });

  it('should open the dialog on delete', () => {
    component.openConfirmDialog('c5e6a86d-5f77-42f5-baf9-4eefd4837dd7');
    expect(dialogMock.open).toHaveBeenCalled();
  });
});

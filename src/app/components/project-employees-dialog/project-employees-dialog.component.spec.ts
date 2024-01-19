import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { api } from '../../models/api.model';
import { ProjectService } from '../../services/project.service';
import { ProjectEmployeesDialogComponent } from './project-employees-dialog.component';
import { DataService } from '../../services/data.service';

describe('ProjectEmployeesDialogComponent', () => {
  let component: ProjectEmployeesDialogComponent;
  let fixture: ComponentFixture<ProjectEmployeesDialogComponent>;
  let mockProjectService = {
    getProject: jest.fn((id: string) =>
      of({
        id: '3497c68d-b7c3-48d0-a073-73841f91cd1f',
        name: 'Testeee',
        entryDate: '2024-01-13T00:00:00.000Z',
        platoonId: 'd71bc591-47d3-4d7c-9765-3ba1c4e03630',
        roleId: '68604f9a-fc7f-4d4a-b203-79742a6d4dc9',
      })
    ),
    getProjectAllocations: jest.fn((id: string) =>
      of([
        {
          id: 'b3350bda-6c1c-49ca-be91-3e586aef69e0',
          percentage: 10,
          employeeId: 'ce8faf3c-2862-4809-b4be-7add93db1287',
          projectId: '3497c68d-b7c3-48d0-a073-73841f91cd1f',
        },
      ])
    ),
    createProjectAllocation: jest.fn(
      (allocation: api.projects.allocations.CreateAllocationDto) => of()
    ),
    deleteProjectAllocation: jest.fn(
      (projectId: string, allocationId: string) => of()
    ),
    updateProject: jest.fn((id: string, project: api.projects.Project) => of()),
    createProject: jest.fn((project: api.projects.Project) => of()),
  };
  let dialogMock = {
    close: jest.fn(),
  };
  let mockDataService = {
    employeesData$: of<api.employees.Employee[]>([
      {
        id: 'ce8faf3c-2862-4809-b4be-7add93db1287',
        name: 'Testetse',
        entryDate: '2024-01-11T00:00:00.000Z',
        platoonId: '93482fbe-736b-4aaa-841d-fea363c6cbb9',
        roleId: 'f9683f23-ad10-441d-a957-d2b4043beee6',
      },
    ]),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ProjectService, useValue: mockProjectService },
        { provide: DataService, useValue: mockDataService },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(ProjectEmployeesDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get employees', () => {
    component.ngOnInit();
    expect(component.employees$).toBeDefined();
  });

  it('should get project employees', (done) => {
    component.ngOnInit();
    expect(component.project$).toBeDefined();
    component.project$.subscribe((project) => {
      expect(project).toEqual({
        id: '3497c68d-b7c3-48d0-a073-73841f91cd1f',
        name: 'Testeee',
        entryDate: '2024-01-13T00:00:00.000Z',
        platoonId: 'd71bc591-47d3-4d7c-9765-3ba1c4e03630',
        roleId: '68604f9a-fc7f-4d4a-b203-79742a6d4dc9',
        allocations: [
          {
            id: 'b3350bda-6c1c-49ca-be91-3e586aef69e0',
            percentage: 10,
            employee: {
              entryDate: '2024-01-11T00:00:00.000Z',
              id: 'ce8faf3c-2862-4809-b4be-7add93db1287',
              name: 'Testetse',
              platoonId: '93482fbe-736b-4aaa-841d-fea363c6cbb9',
              roleId: 'f9683f23-ad10-441d-a957-d2b4043beee6',
            },
          },
        ],
      });
      done();
    });
  });
});

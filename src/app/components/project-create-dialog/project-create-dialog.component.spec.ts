import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { api } from '../../models/api.model';
import { DataService } from '../../services/data.service';
import { ProjectService } from '../../services/project.service';
import { ProjectCreateDialogComponent } from './project-create-dialog.component';

describe('ProjectCreateDialogComponent', () => {
  let component: ProjectCreateDialogComponent;
  let fixture: ComponentFixture<ProjectCreateDialogComponent>;
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
    updateProject: jest.fn((id: string, project: api.projects.Project) => of()),
    createProject: jest.fn((project: api.projects.Project) => of()),
  };
  let dialogMock = {
    close: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ProjectService, useValue: mockProjectService },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });

    fixture = TestBed.createComponent(ProjectCreateDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.projectFormGroup).toBeDefined();
  });

  it('should fetch roles and platoons data on init', () => {
    component.projectId = '1';
    component.ngOnInit();
    expect(mockProjectService.getProject).toHaveBeenCalledWith('1');
  });

  it('should close the dialog on cancel click', () => {
    component.onCancelClick();
    expect(dialogMock.close).toHaveBeenCalled();
  });

  it('should create a project when has no projectId on submit', () => {
    component.projectId = undefined;
    component.projectFormGroup.patchValue({ name: 'Test' });
    component.onSubmit();
    expect(mockProjectService.createProject).toHaveBeenCalledWith({
      name: 'Test',
    });
  });

  it('should update a project when has projectId on submit', () => {
    component.projectId = '1';
    component.projectFormGroup.patchValue({ name: 'Test' });
    component.onSubmit();
    expect(mockProjectService.updateProject).toHaveBeenCalledWith('1', {
      name: 'Test',
    });
  });
});

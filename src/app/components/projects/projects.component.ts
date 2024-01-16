import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { api } from '../../models/api.model';
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { ProjectCreateDialogComponent } from '../project-create-dialog/project-create-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ProjectEmployeesDialogComponent } from '../project-employees-dialog/project-employees-dialog.component';
import { DataService } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  @ViewChild(MatTable) table!: MatTable<api.projects.Project>;
  projects$!: Observable<api.projects.Project[] | null>;
  loading$ = new BehaviorSubject<boolean>(true);
  displayedColumns: string[] = ['name', 'actions'];
  selectedProjectId?: string;

  constructor(
    private projectService: ProjectService,
    private dataService: DataService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataService.fetchProjects();
    this.dataService.fetchEmployees();
    this.getProjects();
  }

  getProjects() {
    this.projects$ = this.dataService.projectsData$.pipe(
      catchError((err) => {
        console.error(err);
        this._snackBar.open('Error fetching projects', 'Close');
        return of([]);
      }),
      tap((res) => {
        if (res) {
          this.loading$.next(false);
        }
      })
    );
  }

  deleteProject(projectId: string) {
    this.projectService
      .deleteProject(projectId)
      .pipe(
        catchError((err) => {
          console.error(err);
          this._snackBar.open(
            'Error deleting project, you need remove the allocations first.',
            'Close'
          );
          return of(null);
        })
      )
      .subscribe(() => {
        this.getProjects();
      });
  }

  selectProject(projectId: string) {
    if (this.selectedProjectId === projectId) {
      this.selectedProjectId = undefined;
      return;
    }

    this.selectedProjectId = projectId;
  }

  openProjectEmployeesDialog(projectId: string) {
    this.dialog.open(ProjectEmployeesDialogComponent, {
      width: '650px',
      data: projectId,
    });
  }

  openConfirmDialog(projectId?: string) {
    if (!projectId) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '650px',
      data: {
        title: 'Delete Project',
        message: 'Are you sure you want to delete this project?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProject(projectId);
      }
    });
  }

  openDialog(projectId?: string) {
    const dialogRef = this.dialog.open(ProjectCreateDialogComponent, {
      width: '650px',
      data: projectId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getProjects();
      }
    });
  }
}

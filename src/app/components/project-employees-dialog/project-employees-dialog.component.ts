import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { api } from '../../models/api.model';
import { Allocation, Project } from '../../models/project.model';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-employees-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './project-employees-dialog.component.html',
})
export class ProjectEmployeesDialogComponent {
  displayedColumns: string[] = ['name', 'allocation', 'actions'];
  project$!: Observable<Project | null>;
  employees$!: Observable<api.employees.Employee[] | null>;
  loading$ = new BehaviorSubject<boolean>(false);
  newAllocation: api.projects.allocations.CreateAllocationDto = {
    employeeId: '',
    percentage: 0,
  };

  constructor(
    public dialogRef: MatDialogRef<ProjectEmployeesDialogComponent>,
    private projectService: ProjectService,
    private dataService: DataService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public projectId: string
  ) {}

  ngOnInit() {
    this.getProjectEmployees();
    this.getEmployees();
  }

  getEmployees() {
    this.employees$ = this.dataService.employeesData$;
  }

  getProjectEmployees() {
    this.project$ = this.projectService.getProject(this.projectId).pipe(
      tap(() => this.loading$.next(true)),
      switchMap(() =>
        combineLatest([
          this.projectService.getProject(this.projectId),
          this.projectService.getProjectAllocations(this.projectId),
          this.dataService.employeesData$,
        ]).pipe(
          catchError((error) => {
            console.error(error);
            this._snackBar.open('Error fetching project employees', 'Dismiss');
            return of([null, null, null]);
          }),
          tap((res) => {
            if (res.every(Boolean)) {
              this.loading$.next(false);
            }
          })
        )
      ),
      map(([project, projectAllocations, employees]) => {
        if (!project || !projectAllocations || !employees) {
          return null;
        }

        const allocations: Allocation[] = projectAllocations.map(
          (allocation) => {
            const employee = employees.find(
              (employee) => employee.id === allocation.employeeId
            )!;
            return {
              id: allocation.id,
              employee,
              percentage: allocation.percentage,
            };
          }
        );

        return {
          ...project,
          allocations,
        };
      })
    );
  }

  deleteAllocation(allocationId: string) {
    this.projectService
      .deleteProjectAllocation(this.projectId, allocationId)
      .subscribe(() => {
        this.getProjectEmployees();
      });
  }

  addAllocation() {
    this.projectService
      .createProjectAllocation(this.projectId, this.newAllocation)
      .subscribe(() => {
        this.getProjectEmployees();
        this.newAllocation = {
          employeeId: '',
          percentage: 0,
        };
      });
  }
}

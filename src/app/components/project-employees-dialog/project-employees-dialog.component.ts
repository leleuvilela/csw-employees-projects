import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Observable, forkJoin } from 'rxjs';
import { api } from '../../models/api.model';
import { Allocation, Project } from '../../models/project.model';
import { MatIconModule } from '@angular/material/icon';

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
  ],
  templateUrl: './project-employees-dialog.component.html',
})
export class ProjectEmployeesDialogComponent {
  displayedColumns: string[] = ['name', 'allocation', 'actions'];
  project: Project | undefined;
  employees$!: Observable<api.employees.Employee[]>;
  newAllocation: api.projects.allocations.CreateAllocationDto = {
    employeeId: '',
    percentage: 0,
  };

  constructor(
    public dialogRef: MatDialogRef<ProjectEmployeesDialogComponent>,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public projectId: string
  ) {}

  ngOnInit() {
    this.getEmployees();
    this.getProjectEmployees();
  }

  getEmployees() {
    this.employees$ = this.employeeService.getEmployees();
  }

  getProjectEmployees() {
    forkJoin([
      this.projectService.getProject(this.projectId),
      this.projectService.getProjectAllocations(this.projectId),
      this.employees$,
    ]).subscribe((results) => {
      const project = results[0];
      const projectAllocation = results[1];
      const employees = results[2];

      const allocations: Allocation[] = projectAllocation.map((allocation) => {
        const employee = employees.find(
          (employee) => employee.id === allocation.employeeId
        )!;
        return {
          id: allocation.id,
          employee,
          percentage: allocation.percentage,
        };
      });

      this.project = {
        ...project,
        allocations,
      };
    });
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

  onSubmit(): void {
    this.dialogRef.close();
  }
}

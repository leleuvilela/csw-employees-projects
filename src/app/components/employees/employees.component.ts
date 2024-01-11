import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeCreateDialogComponent } from '../employee-create-dialog/employee-create-dialog.component';
import { Employee } from '../../models/employee.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { EmployeeService } from '../../services/employee.service';
import { api } from '../../models/api.model';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    RouterLink,
  ],
  templateUrl: './employees.component.html',
})
export class EmployeesComponent {
  employees: Employee[] = [];
  selectedEmployeeId?: string;
  displayedColumns: string[] = [
    'name',
    'entryDate',
    'role',
    'platoon',
    'actions',
  ];

  constructor(
    private dataService: DataService,
    private employeeService: EmployeeService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataService.fetchEmployees();
    this.dataService.fetchRoles();
    this.dataService.fetchPlatoons();
    this.getEmployeeData();
  }

  getEmployeeData() {
    combineLatest([
      this.dataService.employeesData$,
      this.dataService.rolesData$,
      this.dataService.platoonsData$,
    ]).subscribe(([employees, roles, platoons]) => {
      this.employees = employees.map((employee) => {
        const role =
          roles.find((role) => role.id === employee.roleId) ||
          ({} as api.roles.Role);
        const platoon =
          platoons.find((platoon) => platoon.id === employee.platoonId) ||
          ({} as api.platoons.Platoon);

        return {
          ...employee,
          role,
          platoon,
        };
      });
    });
  }

  selectEmployee(employeeId: string) {
    if (this.selectedEmployeeId === employeeId) {
      this.selectedEmployeeId = undefined;
      return;
    }

    this.selectedEmployeeId = employeeId;
  }

  deleteEmployee(employeeId: string) {
    this.employeeService.deleteEmployee(employeeId).subscribe(() => {
      this.dataService.fetchEmployees();
    });
  }

  openConfirmDialog(employeeId?: string) {
    if (!employeeId) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '650px',
      data: {
        title: 'Delete Employee',
        message: 'Are you sure you want to delete this employee?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteEmployee(employeeId);
      }
    });
  }

  openCreateDialog(employeeId?: string) {
    const dialogRef = this.dialog.open(EmployeeCreateDialogComponent, {
      width: '650px',
      data: employeeId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.fetchEmployees();
      }
    });
  }

  onProjectsClick(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/projects']);
  }
}

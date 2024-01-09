import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../../services/employee.service';
import { RoleService } from '../../services/role.service';
import { PlatoonService } from '../../services/platoon.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeCreateDialogComponent } from '../employee-create-dialog/employee-create-dialog.component';
import { api } from '../../models/api.model';
import { Employee } from '../../models/employee.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router, RouterLink } from '@angular/router';

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
  @ViewChild(MatTable) table!: MatTable<api.employees.Employee>;
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
    private employeeService: EmployeeService,
    private roleService: RoleService,
    private platoonService: PlatoonService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    forkJoin([
      this.employeeService.getEmployees(),
      this.roleService.getRoles(),
      this.platoonService.getPlatoons(),
    ]).subscribe((results) => {
      let employees: Employee[] = [];

      results[0].forEach((employeeData) => {
        const role = results[1].find(
          (role) => role.id === employeeData.roleId
        )!;
        const platoon = results[2].find(
          (platoon) => platoon.id === employeeData.platoonId
        )!;

        employees.push({ ...employeeData, role, platoon });
      });

      this.employees = employees;
      this.table.renderRows();
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
      this.getEmployees();
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

  openDialog(employeeId?: string) {
    const dialogRef = this.dialog.open(EmployeeCreateDialogComponent, {
      width: '650px',
      data: employeeId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getEmployees();
      }
    });
  }

  onProjectsClick(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/projects']);
  }
}

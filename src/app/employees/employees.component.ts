import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../services/employee.service';
import { RoleService } from '../services/role.service';
import { PlatoonService } from '../services/platoon.service';
import { Observable, forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeCreateDialogComponent } from '../employee-create-dialog/employee-create-dialog.component';
import { api } from '../models/api.model';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  @ViewChild(MatTable) table!: MatTable<api.employees.Employee>;
  employees: Employee[] = [];
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

  deleteEmployee(employeeId: number) {
    this.employeeService.deleteEmployee(employeeId).subscribe(() => {
      this.getEmployees();
    });
  }

  openDialog(employeeId?: number) {
    const dialogRef = this.dialog.open(EmployeeCreateDialogComponent, {
      width: '650px',
      data: employeeId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.getEmployees();
    });
  }
}

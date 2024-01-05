import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../services/employee.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeCreateDialogComponent } from '../employee-create-dialog/employee-create-dialog.component';
import { api } from '../models/api.model';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  @ViewChild(MatTable) table!: MatTable<api.employees.Employee>;
  employees$!: Observable<api.employees.Employee[]>;
  displayedColumns: string[] = ['name', 'entryDate', 'actions'];

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employees$ = this.employeeService.getEmployees();
  }

  openDialog(employeeId?: number) {
    const dialogRef = this.dialog.open(EmployeeCreateDialogComponent, {
      width: '650px',
      data: employeeId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.getEmployees();
      this.table.renderRows();
    });
  }
}

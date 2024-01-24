import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeCreateDialogComponent } from '../employee-create-dialog/employee-create-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { selectEmployeesPageViewModel } from '../../state/employees/employees.selectors';
import { EmployeesActions } from '../../state/employees/employees.actions';
import { RolesActions } from '../../state/roles/roles.actions';
import { PlatoonsActions } from '../../state/platoons/platoons.actions';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './employees.component.html',
})
export class EmployeesComponent {
  selectedEmployeeId?: string;
  displayedColumns: string[] = [
    'name',
    'entryDate',
    'role',
    'platoon',
    'actions',
  ];
  loading$ = new BehaviorSubject<boolean>(false);

  employeesStore$ = this.store.select(selectEmployeesPageViewModel);

  constructor(
    private router: Router,
    private store: Store,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.store.dispatch(EmployeesActions.loadRequest());
    this.store.dispatch(RolesActions.loadRequest());
    this.store.dispatch(PlatoonsActions.loadRequest());
  }

  selectEmployee(employeeId: string) {
    if (this.selectedEmployeeId === employeeId) {
      this.selectedEmployeeId = undefined;
      return;
    }

    this.selectedEmployeeId = employeeId;
  }

  deleteEmployee(employeeId: string) {
    this.store.dispatch(EmployeesActions.deleteRequest({ employeeId }));
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

  openManageEmployeeDialog(employeeId?: string) {
    this.dialog.open(EmployeeCreateDialogComponent, {
      width: '650px',
      data: employeeId,
    });
  }

  onProjectsClick(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/projects']);
  }
}

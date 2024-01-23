import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { api } from '../../models/api.model';
import { RoleService } from '../../services/role.service';
import { Observable } from 'rxjs';
import { PlatoonService } from '../../services/platoon.service';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateFnsAdapter,
  MAT_DATE_FNS_FORMATS,
  MatDateFnsModule,
} from '@angular/material-date-fns-adapter';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { pt } from 'date-fns/locale';
import { DataService } from '../../services/data.service';
import { Store } from '@ngrx/store';
import { selectRolesState } from '../../state/roles/roles.reducer';
import { selectPlatoonsState } from '../../state/platoons/platoons.reducer';
import { selectEmployeeById } from '../../state/employees/employees.selectors';
import { EmployeesActions } from '../../state/employees/employees.actions';

@Component({
  selector: 'app-employee-create-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDateFnsModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_DATE_FNS_FORMATS,
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: pt,
    },
  ],
  templateUrl: './employee-create-dialog.component.html',
})
export class EmployeeCreateDialogComponent {
  employeeFormGroup = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    entryDate: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    platoonId: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    roleId: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
  minDate: Date = new Date();
  maxDate: Date = new Date('12/31/2500');

  rolesStore$ = this.store.select(selectRolesState);
  platoonsStore$ = this.store.select(selectPlatoonsState);

  constructor(
    public dialogRef: MatDialogRef<EmployeeCreateDialogComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public employeeId?: string
  ) {}

  ngOnInit(): void {
    if (this.employeeId) {
      this.store
        .select(selectEmployeeById(this.employeeId))
        .subscribe((employee) => {
          this.employeeFormGroup.patchValue({
            name: employee?.name,
            entryDate: employee?.entryDate,
            platoonId: employee?.platoonId,
            roleId: employee?.roleId,
          });
        });
    }
  }

  onSubmit(): void {
    if (this.employeeId) {
      this.store.dispatch(
        EmployeesActions.updateRequest({
          employeeId: this.employeeId,
          employee: this.employeeFormGroup.getRawValue(),
        })
      );
      this.dialogRef.close(true);
      return;
    }

    this.store.dispatch(
      EmployeesActions.createRequest({
        employee: this.employeeFormGroup.getRawValue(),
      })
    );
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

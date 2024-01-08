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
import { EmployeeService } from '../services/employee.service';
import { api } from '../models/api.model';
import { RoleService } from '../services/role.service';
import { Observable } from 'rxjs';
import { PlatoonService } from '../services/platoon.service';
import { MatSelectModule } from '@angular/material/select';

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
  ],
  templateUrl: './employee-create-dialog.component.html',
  styleUrl: './employee-create-dialog.component.scss',
})
export class EmployeeCreateDialogComponent {
  roles$!: Observable<api.roles.Role[]>;
  platoons$!: Observable<api.platoons.Platoon[]>;
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

  constructor(
    public dialogRef: MatDialogRef<EmployeeCreateDialogComponent>,
    private employeeService: EmployeeService,
    private roleService: RoleService,
    private platoonService: PlatoonService,
    @Inject(MAT_DIALOG_DATA) public employeeId?: number
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.getPlatoons();

    if (this.employeeId) {
      this.employeeService.getEmployee(this.employeeId).subscribe((data) => {
        this.employeeFormGroup.setValue({
          name: data.name,
          entryDate: data.entryDate,
          platoonId: data.platoonId,
          roleId: data.roleId,
        });
      });
    }
  }

  getRoles() {
    this.roles$ = this.roleService.getRoles();
  }

  getPlatoons() {
    this.platoons$ = this.platoonService.getPlatoons();
  }

  onSubmit(): void {
    if (!this.employeeId) {
      this.employeeService
        .createEmployee(this.employeeFormGroup.getRawValue())
        .subscribe((data) => {
          console.log(data);
          this.dialogRef.close();
        });

      return;
    }

    this.employeeService
      .updateEmployee(this.employeeId, this.employeeFormGroup.getRawValue())
      .subscribe((data) => {
        console.log(data);
        this.dialogRef.close();
      });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

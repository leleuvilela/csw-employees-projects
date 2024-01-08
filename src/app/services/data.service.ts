import { Injectable } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { EmployeeService } from './employee.service';
import { api } from '../models/api.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private requestSubject = new Subject();

  constructor(
    private employeeService: EmployeeService
  ) {
    this.requestSubject
      .pipe(switchMap(() => this.employeeService.getEmployees()))
      .subscribe((employees) => {
        console.log('employees', employees);
      });
  }

  fetchEmployees() {
    this.requestSubject.next(null);
  }
}

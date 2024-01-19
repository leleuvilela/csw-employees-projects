import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { api } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:3000/api/employees';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<api.employees.Employee[]> {
    return this.http.get<api.employees.Employee[]>(`${this.baseUrl}`);
  }

  getEmployee(id: string): Observable<api.employees.Employee> {
    return this.http.get<api.employees.Employee>(`${this.baseUrl}/${id}`);
  }

  createEmployee(employee: api.employees.CreateEmployeeDto): Observable<api.employees.Employee> {
    return this.http.post<api.employees.Employee>(`${this.baseUrl}`, employee, this.httpOptions);
  }

  updateEmployee(id: string, employee: api.employees.UpdateEmployeeDto): Observable<api.employees.Employee> {
    return this.http.patch<api.employees.Employee>(`${this.baseUrl}/${id}`, employee, this.httpOptions);
  }

  deleteEmployee(id: string): Observable<never> {
    return this.http.delete<never>(`${this.baseUrl}/${id}`);
  }
}

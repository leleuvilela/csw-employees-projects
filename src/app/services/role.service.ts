import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { api } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = 'http://localhost:3000/api/roles';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getRoles(): Observable<api.roles.Role[]> {
    return this.http.get<api.roles.Role[]>(`${this.baseUrl}`).pipe(
      shareReplay(1)
    );
  }

  getRole(id: number): Observable<api.roles.Role> {
    return this.http.get<api.roles.Role>(`${this.baseUrl}/${id}`);
  }

  createRole(role: api.roles.CreateRoleDto): Observable<api.roles.Role> {
    return this.http.post<api.roles.Role>(`${this.baseUrl}`, role, this.httpOptions);
  }

  updateRole(id: number, role: api.roles.UpdateRoleDto): Observable<api.roles.Role> {
    return this.http.patch<api.roles.Role>(`${this.baseUrl}/${id}`, role, this.httpOptions);
  }

  deleteRole(id: number): Observable<never> {
    return this.http.delete<never>(`${this.baseUrl}/${id}`);
  }
}

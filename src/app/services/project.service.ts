import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:3000/api/projects';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getProjects(): Observable<api.projects.Project[]> {
    return this.http.get<api.projects.Project[]>(`${this.baseUrl}`);
  }

  getProject(id: string): Observable<api.projects.Project> {
    return this.http.get<api.projects.Project>(`${this.baseUrl}/${id}`);
  }

  createProject(project: api.projects.CreateProjectDto): Observable<api.projects.Project> {
    return this.http.post<api.projects.Project>(`${this.baseUrl}`, project, this.httpOptions);
  }

  updateProject(id: string, project: api.projects.UpdateProjectDto): Observable<api.projects.Project> {
    return this.http.patch<api.projects.Project>(`${this.baseUrl}/${id}`, project, this.httpOptions);
  }

  deleteProject(id: string): Observable<never> {
    return this.http.delete<never>(`${this.baseUrl}/${id}`);
  }

  getProjectAllocations(id: string): Observable<api.projects.allocations.Allocation[]> {
    return this.http.get<api.projects.allocations.Allocation[]>(`${this.baseUrl}/${id}/allocations`);
  }

  createProjectAllocation(id: string, allocation: api.projects.allocations.CreateAllocationDto): Observable<api.projects.allocations.Allocation> {
    return this.http.post<api.projects.allocations.Allocation>(`${this.baseUrl}/${id}/allocations`, allocation, this.httpOptions);
  }

  updateProjectAllocation(id: string, allocationId: string, allocation: api.projects.allocations.UpdateAllocationDto): Observable<api.projects.allocations.Allocation> {
    return this.http.patch<api.projects.allocations.Allocation>(`${this.baseUrl}/${id}/allocations/${allocationId}`, allocation, this.httpOptions);
  }

  deleteProjectAllocation(id: string, allocationId: string): Observable<never> {
    return this.http.delete<never>(`${this.baseUrl}/${id}/allocations/${allocationId}`);
  }
}

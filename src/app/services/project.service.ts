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

  getProject(id: number): Observable<api.projects.Project> {
    return this.http.get<api.projects.Project>(`${this.baseUrl}/${id}`);
  }

  createProject(project: api.projects.CreateProjectDto): Observable<api.projects.Project> {
    return this.http.post<api.projects.Project>(`${this.baseUrl}`, project, this.httpOptions);
  }

  updateProject(id: number, project: api.projects.UpdateProjectDto): Observable<api.projects.Project> {
    return this.http.patch<api.projects.Project>(`${this.baseUrl}/${id}`, project, this.httpOptions);
  }

  deleteProject(id: number): Observable<never> {
    return this.http.delete<never>(`${this.baseUrl}/${id}`);
  }
}

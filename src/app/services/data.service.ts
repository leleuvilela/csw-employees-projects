import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, delay, switchMap } from 'rxjs';
import { EmployeeService } from './employee.service';
import { api } from '../models/api.model';
import { RoleService } from './role.service';
import { PlatoonService } from './platoon.service';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private employeesData = new BehaviorSubject<api.employees.Employee[] | null>(null);
  private platoonsData = new BehaviorSubject<api.platoons.Platoon[]>([]);
  private rolesData = new BehaviorSubject<api.roles.Role[]>([]);
  private projectsData = new BehaviorSubject<api.projects.Project[] | null>(null);

  get employeesData$(): Observable<api.employees.Employee[] | null> {
    return this.employeesData.asObservable();
  }

  get platoonsData$(): Observable<api.platoons.Platoon[]> {
    return this.platoonsData.asObservable();
  }

  get rolesData$(): Observable<api.roles.Role[]> {
    return this.rolesData.asObservable();
  }

  get projectsData$(): Observable<api.projects.Project[] | null> {
    return this.projectsData.asObservable();
  }

  constructor(
    private employeeService: EmployeeService,
    private roleService: RoleService,
    private platoonService: PlatoonService,
    private projectService: ProjectService
  ) {}

  fetchEmployees() {
    this.employeeService.getEmployees().pipe(
      delay(3000)
    ).subscribe((employees) => {
      this.employeesData.next(employees);
    });
  }

  fetchPlatoons() {
    this.platoonService.getPlatoons().subscribe((platoons) => {
      this.platoonsData.next(platoons);
    });
  }

  fetchRoles() {
    this.roleService.getRoles().subscribe((roles) => {
      this.rolesData.next(roles);
    });
  }

  fetchProjects() {
    this.projectService.getProjects().pipe(
      delay(3000)
    ).subscribe((projects) => {
      this.projectsData.next(projects);
    });
  }

  complete() {
    this.employeesData.complete();
    this.platoonsData.complete();
    this.rolesData.complete();
    this.projectsData.complete();
  }
}

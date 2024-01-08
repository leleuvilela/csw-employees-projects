import { api } from "./api.model";

export interface Employee extends api.employees.Employee {
  role: api.roles.Role;
  platoon: api.platoons.Platoon;
}

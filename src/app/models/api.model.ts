import { components } from './schema';

export declare namespace api {
  export namespace employees {
    export type Employee = components['schemas']['Employee'];
    export type CreateEmployeeDto = components['schemas']['CreateEmployeeDto'];
    export type UpdateEmployeeDto = components['schemas']['UpdateEmployeeDto'];
  }

  export namespace platoons {
    export type Platoon = components['schemas']['Platoon'];
    export type CreatePlatoonDto = components['schemas']['CreatePlatoonDto'];
    export type UpdatePlatoonDto = components['schemas']['UpdatePlatoonDto'];
  }

  export namespace roles {
    export type Role = components['schemas']['Role'];
    export type CreateRoleDto = components['schemas']['CreateRoleDto'];
    export type UpdateRoleDto = components['schemas']['UpdateRoleDto'];
  }

  export namespace projects {
    export type Project = components['schemas']['Project'];
    export type CreateProjectDto = components['schemas']['CreateProjectDto'];
    export type UpdateProjectDto = components['schemas']['UpdateProjectDto'];

    export namespace allocations {
      export type Allocation = components['schemas']['Allocation'];
    }
  }
}
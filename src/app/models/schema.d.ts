/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/api/employees": {
    /** Get all employees */
    get: operations["EmployeesController_findAll"];
    /** Create an employee */
    post: operations["EmployeesController_create"];
  };
  "/api/employees/{id}": {
    /** Get an employee by id */
    get: operations["EmployeesController_findOne"];
    /** Delete an employee by id */
    delete: operations["EmployeesController_remove"];
    /** Update an employee by id */
    patch: operations["EmployeesController_update"];
  };
  "/api/platoons": {
    /** Get all platoons */
    get: operations["PlatoonsController_findAll"];
    /** Create a platoon */
    post: operations["PlatoonsController_create"];
  };
  "/api/platoons/{id}": {
    /** Get a platoon by id */
    get: operations["PlatoonsController_findOne"];
    /** Update a platoon by id */
    patch: operations["PlatoonsController_update"];
  };
  "/api/roles": {
    /** Get all roles */
    get: operations["RolesController_findAll"];
    /** Create a role */
    post: operations["RolesController_create"];
  };
  "/api/roles/{id}": {
    /** Get a role by id */
    get: operations["RolesController_findOne"];
    /** Update a role by id */
    patch: operations["RolesController_update"];
  };
  "/api/projects": {
    /** Get all projects */
    get: operations["ProjectsController_findAll"];
    /** Create a project */
    post: operations["ProjectsController_create"];
  };
  "/api/projects/{id}": {
    /** Get a project by id */
    get: operations["ProjectsController_findOne"];
    /** Delete a project by id */
    delete: operations["ProjectsController_remove"];
    /** Update a project by id */
    patch: operations["ProjectsController_update"];
  };
  "/api/projects/{id}/allocations": {
    /** Get all allocations for a project by id */
    get: operations["ProjectsController_findAllAllocations"];
    /** Create an allocation for a project by id */
    post: operations["ProjectsController_createAllocation"];
  };
  "/api/projects/{id}/allocations/{allocationId}": {
    /** Delete an allocation for a project by id */
    delete: operations["ProjectsController_removeAllocation"];
    /** Update an allocation for a project by id */
    patch: operations["ProjectsController_updateAllocation"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Employee: {
      /**
       * Format: uuid
       * @description Identifier of the resource
       * @example 0678776a-babd-4a15-bae7-186817f2ecf4
       */
      id: string;
      /**
       * @description The name of the employee
       * @example John Doe
       */
      name: string;
      /**
       * Format: uuid
       * @description The id of the platoon employee is assigned to
       * @example ed0c4d9f-deca-4505-a0a5-388cbb96bef1
       */
      platoonId: string;
      /**
       * Format: uuid
       * @description The id of the role employee is assigned to
       * @example a0e797dd-2694-4be3-94d1-55fe7e85e2d4
       */
      roleId: string;
      /**
       * Format: date-time
       * @description The date the employee joined the company
       */
      entryDate: string;
    };
    CreateEmployeeDto: {
      /**
       * @description The name of the employee
       * @example John Doe
       */
      name: string;
      /**
       * Format: uuid
       * @description Identifier of the platoon the employee belongs to
       * @example 0678776a-babd-4a15-bae7-186817f2ecf4
       */
      platoonId: string;
      /**
       * Format: uuid
       * @description Identifier of the role the employee belongs to
       * @example 0678776a-babd-4a15-bae7-186817f2ecf4
       */
      roleId: string;
      /**
       * Format: date-time
       * @description The date the employee joined the company
       */
      entryDate: string;
    };
    BadRequestException: Record<string, never>;
    NotFoundException: Record<string, never>;
    UpdateEmployeeDto: {
      /**
       * @description The name of the employee
       * @example John Doe
       */
      name?: string;
      /**
       * Format: uuid
       * @description Identifier of the platoon the employee belongs to
       * @example 0678776a-babd-4a15-bae7-186817f2ecf4
       */
      platoonId?: string;
      /**
       * Format: uuid
       * @description Identifier of the role the employee belongs to
       * @example 0678776a-babd-4a15-bae7-186817f2ecf4
       */
      roleId?: string;
      /**
       * Format: date-time
       * @description The date the employee joined the company
       */
      entryDate?: string;
    };
    Platoon: {
      /**
       * Format: uuid
       * @description Identifier of the resource
       * @example 0678776a-babd-4a15-bae7-186817f2ecf4
       */
      id: string;
      /**
       * @description The name of the Platoon
       * @example Spartans
       */
      name: string;
    };
    CreatePlatoonDto: {
      /**
       * @description The name of the Platoon
       * @example Spartans
       */
      name: string;
    };
    UpdatePlatoonDto: {
      /**
       * @description The name of the Platoon
       * @example Spartans
       */
      name?: string;
    };
    Role: {
      /**
       * Format: uuid
       * @description Identifier of the resource
       * @example 0678776a-babd-4a15-bae7-186817f2ecf4
       */
      id: string;
      /**
       * @description The name of the Role
       * @example Engineer I
       */
      name: string;
    };
    CreateRoleDto: {
      /**
       * @description The name of the Role
       * @example Engineer I
       */
      name: string;
    };
    UpdateRoleDto: {
      /**
       * @description The name of the Role
       * @example Engineer I
       */
      name?: string;
    };
    Project: {
      /**
       * Format: uuid
       * @description Identifier of the resource
       * @example 0678776a-babd-4a15-bae7-186817f2ecf4
       */
      id: string;
      /**
       * @description The name of the Project
       * @example Project X
       */
      name: string;
    };
    CreateProjectDto: {
      /**
       * @description The name of the Project
       * @example Project X
       */
      name: string;
    };
    UpdateProjectDto: {
      /**
       * @description The name of the Project
       * @example Project X
       */
      name?: string;
    };
    Allocation: {
      /**
       * Format: uuid
       * @description Identifier of the resource
       * @example 0678776a-babd-4a15-bae7-186817f2ecf4
       */
      id: string;
      /**
       * Format: uuid
       * @description The id of the employee allocated to the project
       * @example a0e797dd-2694-4be3-94d1-55fe7e85e2d4
       */
      employeeId: string;
      /**
       * Format: uuid
       * @description The id of the project the employee is allocated to
       * @example ed0c4d9f-deca-4505-a0a5-388cbb96bef1
       */
      projectId: string;
      /**
       * @description The percentage of the allocation
       * @example 50
       */
      percentage: number;
    };
    CreateProductAllocationDto: {
      /**
       * @description The id of the employee
       * @example 54362e8f-fe9b-46d2-a375-28c86b7ad68a
       */
      employeeId: string;
      /**
       * @description The percentage of the allocation
       * @example 50
       */
      percentage: number;
    };
    UpdateProductAllocationDto: {
      /**
       * @description The id of the employee
       * @example 54362e8f-fe9b-46d2-a375-28c86b7ad68a
       */
      employeeId?: string;
      /**
       * @description The percentage of the allocation
       * @example 50
       */
      percentage?: number;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /** Get all employees */
  EmployeesController_findAll: {
    responses: {
      /** @description Return all employees. */
      200: {
        content: {
          "application/json": components["schemas"]["Employee"][];
        };
      };
    };
  };
  /** Create an employee */
  EmployeesController_create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateEmployeeDto"];
      };
    };
    responses: {
      /** @description The employee has been successfully created. */
      201: {
        content: {
          "application/json": components["schemas"]["Employee"];
        };
      };
    };
  };
  /** Get an employee by id */
  EmployeesController_findOne: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description Return the employee. */
      200: {
        content: {
          "application/json": components["schemas"]["Employee"];
        };
      };
      400: {
        content: {
          "application/json": components["schemas"]["BadRequestException"];
        };
      };
      404: {
        content: {
          "application/json": components["schemas"]["NotFoundException"];
        };
      };
    };
  };
  /** Delete an employee by id */
  EmployeesController_remove: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description The employee has been successfully deleted. */
      204: {
        content: never;
      };
      400: {
        content: {
          "application/json": components["schemas"]["BadRequestException"];
        };
      };
      404: {
        content: {
          "application/json": components["schemas"]["NotFoundException"];
        };
      };
    };
  };
  /** Update an employee by id */
  EmployeesController_update: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateEmployeeDto"];
      };
    };
    responses: {
      /** @description The employee has been successfully updated. */
      202: {
        content: {
          "application/json": components["schemas"]["Employee"];
        };
      };
      400: {
        content: {
          "application/json": components["schemas"]["BadRequestException"];
        };
      };
      404: {
        content: {
          "application/json": components["schemas"]["NotFoundException"];
        };
      };
    };
  };
  /** Get all platoons */
  PlatoonsController_findAll: {
    responses: {
      /** @description Return all platoons. */
      200: {
        content: {
          "application/json": components["schemas"]["Platoon"][];
        };
      };
    };
  };
  /** Create a platoon */
  PlatoonsController_create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreatePlatoonDto"];
      };
    };
    responses: {
      /** @description The platoon has been successfully created. */
      201: {
        content: {
          "application/json": components["schemas"]["Platoon"];
        };
      };
    };
  };
  /** Get a platoon by id */
  PlatoonsController_findOne: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description Return the platoon. */
      200: {
        content: {
          "application/json": components["schemas"]["Platoon"];
        };
      };
    };
  };
  /** Update a platoon by id */
  PlatoonsController_update: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdatePlatoonDto"];
      };
    };
    responses: {
      /** @description The platoon has been successfully updated. */
      202: {
        content: {
          "application/json": components["schemas"]["Platoon"];
        };
      };
    };
  };
  /** Get all roles */
  RolesController_findAll: {
    responses: {
      /** @description Return all roles. */
      200: {
        content: {
          "application/json": components["schemas"]["Role"][];
        };
      };
    };
  };
  /** Create a role */
  RolesController_create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateRoleDto"];
      };
    };
    responses: {
      /** @description The role has been successfully created. */
      201: {
        content: {
          "application/json": components["schemas"]["Role"];
        };
      };
    };
  };
  /** Get a role by id */
  RolesController_findOne: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description Return the role. */
      202: {
        content: {
          "application/json": components["schemas"]["Role"];
        };
      };
    };
  };
  /** Update a role by id */
  RolesController_update: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateRoleDto"];
      };
    };
    responses: {
      /** @description The role has been successfully updated. */
      200: {
        content: {
          "application/json": components["schemas"]["Role"];
        };
      };
    };
  };
  /** Get all projects */
  ProjectsController_findAll: {
    responses: {
      /** @description Return all projects. */
      200: {
        content: {
          "application/json": components["schemas"]["Project"][];
        };
      };
    };
  };
  /** Create a project */
  ProjectsController_create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateProjectDto"];
      };
    };
    responses: {
      /** @description The project has been successfully created. */
      201: {
        content: {
          "application/json": components["schemas"]["Project"];
        };
      };
    };
  };
  /** Get a project by id */
  ProjectsController_findOne: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description Return the project. */
      200: {
        content: {
          "application/json": components["schemas"]["Project"];
        };
      };
    };
  };
  /** Delete a project by id */
  ProjectsController_remove: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description The project has been successfully deleted. */
      204: {
        content: never;
      };
    };
  };
  /** Update a project by id */
  ProjectsController_update: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateProjectDto"];
      };
    };
    responses: {
      /** @description The project has been successfully updated. */
      202: {
        content: {
          "application/json": components["schemas"]["Project"];
        };
      };
    };
  };
  /** Get all allocations for a project by id */
  ProjectsController_findAllAllocations: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description Return all allocations for a project. */
      200: {
        content: {
          "application/json": components["schemas"]["Allocation"][];
        };
      };
    };
  };
  /** Create an allocation for a project by id */
  ProjectsController_createAllocation: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateProductAllocationDto"];
      };
    };
    responses: {
      /** @description The allocation has been successfully created. */
      201: {
        content: {
          "application/json": components["schemas"]["Allocation"];
        };
      };
    };
  };
  /** Delete an allocation for a project by id */
  ProjectsController_removeAllocation: {
    parameters: {
      path: {
        id: string;
        allocationId: string;
      };
    };
    responses: {
      /** @description The allocation has been successfully deleted. */
      204: {
        content: never;
      };
    };
  };
  /** Update an allocation for a project by id */
  ProjectsController_updateAllocation: {
    parameters: {
      path: {
        id: string;
        allocationId: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateProductAllocationDto"];
      };
    };
    responses: {
      /** @description The allocation has been successfully updated. */
      202: {
        content: {
          "application/json": components["schemas"]["Allocation"];
        };
      };
    };
  };
}

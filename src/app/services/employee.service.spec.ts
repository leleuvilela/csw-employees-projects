import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService],
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getEmployees', () => {
    it('should return an Observable<Employee[]>', () => {
      const dummyEmployees = [
        {
          id: 'c5e6a86d-5f77-42f5-baf9-4eefd4837dd7',
          name: 'Vinicius Vilela',
          entryDate: '2024-01-08T11:10:07.000Z',
          platoonId: '93482fbe-736b-4aaa-841d-fea363c6cbb9',
          roleId: 'f9683f23-ad10-441d-a957-d2b4043beee6',
        },
        {
          id: 'ce8faf3c-2862-4809-b4be-7add93db1287',
          name: 'Testetse',
          entryDate: '2024-01-11T00:00:00.000Z',
          platoonId: '93482fbe-736b-4aaa-841d-fea363c6cbb9',
          roleId: 'f9683f23-ad10-441d-a957-d2b4043beee6',
        },
      ];

      service.getEmployees().subscribe((employees) => {
        expect(employees.length).toBe(2);
        expect(employees).toEqual(dummyEmployees);
      });

      const req = httpMock.expectOne(`${service.baseUrl}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyEmployees);
    });
  });

  describe('getEmployee', () => {
    it('should return an Observable<Employee>', () => {
      const dummyEmployee = {
        id: 'c5e6a86d-5f77-42f5-baf9-4eefd4837dd7',
        name: 'Vinicius Vilela',
        entryDate: '2024-01-08T11:10:07.000Z',
        platoonId: '93482fbe-736b-4aaa-841d-fea363c6cbb9',
        roleId: 'f9683f23-ad10-441d-a957-d2b4043beee6',
      };

      service
        .getEmployee('c5e6a86d-5f77-42f5-baf9-4eefd4837dd7')
        .subscribe((employee) => {
          expect(employee).toEqual(dummyEmployee);
        });

      const req = httpMock.expectOne(
        `${service.baseUrl}/c5e6a86d-5f77-42f5-baf9-4eefd4837dd7`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyEmployee);
    });
  });

  describe('createEmployee', () => {
    it('should return an Observable<Employee>', () => {
      const dummyEmployee = {
        id: 'c5e6a86d-5f77-42f5-baf9-4eefd4837dd7',
        name: 'Vinicius Vilela',
        entryDate: '2024-01-08T11:10:07.000Z',
        platoonId: '93482fbe-736b-4aaa-841d-fea363c6cbb9',
        roleId: 'f9683f23-ad10-441d-a957-d2b4043beee6',
      };

      service.createEmployee(dummyEmployee).subscribe((employee) => {
        expect(employee).toEqual(dummyEmployee);
      });

      const req = httpMock.expectOne(`${service.baseUrl}`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyEmployee);
    });
  });

  describe('updateEmployee', () => {
    it('should return an Observable<Employee>', () => {
      const dummyEmployee = {
        name: 'Vinicius Vilela',
        entryDate: '2024-01-08T11:10:07.000Z',
        platoonId: '93482fbe-736b-4aaa-841d-fea363c6cbb9',
        roleId: 'f9683f23-ad10-441d-a957-d2b4043beee6',
      };

      service
        .updateEmployee('c5e6a86d-5f77-42f5-baf9-4eefd4837dd7', dummyEmployee)
        .subscribe((employee) => {
          expect(employee).toEqual(dummyEmployee);
        });

      const req = httpMock.expectOne(
        `${service.baseUrl}/c5e6a86d-5f77-42f5-baf9-4eefd4837dd7`
      );
      expect(req.request.method).toBe('PATCH');
      req.flush(dummyEmployee);
    });
  });

  describe('deleteEmployee', () => {
    it('should return an Observable<Employee>', () => {
      const dummyEmployee = {
        id: 'c5e6a86d-5f77-42f5-baf9-4eefd4837dd7',
        name: 'Vinicius Vilela',
        entryDate: '2024-01-08T11:10:07.000Z',
        platoonId: '93482fbe-736b-4aaa-841d-fea363c6cbb9',
        roleId: 'f9683f23-ad10-441d-a957-d2b4043beee6',
      };

      service
        .deleteEmployee('c5e6a86d-5f77-42f5-baf9-4eefd4837dd7')
        .subscribe((employee) => {
          expect(employee).toEqual(dummyEmployee);
        });

      const req = httpMock.expectOne(
        `${service.baseUrl}/c5e6a86d-5f77-42f5-baf9-4eefd4837dd7`
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(dummyEmployee);
    });
  });
});

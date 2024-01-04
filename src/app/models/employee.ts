export interface Employee {
  id?: number;
  name: string;
  platoonId: number;
  roleId: number;
  entryDate: string;
  exitDate?: string;
  isActive: boolean;
}

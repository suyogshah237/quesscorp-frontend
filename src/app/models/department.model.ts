import { Employee } from './employee.model';

export interface Department {
  id: string;
  name: string;
  location: string;
  employees: Employee[];
}

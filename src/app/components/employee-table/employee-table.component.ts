import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent {
  @Input() employees: Employee[] = [];

  constructor() { }
}

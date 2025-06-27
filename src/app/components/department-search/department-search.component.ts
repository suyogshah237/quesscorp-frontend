import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Department } from '../../models/department.model';
import { Employee } from '../../models/employee.model';
import { EmployeeTableComponent } from '../employee-table/employee-table.component';

@Component({
  selector: 'app-department-search',
  standalone: true,
  imports: [CommonModule, FormsModule, EmployeeTableComponent],
  templateUrl: './department-search.component.html',
  styleUrls: ['./department-search.component.scss']
})
export class DepartmentSearchComponent implements OnInit {
  departmentId: string = '';
  department: Department | null = null;
  employees: Employee[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void { }

  searchDepartment(): void {
    if (!this.departmentId || this.departmentId.trim() === '') {
      this.errorMessage = 'Please enter a Department ID';
      this.department = null;
      this.employees = [];
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    
    this.apiService.getDepartmentById(this.departmentId.trim()).subscribe({
      next: (data) => {
        this.department = data;
        this.employees = data.employees || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching department:', error);
        this.errorMessage = 'Department not found or an error occurred.';
        this.department = null;
        this.employees = [];
        this.loading = false;
      }
    });
  }

  downloadEmployeeReport(): void {
    this.loading = true;
    this.apiService.downloadEmployeesByDepartmentReport().subscribe({
      next: (data: Blob) => {
        this.loading = false;
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'employees-by-department.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      error: (error) => {
        console.error('Error downloading report:', error);
        this.errorMessage = 'Failed to download the report.';
        this.loading = false;
      }
    });
  }
}

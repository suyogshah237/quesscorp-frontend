import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employeeId: string = '';
  employee: Employee | null = null;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.employeeId = id;
        this.loadEmployeeDetails();
      } else {
        this.errorMessage = 'Employee ID not provided';
        this.loading = false;
      }
    });
  }

  loadEmployeeDetails(): void {
    this.loading = true;
    this.apiService.getEmployeeById(this.employeeId).subscribe({
      next: (data) => {
        this.employee = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching employee details:', error);
        this.errorMessage = 'Employee not found or an error occurred.';
        this.loading = false;
      }
    });
  }

  deleteEmployee(): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.apiService.deleteEmployee(this.employeeId).subscribe({
        next: () => {
          alert('Employee deleted successfully');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          alert('Failed to delete employee');
        }
      });
    }
  }
}

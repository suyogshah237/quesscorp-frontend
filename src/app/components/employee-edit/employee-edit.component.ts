import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  employeeId: string = '';
  employee: Employee = {
    id: '',
    name: '',
    email: '',
    position: '',
    salary: 0
  };
  isNewEmployee: boolean = false;
  loading: boolean = true;
  errorMessage: string = '';
  submitInProgress: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      
      if (id === 'new') {
        this.isNewEmployee = true;
        this.loading = false;
      } else if (id) {
        this.employeeId = id;
        this.loadEmployeeDetails();
      } else {
        this.errorMessage = 'Employee ID not provided';
        this.loading = false;
      }
    });
  }

  loadEmployeeDetails(): void {
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

  saveEmployee(): void {
    this.submitInProgress = true;
    
    if (this.isNewEmployee) {
      this.apiService.createEmployee(this.employee).subscribe({
        next: (data) => {
          alert('Employee created successfully');
          this.router.navigate(['/employee', data.id]);
        },
        error: (error) => {
          console.error('Error creating employee:', error);
          this.errorMessage = 'Failed to create employee. Please try again.';
          this.submitInProgress = false;
        }
      });
    } else {
      this.apiService.updateEmployee(this.employee).subscribe({
        next: (data) => {
          alert('Employee updated successfully');
          this.router.navigate(['/employee', data.id]);
        },
        error: (error) => {
          console.error('Error updating employee:', error);
          this.errorMessage = 'Failed to update employee. Please try again.';
          this.submitInProgress = false;
        }
      });
    }
  }

  cancel(): void {
    if (this.isNewEmployee) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/employee', this.employeeId]);
    }
  }
}

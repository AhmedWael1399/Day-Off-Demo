import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, NgModel } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmployeeDetailService } from '../shared/employee-detail.service';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


interface Location {
  id: number;
  name: string;
}

interface Team {
  id: number;
  name: string;
}
interface LeavePolicy {
  type: string;
}
interface TimeZone {
  id: number;
  name: string;
}

interface Approvers {
  id: number;
  name: string;
}


@Component({
  selector: 'app-add-employee-component',
  standalone: true,
  providers: [provideNativeDateAdapter(), EmployeeDetailService, Router],
  imports: [RouterLink, MatRadioModule, NgSelectModule, FormsModule, JsonPipe, MatDatepickerModule, MatInputModule, MatFormFieldModule, HttpClientModule, NgbAlertModule, NgbDatepickerModule],
  templateUrl: './add-employee-component.component.html',
  styleUrl: './add-employee-component.component.scss'
})
export class AddEmployeeComponentComponent implements OnInit {
  model!: NgbDateStruct;

  readonly APIUrlAddEmployee = "https://localhost:7013/api/Employee";
  readonly APIUrlGetLeaves = "https://localhost:7013/api/Leave?Page=1&PageSize=12";

  employeeName: string = '';


  selectedLocations: Location[] = [];
  locations: Location[] = [];
  locationsNames = ['United States', 'Italy', 'Spain'];

  selectedTeams: Team[] = [];
  teams: Team[] = [];
  teamsNames = ['UI Designers'];

  fetchedLeavePolicies: LeavePolicy[] = [];
  leavePolicies: LeavePolicy[] = [];

  selectedTimeZones: TimeZone[] = [];
  timeZones: TimeZone[] = [];
  timeZonesNames = ['KSA'];

  selectedApprovers: Approvers[] = [];
  approvers: Approvers[] = [];
  approversNames = [];

  constructor(private http: HttpClient, private router: Router) { }

  saveEmployee() {
    const apiUrl = `${this.APIUrlAddEmployee}?employeeName=${this.employeeName}`;
    this.http.post(apiUrl, null).subscribe(
      (response: any) => {
        console.log('Employee saved successfully:', response);
        this.employeeName = '';
        this.router.navigate(['/']);
      
      },
      (error) => {
        console.error('Error saving employee:', error);
      }
    );
  }

  ngOnInit() {
    this.locationsNames.forEach((c, i) => {
      this.locations.push({ id: i, name: c });
    });
    this.teamsNames.forEach((c, i) => {
      this.teams.push({ id: i, name: c });
    });
    this.fetchLeavePolicies();
    this.timeZonesNames.forEach((c, i) => {
      this.timeZones.push({ id: i, name: c });
    });
    this.approversNames.forEach((c, i) => {
      this.approvers.push({ id: i, name: c });
    });
  }

  addTagFn(name: string) {
    return { name: name, tag: true };
  }

  fetchLeavePolicies() {
    this.http.get<LeavePolicy[]>(this.APIUrlGetLeaves).subscribe(
      (policies) => {
        this.fetchedLeavePolicies = policies;
        this.fetchedLeavePolicies.forEach((policy) => {
          this.leavePolicies.push({ type: policy.type });
        });
      },
      (error) => {
        console.error('Error fetching leave policies:', error);
      }
    );
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { JsonPipe } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {Injectable} from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';




export interface EmployeeData {
  position: number;
  Approvers: string;
}

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = $localize`First page`;
  itemsPerPageLabel = $localize`Items per page:`;
  lastPageLabel = $localize`Last page`;

  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Page ${page + 1} of ${amountPages}`;
  }
}



@Component({
  selector: 'employee-table-component',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule, MatCardModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, FormsModule, JsonPipe, RouterLink,HttpClientModule, CommonModule],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}, Router],
  templateUrl: './employee-table-component.component.html',
  styleUrl: './employee-table-component.component.scss'
})

export class EmployeeTableComponentComponent implements OnInit {
  displayedColumns: string[] = ['select', 'approvers', 'team', 'location', 'leave policy', 'status', 'days', 'hours', 'work schedule', 'action'];
  dataSource = new MatTableDataSource<EmployeeData>();
  selection = new SelectionModel<EmployeeData>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly APIUrl = "https://localhost:7013/api/Employee?Page=1&PageSize=100";

  constructor(private httpClient: HttpClient, private router: Router) { } 


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }


  checkboxLabel(row?: EmployeeData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  ngOnInit(){
    this.getEmployeeData(); 
    this.dataSource.paginator = this.paginator; 
  }

  getEmployeeData() {
    this.httpClient.get<EmployeeData[]>(this.APIUrl)
    .subscribe(data => {
      this.dataSource.data = data; 
      this.dataSource.paginator = this.paginator; 
    });
    }

    navigateToAddEmployee() {
      this.router.navigate(['/addEmployee']);
  }
}
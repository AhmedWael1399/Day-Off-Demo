// employee-detail.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailService {
  private dateRangeSubject = new BehaviorSubject<Date[]>([new Date(), new Date()]);
  dateRange$: Observable<Date[]> = this.dateRangeSubject.asObservable();

  constructor() { }

  setDateRange(dateRange: Date[]) {
    this.dateRangeSubject.next(dateRange);
  }

  getDateRange(): Observable<Date[]> {
    return this.dateRange$;
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTableComponentComponent } from './employee-table-component.component';

describe('EmployeeTableComponentComponent', () => {
  let component: EmployeeTableComponentComponent;
  let fixture: ComponentFixture<EmployeeTableComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeTableComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

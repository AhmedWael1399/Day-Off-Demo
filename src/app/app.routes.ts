import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddEmployeeComponentComponent } from './add-employee-component/add-employee-component.component';
import { EmployeeTableComponentComponent } from './employee-table-component/employee-table-component.component';


export const routes: Routes = [
    {
        path: '',
        title: "Employees Overview",
        component: EmployeeTableComponentComponent
    },

    {
        path: 'addEmployee',
        title: "Add Employee",
        component: AddEmployeeComponentComponent
    }
];

NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export default routes;
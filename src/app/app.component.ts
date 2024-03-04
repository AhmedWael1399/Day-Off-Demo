import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AsideComponentComponent } from './aside-component/aside-component.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { EmployeeTableComponentComponent} from './employee-table-component/employee-table-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { routes } from './app.routes';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsideComponentComponent, HeaderComponentComponent, EmployeeTableComponentComponent, FooterComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dayOff';  
}


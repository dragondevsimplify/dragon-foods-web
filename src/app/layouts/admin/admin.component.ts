import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './admin.component.html',
})
export class AdminComponent {

}

import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  // 
  constructor(
    public authService: AuthService,
    ) {
  }
  alert(){
    alert('Service is not available!');
  }
}
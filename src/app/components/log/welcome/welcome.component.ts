import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private router: Router,
    private ui: UIService,
    ) { }

  ngOnInit(): void {
    console.log(this.ui.checkDisplayWidth);
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }



}

import { Component, OnInit } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-logged-wrapper',
  templateUrl: './logged-wrapper.component.html',
  styleUrls: ['./logged-wrapper.component.scss']
})
export class LoggedWrapperComponent implements OnInit {

  constructor(
    private UIService: UIService,
  ) {
  }
  
  ngOnInit(): void {
    this.UIService.checkDisplayWidth();
  } 
}
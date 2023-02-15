import { Component, OnInit } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-content-wrapper',
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.scss']
})

export class ContentWrapperComponent implements OnInit {

  constructor(
    private UiService: UIService,
  ) {
  }
  
  ngOnInit(): void {
    this.UiService.checkDisplayWidth();
  }
}
import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-contact-wrapper',
  templateUrl: './contact-wrapper.component.html',
  styleUrls: ['./contact-wrapper.component.scss']
})

export class ContactWrapperComponent {

  constructor(
    public data: DataService,
    private Ui: UIService,
  ) { 
    Ui.checkMbDevice();
  }
}

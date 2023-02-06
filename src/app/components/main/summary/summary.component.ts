import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-summary',

  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})

export class SummaryComponent {

  constructor(
    public data: DataService,
  ) {}
}
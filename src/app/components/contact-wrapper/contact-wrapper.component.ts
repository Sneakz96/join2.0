import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-wrapper',
  templateUrl: './contact-wrapper.component.html',
  styleUrls: ['./contact-wrapper.component.scss']
})

export class ContactWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



  sideSelect = 'contacts';

  onSelect(feature: string) {
    this.sideSelect = feature;
  }
}

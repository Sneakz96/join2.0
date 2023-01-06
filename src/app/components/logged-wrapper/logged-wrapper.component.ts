import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-logged-wrapper',
  templateUrl: './logged-wrapper.component.html',
  styleUrls: ['./logged-wrapper.component.scss']
})
export class LoggedWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {
    console.log(this.featureSelected);
    this.featureSelected.emit(feature);
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  menuIsActive = false;

  constructor() { }

  ngOnInit(): void {
  }

  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {
    this.featureSelected.emit(feature);

    console.log(feature);

    if (feature === 'summary') {
      this.menuIsActive = true;
    }
    if (feature === 'board') {
      this.menuIsActive = false;
    }
  }


}

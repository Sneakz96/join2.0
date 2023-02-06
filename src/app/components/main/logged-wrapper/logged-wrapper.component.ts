import { Component, OnChanges, OnInit } from '@angular/core';


@Component({
  selector: 'app-logged-wrapper',
  templateUrl: './logged-wrapper.component.html',
  styleUrls: ['./logged-wrapper.component.scss']
})
export class LoggedWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.checkDisplayWidth();
    console.log('top called');
  }

  // CHECK WIDTH OF DISPLAY
  checkDisplayWidth() {
    const button = document.getElementById("mb_menu") as HTMLButtonElement;

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 600) {
        console.log('on');
        button.disabled = true;
      } else {
        console.log('off');
        button.disabled = false;
      }
    });
  }
}

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
    button.disabled = true;
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1080) {
        console.log('off');
        button.disabled = true;
      } else {
        console.log('on');
        button.disabled = false;
      }
    });
  }
}

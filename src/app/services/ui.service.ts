import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class UIService {

  constructor() { }

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
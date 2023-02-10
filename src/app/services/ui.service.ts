import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UIService {

  // 
  constructor() {
  }

  // CHECK WIDTH OF DISPLAY
  checkDisplayWidth() {
    const button = document.getElementById("mb_menu") as HTMLButtonElement;
    window.addEventListener("load", () => {
      if (window.innerWidth >= 1080) {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1080) {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    });
  }
}
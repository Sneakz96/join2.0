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
    console.log('Check Display Width');
    const button = document.getElementById("mb_menu") as HTMLButtonElement;
    window.addEventListener("load", () => {
      if (window.innerWidth >= 1080) {
        button.disabled = true;
        console.log(button.disabled);
      } else {
        button.disabled = false;
        console.log(button.disabled);
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1080) {
        button.disabled = true;
        console.log(button.disabled);
      } else {
        button.disabled = false;
        console.log(button.disabled);
      }
    });
  }



}
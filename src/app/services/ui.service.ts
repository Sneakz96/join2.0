import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UIService {

  constructor() { 
  }
  
  // CHECK WIDTH OF DISPLAY
  checkDisplayWidth() {
    console.log('check width');
    const button = document.getElementById("mb_menu") as HTMLButtonElement;
    window.addEventListener("load", () => {
      if (window.innerWidth >= 1080) {
        console.log('off');
        button.disabled = true;
      } else {
        console.log('on');
        button.disabled = false;
      }
    });
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
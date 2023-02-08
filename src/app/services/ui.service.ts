import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UIService implements OnInit{

  constructor() { 
  }
  
  ngOnInit(): void {
   
    
  }
  
  // CHECK WIDTH OF DISPLAY
  checkDisplayWidth() {
    console.log('check width');
    const button = document.getElementById("mb_menu") as HTMLButtonElement;
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
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class UIService {

  // 
  constructor(
    private data: DataService,
  ) {
  }

  // CHECK WIDTH OF DISPLAY FOR MB_MENU ON PROFILE
  checkDisplayWidth() {
    let button = document.getElementById("mb_menu") as HTMLButtonElement;
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

  // CHECK DISPLAY WIDTH FOR CONTACT SECTION
  checkMbDevice() {
    window.addEventListener("load", () => {
      if (window.innerWidth >= 760) {
        this.data.mbDevice = null;
      } else {
        this.data.mbDevice = false;
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 760) {
        this.data.mbDevice = null;
      } else {
        this.data.mbDevice = false;
      }
    });
  }



}
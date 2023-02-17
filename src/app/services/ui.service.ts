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
    console.log('Check Display Width');
    const button = document.getElementById("mb_menu") as HTMLButtonElement;
    window.addEventListener("load", () => {
      if (window.innerWidth >= 1080) {
        // button.disabled = true;
        // console.log(button.disabled);
      } else {
        // button.disabled = false;
        // console.log(button.disabled);
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1080) {
        // button.disabled = true;
        // console.log(button.disabled);
      } else {
        // button.disabled = false;
        // console.log(button.disabled);
      }
    });
  }

  // CHECK DISPLAY WIDTH FOR CONTACT SECTION
  checkMbDevice() {
    window.addEventListener("load", () => {
      if (window.innerWidth >= 760) {
        this.data.mbDevice = null;
        console.log(this.data.mbDevice);
      } else {
        this.data.mbDevice = false;
        console.log(this.data.mbDevice);
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 760) {
        this.data.mbDevice = null;
        console.log(this.data.mbDevice);
      } else {
        this.data.mbDevice = false;
        console.log(this.data.mbDevice);
      }
    });
  }



}
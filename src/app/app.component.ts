import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }



  loadedFeature = 'addTask';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
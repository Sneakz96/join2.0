import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.class';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  
  contact = new Contact();

  constructor() {
  }

  ngOnInit(): void {
  }

  @Output() sideSelect = new EventEmitter<string>();

  onSelect(feature: string) {
    this.sideSelect.emit(feature);
    console.log(feature);
  }

  editTask() {
    console.log('edit');
  }


}

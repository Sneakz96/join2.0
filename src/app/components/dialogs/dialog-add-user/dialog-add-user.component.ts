import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.class';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  constact = new Contact();

  constructor() {

  }

  ngOnInit(): void {
  }
  @Output() featureSelect = new EventEmitter<string>();

  onSelect(feature: string) {
    this.featureSelect.emit(feature);
    console.log(feature);
  }
  editTask() {
    console.log('edit');
  }
}

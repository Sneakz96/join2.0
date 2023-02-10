import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact.class';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  user: Contact;
  userId: string;
  
  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private firestore: AngularFirestore,
    private dataService: DataService
  ) { }


  ngOnInit(): void {
    console.log(this.user);
    console.log(this.dataService.allContacts);
  }

  // CLOSE DIALOG
  closeDialog() {
    this.dialogRef.close();
  }

  // SAVE EDITED TASK TO DB
  save() {
    this.setColor();
    console.log('save called');
    this.closeDialog();
    this.firestore
    .collection('allContacts')
    .doc(this.userId)
    .update(this.user.toJSON());
  }

    // SET BG_COLOR OF CIRCLE BY FIRST LETTER OF LAST NAME
    setColor() {
      switch (this.user.lastName.charCodeAt(0) % 6) {
        case 0:
          this.user.color = 'lightgreen'
          break;
        case 1:
          this.user.color = 'lightgrey'
          break;
        case 2:
          this.user.color = 'lightblue'
          break;
        case 3:
          this.user.color = 'red'
          break;
        case 4:
          this.user.color = 'yellow'
          break;
        case 5:
          this.user.color = 'orange'
          break;
        case 6:
          this.user.color = 'purple'
          break;
        case 7:
          this.user.color = 'pink'
          break;
        default:
      }
    }
}

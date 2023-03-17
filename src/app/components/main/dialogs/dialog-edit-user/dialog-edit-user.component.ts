import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact.class';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})

export class DialogEditUserComponent {

  user: Contact;
  userId: string;
  userEdited = false;
  
  // 
  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private firestore: AngularFirestore,
    public data: DataService,
  ) { }

  // CLOSE DIALOG
  closeDialog() {
    this.dialogRef.close();
  }

  // SAVE EDITED USER TO DB
  save() {
    this.checkEditedForm();
    if (this.userEdited) {
      this.data.setColor();
      this.closeDialog();
      this.firestore
        .collection('allContacts')
        .doc(this.userId)
        .update(this.user.toJSON());
    }
  }

  // CHECK FORM OF EDITED CONTACT
  checkEditedForm() {
    let { firstName, lastName, email, phone } = this.user;
  
    let checkInputs = (value: string): boolean => /^[A-Za-z0-9+-]+$/.test(value);
    let checkMail = (value: string): boolean => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    let checkNumber = (value: string): boolean => /^[0-9+/+]+$/.test(value);
  
    let isFirstNameValid = checkInputs(firstName.replace(/\s/g, ''));
    let isLastNameValid = checkInputs(lastName.replace(/\s/g, ''));
    let isEmailValid = checkMail(email.replace(/\s/g, ''));
    let isPhoneValid = checkNumber(phone.replace(/\s/g, ''));
  
    if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isPhoneValid) {
      console.log('error');
      console.log(isFirstNameValid, isLastNameValid, isEmailValid, isPhoneValid);
      this.userEdited = false;
    } else {
      this.userEdited = true;
    }
  }
}
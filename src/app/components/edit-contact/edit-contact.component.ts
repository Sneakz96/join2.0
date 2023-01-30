import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact.class';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})

export class EditContactComponent implements OnInit {

  edit = false;

  userId = "";
  user: any = {};

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log(this.userId);
      this.getUser();
    });
  }

  getUser() {
    this.firestore
      .collection('allContacts')
      .doc(this.userId)
      .valueChanges()
      .subscribe((user: any) => {
        this.user = new Contact(user);

        console.log(this.user);
      })
  }

  editUser() {
    this.edit = true;
    console.log(this.edit);
  }
  save() {
    this.edit = false;
    console.log(this.edit);
  }
}

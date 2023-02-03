import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.class';
import { DataService } from 'src/app/services/data.service';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})

export class DialogAddUserComponent implements OnInit {

  contact = new Contact();
  contactForm!: FormGroup;

  @Output() sideSelect = new EventEmitter<string>();

  constructor(
    private router: Router,
    private firestore: Firestore,
    public data: DataService,
  ) {
  }

  ngOnInit(): void {
    this.setForm();
    this.setUserID();
  }

  setForm() {
    this.contactForm = new FormGroup({
      'firstName': new FormControl(this.contact.firstName, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'lastName': new FormControl(this.contact.lastName, Validators.required),
      'email': new FormControl(this.contact.email, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      'phone': new FormControl(this.contact.phone, [Validators.required, Validators.pattern('[- +()0-9]+')]),
    });
    console.log(this.contact.firstName);
  }

  setUserID() {
    this.contact.id = 20000 * Math.random();
    console.log(this.contact.id);
  }

  setColor() {
    switch (this.contact.lastName.charCodeAt(0) % 6) {
      case 0:
        this.contact.color = 'lightgreen'
        break;
      case 1:
        this.contact.color = 'lightgrey'
        break;
      case 2:
        this.contact.color = 'lightblue'
        break;
      case 3:
        this.contact.color = 'red'
        break;
      case 4:
        this.contact.color = 'yellow'
        break;
      case 5:
        this.contact.color = 'orange'
        break;
      case 6:
        this.contact.color = 'purple'
        break;
      case 7:
        this.contact.color = 'pink'
        break;
      default:
    }
  }

  setUser() {
    this.contact.firstName = this.contactForm.value.firstName;
    this.contact.lastName = this.contactForm.value.lastName;
    this.setColor();
    this.contact.email = this.contactForm.value.email;
    this.contact.phone = this.contactForm.value.phone;
  }

  addUser() {
    this.setUser();
    this.saveUserToFirestore();
    console.log(this.data.contactCreated);//f
    this.router.navigate(['/kanbanboard/contacts']);
    setTimeout(() => {
      this.data.contactCreated = true;//t
      console.log(this.data.contactCreated);
    }, 500);

    console.log(this.data.contactCreated);//f
 
  }

  saveUserToFirestore() {
    console.log('should store User in Firestore', this.contact);

    const coll = collection(this.firestore, 'allContacts');
    console.log(coll);
    setDoc(doc(coll), this.contact.toJSON());
  }

  editTask() {
    console.log('edit');
  }


}

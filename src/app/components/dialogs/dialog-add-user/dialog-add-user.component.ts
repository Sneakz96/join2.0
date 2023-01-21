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
    public dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.setForm();
    this.setUserID();
    this.saveInputs();
  }

  setForm() {
    this.contactForm = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phone': new FormControl('', Validators.required),
    });
  }

  saveInputs() {
    // this.contactForm = this.contact;
  }

  setUserID() {
    this.contact.id = 20000 * Math.random();
    console.log(this.contact.id);
  }


  addUser() {
    console.log(this.contactForm.value);

    this.saveUserToFirestore();

    setTimeout(() => {
      this.router.navigate(['/kanbanboard/contacts']);
    }, 500)
  }

  saveUserToFirestore() {
    console.log('should store User in Firestore');
    // const coll = collection(this.firestore, 'allUser');
    // setDoc(doc(coll, "s"), this.contactForm);
    // s = UNIQUE ID
  }


  editTask() {
    console.log('edit');
  }


}

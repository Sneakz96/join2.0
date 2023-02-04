import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.class';
import { DataService } from 'src/app/services/data.service';
import { DialogEditUserComponent } from '../dialogs/dialog-edit-user/dialog-edit-user.component';

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
    private router: Router,
    public data: DataService,
    public dialog: MatDialog,
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

  addNewContact() {
    this.router.navigate(['/kanbanboard/contacts/add-user'])
  }

  // OPEN DIALOG
  editUser() {
    const dialogRef = this.dialog.open(DialogEditUserComponent);
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }


  save() {
    this.edit = false;
    console.log(this.edit);
  }
}

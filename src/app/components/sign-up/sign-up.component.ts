import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogGuestLoginComponent } from 'src/app/components/dialogs/dialog-guest-login/dialog-guest-login.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  @ViewChild('nameField') nameField!: ElementRef;
  @ViewChild('emailField') emailField!: ElementRef;
  @ViewChild('passwordField') messageField!: ElementRef;
  signForm!: FormGroup;

  constructor(public dialog: MatDialog, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.signForm = new FormGroup({
      'displayName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogGuestLoginComponent);
  }

  /* Sign up */
  signUp() {
    if (this.signForm.invalid) {
      return;
    }
    this.afAuth
      .createUserWithEmailAndPassword(this.signForm.value.email, this.signForm.value.password)
      .then(res => {
        if (res.credential == null) {
          console.log('You are Successfully signed up!', res);
          this.router.navigate(['/summary'])
        }

      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });
  }
}

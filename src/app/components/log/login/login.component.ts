import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginForm!: FormGroup;

  // 
  constructor(public dialog: MatDialog, private router: Router, private afAuth: AngularFireAuth) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
  }

  // 
  openDialog(): void { }

  // 
  onSubmit() {
    return false;
  }

  // 
  loginUser() {
    this.afAuth
      .signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
      .then(res => {
        this.router.navigate(['/kanbanboard']);
        console.log('login successfull', res);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }
}
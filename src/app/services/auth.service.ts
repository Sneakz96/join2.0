import { Injectable, OnInit } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class AuthService implements OnInit {


    loginForm!: FormGroup;
    
    // 
    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
    ) {
        this.setLoginForm();

    }

    // 
    ngOnInit(): void {

    }

    // 
    setLoginForm() {
        this.loginForm = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', Validators.required)
        });
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
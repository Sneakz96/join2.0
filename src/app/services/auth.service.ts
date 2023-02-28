import { Injectable, OnInit } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class AuthService implements OnInit {

    loginForm!: FormGroup;
    signForm!: FormGroup;

    // 
    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
    ) {
        this.setLoginForm();
        this.setSignUpForm();
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

    // SET SIGN UP FORM
    setSignUpForm() {
        this.signForm = new FormGroup({
            'displayName': new FormControl('', Validators.required),
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', Validators.required)
        });
    }

    // SIGN UP TO DB
    signUp() {
        console.log('signUp called');
        if (this.signForm.invalid) {
            return;
        }
        this.afAuth
            .createUserWithEmailAndPassword(this.signForm.value.email, this.signForm.value.password)
            .then(res => {
                if (res.credential == null) {
                    res.user.updateProfile({ displayName: this.signForm.value.displayName });
                    console.log('You are Successfully signed up!', res);
                    this.router.navigate(['/kanbanboard/summary']);
                }
            })
            .catch(error => {
                console.log('Something is wrong:', error.message);
            });
    }
}
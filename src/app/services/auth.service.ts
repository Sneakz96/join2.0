import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

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
            .then(() => {
                this.router.navigate(['/kanbanboard']);
            })
            .catch(() => {
                alert('Something went wrong!');
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
        if (this.signForm.invalid) {
            return;
        }
        this.afAuth
            .createUserWithEmailAndPassword(this.signForm.value.email, this.signForm.value.password)
            .then(res => {
                if (res.credential == null) {
                    res.user.updateProfile({ displayName: this.signForm.value.displayName });
                    this.router.navigate(['/kanbanboard/summary']);
                }
            })
            .catch(() => {
                alert('Something is wrong!');
            });
    }
}